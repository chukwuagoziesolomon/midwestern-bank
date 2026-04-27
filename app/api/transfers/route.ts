import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import bcrypt from "bcryptjs";
import type { Transfer } from "@/lib/generated/prisma/client";

export async function GET(req: NextRequest) {
  try {
    const auth = getUserFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const userId = Number(searchParams.get("user_id"));

    if (userId !== auth.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const transfers = await prisma.transfer.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    const mapped = transfers.map((t: Transfer) => ({
      id: t.id,
      transfer_type: t.transferType,
      receiver_name: t.receiverName,
      receiver_bank: t.receiverBank,
      receiver_account_number: t.receiverAccountNumber,
      routing_number: t.routingNumber,
      receiver_bank_address: t.receiverBankAddress,
      iban: t.iban,
      swift_code: t.swiftCode,
      amount: t.amount.toString(),
      description: t.description,
      status: t.status,
      created_at: t.createdAt.toISOString(),
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("Get transfers error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = getUserFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      user_id,
      transfer_type,
      receiver_name,
      receiver_bank,
      receiver_account_number,
      routing_number,
      receiver_bank_address,
      iban,
      swift_code,
      amount,
      description,
      pin,
    } = body;

    if (user_id !== auth.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!receiver_name || !receiver_bank || !receiver_account_number || !amount || !pin) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify PIN
    const user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const pinValid = await bcrypt.compare(pin, user.pin);
    if (!pinValid) {
      return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
    }

    // Check balance
    const account = await prisma.account.findUnique({ where: { userId: user_id } });
    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const transferAmount = parseFloat(amount);
    if (Number(account.availableBalance) < transferAmount) {
      return NextResponse.json({ error: "Insufficient funds" }, { status: 400 });
    }

    // Create transfer and deduct balance in a transaction
    const [transfer] = await prisma.$transaction([
      prisma.transfer.create({
        data: {
          userId: user_id,
          transferType: transfer_type,
          receiverName: receiver_name,
          receiverBank: receiver_bank,
          receiverAccountNumber: receiver_account_number,
          routingNumber: routing_number || null,
          receiverBankAddress: receiver_bank_address || null,
          iban: iban || null,
          swiftCode: swift_code || null,
          amount: transferAmount,
          description: description || "",
          status: "completed",
        },
      }),
      prisma.account.update({
        where: { userId: user_id },
        data: {
          totalBalance: { decrement: amount },
          availableBalance: { decrement: amount },
        },
      }),
    ]);

    return NextResponse.json({
      transfer: {
        id: transfer.id,
        date: transfer.createdAt.toISOString(),
        amount: transfer.amount.toString(),
        receiver_name: transfer.receiverName,
        receiver_bank: transfer.receiverBank,
        receiver_account_number: transfer.receiverAccountNumber,
        description: transfer.description,
      },
    });
  } catch (error) {
    console.error("Create transfer error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

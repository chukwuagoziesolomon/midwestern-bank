import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const auth = getUserFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { user_id, card_number, card_expiry, card_cvc, deposit_amount, card_holder_name } = body;

    if (user_id !== auth.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!card_number || !card_expiry || !card_cvc || !deposit_amount || !card_holder_name) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (deposit_amount <= 0) {
      return NextResponse.json({ error: "Deposit amount must be positive" }, { status: 400 });
    }

    const depositAmount = parseFloat(deposit_amount);

    // Add to account balance
    const account = await prisma.account.update({
      where: { userId: user_id },
      data: {
        totalBalance: { increment: depositAmount },
        availableBalance: { increment: depositAmount },
      },
    });

    // Record as a credit transfer
    await prisma.transfer.create({
      data: {
        userId: user_id,
        transferType: "deposit",
        receiverName: card_holder_name,
        receiverBank: "Card Deposit",
        receiverAccountNumber: card_number.slice(-4),
        amount: depositAmount,
        description: `Card deposit from ${card_holder_name}`,
        status: "completed",
      },
    });

    return NextResponse.json({
      message: "Deposit successful",
      total_balance: account.totalBalance.toString(),
      available_balance: account.availableBalance.toString(),
    });
  } catch (error) {
    console.error("Deposit error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

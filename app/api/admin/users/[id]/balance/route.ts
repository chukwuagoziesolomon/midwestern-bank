import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    const userId = Number(id);
    const body = await req.json();
    const { amount } = body; // positive to increase, negative to decrease

    if (typeof amount !== "number" || amount === 0) {
      return NextResponse.json({ error: "A non-zero amount is required" }, { status: 400 });
    }

    const account = await prisma.account.findUnique({ where: { userId } });
    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    const currentBalance = Number(account.availableBalance);
    const newBalance = currentBalance + amount;

    if (newBalance < 0) {
      return NextResponse.json({ error: "Balance cannot go below zero" }, { status: 400 });
    }

    const currentTotal = Number(account.totalBalance);
    const newTotal = currentTotal + amount;

    await prisma.account.update({
      where: { userId },
      data: {
        availableBalance: newBalance,
        totalBalance: newTotal < 0 ? 0 : newTotal,
      },
    });

    return NextResponse.json({
      message: `Balance ${amount > 0 ? "increased" : "decreased"} by $${Math.abs(amount).toFixed(2)}`,
      available_balance: newBalance,
    });
  } catch (error) {
    console.error("Admin balance error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

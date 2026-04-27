import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

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

    const card = await prisma.card.findUnique({
      where: { userId },
    });

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    return NextResponse.json({
      card_number: card.cardNumber,
      card_expiry: card.cardExpiry,
      card_holder_name: card.cardHolderName,
    });
  } catch (error) {
    console.error("Card error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

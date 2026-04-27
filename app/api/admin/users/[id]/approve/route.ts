import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";

// --- Random transaction helpers (copied from signup) ---
const BANK_NAMES = [
  "Chase Bank", "Bank of America", "Wells Fargo", "Citibank", "US Bank",
  "PNC Bank", "Capital One", "TD Bank", "HSBC", "Goldman Sachs",
  "Morgan Stanley", "Barclays", "Deutsche Bank", "Credit Suisse", "JPMorgan",
];
const FIRST_NAMES = [
  "James", "Mary", "Robert", "Patricia", "John", "Jennifer", "Michael", "Linda",
  "David", "Elizabeth", "William", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
];
const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
];
const DESCRIPTIONS = [
  "Monthly salary payment", "Freelance consulting", "Invoice payment", "Rental income",
  "Wire transfer", "Business payment", "Refund", "Commission payment",
  "Dividend payment", "Interest payment", "Insurance payout", "Tax refund",
  "Client payment", "Contract payment", "Bonus payment", "Reimbursement",
];
function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomItem(arr: unknown[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function generateRandomTransactions(userId: number, count: number) {
  const transactions = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const isCredit = Math.random() > 0.4;
    const amount = (randomBetween(50, 15000) + Math.random()).toFixed(2);
    const daysAgo = randomBetween(1, 90);
    const createdAt = new Date(now - daysAgo * 24 * 60 * 60 * 1000);
    transactions.push({
      userId,
      transferType: isCredit ? "deposit" : (Math.random() > 0.5 ? "local" : "international"),
      receiverName: `${randomItem(FIRST_NAMES)} ${randomItem(LAST_NAMES)}`,
      receiverBank: randomItem(BANK_NAMES) as string,
      receiverAccountNumber: `****${randomBetween(1000, 9999)}`,
      routingNumber: Math.random() > 0.5 ? `0${randomBetween(10000000, 99999999)}` : null,
      amount: parseFloat(amount),
      description: randomItem(DESCRIPTIONS) as string,
      status: "completed",
      createdAt,
    });
  }
  return transactions;
}

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

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.status === "approved") {
      return NextResponse.json({ error: "User is already approved" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { status: "approved" },
    });

    // Only add random transactions if user has none
    const txCount = await prisma.transfer.count({ where: { userId } });
    if (txCount === 0) {
      const randomTransactions = generateRandomTransactions(userId, randomBetween(8, 20));
      await prisma.transfer.createMany({ data: randomTransactions });
    }

    return NextResponse.json({ message: "User approved successfully" });
  } catch (error) {
    console.error("Admin approve error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Random data for auto-populating transaction history
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

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomTransactions(userId: number, count: number) {
  const transactions = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const isCredit = Math.random() > 0.4; // 60% credits, 40% debits
    const amount = (randomBetween(50, 15000) + Math.random()).toFixed(2);
    const daysAgo = randomBetween(1, 90);
    const createdAt = new Date(now - daysAgo * 24 * 60 * 60 * 1000);

    transactions.push({
      userId,
      transferType: isCredit ? "deposit" : (Math.random() > 0.5 ? "local" : "international"),
      receiverName: `${randomItem(FIRST_NAMES)} ${randomItem(LAST_NAMES)}`,
      receiverBank: randomItem(BANK_NAMES),
      receiverAccountNumber: `****${randomBetween(1000, 9999)}`,
      routingNumber: Math.random() > 0.5 ? `0${randomBetween(10000000, 99999999)}` : null,
      amount: parseFloat(amount),
      description: randomItem(DESCRIPTIONS),
      status: "completed",
      createdAt,
    });
  }

  return transactions;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, password, pin } = body;

    if (!first_name || !last_name || !email || !password || !pin) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!/^\d{4}$/.test(pin)) {
      return NextResponse.json({ error: "PIN must be exactly 4 digits" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const pinHash = await bcrypt.hash(pin, 12);

    // Generate a random card number and expiry
    const cardNumber = Array.from({ length: 4 }, () =>
      Math.floor(1000 + Math.random() * 9000).toString()
    ).join(" ");
    const expiryMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const expiryYear = String(new Date().getFullYear() + 4).slice(-2);
    const cardExpiry = `${expiryMonth}/${expiryYear}`;

    const user = await prisma.user.create({
      data: {
        firstName: first_name,
        lastName: last_name,
        email,
        passwordHash,
        pin: pinHash,
        status: "pending", // Requires admin approval
        role: "user",
        account: {
          create: {
            totalBalance: 0,
            availableBalance: 0,
            loansDue: 0,
            mortgageDue: 0,
          },
        },
        card: {
          create: {
            cardNumber,
            cardExpiry,
            cardHolderName: `${first_name} ${last_name}`,
          },
        },
      },
    });

    // Auto-populate with random transaction history
    const randomTransactions = generateRandomTransactions(user.id, randomBetween(8, 20));
    await prisma.transfer.createMany({ data: randomTransactions });

    return NextResponse.json({
      message: "Account created successfully",
      email: user.email,
      status: "pending",
      note: "Your account is pending admin approval. You will be able to log in once approved.",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL!;
let prisma: PrismaClient;

if (connectionString.startsWith("postgres://") || connectionString.startsWith("postgresql://")) {
  const adapter = new PrismaNeon({ connectionString });
  prisma = new PrismaClient({ adapter });
} else {
  prisma = new PrismaClient({ accelerateUrl: connectionString });
}

async function main() {
  // Create a demo user
  const passwordHash = await bcrypt.hash("password123", 12);
  const pinHash = await bcrypt.hash("1234", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@midwesternbank.com" },
    update: {},
    create: {
      email: "demo@midwesternbank.com",
      firstName: "John",
      lastName: "Doe",
      passwordHash,
      pin: pinHash,
      account: {
        create: {
          totalBalance: 25000.0,
          availableBalance: 24500.0,
          loansDue: 1200.0,
          mortgageDue: 850.0,
        },
      },
      card: {
        create: {
          cardNumber: "4532 7891 2345 6789",
          cardExpiry: "03/30",
          cardHolderName: "John Doe",
        },
      },
    },
  });

  // Create some sample transfers
  await prisma.transfer.createMany({
    data: [
      {
        userId: user.id,
        transferType: "local",
        receiverName: "Jane Smith",
        receiverBank: "Chase Bank",
        receiverAccountNumber: "****5678",
        routingNumber: "021000021",
        amount: 500.0,
        description: "Monthly rent payment",
        status: "completed",
        createdAt: new Date("2026-03-15T10:30:00Z"),
      },
      {
        userId: user.id,
        transferType: "international",
        receiverName: "Carlos Rivera",
        receiverBank: "BBVA Mexico",
        receiverAccountNumber: "****9012",
        receiverBankAddress: "Mexico City, Mexico",
        iban: "MX12345678901234567890",
        swiftCode: "BBVAMXMM",
        amount: 1200.0,
        description: "Business payment",
        status: "completed",
        createdAt: new Date("2026-03-10T14:15:00Z"),
      },
      {
        userId: user.id,
        transferType: "deposit",
        receiverName: "John Doe",
        receiverBank: "Card Deposit",
        receiverAccountNumber: "6789",
        amount: 3000.0,
        description: "Card deposit from John Doe",
        status: "completed",
        createdAt: new Date("2026-03-01T09:00:00Z"),
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed completed. Demo user: demo@midwesternbank.com / password123 / PIN: 1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminFromRequest(req);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status"); // optional filter

    const where = status ? { status } : {};

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
        banned: true,
        profilePicture: true,
        createdAt: true,
        account: {
          select: {
            availableBalance: true,
            totalBalance: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = users.map((u) => ({
      id: u.id,
      email: u.email,
      first_name: u.firstName,
      last_name: u.lastName,
      role: u.role,
      status: u.status,
      banned: u.banned,
      profile_picture: u.profilePicture,
      created_at: u.createdAt,
      available_balance: u.account ? Number(u.account.availableBalance) : 0,
      total_balance: u.account ? Number(u.account.totalBalance) : 0,
    }));

    return NextResponse.json({ users: formatted });
  } catch (error) {
    console.error("Admin users GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

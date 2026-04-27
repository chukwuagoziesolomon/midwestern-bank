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

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { banned: !user.banned },
    });

    return NextResponse.json({
      message: user.banned ? "User unbanned" : "User banned",
      banned: !user.banned,
    });
  } catch (error) {
    console.error("Admin ban error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

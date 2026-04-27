import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-production";

export function signToken(payload: { userId: number; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: number; email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
  } catch {
    return null;
  }
}

export function getUserFromRequest(req: NextRequest): { userId: number; email: string } | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  return verifyToken(token);
}

export async function getAdminFromRequest(req: NextRequest): Promise<{ userId: number; email: string } | null> {
  const auth = getUserFromRequest(req);
  if (!auth) return null;
  const user = await prisma.user.findUnique({ where: { id: auth.userId }, select: { role: true } });
  if (!user || user.role !== "admin") return null;
  return auth;
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";
import { uploadImage } from "@/lib/cloudinary";
import bcrypt from "bcryptjs";

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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        profilePicture: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      profile_picture: user.profilePicture,
    });
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = getUserFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";

    // Handle profile picture upload
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const userId = Number(formData.get("user_id"));
      const file = formData.get("profile_picture") as File | null;

      if (userId !== auth.userId) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const imageUrl = await uploadImage(buffer);

      await prisma.user.update({
        where: { id: userId },
        data: { profilePicture: imageUrl },
      });

      return NextResponse.json({
        message: "Profile picture updated",
        profile_picture: imageUrl,
      });
    }

    // Handle password change
    const body = await req.json();
    const { user_id, current_password, new_password, confirm_password } = body;

    if (user_id !== auth.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!current_password || !new_password || !confirm_password) {
      return NextResponse.json({ error: "All password fields are required" }, { status: 400 });
    }

    if (new_password !== confirm_password) {
      return NextResponse.json({ error: "New passwords do not match" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(current_password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
    }

    const newHash = await bcrypt.hash(new_password, 12);
    await prisma.user.update({
      where: { id: user_id },
      data: { passwordHash: newHash },
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Settings POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

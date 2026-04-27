"use client";
import Image from "next/image";

function getInitials(firstName?: string, lastName?: string) {
  if (!firstName && !lastName) return "";
  if (firstName && lastName) return `${firstName[0]}${lastName[0]}`.toUpperCase();
  return (firstName || lastName || "").slice(0, 2).toUpperCase();
}

export default function UserAvatar({ profilePicture, firstName, lastName, size = 48 }:{
  profilePicture?: string | null;
  firstName?: string;
  lastName?: string;
  size?: number;
}) {
  if (profilePicture) {
    return (
      <Image
        src={profilePicture}
        alt="Profile"
        width={size}
        height={size}
        className="rounded-full object-cover"
      />
    );
  }
  const initials = getInitials(firstName, lastName);
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg border-2 border-[#0000FF]"
    >
      {initials}
    </div>
  );
}

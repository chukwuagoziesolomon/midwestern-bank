"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ active }: { active?: string }) {
  return (
    <header className="w-full flex justify-center pt-8 pb-2">
      <div className="flex items-center justify-between w-full max-w-5xl px-8 py-4 rounded-2xl bg-[#232323] border border-[#232323] shadow-lg">
        <div className="flex items-center gap-3">
          <span className="inline-block w-10 h-10 rounded-full bg-[#B6FF48] flex items-center justify-center">
            <Image src="/logo.svg" alt="YourBank Logo" width={28} height={28} />
          </span>
          <span className="text-2xl font-bold text-white tracking-tight">YourBank</span>
        </div>
        <nav className="hidden md:flex gap-8 text-white text-base font-medium">
          <Link href="/" className={`hover:text-[#B6FF48] transition ${active === "home" ? "text-[#B6FF48]" : ""}`}>Home</Link>
          <Link href="/careers" className={`hover:text-[#B6FF48] transition ${active === "careers" ? "text-[#B6FF48]" : ""}`}>Careers</Link>
          <Link href="/about" className={`hover:text-[#B6FF48] transition ${active === "about" ? "text-[#B6FF48]" : ""}`}>About</Link>
          <Link href="/security" className={`hover:text-[#B6FF48] transition ${active === "security" ? "text-[#B6FF48]" : ""}`}>Security</Link>
        </nav>
        <div className="flex gap-3">
          <Link href="/signup" className="hidden md:inline-block px-6 py-2 rounded-full bg-[#232323] text-white font-semibold hover:bg-[#B6FF48] hover:text-black transition">Sign Up</Link>
          <Link href="/login" className="px-6 py-2 rounded-full bg-[#B6FF48] text-black font-semibold hover:bg-[#d6ff8a] transition">Login</Link>
        </div>
      </div>
    </header>
  );
}

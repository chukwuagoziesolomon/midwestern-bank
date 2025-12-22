"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar({ active }: { active?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/careers", label: "Careers" },
    { href: "/about", label: "About" },
    { href: "/security", label: "Security" },
  ];

  return (
    <header className="w-full flex justify-center pt-8 pb-2">
      <div className="flex items-center justify-between w-full max-w-5xl px-8 py-4 rounded-2xl bg-white border border-[#0000FF] shadow-lg">
        <div className="flex items-center gap-3">
          <span className="inline-block w-10 h-10 rounded-full bg-[#0000FF] flex items-center justify-center">
            <Image src="/logo.svg" alt="YourBank Logo" width={28} height={28} />
          </span>
          <span className="text-2xl font-bold text-[#0000FF] tracking-tight">YourBank</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-black text-base font-medium">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className={`hover:text-[#0000FF] transition ${active === item.href.slice(1) || (active === "home" && item.href === "/") ? "text-[#0000FF]" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <Link href="/signup" className="px-6 py-2 rounded-full bg-white text-[#0000FF] border border-[#0000FF] font-semibold hover:bg-[#0000FF] hover:text-white transition">Sign Up</Link>
          <Link href="/login" className="px-6 py-2 rounded-full bg-[#0000FF] text-white font-semibold hover:bg-[#5a8cff] transition">Login</Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#0000FF] hover:bg-blue-50 rounded-lg transition"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-24 left-0 right-0 md:hidden bg-white border border-[#0000FF] rounded-2xl shadow-lg mx-4 z-50">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-lg transition ${active === item.href.slice(1) || (active === "home" && item.href === "/") ? "bg-blue-100 text-[#0000FF] font-semibold" : "hover:bg-blue-50"}`}
              >
                {item.label}
              </Link>
            ))}
            <hr className="my-2" />
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 text-[#0000FF] border border-[#0000FF] rounded-lg text-center font-semibold hover:bg-[#0000FF] hover:text-white transition">Sign Up</Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 bg-[#0000FF] text-white rounded-lg text-center font-semibold hover:bg-[#5a8cff] transition">Login</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

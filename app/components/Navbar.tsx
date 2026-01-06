"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "@/lib/TranslationContext";
import CustomLanguageSelector from "./CustomLanguageSelector";

export default function Navbar({ active }: { active?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language } = useTranslation();

  const navItems = [
    { href: "/", label: "Home", id: 'home' },
    { href: "/careers", label: "Careers", id: 'careers' },
    { href: "/about", label: "About", id: 'about' },
    { href: "/security", label: "Security", id: 'security' },
  ];

  return (
    <>
      <header className="w-full flex justify-center pt-8 pb-2">
        <div className="flex items-center justify-between w-full max-w-6xl px-8 py-5 rounded-3xl bg-gradient-to-r from-white via-white to-gray-50 border border-gray-200 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Mid Western Bank Logo" width={64} height={64} />
            <span className="hidden md:block text-2xl font-bold text-[#0000FF] tracking-tight">Mid western bank</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-black text-base font-medium">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`hover:text-[#0000FF] transition-colors duration-200 ${
                  active === item.id ? "text-[#0000FF]" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons + Language */}
          <div className="hidden md:flex gap-3 items-center">
            <CustomLanguageSelector isMobile={false} />
            <Link 
              href="/signup" 
              className="px-6 py-2 rounded-full bg-white text-[#0000FF] border border-[#0000FF] font-semibold hover:bg-[#0000FF] hover:text-white transition-all duration-200"
            >
              Sign Up
            </Link>
            <Link 
              href="/login" 
              className="px-6 py-2 rounded-full bg-[#0000FF] text-white font-semibold hover:bg-[#5a8cff] transition-all duration-200"
            >
              Login
            </Link>
          </div>

          {/* Mobile: Translate + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <CustomLanguageSelector isMobile={true} />
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0000FF] hover:bg-blue-50 rounded-lg transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu */}
            <div className="absolute top-24 left-0 right-0 md:hidden bg-white border border-[#0000FF] rounded-2xl shadow-2xl mx-4 z-50">
              <nav className="flex flex-col p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg transition-colors duration-200 font-bold text-black ${
                      active === item.id 
                        ? "bg-blue-100 text-[#0000FF]" 
                        : "hover:bg-blue-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <hr className="my-2 border-gray-200" />
                
                <Link 
                  href="/signup" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="px-4 py-2 text-[#0000FF] border border-[#0000FF] rounded-lg text-center font-semibold hover:bg-[#0000FF] hover:text-white transition-all duration-200"
                >
                  Sign Up
                </Link>
                <Link 
                  href="/login" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="px-4 py-2 bg-[#0000FF] text-white rounded-lg text-center font-semibold hover:bg-[#5a8cff] transition-all duration-200"
                >
                  Login
                </Link>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  );
}
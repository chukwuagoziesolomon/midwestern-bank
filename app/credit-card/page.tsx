
"use client";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Link from "next/link";
import { CreditCard, Banknote } from "lucide-react";

export default function CreditCardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] via-[#232323] to-[#101010] font-sans text-white flex flex-col md:flex-row">
      {/* Sidebar for desktop, overlay for mobile */}
      <div className={`fixed inset-0 z-40 md:hidden transition ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
        <div className="relative z-50 w-64 h-full">
          <Sidebar active="credit-card" onClose={() => setSidebarOpen(false)} />
        </div>
      </div>
      <div className="hidden md:block">
        <Sidebar active="credit-card" />
      </div>
      <main className="flex-1 p-4 md:p-10 flex flex-col items-center justify-center">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-[#232323] border border-[#B6FF48] rounded-full p-2 shadow-lg focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#B6FF48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="w-full max-w-2xl bg-[#232323]/80 rounded-2xl p-8 shadow-2xl border border-[#232323]">
          <h2 className="text-2xl font-bold mb-8 text-[#B6FF48]">Credit Card Deposit</h2>
          <form className="flex flex-col gap-4">
            <label className="text-[#ededed]">CARD NUMBER
              <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="•••• •••• •••• ••••" />
            </label>
            <div className="flex gap-4">
              <label className="flex-1 text-[#ededed]">CARD EXPIRY
                <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="•• / ••" />
              </label>
              <label className="flex-1 text-[#ededed]">CARD CVC
                <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="••••" />
              </label>
            </div>
            <label className="text-[#ededed]">DEPOSIT AMOUNT
              <input type="number" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Amount in USD" />
            </label>
            <label className="text-[#ededed]">CARD HOLDER NAME
              <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Card Holder Name" />
            </label>
            <button type="submit" className="w-full px-6 py-3 rounded-lg bg-green-500 text-white font-bold text-lg shadow-lg hover:bg-green-400 transition mt-4">MAKE PAYMENT</button>
          </form>
        </div>
      </main>
    </div>
  );
}

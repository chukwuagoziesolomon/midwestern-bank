
"use client";
import Sidebar from "../components/Sidebar";
import Link from "next/link";
import { CreditCard, Banknote } from "lucide-react";

export default function CreditCardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] via-[#232323] to-[#101010] font-sans text-white flex">
      {/* Sidebar */}
      <Sidebar active="credit-card" />
      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col items-center justify-center">
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

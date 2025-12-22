"use client";
import Link from "next/link";
import { Wallet, Send, TrendingUp, CreditCard, Banknote, User, ArrowRight } from "lucide-react";

export default function Sidebar({ active, onClose }: { active?: string; onClose?: () => void }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col py-8 px-6 min-h-screen relative">
      {/* Close button for mobile sidebar */}
      {onClose && (
        <button
          className="absolute top-4 right-4 md:hidden bg-white border border-blue-600 rounded-full p-2 z-50"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      <div className="flex items-center gap-3 mb-10">
        <span className="inline-block w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
          <Wallet size={28} color="#fff" />
        </span>
        <span className="text-xl font-bold tracking-tight text-black">YourBank</span>
      </div>
      <nav className="flex-1">
        <div className="mb-6">
          <div className="text-xs font-semibold text-blue-600 mb-2">LAYOUTS</div>
          <ul className="space-y-2">
            <li><Link href="/dashboard" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-black hover:bg-blue-50 ${active === "dashboard" ? "bg-blue-50" : ""}`}><Wallet size={18} color="#0000FF" /> Dashboard</Link></li>
            <li><Link href="/transfer" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-black hover:bg-blue-50 ${active === "transfer" ? "bg-blue-50" : ""}`}><Send size={18} color="#0000FF" /> Transfer Funds</Link></li>
          </ul>
        </div>
        <div className="mb-6">
          <div className="text-xs font-semibold text-blue-600 mb-2">OPTIONS</div>
          <ul className="space-y-2">
            <li><Link href="/transactions" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-black hover:bg-blue-50 ${active === "transactions" ? "bg-blue-50" : ""}`}><TrendingUp size={18} color="#0000FF" /> Transaction History</Link></li>
            <li><Link href="/credit-card" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-black hover:bg-blue-50 ${active === "credit-card" ? "bg-blue-50" : ""}`}><CreditCard size={18} color="#0000FF" /> Credit Card Deposit</Link></li>
            <li><Link href="/settings" className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-black hover:bg-blue-50 ${active === "settings" ? "bg-blue-50" : ""}`}><User size={18} color="#0000FF" /> Settings</Link></li>
            <li><Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-black hover:bg-blue-50"><ArrowRight size={18} color="#0000FF" /> Logout</Link></li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}

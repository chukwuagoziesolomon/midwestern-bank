"use client";
import Link from "next/link";
import { List, TrendingUp } from "lucide-react";

const mockTransactions = [
  { id: 1, type: "Deposit", amount: 1000, date: "2025-12-01", status: "Completed" },
  { id: 2, type: "Transfer", amount: -68, date: "2025-12-02", status: "Completed" },
  { id: 3, type: "Received", amount: 500, date: "2025-12-03", status: "Completed" },
  { id: 4, type: "Withdrawal", amount: -200, date: "2025-12-04", status: "Pending" },
];

export default function Transactions() {
  return (
    <div className="min-h-screen bg-[#181818] font-sans text-white">
      <header className="w-full flex justify-center pt-8 pb-2">
        <div className="flex items-center justify-between w-full max-w-5xl px-8 py-4 rounded-2xl bg-[#232323] border border-[#232323] shadow-lg">
          <div className="flex items-center gap-3">
            <span className="inline-block w-10 h-10 rounded-full bg-[#B6FF48] flex items-center justify-center">
              <TrendingUp size={28} color="#232323" />
            </span>
            <span className="text-2xl font-bold text-white tracking-tight">Transaction History</span>
          </div>
          <nav className="hidden md:flex gap-8 text-white text-base font-medium">
            <Link href="/dashboard" className="hover:text-[#B6FF48] transition">Dashboard</Link>
            <Link href="/transfer" className="hover:text-[#B6FF48] transition">Transfer</Link>
            <Link href="/transactions" className="hover:text-[#B6FF48] transition">Transactions</Link>
            <Link href="/credit-card" className="hover:text-[#B6FF48] transition">Credit Card</Link>
          </nav>
          <div className="flex gap-3">
            <Link href="/" className="px-6 py-2 rounded-full bg-[#B6FF48] text-black font-semibold hover:bg-[#d6ff8a] transition">Logout</Link>
          </div>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-8 py-12">
        <div className="bg-[#232323] rounded-2xl p-8 shadow-lg flex flex-col gap-6">
          <h2 className="text-2xl font-bold mb-4 text-[#B6FF48] flex items-center gap-2"><List size={24} /> Transaction History</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#B6FF48]">
                <th className="py-2">Date</th>
                <th className="py-2">Type</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map(tx => (
                <tr key={tx.id} className="border-b border-[#232323]">
                  <td className="py-2 text-[#ededed]">{tx.date}</td>
                  <td className="py-2 text-[#ededed]">{tx.type}</td>
                  <td className={`py-2 font-bold ${tx.amount < 0 ? "text-red-400" : "text-green-400"}`}>{tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}</td>
                  <td className="py-2 text-[#ededed]">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

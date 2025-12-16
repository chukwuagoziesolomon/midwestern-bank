
"use client";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CreditCard, Send, TrendingUp, Wallet, Banknote, User } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] via-[#232323] to-[#101010] font-sans text-white flex flex-col md:flex-row">
      {/* Sidebar for desktop, overlay for mobile */}
      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
        <div className="relative z-50 w-64 h-full">
          <Sidebar active="dashboard" onClose={() => setSidebarOpen(false)} />
        </div>
      </div>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar active="dashboard" />
      </div>
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-10 relative w-full">
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
        {/* Decorative Glow */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[#B6FF48] opacity-20 rounded-full blur-3xl z-0" />

        {/* Profile avatar (top-right) */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#B6FF48] bg-[#181818]">
            <Image src="/mission.jpg" alt="Profile" width={48} height={48} />
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-sm font-semibold text-white">Mabel Neumann</div>
            <div className="text-xs text-[#cfcfcf]">mabel@example.com</div>
          </div>
        </div>
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 z-10 relative">
          <div className="bg-[#232323]/80 rounded-xl shadow-2xl p-6 flex flex-col items-start border border-[#232323]">
            <div className="text-xs font-semibold text-[#ededed] mb-1">TOTAL BALANCE</div>
            <div className="flex items-center gap-2">
              <Wallet size={20} color="#B6FF48" />
              <span className="text-2xl font-bold text-[#B6FF48]">$ 82,538.00</span>
            </div>
          </div>
          <div className="bg-[#232323]/80 rounded-xl shadow-2xl p-6 flex flex-col items-start border border-[#232323]">
            <div className="text-xs font-semibold text-[#ededed] mb-1">AVAILABLE BALANCE</div>
            <div className="flex items-center gap-2">
              <Wallet size={20} color="#B6FF48" />
              <span className="text-2xl font-bold text-[#B6FF48]">$ 82,538.00</span>
            </div>
          </div>
          <div className="bg-[#232323]/80 rounded-xl shadow-2xl p-6 flex flex-col items-start border border-[#232323]">
            <div className="text-xs font-semibold text-[#ededed] mb-1">LOANS DUE</div>
            <div className="flex items-center gap-2">
              <Banknote size={20} color="#B6FF48" />
              <span className="text-2xl font-bold text-[#B6FF48]">$ 0.00</span>
            </div>
          </div>
          <div className="bg-[#232323]/80 rounded-xl shadow-2xl p-6 flex flex-col items-start border border-[#232323]">
            <div className="text-xs font-semibold text-[#ededed] mb-1">MORTGAGES DUE</div>
            <div className="flex items-center gap-2">
              <Banknote size={20} color="#B6FF48" />
              <span className="text-2xl font-bold text-[#B6FF48]">$ 0.00</span>
            </div>
          </div>
        </div>
        {/* Credit Card Display */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-8 z-10 relative">
          {/* Card section stacks on mobile, side-by-side on desktop */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl p-6 md:p-8 flex flex-col justify-between w-full max-w-md shadow-2xl border border-[#232323] mx-auto md:mx-0">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-8 bg-yellow-400 rounded-lg" />
              <div className="text-white text-lg font-bold tracking-widest">HERITAGE REMIT BANK</div>
            </div>
            <div className="text-white text-2xl font-mono tracking-widest mb-2">4351 8237 2189 0104</div>
            <div className="flex items-center justify-between">
              <div className="text-white font-semibold">MABEL NEUMANN</div>
              <div className="text-white text-xs">02/25</div>
              <div className="text-white font-bold text-lg">VISA</div>
            </div>
          </div>
        </div>
        {/* Recent Transactions Table - Updated for pixel-perfect match */}
        <div className="z-10 relative">
          <div className="text-lg font-bold mb-4 text-[#B6FF48]">Recent Transactions</div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#232323]/80 rounded-xl shadow-2xl border border-[#232323] text-white text-xs md:text-sm">
              <thead>
                <tr className="border-b border-[#2a2a2a] bg-transparent">
                  <th className="px-2 md:px-4 py-2 text-left font-semibold text-[#B6FF48]">#</th>
                  <th className="px-2 md:px-4 py-2 text-left font-semibold text-[#B6FF48]">STATUS</th>
                  <th className="px-2 md:px-4 py-2 text-left font-semibold text-[#B6FF48]">DATE</th>
                  <th className="px-2 md:px-4 py-2 text-left font-semibold text-[#B6FF48]">DESCRIPTION</th>
                  <th className="px-2 md:px-4 py-2 text-left font-semibold text-[#B6FF48]">CATEGORY</th>
                  <th className="px-2 md:px-4 py-2 text-left font-semibold text-[#B6FF48]">AMOUNT</th>
                  <th className="px-2 md:px-4 py-2 text-left font-semibold text-[#B6FF48]">RECEIVER NAME</th>
                  <th className="px-2 md:px-4 py-2 text-left font-semibold text-[#B6FF48]">RECEIVER BANK</th>
                  <th className="px-2 md:px-4 py-2 text-left font-semibold text-[#B6FF48]"> </th>
                </tr>
              </thead>
              <tbody>
                {/* Example rows, replace with dynamic data as needed */}
                {[
                  {
                    status: "Successful",
                    date: "Tuesday Aug 26th 2025",
                    time: "12:10:00 PM",
                    description: "Payment for materials - in5UZn2493",
                    category: "credit",
                    amount: "$ 120,000",
                    receiver: "Michael Philip",
                    bank: "U.S Bank",
                  },
                  {
                    status: "Successful",
                    date: "Thursday Aug 28th 2025",
                    time: "02:18:00 PM",
                    description: "Purchased materials - smTRRvqJQV",
                    category: "debit",
                    amount: "$ 100,000",
                    receiver: "Aleksander Andriy",
                    bank: "Santander Group",
                  },
                  {
                    status: "Successful",
                    date: "Friday Aug 29th 2025",
                    time: "09:14:00 AM",
                    description: "Payment of workers - DMF0RVFOpL",
                    category: "credit",
                    amount: "$ 20,000",
                    receiver: "Griggs Robinson",
                    bank: "Wells Fargo",
                  },
                  {
                    status: "Successful",
                    date: "Monday Sep 1st 2025",
                    time: "09:16:00 AM",
                    description: "Payment for work done - carKfoYsR2",
                    category: "debit",
                    amount: "$ 20,000",
                    receiver: "Keith Peters",
                    bank: "Santander Group",
                  },
                  {
                    status: "Successful",
                    date: "Tuesday Sep 2nd 2025",
                    time: "09:21:00 AM",
                    description: "ATM withdrawal - EnTvPFWzeY",
                    category: "debit",
                    amount: "$ 1,550",
                    receiver: "Peter Adams",
                    bank: "Crédit Agricole",
                  },
                  {
                    status: "Successful",
                    date: "Thursday Sep 4th 2025",
                    time: "04:23:00 PM",
                    description: "ATM withdrawal - luN0rS8ZFs",
                    category: "debit",
                    amount: "$ 4,000",
                    receiver: "James Alderman",
                    bank: "Crédit Agricole",
                  },
                  {
                    status: "Successful",
                    date: "Saturday Sep 6th 2025",
                    time: "12:08:00 PM",
                    description: "Bills - kkqys95gH2",
                    category: "debit",
                    amount: "$ 2,550",
                    receiver: "Thomas Carter",
                    bank: "Crédit Agricole",
                  },
                  {
                    status: "Successful",
                    date: "Sunday Sep 7th 2025",
                    time: "03:03:00 PM",
                    description: "ATM withdrawal - AQiptGRDLp",
                    category: "debit",
                    amount: "$ 3,500",
                    receiver: "Charles Williams",
                    bank: "BNP Paribas",
                  },
                  {
                    status: "Successful",
                    date: "Saturday Nov 22nd 2025",
                    time: "09:33:51 AM",
                    description: "Shops,Handbag ans Clothes - bxA1VJpg5F",
                    category: "debit",
                    amount: "$ 4,730",
                    receiver: "Maria Resiana Simamora",
                    bank: "Vakif Bank",
                  },
                ].map((tx, i) => (
                  <tr key={i} className="border-b border-[#e5e5e5] hover:bg-[#f6f6f6]">
                    <td className="px-2 md:px-4 py-2 font-bold text-[#232323]">{i + 1}</td>
                    <td className="px-2 md:px-4 py-2">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                        <span className="font-semibold text-green-600">{tx.status}</span>
                      </span>
                    </td>
                    <td className="px-2 md:px-4 py-2">
                      <div>{tx.date}</div>
                      <div className="text-xs text-[#888]">{tx.time}</div>
                    </td>
                    <td className="px-2 md:px-4 py-2">{tx.description}</td>
                    <td className="px-2 md:px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${tx.category === "credit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{tx.category}</span>
                    </td>
                    <td className={`px-2 md:px-4 py-2 font-bold ${tx.category === "credit" ? "text-green-600" : "text-red-600"}`}>{tx.amount}</td>
                    <td className="px-2 md:px-4 py-2">{tx.receiver}</td>
                    <td className="px-2 md:px-4 py-2">{tx.bank}</td>
                    <td className="px-2 md:px-4 py-2"><button className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

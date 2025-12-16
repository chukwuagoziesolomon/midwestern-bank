
"use client";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { TrendingUp, User, Banknote } from "lucide-react";
import Link from "next/link";

const transactions = [
  {
    status: "Successful",
    date: "Saturday Nov 22nd 2025",
    time: "09:33:51 AM",
    description: "Shops,Handbag ans Clothes - bxA1VJpg5F",
    category: "debit",
    amount: "$ 4,730.00",
  },
  {
    status: "Successful",
    date: "Sunday Sep 7th 2025",
    time: "03:03:00 PM",
    description: "ATM withdrawal - AQiptGRDLp",
    category: "debit",
    amount: "$ 3,500.00",
  },
  {
    status: "Successful",
    date: "Saturday Sep 6th 2025",
    time: "12:08:00 PM",
    description: "Bills - kkqys95gH2",
    category: "debit",
    amount: "$ 2,550.00",
  },
];

export default function Transactions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] via-[#232323] to-[#101010] font-sans text-white flex flex-col md:flex-row">
      {/* Sidebar for desktop, overlay for mobile */}
      <div className={`fixed inset-0 z-40 md:hidden transition ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
        <div className="relative z-50 w-64 h-full">
          <Sidebar active="transactions" onClose={() => setSidebarOpen(false)} />
        </div>
      </div>
      <div className="hidden md:block">
        <Sidebar active="transactions" />
      </div>
      <main className="flex-1 p-4 md:p-10">
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
        <div className="bg-[#232323]/80 rounded-2xl p-4 md:p-10 shadow-2xl border border-[#232323] flex flex-col gap-8 relative overflow-hidden">
          <div className="text-lg font-bold mb-4 text-[#B6FF48] relative z-10 flex items-center gap-2"><TrendingUp size={24} /> Transaction History</div>
          <div className="flex flex-col gap-6 relative z-10">
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
      </main>
    </div>
  );
}

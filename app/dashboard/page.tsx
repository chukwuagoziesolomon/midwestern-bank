
"use client";
import Sidebar from "../components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CreditCard, Send, TrendingUp, Wallet, Banknote, User } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] via-[#232323] to-[#101010] font-sans text-white flex">
      {/* Sidebar */}
      <Sidebar active="dashboard" />
      {/* Main Content */}
      <div className="flex-1 p-10 relative">
        {/* Decorative Glow */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[#B6FF48] opacity-20 rounded-full blur-3xl z-0" />
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 z-10 relative">
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
        <div className="flex flex-col md:flex-row gap-8 mb-8 z-10 relative">
          <div className="bg-gradient-to-br from-blue-900 to-blue-600 rounded-2xl p-8 flex flex-col justify-between w-full max-w-md shadow-2xl border border-[#232323]">
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
        {/* Recent Transactions Table */}
        <div className="z-10 relative">
          <div className="text-lg font-bold mb-4 text-[#B6FF48]">Recent Transactions</div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#232323]/80 rounded-xl shadow-2xl border border-[#232323] text-white">
              <thead>
                <tr className="border-b border-[#232323]">
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#B6FF48]">STATUS</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#B6FF48]">DATE</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#B6FF48]">DESCRIPTION</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#B6FF48]">CATEGORY</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#B6FF48]">AMOUNT</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-[#B6FF48]"> </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#232323]">
                  <td className="px-4 py-2 text-green-400 font-semibold">Successful</td>
                  <td className="px-4 py-2">Saturday Nov 22nd 2025 <span className="text-xs text-[#ededed]">09:33:51 AM</span></td>
                  <td className="px-4 py-2">Shops,Handbag ans Clothes - bxA1VJpg5F</td>
                  <td className="px-4 py-2"><span className="bg-red-400/20 text-red-400 px-2 py-1 rounded-full text-xs font-bold">debit</span></td>
                  <td className="px-4 py-2 text-red-400 font-bold">$ 4,730.00</td>
                  <td className="px-4 py-2"><button className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">View</button></td>
                </tr>
                <tr className="border-b border-[#232323]">
                  <td className="px-4 py-2 text-green-400 font-semibold">Successful</td>
                  <td className="px-4 py-2">Sunday Sep 7th 2025 <span className="text-xs text-[#ededed]">03:03:00 PM</span></td>
                  <td className="px-4 py-2">ATM withdrawal - AQiptGRDLp</td>
                  <td className="px-4 py-2"><span className="bg-red-400/20 text-red-400 px-2 py-1 rounded-full text-xs font-bold">debit</span></td>
                  <td className="px-4 py-2 text-red-400 font-bold">$ 3,500.00</td>
                  <td className="px-4 py-2"><button className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">View</button></td>
                </tr>
                <tr>
                  <td className="px-4 py-2 text-green-400 font-semibold">Successful</td>
                  <td className="px-4 py-2">Saturday Sep 6th 2025 <span className="text-xs text-[#ededed]">12:08:00 PM</span></td>
                  <td className="px-4 py-2">Bills - kkqys95gH2</td>
                  <td className="px-4 py-2"><span className="bg-red-400/20 text-red-400 px-2 py-1 rounded-full text-xs font-bold">debit</span></td>
                  <td className="px-4 py-2 text-red-400 font-bold">$ 2,550.00</td>
                  <td className="px-4 py-2"><button className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">View</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

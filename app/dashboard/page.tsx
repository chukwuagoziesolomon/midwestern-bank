
"use client";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CreditCard, Send, TrendingUp, Wallet, Banknote, User, Eye, EyeOff, X, CheckCircle, Calendar, DollarSign, Building2 } from "lucide-react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedTx, setSelectedTx] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white font-sans text-black flex flex-col md:flex-row">
      {/* Sidebar for desktop, overlay for mobile */}
      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black/10" onClick={() => setSidebarOpen(false)} />
        <div className="relative z-50 w-64 h-full">
          <Sidebar active="dashboard" onClose={() => setSidebarOpen(false)} />
        </div>
      </div>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar active="dashboard" />
      </div>
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-10 relative w-full overflow-hidden">
        {/* Decorative Glow Animation */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-[#0000FF]/10 to-[#0000FF]/5 rounded-full blur-3xl z-0 animate-pulse" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-3xl z-0 opacity-30" />

        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-white border border-[#0000FF] rounded-full p-2 shadow-lg focus:outline-none hover:bg-blue-50 transition"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0000FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Profile avatar (top-right) */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-lg border border-blue-100">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#0000FF] bg-white">
            <Image src="/mission.jpg" alt="Profile" width={48} height={48} />
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-sm font-bold text-black">Mabel Neumann</div>
            <div className="text-xs text-[#888]">mabel@example.com</div>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-10 z-10 relative mt-8 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
            Welcome back, <span className="text-[#0000FF]">Mabel</span>
          </h1>
          <p className="text-gray-600">Here's your financial overview at a glance</p>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 z-10 relative">
          {[
            { label: "TOTAL BALANCE", value: showBalance ? "$ 82,538.00" : "••••••", icon: Wallet, color: "from-blue-400 to-blue-600" },
            { label: "AVAILABLE BALANCE", value: showBalance ? "$ 82,538.00" : "••••••", icon: Wallet, color: "from-blue-500 to-cyan-600" },
            { label: "LOANS DUE", value: "$ 0.00", icon: Banknote, color: "from-orange-400 via-red-500 to-pink-600" },
            { label: "MORTGAGES DUE", value: "$ 0.00", icon: Banknote, color: "from-indigo-500 via-purple-500 to-pink-500" },
          ].map((card, idx) => (
            <div key={idx} className="scroll-animate stagger-item-1 group">
              <div className={`bg-gradient-to-br ${card.color} rounded-2xl shadow-2xl p-6 flex flex-col items-start border border-white/30 hover:shadow-2xl transition-all duration-300 h-full backdrop-blur-sm hover:scale-105`}>
                <div className="text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider">{card.label}</div>
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <card.icon size={20} color="white" />
                  </div>
                  <span className="text-2xl font-bold text-white">{card.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Card and Quick Actions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 z-10 relative">
          {/* Credit Card Display */}
          <div className="lg:col-span-2">
            <div className="scroll-animate">
              <div className="relative h-72 bg-gradient-to-br from-blue-400 via-[#0000FF] to-blue-800 rounded-3xl p-8 shadow-2xl border border-white/20 overflow-hidden group cursor-pointer transform hover:scale-105 transition-all duration-300">
                {/* Animated background elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl -ml-20 -mb-20" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-8 bg-white rounded-lg" />
                    </div>
                    <div className="text-white text-xs font-bold tracking-wider uppercase">HERITAGE REMIT BANK</div>
                  </div>
                  
                  <div className="text-white text-3xl font-mono tracking-widest mb-12 font-bold">4351 8237 2189 0104</div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white/70 text-xs uppercase mb-1">Card Holder</div>
                      <div className="text-white font-bold text-lg">MABEL NEUMANN</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/70 text-xs uppercase mb-1">Expires</div>
                      <div className="text-white font-bold text-lg">02/25</div>
                    </div>
                    <div className="text-white font-bold text-2xl">VISA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="scroll-animate">
            <div className="bg-white rounded-2xl shadow-xl border border-blue-100 p-6 h-72 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-black mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-[#0000FF] to-blue-600 text-white p-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    Send Money
                  </button>
                  <button className="w-full bg-gradient-to-r from-blue-100 to-blue-50 text-[#0000FF] p-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-blue-200 flex items-center justify-center gap-2 group">
                    <CreditCard size={18} className="group-hover:scale-110 transition-transform" />
                    Pay Bills
                  </button>
                  <button className="w-full bg-gradient-to-r from-blue-100 to-blue-50 text-[#0000FF] p-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-blue-200 flex items-center justify-center gap-2 group">
                    <TrendingUp size={18} className="group-hover:rotate-12 transition-transform" />
                    View Reports
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="w-full text-[#0000FF] p-2 rounded-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2 text-sm font-semibold"
              >
                {showBalance ? <Eye size={16} /> : <EyeOff size={16} />}
                {showBalance ? "Hide" : "Show"} Balance
              </button>
            </div>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="z-10 relative scroll-animate">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-black">Recent Transactions</h2>
              <p className="text-gray-600 text-sm">Your last 9 transactions</p>
            </div>
            <Link href="/transactions" className="text-[#0000FF] font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-black text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-blue-100 bg-gradient-to-r from-blue-50 to-transparent">
                    <th className="px-4 py-4 text-left font-bold text-[#0000FF] uppercase text-xs">#</th>
                    <th className="px-4 py-4 text-left font-bold text-[#0000FF] uppercase text-xs">Status</th>
                    <th className="px-4 py-4 text-left font-bold text-[#0000FF] uppercase text-xs">Date</th>
                    <th className="px-4 py-4 text-left font-bold text-[#0000FF] uppercase text-xs">Description</th>
                    <th className="px-4 py-4 text-left font-bold text-[#0000FF] uppercase text-xs">Category</th>
                    <th className="px-4 py-4 text-left font-bold text-[#0000FF] uppercase text-xs">Amount</th>
                    <th className="px-4 py-4 text-left font-bold text-[#0000FF] uppercase text-xs">Receiver</th>
                    <th className="px-4 py-4 text-left font-bold text-[#0000FF] uppercase text-xs">Bank</th>
                    <th className="px-4 py-4 text-left font-bold text-[#0000FF] uppercase text-xs">Action</th>
                  </tr>
                </thead>
                  <tbody>
                  {[
                    { status: "Successful", date: "Tuesday Aug 26th 2025", time: "12:10:00 PM", description: "Payment for materials - in5UZn2493", category: "credit", amount: "$ 120,000", receiver: "Michael Philip", bank: "U.S Bank" },
                    { status: "Successful", date: "Thursday Aug 28th 2025", time: "02:18:00 PM", description: "Purchased materials - smTRRvqJQV", category: "debit", amount: "$ 100,000", receiver: "Aleksander Andriy", bank: "Santander Group" },
                    { status: "Successful", date: "Friday Aug 29th 2025", time: "09:14:00 AM", description: "Payment of workers - DMF0RVFOpL", category: "credit", amount: "$ 20,000", receiver: "Griggs Robinson", bank: "Wells Fargo" },
                    { status: "Successful", date: "Monday Sep 1st 2025", time: "09:16:00 AM", description: "Payment for work done - carKfoYsR2", category: "debit", amount: "$ 20,000", receiver: "Keith Peters", bank: "Santander Group" },
                    { status: "Successful", date: "Tuesday Sep 2nd 2025", time: "09:21:00 AM", description: "ATM withdrawal - EnTvPFWzeY", category: "debit", amount: "$ 1,550", receiver: "Peter Adams", bank: "Crédit Agricole" },
                    { status: "Successful", date: "Thursday Sep 4th 2025", time: "04:23:00 PM", description: "ATM withdrawal - luN0rS8ZFs", category: "debit", amount: "$ 4,000", receiver: "James Alderman", bank: "Crédit Agricole" },
                    { status: "Successful", date: "Saturday Sep 6th 2025", time: "12:08:00 PM", description: "Bills - kkqys95gH2", category: "debit", amount: "$ 2,550", receiver: "Thomas Carter", bank: "Crédit Agricole" },
                    { status: "Successful", date: "Sunday Sep 7th 2025", time: "03:03:00 PM", description: "ATM withdrawal - AQiptGRDLp", category: "debit", amount: "$ 3,500", receiver: "Charles Williams", bank: "BNP Paribas" },
                    { status: "Successful", date: "Saturday Nov 22nd 2025", time: "09:33:51 AM", description: "Shops,Handbag ans Clothes - bxA1VJpg5F", category: "debit", amount: "$ 4,730", receiver: "Maria Resiana Simamora", bank: "Vakif Bank" },
                  ].map((tx, i) => (
                    <tr key={i} className="border-b border-blue-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-colors duration-200 group">
                      <td className="px-4 py-4 font-bold text-black">{i + 1}</td>
                      <td className="px-4 py-4">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                          <span className="font-semibold text-green-600">{tx.status}</span>
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium">{tx.date}</div>
                        <div className="text-xs text-gray-500">{tx.time}</div>
                      </td>
                      <td className="px-4 py-4 text-gray-700">{tx.description}</td>
                      <td className="px-4 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${tx.category === "credit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {tx.category.toUpperCase()}
                        </span>
                      </td>
                      <td className={`px-4 py-4 font-bold text-lg ${tx.category === "credit" ? "text-green-600" : "text-red-600"}`}>
                        {tx.category === "credit" ? "+" : "-"}{tx.amount}
                      </td>
                      <td className="px-4 py-4 font-medium text-black">{tx.receiver}</td>
                      <td className="px-4 py-4 text-gray-700">{tx.bank}</td>
                      <td className="px-4 py-4">
                        <button 
                          onClick={() => {
                            setSelectedTx(tx);
                            setIsModalOpen(true);
                          }}
                          className="bg-gradient-to-r from-[#0000FF] to-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 opacity-0 group-hover:opacity-100">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Transaction Modal */}
        {isModalOpen && selectedTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
              onClick={() => setIsModalOpen(false)}
            />
            {/* Modal - full screen on mobile */}
            <div className="relative bg-white rounded-t-3xl md:rounded-3xl shadow-2xl p-4 md:p-8 w-full max-w-lg mx-auto h-full md:h-auto overflow-y-auto transform transition-all duration-300 scale-100 opacity-100 flex flex-col justify-between">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 hover:bg-gray-100 rounded-full transition-all"
              >
                <X size={24} className="text-gray-600" />
              </button>

              {/* Header */}
              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-2">
                  <h2 className="text-xl md:text-2xl font-bold text-black">Transaction Details</h2>
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full w-fit mx-auto md:mx-0">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-600">Successful</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm md:text-base">Complete information about this transaction</p>
              </div>

              {/* Amount Display */}
              <div className={`mb-8 p-6 rounded-2xl text-center ${selectedTx.category === "credit" ? "bg-green-50" : "bg-red-50"}`}>
                <div className="text-gray-600 text-xs md:text-sm uppercase mb-2">Amount</div>
                <div className={`text-3xl md:text-4xl font-bold ${selectedTx.category === "credit" ? "text-green-600" : "text-red-600"}`}>
                  {selectedTx.category === "credit" ? "+" : "-"}{selectedTx.amount}
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-4 mb-8">
                {/* Date & Time */}
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4 p-3 md:p-4 bg-blue-50 rounded-2xl">
                  <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                    <Calendar size={20} className="text-[#0000FF]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs md:text-sm text-gray-600 uppercase mb-1">Date & Time</div>
                    <div className="font-semibold text-black">{selectedTx.date}</div>
                    <div className="text-xs md:text-sm text-gray-600">{selectedTx.time}</div>
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4 p-3 md:p-4 bg-purple-50 rounded-2xl">
                  <div className="p-2 md:p-3 bg-purple-100 rounded-lg">
                    <CreditCard size={20} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs md:text-sm text-gray-600 uppercase mb-1">Description</div>
                    <div className="font-semibold text-black">{selectedTx.description}</div>
                  </div>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4 p-3 md:p-4 bg-yellow-50 rounded-2xl">
                  <div className={`p-2 md:p-3 rounded-lg ${selectedTx.category === "credit" ? "bg-green-100" : "bg-red-100"}`}>
                    <DollarSign size={20} className={selectedTx.category === "credit" ? "text-green-600" : "text-red-600"} />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs md:text-sm text-gray-600 uppercase mb-1">Category</div>
                    <div className="font-semibold text-black capitalize">{selectedTx.category}</div>
                  </div>
                </div>

                {/* Receiver */}
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4 p-3 md:p-4 bg-indigo-50 rounded-2xl">
                  <div className="p-2 md:p-3 bg-indigo-100 rounded-lg">
                    <User size={20} className="text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs md:text-sm text-gray-600 uppercase mb-1">Receiver Name</div>
                    <div className="font-semibold text-black">{selectedTx.receiver}</div>
                  </div>
                </div>

                {/* Bank */}
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:gap-4 p-3 md:p-4 bg-cyan-50 rounded-2xl">
                  <div className="p-2 md:p-3 bg-cyan-100 rounded-lg">
                    <Building2 size={20} className="text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs md:text-sm text-gray-600 uppercase mb-1">Receiver Bank</div>
                    <div className="font-semibold text-black">{selectedTx.bank}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-black font-semibold rounded-xl transition-all"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-3 bg-gradient-to-r from-[#0000FF] to-blue-600 hover:shadow-lg text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                  <Send size={18} />
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

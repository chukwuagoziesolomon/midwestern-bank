"use client";

import { useState } from "react";
import { Send, Banknote } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function Transfer() {
  const [type, setType] = useState<"local" | "international" | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] via-[#232323] to-[#101010] font-sans text-white flex flex-col md:flex-row">
      {/* Mobile overlay sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
        <div className="relative z-50 w-64 h-full">
          <Sidebar active="transfer" onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-72">
        <Sidebar active="transfer" />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3 md:hidden">
            <button
              className="p-2 rounded-md bg-[#232323] border border-[#3a3a3a]"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-5 h-5 text-[#B6FF48]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-[#B6FF48]">Transfer</h1>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <h1 className="text-2xl font-bold text-[#B6FF48]">Transfer Funds</h1>
          </div>
        </div>

        <section className="bg-[#0f0f0f] p-6 rounded-2xl border border-[#2a2a2a]">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setType("local")}
              className={`flex-1 flex items-center gap-3 p-4 rounded-lg border ${type === "local" ? "border-[#B6FF48] bg-black" : "border-[#303030]"}`}
            >
              <Banknote className="text-[#B6FF48]" />
              <span>Local Transfer</span>
            </button>
            <button
              onClick={() => setType("international")}
              className={`flex-1 flex items-center gap-3 p-4 rounded-lg border ${type === "international" ? "border-[#B6FF48] bg-black" : "border-[#303030]"}`}
            >
              <Send className="text-[#B6FF48]" />
              <span>International Transfer</span>
            </button>
          </div>

          {type === null && (
            <div className="text-center text-[#cfcfcf] py-12">
              <p className="mb-4">Choose a transfer type to begin.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setType("local")} className="px-6 py-2 rounded-lg bg-[#232323] border border-[#B6FF48] text-[#B6FF48]">Local</button>
                <button onClick={() => setType("international")} className="px-6 py-2 rounded-lg bg-[#232323] border border-[#B6FF48] text-[#B6FF48]">International</button>
              </div>
            </div>
          )}

          {type === "local" && (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              <label className="flex flex-col text-sm text-[#ddd]">
                Receiver Name
                <input type="text" placeholder="Receiver Name" className="mt-2 p-3 rounded-lg bg-[#181818] border border-[#3a3a3a] text-white" />
              </label>
              <label className="flex flex-col text-sm text-[#ddd]">
                Account Number
                <input type="text" placeholder="Account Number" className="mt-2 p-3 rounded-lg bg-[#181818] border border-[#3a3a3a] text-white" />
              </label>
              <label className="flex flex-col text-sm text-[#ddd]">
                Amount
                <input type="number" placeholder="Amount" className="mt-2 p-3 rounded-lg bg-[#181818] border border-[#3a3a3a] text-white" />
              </label>
              <label className="flex flex-col text-sm text-[#ddd]">
                Pin
                <input type="password" placeholder="Pin" className="mt-2 p-3 rounded-lg bg-[#181818] border border-[#3a3a3a] text-white" />
              </label>

              <div className="col-span-full flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setType(null)} className="px-6 py-2 rounded-lg bg-[#232323] border border-[#3a3a3a] text-[#B6FF48]">Back</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-[#B6FF48] text-[#081008] font-bold">Submit</button>
              </div>
            </form>
          )}

          {type === "international" && (
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              <label className="flex flex-col text-sm text-[#ddd]">
                Receiver Name
                <input type="text" placeholder="Receiver Name" className="mt-2 p-3 rounded-lg bg-[#181818] border border-[#3a3a3a] text-white" />
              </label>
              <label className="flex flex-col text-sm text-[#ddd]">
                Receiver Bank Name
                <input type="text" placeholder="Receiver Bank" className="mt-2 p-3 rounded-lg bg-[#181818] border border-[#3a3a3a] text-white" />
              </label>
              <label className="flex flex-col text-sm text-[#ddd]">
                IBAN
                <input type="text" placeholder="IBAN" className="mt-2 p-3 rounded-lg bg-[#181818] border border-[#3a3a3a] text-white" />
              </label>
              <label className="flex flex-col text-sm text-[#ddd]">
                Swift Code
                <input type="text" placeholder="SWIFT" className="mt-2 p-3 rounded-lg bg-[#181818] border border-[#3a3a3a] text-white" />
              </label>

              <div className="col-span-full flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setType(null)} className="px-6 py-2 rounded-lg bg-[#232323] border border-[#3a3a3a] text-[#B6FF48]">Back</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-[#B6FF48] text-[#081008] font-bold">Submit</button>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}

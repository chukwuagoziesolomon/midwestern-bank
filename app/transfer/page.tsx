"use client";

import { useState } from "react";
import { Send, Banknote } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function Transfer() {
  const [type, setType] = useState<"local" | "international" | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-black flex flex-col md:flex-row">
      {/* Mobile overlay sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
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
              className="p-2 rounded-md bg-white border border-blue-600"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-blue-600">Transfer</h1>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <h1 className="text-2xl font-bold text-blue-600">Transfer Funds</h1>
          </div>
        </div>

        <section className="bg-white p-6 rounded-2xl border border-gray-200">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setType("local")}
              className={`flex-1 flex items-center gap-3 p-4 rounded-lg border ${type === "local" ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
            >
              <Banknote className="text-blue-600" />
              <span>Local Transfer</span>
            </button>
            <button
              onClick={() => setType("international")}
              className={`flex-1 flex items-center gap-3 p-4 rounded-lg border ${type === "international" ? "border-blue-600 bg-blue-50" : "border-gray-300"}`}
            >
              <Send className="text-blue-600" />
              <span>International Transfer</span>
            </button>
          </div>

          {type === null && (
            <div className="text-center text-gray-500 py-12">
              <p className="mb-4">Choose a transfer type to begin.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => setType("local")} className="px-6 py-2 rounded-lg bg-white border border-blue-600 text-blue-600">Local</button>
                <button onClick={() => setType("international")} className="px-6 py-2 rounded-lg bg-white border border-blue-600 text-blue-600">International</button>
              </div>
            </div>
          )}

          {type === "local" && (
            <form className="grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Name:
                <input type="text" placeholder="Receiver Name" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Bank:
                <input type="text" placeholder="Receiver Bank" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Account Number:
                <input type="text" placeholder="Receiver Account Number" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Routing Number:
                <input type="text" placeholder="Routing Number" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Amount:
                <input type="number" placeholder="Amount" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Description:
                <textarea placeholder="Description" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" rows={2} />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Pin:
                <input type="password" placeholder="Pin" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <div className="col-span-full flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setType(null)} className="px-6 py-2 rounded-lg bg-white border border-blue-600 text-blue-600">Back</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-[#27348B] text-white font-bold">Make Transfer</button>
              </div>
            </form>
          )}

          {type === "international" && (
            <form className="grid grid-cols-1 gap-4" onSubmit={(e) => e.preventDefault()}>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Name:
                <input type="text" placeholder="Receiver Name" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Bank Name:
                <input type="text" placeholder="Receiver Bank Name" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Bank Address:
                <input type="text" placeholder="Receiver Bank Address" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Account Number:
                <input type="text" placeholder="Receiver Account Number" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                IBAN:
                <input type="text" placeholder="IBAN" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Swift Code:
                <input type="text" placeholder="Swift Code" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Amount:
                <input type="number" placeholder="Amount" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Description:
                <textarea placeholder="Description" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" rows={2} />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Pin:
                <input type="password" placeholder="Pin" className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black" />
              </label>
              <div className="col-span-full flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setType(null)} className="px-6 py-2 rounded-lg bg-white border border-blue-600 text-blue-600">Back</button>
                <button type="submit" className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold">Make Transfer</button>
              </div>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}

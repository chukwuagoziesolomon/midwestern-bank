"use client";

import Sidebar from "../components/Sidebar";
import Link from "next/link";
import { Send, User, Banknote } from "lucide-react";
import { useState } from "react";

export default function Transfer() {
  const [type, setType] = useState<"local" | "international" | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181818] via-[#232323] to-[#101010] font-sans text-white flex">
      {/* Sidebar */}
      <Sidebar active="transfer" />
      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="max-w-3xl mx-auto bg-[#232323]/80 rounded-2xl p-8 shadow-2xl border border-[#232323]">
          {!type && (
            <div className="flex flex-col items-center gap-8">
              <h2 className="text-2xl font-bold mb-4 text-[#B6FF48]">Choose Transfer Type</h2>
              <div className="flex gap-8">
                <button onClick={() => setType("local")}
                  className="px-8 py-4 rounded-xl bg-[#181818] border-2 border-[#B6FF48] text-[#B6FF48] font-bold text-lg shadow-lg hover:bg-[#B6FF48] hover:text-[#181818] transition">
                  Local Transfer
                </button>
                <button onClick={() => setType("international")}
                  className="px-8 py-4 rounded-xl bg-[#181818] border-2 border-[#B6FF48] text-[#B6FF48] font-bold text-lg shadow-lg hover:bg-[#B6FF48] hover:text-[#181818] transition">
                  International Transfer
                </button>
              </div>
            </div>
          )}
          {type === "international" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#B6FF48]">Make An International Transfer</h2>
              <form className="flex flex-col gap-4">
                <label className="text-[#ededed]">Receiver Name:
                  <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Receiver Name" />
                </label>
                <label className="text-[#ededed]">Receiver Bank Name:
                  <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Receiver Bank Name" />
                </label>
                <label className="text-[#ededed]">Receiver Bank Address:
                  <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Receiver Bank Address" />
                </label>
                <label className="text-[#ededed]">Receiver Account Number:
                  <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Receiver Account Number" />
                </label>
                <label className="text-[#ededed]">IBAN:
                  <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="IBAN" />
                </label>
                <label className="text-[#ededed]">Swift Code:
                  <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Swift Code" />
                </label>
                <label className="text-[#ededed]">Amount:
                  <input type="number" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Amount" />
                </label>
                <label className="text-[#ededed]">Description:
                  <textarea className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Description" />
                </label>
                <div className="flex gap-4 mt-4">
                  <button type="button" onClick={() => setType(null)} className="px-6 py-2 rounded-lg bg-[#232323] border border-[#B6FF48] text-[#B6FF48] font-semibold hover:bg-[#B6FF48] hover:text-[#181818] transition">Back</button>
                  <button type="submit" className="px-8 py-3 rounded-lg bg-[#B6FF48] text-[#181818] font-bold text-lg shadow-lg hover:bg-[#d6ff8a] transition">Submit</button>
                </div>
              </form>
            </div>
          )}
          {type === "local" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#B6FF48]">Make A Domestic Transfer</h2>
              <form className="flex flex-col gap-4">
                <label className="text-[#ededed]">Receiver Name:
                  <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Receiver Name" />
                </label>
                <label className="text-[#ededed]">Receiver Bank:
                  <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Receiver Bank" />
                </label>
                <label className="text-[#ededed]">Receiver Account Number:
                  <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Receiver Account Number" />
                </label>
                <label className="text-[#ededed]">Routing Number:
                  <input type="text" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Routing Number" />
                </label>
                <label className="text-[#ededed]">Amount:
                  <input type="number" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Amount" />
                </label>
                <label className="text-[#ededed]">Description:
                  <textarea className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Description" />
                </label>
                <label className="text-[#ededed]">Pin:
                  <input type="password" className="mt-1 w-full px-4 py-3 rounded-lg bg-[#181818] border border-[#B6FF48] text-white placeholder-[#888] focus:outline-none" placeholder="Pin" />
                </label>
                <div className="flex gap-4 mt-4">
                  <button type="button" onClick={() => setType(null)} className="px-6 py-2 rounded-lg bg-[#232323] border border-[#B6FF48] text-[#B6FF48] font-semibold hover:bg-[#B6FF48] hover:text-[#181818] transition">Back</button>
                  <button type="submit" className="px-8 py-3 rounded-lg bg-[#B6FF48] text-[#181818] font-bold text-lg shadow-lg hover:bg-[#d6ff8a] transition">Submit</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

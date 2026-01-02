
"use client";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useState } from "react";
import Link from "next/link";
import { CreditCard, Banknote } from "lucide-react";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

export default function CreditCardPage() {
   const { user } = useAuth();
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [cardNumber, setCardNumber] = useState("");
   const [cardExpiry, setCardExpiry] = useState("");
   const [cardCvc, setCardCvc] = useState("");
   const [depositAmount, setDepositAmount] = useState("");
   const [cardHolderName, setCardHolderName] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!user) return;

     setError("");
     setSuccess("");
     setLoading(true);

     try {
       const response = await apiClient.deposit({
         user_id: user.id,
         card_number: cardNumber.replace(/\s/g, ''), // Remove spaces
         card_expiry: cardExpiry,
         card_cvc: cardCvc,
         deposit_amount: parseFloat(depositAmount),
         card_holder_name: cardHolderName,
       });

       if (response.error) {
         setError(response.error);
       } else {
         setSuccess("Deposit successful!");
         // Reset form
         setCardNumber("");
         setCardExpiry("");
         setCardCvc("");
         setDepositAmount("");
         setCardHolderName("");
       }
     } catch (err) {
       setError("An unexpected error occurred");
     } finally {
       setLoading(false);
     }
   };

   return (
    <div className="min-h-screen bg-white font-sans text-black flex flex-col md:flex-row">
      {/* Sidebar for desktop, overlay for mobile */}
      <div className={`fixed inset-0 z-40 md:hidden transition ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black/20" onClick={() => setSidebarOpen(false)} />
        <div className="relative z-50 w-64 h-full">
          <Sidebar active="credit-card" onClose={() => setSidebarOpen(false)} />
        </div>
      </div>
      <div className="hidden md:block">
        <Sidebar active="credit-card" />
      </div>
      <main className="flex-1 p-4 md:p-10 flex flex-col items-center justify-center">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-white border border-blue-600 rounded-full p-2 shadow-lg focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-2xl border border-gray-200">
          <h2 className="text-2xl font-bold mb-8 text-blue-600">Credit Card Deposit</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-gray-700">CARD NUMBER
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-lg bg-white border border-blue-600 text-black placeholder-gray-400 focus:outline-none"
                placeholder="•••• •••• •••• ••••"
                required
              />
            </label>
            <div className="flex gap-4">
              <label className="flex-1 text-gray-700">CARD EXPIRY
                <input
                  type="text"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-lg bg-white border border-blue-600 text-black placeholder-gray-400 focus:outline-none"
                  placeholder="MM/YY"
                  required
                />
              </label>
              <label className="flex-1 text-gray-700">CARD CVC
                <input
                  type="text"
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value)}
                  className="mt-1 w-full px-4 py-3 rounded-lg bg-white border border-blue-600 text-black placeholder-gray-400 focus:outline-none"
                  placeholder="•••"
                  required
                />
              </label>
            </div>
            <label className="text-gray-700">DEPOSIT AMOUNT
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-lg bg-white border border-blue-600 text-black placeholder-gray-400 focus:outline-none"
                placeholder="Amount in USD"
                min="0"
                step="0.01"
                required
              />
            </label>
            <label className="text-gray-700">CARD HOLDER NAME
              <input
                type="text"
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-lg bg-white border border-blue-600 text-black placeholder-gray-400 focus:outline-none"
                placeholder="Card Holder Name"
                required
              />
            </label>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white font-bold text-lg shadow-lg hover:bg-blue-500 transition mt-4 disabled:opacity-50"
            >
              {loading ? "Processing..." : "MAKE PAYMENT"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

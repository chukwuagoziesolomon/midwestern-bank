"use client";

import { useState } from "react";
import { Send, Banknote } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

export default function Transfer() {
   const { user } = useAuth();
   const [type, setType] = useState<"local" | "international" | null>(null);
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");

   const [localForm, setLocalForm] = useState({
     receiverName: '',
     receiverBank: '',
     accountNumber: '',
     routingNumber: '',
     amount: '',
     description: '',
     pin: ''
   });

   const [internationalForm, setInternationalForm] = useState({
     receiverName: '',
     bankName: '',
     bankAddress: '',
     accountNumber: '',
     iban: '',
     swiftCode: '',
     amount: '',
     description: '',
     pin: ''
   });

   const handleLocalSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!user) return;

     setError("");
     setSuccess("");
     setLoading(true);

     try {
       const response = await apiClient.createTransfer({
         user_id: user.id,
         transfer_type: 'local',
         receiver_name: localForm.receiverName,
         receiver_bank: localForm.receiverBank,
         receiver_account_number: localForm.accountNumber,
         routing_number: localForm.routingNumber,
         amount: parseFloat(localForm.amount),
         description: localForm.description,
         pin: localForm.pin,
       });

       if (response.error) {
         setError(response.error);
       } else {
         setSuccess("Transfer completed successfully!");
         setShowModal(true);
         // Reset form
         setLocalForm({
           receiverName: '',
           receiverBank: '',
           accountNumber: '',
           routingNumber: '',
           amount: '',
           description: '',
           pin: ''
         });
       }
     } catch (err) {
       setError("An unexpected error occurred");
     } finally {
       setLoading(false);
     }
   };

   const handleInternationalSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!user) return;

     setError("");
     setSuccess("");
     setLoading(true);

     try {
       const response = await apiClient.createTransfer({
         user_id: user.id,
         transfer_type: 'international',
         receiver_name: internationalForm.receiverName,
         receiver_bank: internationalForm.bankName,
         receiver_bank_address: internationalForm.bankAddress,
         receiver_account_number: internationalForm.accountNumber,
         iban: internationalForm.iban,
         swift_code: internationalForm.swiftCode,
         amount: parseFloat(internationalForm.amount),
         description: internationalForm.description,
         pin: internationalForm.pin,
       });

       if (response.error) {
         setError(response.error);
       } else {
         setSuccess("Transfer completed successfully!");
         setShowModal(true);
         // Reset form
         setInternationalForm({
           receiverName: '',
           bankName: '',
           bankAddress: '',
           accountNumber: '',
           iban: '',
           swiftCode: '',
           amount: '',
           description: '',
           pin: ''
         });
       }
     } catch (err) {
       setError("An unexpected error occurred");
     } finally {
       setLoading(false);
     }
   };

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
            <form className="grid grid-cols-1 gap-4" onSubmit={handleLocalSubmit}>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Name:
                <input
                  type="text"
                  placeholder="Receiver Name"
                  value={localForm.receiverName}
                  onChange={(e) => setLocalForm(prev => ({ ...prev, receiverName: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  required
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Bank:
                <input
                  type="text"
                  placeholder="Receiver Bank"
                  value={localForm.receiverBank}
                  onChange={(e) => setLocalForm(prev => ({ ...prev, receiverBank: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  required
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Account Number:
                <input
                  type="text"
                  placeholder="Receiver Account Number"
                  value={localForm.accountNumber}
                  onChange={(e) => setLocalForm(prev => ({ ...prev, accountNumber: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  required
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Routing Number:
                <input
                  type="text"
                  placeholder="Routing Number"
                  value={localForm.routingNumber}
                  onChange={(e) => setLocalForm(prev => ({ ...prev, routingNumber: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  required
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Amount:
                <input
                  type="number"
                  placeholder="Amount"
                  value={localForm.amount}
                  onChange={(e) => setLocalForm(prev => ({ ...prev, amount: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  min="0"
                  step="0.01"
                  required
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Description:
                <textarea
                  placeholder="Description"
                  value={localForm.description}
                  onChange={(e) => setLocalForm(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  rows={2}
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Pin:
                <input
                  type="password"
                  placeholder="Pin"
                  value={localForm.pin}
                  onChange={(e) => setLocalForm(prev => ({ ...prev, pin: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  required
                />
              </label>
              {error && <p className="text-red-500 text-sm col-span-full">{error}</p>}
              {success && <p className="text-green-500 text-sm col-span-full">{success}</p>}
              <div className="col-span-full flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setType(null)} className="px-6 py-2 rounded-lg bg-white border border-blue-600 text-blue-600">Back</button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded-lg bg-[#27348B] text-white font-bold disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Make Transfer"}
                </button>
              </div>
            </form>
          )}

          {type === "international" && (
            <form className="grid grid-cols-1 gap-4" onSubmit={handleInternationalSubmit}>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Name:
                <input
                  type="text"
                  placeholder="Receiver Name"
                  value={internationalForm.receiverName}
                  onChange={(e) => setInternationalForm(prev => ({ ...prev, receiverName: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  required
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Bank Name:
                <input
                  type="text"
                  placeholder="Receiver Bank Name"
                  value={internationalForm.bankName}
                  onChange={(e) => setInternationalForm(prev => ({ ...prev, bankName: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  required
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Bank Address:
                <input
                  type="text"
                  placeholder="Receiver Bank Address"
                  value={internationalForm.bankAddress}
                  onChange={(e) => setInternationalForm(prev => ({ ...prev, bankAddress: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  required
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Receiver Account Number:
                <input
                  type="text"
                  placeholder="Receiver Account Number"
                  value={internationalForm.accountNumber}
                  onChange={(e) => setInternationalForm(prev => ({ ...prev, accountNumber: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  required
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                IBAN:
                <input
                  type="text"
                  placeholder="IBAN"
                  value={internationalForm.iban}
                  onChange={(e) => setInternationalForm(prev => ({ ...prev, iban: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  required
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Swift Code:
                <input
                  type="text"
                  placeholder="Swift Code"
                  value={internationalForm.swiftCode}
                  onChange={(e) => setInternationalForm(prev => ({ ...prev, swiftCode: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  required
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Amount:
                <input
                  type="number"
                  placeholder="Amount"
                  value={internationalForm.amount}
                  onChange={(e) => setInternationalForm(prev => ({ ...prev, amount: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  min="0"
                  step="0.01"
                  required
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Description:
                <textarea
                  placeholder="Description"
                  value={internationalForm.description}
                  onChange={(e) => setInternationalForm(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  rows={2}
                />
              </label>
              <label className="flex flex-col text-sm text-gray-700">
                Pin:
                <input
                  type="password"
                  placeholder="Pin"
                  value={internationalForm.pin}
                  onChange={(e) => setInternationalForm(prev => ({ ...prev, pin: e.target.value }))}
                  className="mt-2 p-3 rounded-lg bg-white border border-gray-300 text-black"
                  required
                />
              </label>
              {error && <p className="text-red-500 text-sm col-span-full">{error}</p>}
              {success && <p className="text-green-500 text-sm col-span-full">{success}</p>}
              <div className="col-span-full flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setType(null)} className="px-6 py-2 rounded-lg bg-white border border-blue-600 text-blue-600">Back</button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Make Transfer"}
                </button>
              </div>
            </form>
          )}
        </section>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowModal(false)} />
            <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full mx-4">
              <h2 className="text-xl font-bold mb-4 text-green-600">Transfer Successful!</h2>
              <p className="mb-4">{success || "Your transfer has been processed successfully and added to your transaction history."}</p>
              <button onClick={() => { setShowModal(false); setSuccess(""); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Close</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

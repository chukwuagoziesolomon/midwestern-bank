"use client";
import { X, AlertTriangle } from "lucide-react";
import React from "react";

interface IssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  supportEmail?: string;
}

export default function IssueModal({ isOpen, onClose, message, supportEmail = "support@midwesternbank.com" }: IssueModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-y-auto max-h-[90vh] relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10">
          <X size={20} />
        </button>
        <div className="relative bg-gradient-to-r from-[#0000FF] to-[#5a8cff] py-6 px-6 text-center rounded-t-3xl">
          <div className="flex justify-center mb-3">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur">
              <AlertTriangle size={40} color="#fff" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Account Issue</h2>
          <p className="text-white/90 text-sm mt-1">{message}</p>
        </div>
        <div className="p-6 text-center space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-[#0000FF]">
            <p className="text-xs text-gray-600 font-semibold mb-2">Please contact customer care:</p>
            <a href={`mailto:${supportEmail}`} className="text-[#0000FF] font-bold text-sm hover:text-[#5a8cff] transition break-all">{supportEmail}</a>
          </div>
          <a href={`mailto:${supportEmail}`} className="block w-full px-4 py-2.5 rounded-full bg-gradient-to-r from-[#0000FF] to-[#5a8cff] text-white font-bold text-sm shadow-lg hover:shadow-xl hover:from-[#0000cd] hover:to-[#4a7cff] transition">📧 Email Support</a>
          <button onClick={onClose} className="w-full px-4 py-2.5 rounded-full bg-white text-[#0000FF] font-bold text-sm border-2 border-[#0000FF] hover:bg-[#f5f5f5] transition">Continue</button>
        </div>
      </div>
    </div>
  );
}
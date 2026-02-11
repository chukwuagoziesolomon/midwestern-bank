"use client";
import { useState, useEffect } from "react";
import { Mail, CheckCircle, X, Copy } from "lucide-react";

interface SignupSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  status?: string;
  note?: string;
}

export default function SignupSuccessModal({ isOpen, onClose, email, status, note }: SignupSuccessModalProps) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${animateIn ? "bg-black/50" : "bg-transparent"}`}>
      <div className={`bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-y-auto max-h-[90vh] transition-all duration-300 transform ${
        animateIn ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10"
        >
          <X size={20} />
        </button>

        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-r from-[#0000FF] to-[#5a8cff] py-6 px-6 text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur">
              <CheckCircle size={40} color="#ffffff" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome!</h2>
          <p className="text-white/90 text-sm mt-1">Account created successfully</p>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-4">
          {/* Account Email */}
          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Account Email</p>
            <p className="text-gray-800 font-semibold text-sm">{email}</p>
          </div>

          {/* Account Status */}
          {status && (
            <div className="p-3 bg-blue-50 rounded-xl border-2 border-[#0000FF]">
              <p className="text-xs text-[#0000FF] font-semibold mb-2">Account Status</p>
              <p className="text-gray-800 font-semibold text-sm">{status}</p>
            </div>
          )}

          {/* Note */}
          {note && (
            <div className="p-3 bg-yellow-50 rounded-xl border-2 border-yellow-400">
              <p className="text-xs text-yellow-700 font-semibold mb-2">Note</p>
              <p className="text-gray-800 text-sm">{note}</p>
            </div>
          )}

          {/* Support Email */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-[#0000FF]">
            <p className="text-xs text-gray-600 font-semibold mb-2">To activate your account:</p>
            <a
              href="mailto:support@midwesternbank.com"
              className="text-[#0000FF] font-bold text-sm hover:text-[#5a8cff] transition break-all"
            >
              support@midwesternbank.com
            </a>
          </div>

          {/* Action Buttons */}
          <a
            href="mailto:support@midwesternbank.com"
            className="block w-full px-4 py-2.5 rounded-full bg-gradient-to-r from-[#0000FF] to-[#5a8cff] text-white font-bold text-sm shadow-lg hover:shadow-xl hover:from-[#0000cd] hover:to-[#4a7cff] transition"
          >
            📧 Email Support
          </a>

          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 rounded-full bg-white text-[#0000FF] font-bold text-sm border-2 border-[#0000FF] hover:bg-[#f5f5f5] transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

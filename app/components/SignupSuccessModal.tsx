"use client";
import { useState, useEffect } from "react";
import { Mail, CheckCircle, X, Copy } from "lucide-react";

interface SignupSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  tempPassword?: string;
}

export default function SignupSuccessModal({ isOpen, onClose, email, tempPassword }: SignupSuccessModalProps) {
  const [animateIn, setAnimateIn] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimateIn(true);
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  const handleCopyPassword = () => {
    if (tempPassword) {
      navigator.clipboard.writeText(tempPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${animateIn ? "bg-black/50" : "bg-transparent"}`}>
      <div className={`bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transition-all duration-300 transform ${
        animateIn ? "scale-100 opacity-100" : "scale-95 opacity-0"
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition z-10"
        >
          <X size={24} />
        </button>

        {/* Header with Gradient */}
        <div className="relative bg-gradient-to-r from-[#0000FF] to-[#5a8cff] p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full backdrop-blur">
              <CheckCircle size={48} color="#ffffff" strokeWidth={1.5} />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Welcome!</h2>
          <p className="text-white/90 mt-2">Your account has been created successfully</p>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <p className="text-gray-700 mb-6 text-base leading-relaxed">
            Thank you for signing up with us! To activate your account and start enjoying all the benefits of Mid Western Bank, please contact our customer support team.
          </p>

          {/* Email Box */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 mb-8 border-2 border-[#0000FF]">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Mail size={20} color="#0000FF" />
              <p className="text-sm text-gray-600 font-semibold">Contact Support at:</p>
            </div>
            <a
              href="mailto:support@midwesternbank.com"
              className="text-[#0000FF] font-bold text-lg hover:text-[#5a8cff] transition break-all"
            >
              support@midwesternbank.com
            </a>
          </div>

          {/* Account Email */}
          <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Account Email</p>
            <p className="text-gray-800 font-semibold">{email}</p>
          </div>

          {/* Temporary Password */}
          {tempPassword && (
            <div className="mb-8 p-4 bg-blue-50 rounded-xl border-2 border-[#0000FF]">
              <p className="text-xs text-[#0000FF] font-semibold mb-3">Generated Password</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={tempPassword}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-[#0000FF] rounded-lg text-gray-800 font-mono font-bold text-sm"
                />
                <button
                  onClick={handleCopyPassword}
                  className={`px-3 py-2 rounded-lg transition ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-[#0000FF] text-white hover:bg-[#5a8cff]"
                  }`}
                >
                  {copied ? "Copied!" : <Copy size={18} />}
                </button>
              </div>
            </div>
          )}

          {/* Steps */}
          <div className="text-left bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-gray-800 mb-4">Next Steps:</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="bg-[#0000FF] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <span className="text-gray-700 text-sm">Send an email to support@midwesternbank.com</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-[#0000FF] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <span className="text-gray-700 text-sm">Include your full name and registered email address</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-[#0000FF] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <span className="text-gray-700 text-sm">Our team will verify and activate your account within shortly</span>
              </li>
            </ol>
          </div>

          {/* Action Button */}
          <a
            href="mailto:support@midwesternbank.com"
            className="block w-full px-6 py-3 rounded-full bg-gradient-to-r from-[#0000FF] to-[#5a8cff] text-white font-bold text-lg shadow-lg hover:shadow-xl hover:from-[#0000cd] hover:to-[#4a7cff] transition mb-4"
          >
            📧 Email Support
          </a>

          <button
            onClick={onClose}
            className="w-full px-6 py-3 rounded-full bg-white text-[#0000FF] font-bold text-lg border-2 border-[#0000FF] hover:bg-[#f5f5f5] transition"
          >
            Continue
          </button>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-600">
            We're here to help! Average response time: 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import Image from "next/image";

export default function BeautifulReceiptModal({
  open,
  onClose,
  receiptMeta,
}: {
  open: boolean;
  onClose: () => void;
  receiptMeta?: {
    id?: string;
    date?: string;
    amount?: number | string;
    receiverName?: string;
    accountNumber?: string;
    bankName?: string;
    description?: string;
  } | null;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  // PDF generation
  const downloadPDF = async () => {
    setLoading(true);
    try {
      const node = ref.current;
      if (!node) return;
      const dataUrl = await htmlToImage.toPng(node, { backgroundColor: "#fff" });
      const pdf = new jsPDF({ orientation: "p", unit: "px", format: [400, 600] });
      pdf.addImage(dataUrl, "PNG", 10, 10, 380, 400);
      pdf.save(`receipt_${receiptMeta?.id || "transfer"}.pdf`);
    } finally {
      setLoading(false);
    }
  };

  // Share PDF (if supported)
  const sharePDF = async () => {
    setLoading(true);
    try {
      const node = ref.current;
      if (!node) return;
      const dataUrl = await htmlToImage.toPng(node, { backgroundColor: "#fff" });
      const pdf = new jsPDF({ orientation: "p", unit: "px", format: [400, 600] });
      pdf.addImage(dataUrl, "PNG", 10, 10, 380, 400);
      const blob = pdf.output("blob");
      const file = new File([blob], `receipt_${receiptMeta?.id || "transfer"}.pdf`, { type: "application/pdf" });
      if ((navigator as any).canShare && (navigator as any).canShare({ files: [file] })) {
        await (navigator as any).share({ files: [file], title: "Transfer Receipt" });
      } else {
        // fallback: download
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative z-10 bg-gradient-to-br from-blue-50 to-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden border-4 border-blue-200">
        <div ref={ref} className="p-8 flex flex-col items-center gap-6 relative">
          {/* Logo/watermark */}
          <div className="absolute top-4 right-4 opacity-20 pointer-events-none select-none">
            <Image src="/logo.png" alt="Logo" width={60} height={60} />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 mb-2 tracking-tight">Transfer Receipt</h2>
          <div className="w-full flex flex-col gap-2 text-center">
            <span className="text-xs text-gray-500">Transaction ID</span>
            <span className="font-bold text-lg text-blue-900">{receiptMeta?.id ?? "—"}</span>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 bg-white/80 rounded-xl p-4 shadow">
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-500">Amount</span>
              <span className="font-bold text-2xl text-green-700">₦{receiptMeta?.amount ?? "—"}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">Date</span>
              <span className="font-semibold text-base text-black">{receiptMeta?.date ?? "—"}</span>
            </div>
            <div className="flex flex-col items-start col-span-2 mt-2">
              <span className="text-xs text-gray-500">Recipient</span>
              <span className="font-semibold text-lg text-black">{receiptMeta?.receiverName ?? "—"}</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-500">Account</span>
              <span className="font-mono text-base text-black">{receiptMeta?.accountNumber ?? "—"}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">Bank</span>
              <span className="font-semibold text-base text-black">{receiptMeta?.bankName ?? "—"}</span>
            </div>
          </div>
          <div className="w-full mt-4">
            <span className="text-xs text-gray-500">Description</span>
            <div className="text-sm text-gray-800 bg-blue-50 rounded-lg p-2 min-h-[32px]">{receiptMeta?.description ?? "—"}</div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3 p-6 border-t border-blue-100 bg-white/80">
          <button
            className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold shadow hover:bg-blue-800 transition"
            onClick={downloadPDF}
            disabled={loading}
          >
            Download PDF
          </button>
          <button
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
            onClick={sharePDF}
            disabled={loading}
          >
            Share PDF
          </button>
          <button
            className="flex-1 px-4 py-2 bg-gray-100 text-blue-700 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
            onClick={onClose}
            disabled={loading}
          >
            Close
          </button>
        </div>
        {loading && <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-lg font-bold text-blue-700">Processing...</div>}
      </div>
    </div>
  );
}

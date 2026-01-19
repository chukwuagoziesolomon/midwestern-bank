"use client";

import React, { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";

type ReceiptUrls = {
  html?: string;
  pdf?: string;
  image?: string;
};

type ReceiptMeta = {
  id?: string;
  date?: string;
  amount?: number | string;
  receiverName?: string;
  accountNumber?: string;
  description?: string;
};

export default function ReceiptModal({
  open,
  onClose,
  receiptUrls,
  receiptMeta,
}: {
  open: boolean;
  onClose: () => void;
  receiptUrls?: ReceiptUrls | null;
  receiptMeta?: ReceiptMeta | null;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const downloadUrl = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank");
  };

  async function shareFile(url?: string, filename = "receipt", mime = "application/octet-stream") {
    if (!url) return;
    try {
      const r = await fetch(url, { credentials: "include" });
      const blob = await r.blob();
      const file = new File([blob], filename, { type: mime });
      if ((navigator as any).canShare && (navigator as any).canShare({ files: [file] })) {
        await (navigator as any).share({ files: [file], title: "Transfer Receipt" });
        return;
      }
      // Fallback: download
      const link = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = link;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(link);
    } catch (err) {
      console.error("Share/download failed", err);
    }
  }

  async function downloadImageFallback() {
    if (!ref.current) return;
    setLoading(true);
    try {
      const blob = await htmlToImage.toBlob(ref.current, { backgroundColor: '#ffffff' });
      if (!blob) return;
      const link = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = link;
      a.download = `${receiptMeta?.id ?? 'receipt'}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(link);
    } catch (e) {
      console.error('image fallback failed', e);
    } finally {
      setLoading(false);
    }
  }

  async function shareImageFallback() {
    if (!ref.current) return;
    setLoading(true);
    try {
      const blob = await htmlToImage.toBlob(ref.current, { backgroundColor: '#ffffff' });
      if (!blob) return;
      const file = new File([blob], `${receiptMeta?.id ?? 'receipt'}.png`, { type: 'image/png' });
      if ((navigator as any).canShare && (navigator as any).canShare({ files: [file] })) {
        await (navigator as any).share({ files: [file], title: 'Transfer Receipt' });
        return;
      }
      const link = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = link;
      a.download = `${receiptMeta?.id ?? 'receipt'}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(link);
    } catch (e) {
      console.error('share image fallback failed', e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 overflow-hidden">
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2" ref={ref}>
            <div className="p-6 rounded-lg border border-gray-100 bg-white">
              <h3 className="text-2xl font-bold text-sky-800">Transfer Receipt</h3>
              <p className="text-sm text-gray-500 mt-1">Transaction ID: <span className="font-medium">{receiptMeta?.id ?? '—'}</span></p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="font-semibold text-lg">{receiptMeta?.amount ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium">{receiptMeta?.date ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Recipient</p>
                  <p className="font-medium">{receiptMeta?.receiverName ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Account</p>
                  <p className="font-medium">{receiptMeta?.accountNumber ?? '—'}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500">Description</p>
                <p className="text-sm text-gray-800">{receiptMeta?.description ?? '—'}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={() => downloadUrl(receiptUrls?.pdf)}
            >
              Download PDF
            </button>

            <button
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg"
              onClick={() => {
                if (receiptUrls?.image) downloadUrl(receiptUrls.image);
                else downloadImageFallback();
              }}
            >
              Download Image
            </button>

            <button
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg"
              onClick={() => downloadUrl(receiptUrls?.html)}
            >
              Open HTML
            </button>

            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              onClick={() => {
                if (receiptUrls?.pdf) shareFile(receiptUrls.pdf, `${receiptMeta?.id ?? 'receipt'}.pdf`, 'application/pdf');
              }}
            >
              Share PDF
            </button>

            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              onClick={() => {
                if (receiptUrls?.image) shareFile(receiptUrls.image, `${receiptMeta?.id ?? 'receipt'}.png`, 'image/png');
                else shareImageFallback();
              }}
            >
              Share Image
            </button>

            <button onClick={onClose} className="mt-auto px-4 py-2 bg-gray-100 rounded-lg">Close</button>
          </div>
        </div>
        {loading && <div className="absolute inset-0 flex items-center justify-center bg-white/60">Processing...</div>}
      </div>
    </div>
  );
}

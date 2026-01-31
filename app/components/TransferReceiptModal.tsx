"use client";

import React, { useRef } from "react";

type ReceiptData = {
  id: string;
  date: string;
  amount: number | string;
  receiverName?: string;
  receiverBank?: string;
  accountNumber?: string;
  description?: string;
  transferType?: string;
};

export default function TransferReceiptModal({
  open,
  onClose,
  receipt,
}: {
  open: boolean;
  onClose: () => void;
  receipt: ReceiptData | null;
}) {
  const receiptRef = useRef<HTMLDivElement | null>(null);

  if (!open || !receipt) return null;

  const handleView = () => {
    const html = generatePrintableHtml(receipt);
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
  };

  const handleDownloadPDF = () => {
    const html = generatePrintableHtml(receipt);
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    // Give the new window a moment to render then call print
    setTimeout(() => {
      w.focus();
      w.print();
    }, 500);
  };

  const handleDownloadImage = async () => {
    const node = receiptRef.current;
    if (!node) return;

    // Create an SVG that embeds the receipt HTML using foreignObject.
    const width = node.offsetWidth || 600;
    const height = node.offsetHeight || 400;
    const serialized = new XMLSerializer().serializeToString(node);
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>` +
      `<foreignObject width='100%' height='100%'>` +
      `<div xmlns='http://www.w3.org/1999/xhtml' style='font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;'>${serialized}</div>` +
      `</foreignObject></svg>`;

    const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `receipt-${receipt.id}.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }, "image/png");
    };
    img.onerror = () => URL.revokeObjectURL(url);
    img.src = url;
  };

  const handleShare = async () => {
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({
          title: `Transfer Receipt - ${receipt.id}`,
          text: `Transfer of ${formatCurrency(receipt.amount)} to ${receipt.receiverName || "recipient"} on ${receipt.date}.`,
        });
      } catch (e) {
        // ignore
      }
    } else {
      // Fallback: open view window
      handleView();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B3B6F] via-[#1e3c72] to-[#2a5298] bg-opacity-90" onClick={onClose} />
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden border-4 border-blue-100">
        <div className="p-0 flex flex-col md:flex-row gap-0">
          <div className="flex-1 flex flex-col items-center justify-center" ref={receiptRef as any}>
            {/* Bank Logo and Name */}
            <div className="w-full flex flex-col items-center justify-center pt-8 pb-2 bg-gradient-to-r from-[#0B3B6F] to-[#2a5298]">
              <img src="/logo.png" alt="Mid-Western Bank Logo" className="h-14 w-14 rounded-full shadow-lg border-2 border-white bg-white object-contain" style={{marginBottom: 8}} />
              <h1 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg">Mid-Western Bank</h1>
            </div>
            <div className="p-8 rounded-lg shadow-inner border border-blue-100 -mt-6 bg-gradient-to-b from-[#f7fbff] to-[#eaf1fb] w-full">
              <h3 className="text-2xl font-bold text-[#0B3B6F] mb-1 tracking-wide">Transfer Receipt</h3>
              <p className="text-sm text-gray-500 mb-4">Transaction ID: <span className="font-medium">{receipt.id}</span></p>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Amount</p>
                  <p className="font-extrabold text-2xl text-[#0B3B6F]">{formatCurrency(receipt.amount)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-medium text-base">{receipt.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Recipient</p>
                  <p className="font-semibold text-base">{receipt.receiverName || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Account</p>
                  <p className="font-semibold text-base">{receipt.accountNumber || "—"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Bank</p>
                  <p className="font-semibold text-base">{receipt.receiverBank || "Mid-Western Bank"}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500">Description</p>
                <p className="text-sm text-gray-800 font-medium">{receipt.description || "—"}</p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-56 flex-shrink-0 flex flex-col gap-3 bg-gradient-to-b from-[#eaf1fb] to-[#f7fbff] p-6 border-l border-blue-100">
            <button onClick={handleShare} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-md hover:bg-indigo-700 transition">Share</button>
            <button onClick={handleView} className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition">View</button>
            <button onClick={handleDownloadImage} className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition">Download Image</button>
            <button onClick={handleDownloadPDF} className="px-4 py-2 bg-white border border-gray-200 rounded-lg font-semibold hover:bg-gray-50 transition">Download PDF</button>
            <button onClick={onClose} className="mt-auto px-4 py-2 bg-gray-100 rounded-lg font-semibold hover:bg-gray-200 transition">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatCurrency(value: number | string | undefined) {
  if (value == null) return "—";
  const num = typeof value === "string" ? parseFloat(value) : value;
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(Number(num));
  } catch (e) {
    return String(value);
  }
}

function generatePrintableHtml(receipt: any) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Receipt</title></head><body style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif; padding:24px;">` +
    `<div style="max-width:720px;margin:0 auto;border:1px solid #e6e6e6;padding:20px;border-radius:8px;">` +
    `<h2 style="color:#0B3B6F;margin:0 0 8px 0;">Transfer Receipt</h2>` +
    `<p style="margin:0 0 16px 0;color:#555">Transaction ID: <strong>${receipt.id}</strong></p>` +
    `<p style="margin:0 0 8px 0"><strong>Amount:</strong> ${formatCurrency(receipt.amount)}</p>` +
    `<p style="margin:0 0 8px 0"><strong>Date:</strong> ${receipt.date}</p>` +
    `<p style="margin:0 0 8px 0"><strong>Recipient:</strong> ${receipt.receiverName || '—'}</p>` +
    `<p style="margin:0 0 8px 0"><strong>Account:</strong> ${receipt.accountNumber || '—'}</p>` +
    `<p style="margin:0 0 8px 0"><strong>Description:</strong> ${receipt.description || '—'}</p>` +
    `</div></body></html>`;
  return html;
}

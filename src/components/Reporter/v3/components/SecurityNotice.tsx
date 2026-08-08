"use client";

import {
  ShieldAlert,
  ShieldCheck,
  Phone,
  AlertTriangle,
} from "lucide-react";

export default function SecurityNotice() {
  const notices = [
    "This card remains the property of AGS NEWS.",
    "Return immediately if found.",
    "Misuse or unauthorized use is strictly prohibited.",
    "QR verification confirms authenticity.",
  ];

  return (
    <section className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-red-700 via-red-800 to-red-900 px-4 py-2">
        <div className="flex items-center gap-2">
          <ShieldAlert
            size={18}
            className="text-yellow-300"
          />

          <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
            Security Notice
          </h3>
        </div>

        <ShieldCheck
          size={18}
          className="text-emerald-300"
        />
      </div>

      {/* Content */}
      <div className="space-y-2 p-4">
        {notices.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-2 rounded-lg bg-gray-50 px-3 py-2"
          >
            <AlertTriangle
              size={14}
              className="mt-0.5 shrink-0 text-red-600"
            />

            <span className="text-[10px] leading-relaxed text-gray-700">
              {item}
            </span>
          </div>
        ))}
      </div>

      {/* Emergency Contact */}
      <div className="border-t border-gray-200 bg-red-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Phone
            size={15}
            className="text-red-700"
          />

          <span className="text-[10px] font-bold uppercase tracking-wider text-red-800">
            Emergency Contact
          </span>
        </div>

        <div className="mt-2 rounded-lg bg-white px-3 py-2 shadow-sm">
          <p className="text-[11px] font-semibold text-gray-900">
            AGS NEWS Head Office
          </p>

          <p className="text-[10px] text-gray-600">
            +91 XXXXX XXXXX
          </p>

          <p className="text-[10px] text-gray-600">
            support@agsnews.in
          </p>
        </div>
      </div>

      {/* Footer Strip */}
      <div className="bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 px-3 py-1">
        <p className="text-center text-[8px] font-bold uppercase tracking-[0.3em] text-red-900">
          Official Press Identification
        </p>
      </div>
    </section>
  );
}
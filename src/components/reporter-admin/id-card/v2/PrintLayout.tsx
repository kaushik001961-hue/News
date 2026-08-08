"use client";

import React from "react";

interface Props {
  front: React.ReactNode;
  back: React.ReactNode;
}

const CARD_WIDTH = "w-[340px]";
const CARD_HEIGHT = "h-[540px]";

const CARD_CLASS = `
  print-card
  ${CARD_WIDTH}
  ${CARD_HEIGHT}
  overflow-hidden
  rounded-[22px]
  bg-white
  shadow-2xl
  flex
  flex-col
`;

export default function PrintLayout({
  front,
  back,
}: Props) {
  return (
    <>
      <style jsx global>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }

          .no-print {
            display: none !important;
          }

          .print-page {
            width: 210mm;
            min-height: 297mm;
            padding: 12mm;
            background: white;
            page-break-after: always;
          }

          .print-card {
            break-inside: avoid;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="print-page mx-auto max-w-[1100px] rounded-3xl bg-white p-8 shadow-xl">

        {/* Heading */}

        <div className="no-print mb-8 text-center">

          <h2 className="text-3xl font-black text-slate-900">
            AGS NEWS Press Card
          </h2>

          <p className="mt-2 text-slate-500">
            Professional PVC Card Print Layout (CR80)
          </p>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* FRONT */}

          <section className="flex flex-col items-center">

            <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-slate-500">
              Front Side
            </div>

            <CropMarks>

              <div className={CARD_CLASS}>
                {front}
              </div>

            </CropMarks>

          </section>

          {/* BACK */}

          <section className="flex flex-col items-center">

            <div className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-slate-500">
              Back Side
            </div>

            <CropMarks>

              <div className={CARD_CLASS}>
                {back}
              </div>

            </CropMarks>

          </section>

        </div>

        {/* Notes */}

        <div className="no-print mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">

          <h3 className="mb-3 text-lg font-bold">
            Printing Instructions
          </h3>

          <ul className="space-y-2 text-sm text-slate-600">

            <li>• Card Size: CR80 (86 × 54 mm)</li>

            <li>• Material: PVC</li>

            <li>• Print at 300 DPI or higher</li>

            <li>• Gloss or Matte Lamination</li>

            <li>• Keep crop marks outside trim area</li>

          </ul>

        </div>

      </div>
    </>
  );
}

function CropMarks({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative inline-block p-5">

      {/* Top Left */}
      <span className="absolute left-0 top-0 h-5 w-[2px] bg-black" />
      <span className="absolute left-0 top-0 h-[2px] w-5 bg-black" />

      {/* Top Right */}
      <span className="absolute right-0 top-0 h-5 w-[2px] bg-black" />
      <span className="absolute right-0 top-0 h-[2px] w-5 bg-black" />

      {/* Bottom Left */}
      <span className="absolute bottom-0 left-0 h-5 w-[2px] bg-black" />
      <span className="absolute bottom-0 left-0 h-[2px] w-5 bg-black" />

      {/* Bottom Right */}
      <span className="absolute bottom-0 right-0 h-5 w-[2px] bg-black" />
      <span className="absolute bottom-0 right-0 h-[2px] w-5 bg-black" />

      {children}

    </div>
  );
}
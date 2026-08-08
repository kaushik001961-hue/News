"use client";

import { Download } from "lucide-react";
import { useState } from "react";

interface Props {
  onExportCSV: () => void;
  onExportExcel: () => void;
  onExportPDF: () => void;
}

export default function ExportButton({
  onExportCSV,
  onExportExcel,
  onExportPDF,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 hover:bg-slate-50"
      >
        <Download size={18} />
        Export
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl border bg-white shadow-lg">

          <button
            onClick={() => {
              onExportCSV();
              setOpen(false);
            }}
            className="block w-full px-4 py-3 text-left hover:bg-slate-50"
          >
            Export CSV
          </button>

          <button
            onClick={() => {
              onExportExcel();
              setOpen(false);
            }}
            className="block w-full px-4 py-3 text-left hover:bg-slate-50"
          >
            Export Excel
          </button>

          <button
            onClick={() => {
              onExportPDF();
              setOpen(false);
            }}
            className="block w-full px-4 py-3 text-left hover:bg-slate-50"
          >
            Export PDF
          </button>

        </div>
      )}

    </div>
  );
}
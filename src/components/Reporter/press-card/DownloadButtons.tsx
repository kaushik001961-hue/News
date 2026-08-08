"use client";

import { useRef, useState } from "react";
import { Download, Printer, FileText, Loader2 } from "lucide-react";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";

interface Props {
  targetRef: React.RefObject<HTMLDivElement | null>;
  fileName?: string;
}

export default function DownloadButtons({
  targetRef,
  fileName = "press-card",
}: Props) {
  const [loading, setLoading] = useState<
    "png" | "pdf" | null
  >(null);

  async function downloadPNG() {
    if (!targetRef.current) return;

    try {
      setLoading("png");

      const dataUrl = await toPng(targetRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const link = document.createElement("a");

      link.download = `${fileName}.png`;
      link.href = dataUrl;

      link.click();
    } finally {
      setLoading(null);
    }
  }

  async function downloadPDF() {
    if (!targetRef.current) return;

    try {
      setLoading("pdf");

      const dataUrl = await toPng(targetRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(
        dataUrl,
        "PNG",
        10,
        15,
        277,
        175
      );

      pdf.save(`${fileName}.pdf`);
    } finally {
      setLoading(null);
    }
  }

  function printCard() {
    window.print();
  }

  return (
    <div className="flex flex-wrap gap-4">

      <button
        onClick={printCard}
        className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
      >
        <Printer size={18} />
        Print Card
      </button>

      <button
        disabled={loading !== null}
        onClick={downloadPNG}
        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {loading === "png" ? (
          <Loader2
            size={18}
            className="animate-spin"
          />
        ) : (
          <Download size={18} />
        )}

        Download PNG
      </button>

      <button
        disabled={loading !== null}
        onClick={downloadPDF}
        className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
      >
        {loading === "pdf" ? (
          <Loader2
            size={18}
            className="animate-spin"
          />
        ) : (
          <FileText size={18} />
        )}

        Download PDF
      </button>

    </div>
  );
}
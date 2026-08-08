"use client";

import { useRef, useState, ReactNode } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

import {
  Download,
  Printer,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

import ReporterIdCardFrontV2 from "./ReporterIdCardFrontV2";
import ReporterIdCardBackV2 from "./ReporterIdCardBackV2";

// Inline PrintLayout fallback component
function PrintLayout({
  front,
  back,
}: {
  front: ReactNode;
  back: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <div>{front}</div>
      <div>{back}</div>
    </div>
  );
}

interface PressCard {
  cardNumber?: string | null;
  expiryDate?: Date | string | null;
}

export interface ReporterCardData {
  id: string;
  reporterId: string;
  firstName: string;
  lastName: string;

  designation?: string | null;
  photo?: string | null;
  bloodGroup?: string | null;

  phone?: string | null;
  email?: string | null;

  district?: string | null;
  state?: string | null;

  approvedAt?: Date | string | null;
  status?: string | null;

  PressCard?: PressCard | null;
}

interface Props {
  reporter: ReporterCardData;
}

const CARD_WIDTH = 54;
const CARD_HEIGHT = 86;

export default function ReporterIdCardV2({
  reporter,
}: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  async function downloadPNG() {
    if (!printRef.current) return;

    try {
      setLoading(true);

      const image = await toPng(printRef.current, {
        pixelRatio: 4,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = `${reporter.reporterId}-press-card.png`;
      link.href = image;
      link.click();
    } finally {
      setLoading(false);
    }
  }

  async function downloadPDF() {
    if (!frontRef.current || !backRef.current) return;

    try {
      setLoading(true);

      const front = await toPng(frontRef.current, {
        pixelRatio: 4,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      const back = await toPng(backRef.current, {
        pixelRatio: 4,
        cacheBust: true,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const margin = 12;

      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, 297, 210, "F");

      pdf.addImage(
        front,
        "PNG",
        margin,
        margin,
        CARD_WIDTH,
        CARD_HEIGHT
      );

      pdf.addImage(
        back,
        "PNG",
        margin + CARD_WIDTH + 15,
        margin,
        CARD_WIDTH,
        CARD_HEIGHT
      );

      pdf.save(
        `${reporter.reporterId}-press-card.pdf`
      );
    } finally {
      setLoading(false);
    }
  }

  const frontCard = (
    <div ref={frontRef}>
      <ReporterIdCardFrontV2 reporter={reporter as any} />
    </div>
  );

  const backCard = (
    <div ref={backRef}>
      <ReporterIdCardBackV2 reporter={reporter as any} />
    </div>
  );

  return (
    <div className="space-y-8">

      {/* Toolbar */}

      <div className="no-print flex flex-wrap justify-end gap-3">

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold shadow-sm transition hover:bg-slate-100"
        >
          <Printer size={18} />
          Print
        </button>

        <button
          disabled={loading}
          onClick={downloadPNG}
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <ImageIcon size={18} />
          )}

          Download PNG
        </button>

        <button
          disabled={loading}
          onClick={downloadPDF}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <Download size={18} />
          )}

          Download PDF
        </button>

      </div>

      {/* Print Layout */}

      <div ref={printRef}>
        <PrintLayout
          front={frontCard}
          back={backCard}
        />
      </div>

    </div>
  );
}
"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

import ReporterIdCardFront from "./ReporterIdCardFront";
import ReporterIdCardBack from "./ReporterIdCardBack";

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
  PressCard?: PressCard | null;
}

interface Props {
  reporter: ReporterCardData;
}

const CARD_WIDTH = 86;
const CARD_HEIGHT = 54;

export default function ReporterIdCard({ reporter }: Props) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);

  async function exportPdf() {
    if (!frontRef.current || !backRef.current) return;

    try {
      setLoading(true);

      const front = await toPng(frontRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const back = await toPng(backRef.current, {
        cacheBust: true,
        pixelRatio: 3,
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const margin = 12;

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
        margin + CARD_WIDTH + 10,
        margin,
        CARD_WIDTH,
        CARD_HEIGHT
      );

      pdf.save(`${reporter.reporterId}-id-card.pdf`);
    } catch (err) {
      console.error(err);
      alert("Unable to generate PDF.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-end">
        <button
          onClick={exportPdf}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Download PDF"}
        </button>
      </div>

      <div className="flex flex-wrap gap-8 justify-center">

        <div ref={frontRef}>
          <ReporterIdCardFront reporter={reporter as any} />
        </div>

        <div ref={backRef}>
          <ReporterIdCardBack reporter={reporter as any} />
        </div>

      </div>

    </div>
  );
}
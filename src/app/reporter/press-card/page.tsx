"use client";

import { useEffect, useRef, useState } from "react";
import { Printer, Download } from "lucide-react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import ReporterIdCardV5 from "@/components/Reporter/v5/ReporterIdCardV5";
import { ReporterCardData } from "@/components/Reporter/v5/types";
import PressCard from "@/components/Reporter/press-card/PressCard";
import { PressCardData } from "@/components/Reporter/press-card/types";

export default function ReporterPressCardPage() {
  const [data, setData] = useState<ReporterCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadPressCard();
  }, []);

  async function loadPressCard() {
    try {
      const res = await fetch("/api/reporter/press-card");
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Unable to load Press Card");
        return;
      }

      setData(json);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  function printCard() {
    window.print();
  }

  async function downloadCard() {
    if (!cardRef.current || !data) return;

    try {
      const image = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(image);
      const pdfWidth = 190;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(image, "PNG", 10, 10, pdfWidth, pdfHeight);
      pdf.save(`${data.reporterId}-PressCard.pdf`);
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF.");
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Loading Press Card...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-xl rounded-xl bg-white p-10 shadow">
        <h1 className="mb-3 text-2xl font-bold">Press Card</h1>
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-6">
          <h2 className="font-semibold text-yellow-800">Press Card Not Available</h2>
          <p className="mt-2 text-sm text-yellow-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Digital Press Card</h1>
          <p className="text-gray-500">Official AGS NEWS Reporter Identity Card</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={printCard}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            onClick={downloadCard}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
          >
            <Download size={18} />
            Download PDF
          </button>
        </div>
      </div>

      <div ref={cardRef} className="flex justify-center">
        <ReporterIdCardV5 reporter={data} />
      </div>
    </div>
  );
}
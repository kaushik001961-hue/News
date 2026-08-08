"use client";

import Image from "next/image";
import {
  BadgeCheck,
  Stamp,
  PenTool,
} from "lucide-react";

import { ReporterCardData } from "../ReporterIdCardV3";

interface AuthoritySignatureProps {
  reporter: ReporterCardData;
}

export default function AuthoritySignature({
  reporter,
}: AuthoritySignatureProps) {
  return (
    <section className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-gradient-to-r from-red-700 via-red-800 to-red-900 px-4 py-2">
        <div className="flex items-center gap-2">
          <PenTool
            size={16}
            className="text-yellow-300"
          />

          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">
            Authorization
          </span>
        </div>

        <BadgeCheck
          size={18}
          className="text-emerald-300"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Signature */}
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-full items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
            {reporter.authority ? (
              <Image
                src={reporter.authority}
                alt="Authority Signature"
                width={110}
                height={50}
                className="object-contain"
              />
            ) : (
              <span className="text-xs italic text-gray-400">
                Signature
              </span>
            )}
          </div>

          <div className="mt-2 border-t border-gray-300 pt-1 text-center w-full">
            <p className="text-[10px] font-bold uppercase tracking-wide text-gray-800">
              Authorized Signatory
            </p>

            <p className="text-[9px] text-gray-500">
              AGS NEWS
            </p>
          </div>
        </div>

        {/* Seal */}
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-red-700 bg-red-50 shadow-inner">
            <Stamp
              size={34}
              className="text-red-700"
            />
          </div>

          <div className="mt-2 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wide text-gray-800">
              Official Seal
            </p>

            <p className="text-[9px] text-gray-500">
              AGS NEWS MEDIA
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 px-3 py-2">
        <div className="flex items-center justify-center gap-2">
          <BadgeCheck
            size={14}
            className="text-white"
          />

          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-white">
            Digitally Authorized
          </span>
        </div>
      </div>
    </section>
  );
}
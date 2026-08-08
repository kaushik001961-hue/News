"use client";

import type { ReporterCardData } from "../ReporterIdCardV2";
import {
  ShieldCheck,
  BadgeCheck,
  CreditCard,
} from "lucide-react";

interface Props {
  reporter: ReporterCardData;
}

export default function BackHeader({
  reporter,
}: Props) {
  return (
    <div className="px-3 pt-3">

      <div className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">

        {/* Top */}

        <div className="flex items-center gap-3 px-3 py-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg">

            <ShieldCheck
              size={22}
              className="text-red-700"
            />

          </div>

          <div className="flex-1">

            <h2 className="text-base font-extrabold tracking-wide text-white">
              AGS NEWS
            </h2>

            <p className="text-[9px] uppercase tracking-[0.25em] text-red-100">
              PRESS IDENTITY CARD
            </p>

          </div>

          <BadgeCheck
            size={22}
            className="text-yellow-300"
          />

        </div>

        {/* Gold Divider */}

        <div className="h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent" />

        {/* Bottom */}

        <div className="grid grid-cols-2 gap-3 px-3 py-2">

          <div>

            <p className="text-[8px] uppercase tracking-wider text-red-100">
              Reporter ID
            </p>

            <p className="mt-1 text-[10px] font-bold text-white">
              {reporter.reporterId}
            </p>

          </div>

          <div className="flex justify-end">

            <div className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1">

              <CreditCard
                size={12}
                className="text-yellow-300"
              />

              <div>

                <p className="text-[7px] uppercase tracking-widest text-red-100">
                  Card No.
                </p>

                <p className="text-[9px] font-bold text-white">
                  {reporter.PressCard?.cardNumber ?? "N/A"}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
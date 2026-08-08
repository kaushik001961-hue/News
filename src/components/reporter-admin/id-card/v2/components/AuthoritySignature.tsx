"use client";

import {
  BadgeCheck,
  Stamp,
  ShieldCheck,
} from "lucide-react";

export default function AuthoritySignature() {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md">

      {/* Header */}

      <div className="mb-3 flex items-center justify-between">

        <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white">
          Authorization
        </h3>

        <ShieldCheck
          size={16}
          className="text-yellow-300"
        />

      </div>

      {/* Signature & Seal */}

      <div className="grid grid-cols-2 gap-3">

        {/* Signature */}

        <div className="rounded-lg border border-white/10 bg-white/5 p-2">

          <div className="flex h-10 items-center justify-center rounded-md border border-dashed border-white/30">

            <BadgeCheck
              size={18}
              className="text-yellow-300"
            />

          </div>

          <div className="mt-2 border-t border-white/30" />

          <p className="mt-1 text-center text-[8px] font-semibold uppercase tracking-widest text-white">
            Authorized Signatory
          </p>

        </div>

        {/* Official Seal */}

        <div className="rounded-lg border border-white/10 bg-white/5 p-2">

          <div className="flex h-10 items-center justify-center">

            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-yellow-300 bg-yellow-300/10">

              <Stamp
                size={16}
                className="text-yellow-300"
              />

            </div>

          </div>

          <p className="mt-2 text-center text-[8px] font-semibold uppercase tracking-widest text-white">
            Official Seal
          </p>

        </div>

      </div>

      {/* Security Strip */}

      <div className="mt-3 rounded-lg border border-green-400/20 bg-green-500/10 px-3 py-2">

        <div className="flex items-center gap-2">

          <ShieldCheck
            size={13}
            className="text-green-300"
          />

          <p className="text-[8px] leading-3 text-green-100">
            This identity card is valid only when it bears the
            official signature and seal of AGS NEWS.
          </p>

        </div>

      </div>

    </div>
  );
}
"use client";

import {
  Globe,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

export default function BackFooter() {
  return (
    <footer className="mt-2 rounded-t-xl border-t border-white/20 bg-gradient-to-r from-black/30 via-black/20 to-black/30 px-3 py-2 backdrop-blur-md">

      {/* Contact */}

      <div className="grid grid-cols-3 gap-2">

        <div className="flex flex-col items-center">

          <Globe
            size={11}
            className="mb-1 text-yellow-300"
          />

          <span className="text-[7px] font-medium text-white/90">
            agsnews.in
          </span>

        </div>

        <div className="flex flex-col items-center">

          <Mail
            size={11}
            className="mb-1 text-yellow-300"
          />

          <span className="text-[7px] font-medium text-white/90">
            info@agsnews.in
          </span>

        </div>

        <div className="flex flex-col items-center">

          <Phone
            size={11}
            className="mb-1 text-yellow-300"
          />

          <span className="text-[7px] font-medium text-white/90">
            +91 XXXXX XXXXX
          </span>

        </div>

      </div>

      {/* Divider */}

      <div className="my-2 h-px bg-gradient-to-r from-transparent via-yellow-300/60 to-transparent" />

      {/* Bottom */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-1">

          <ShieldCheck
            size={10}
            className="text-green-300"
          />

          <span className="text-[7px] uppercase tracking-wider text-green-200">
            Verified Press
          </span>

        </div>

        <div className="text-right">

          <p className="text-[8px] font-bold tracking-[0.2em] text-white">
            AGS NEWS
          </p>

          <p className="text-[6px] text-white/70">
            © {new Date().getFullYear()} All Rights Reserved
          </p>

        </div>

      </div>

    </footer>
  );
}
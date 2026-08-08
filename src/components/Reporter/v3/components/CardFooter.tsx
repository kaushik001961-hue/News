"use client";

import {
  Globe,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

interface CardFooterProps {
  website?: string;
  email?: string;
  phone?: string;
}

export default function CardFooter({
  website = "www.agsnews.in",
  email = "info@agsnews.in",
  phone = "+91 XXXXX XXXXX",
}: CardFooterProps) {
  return (
    <footer className="relative overflow-hidden border-t border-white/15">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-red-900 to-red-950" />

      {/* Gold Top Border */}
      <div className="absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />

      {/* Content */}
      <div className="relative z-10 px-4 py-3">
        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-1.5 text-white">
          <div className="flex items-center gap-2">
            <Globe
              size={11}
              className="text-yellow-300"
            />

            <span className="text-[9px] font-medium">
              {website}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Mail
              size={11}
              className="text-yellow-300"
            />

            <span className="text-[9px] font-medium">
              {email}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Phone
              size={11}
              className="text-yellow-300"
            />

            <span className="text-[9px] font-medium">
              {phone}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-2 h-px bg-white/15" />

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck
              size={12}
              className="text-emerald-300"
            />

            <span className="text-[8px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
              Secure ID
            </span>
          </div>

          <span className="text-[8px] text-red-100">
            © {new Date().getFullYear()} AGS NEWS
          </span>
        </div>
      </div>
    </footer>
  );
}
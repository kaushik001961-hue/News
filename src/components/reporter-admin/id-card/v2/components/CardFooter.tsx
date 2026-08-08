"use client";

interface CardFooterProps {
  reporter: {
    organization?: string;
    website?: string;
    email?: string;
    phone?: string;
  };
}

export default function CardFooter({
  reporter,
}: CardFooterProps) {
  const organization =
    reporter.organization || "AGS NEWS";

  const website =
    reporter.website || "www.agsnews.in";

  const email =
    reporter.email || "info@agsnews.in";

  const phone =
    reporter.phone || "+91 98765 43210";

  return (
    <footer className="relative mt-auto">

      {/* Top Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="bg-black/25 px-4 py-3 backdrop-blur-sm">

        <div className="grid grid-cols-3 gap-2 text-center">

          <div>
            <p className="text-[8px] uppercase tracking-[2px] text-amber-200">
              Website
            </p>

            <p className="mt-1 text-[9px] font-semibold text-white">
              {website}
            </p>
          </div>

          <div>
            <p className="text-[8px] uppercase tracking-[2px] text-red-100">
              Contact
            </p>

            <p className="mt-1 text-[9px] font-semibold text-white">
              {phone}
            </p>
          </div>

          <div>
            <p className="text-[8px] uppercase tracking-[2px] text-red-100">
              Email
            </p>

            <p className="mt-1 truncate text-[9px] font-semibold text-white">
              {email}
            </p>
          </div>

        </div>

        <div className="mt-3 text-center">

          <p className="text-[8px] uppercase tracking-[3px] text-white/70">
            © {new Date().getFullYear()} {organization}
          </p>

        </div>

      </div>

      {/* Security Strip */}
     <div className="bg-gradient-to-r from-[#7F1D1D] via-[#B91C1C] to-[#991B1B]">

        <p className="whitespace-nowrap text-center text-[7px] font-bold uppercase tracking-[3px] text-white/90">
          OFFICIAL PRESS • AUTHORIZED MEDIA • AGS NEWS • OFFICIAL PRESS • AUTHORIZED MEDIA
        </p>

      </div>

    </footer>
  );
}
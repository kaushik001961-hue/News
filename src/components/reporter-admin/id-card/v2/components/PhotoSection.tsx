"use client";

import Image from "next/image";

interface PhotoSectionProps {
  reporter: {
    firstName?: string;
    lastName?: string;
    photo?: string | null;
    profileImage?: string | null;
  };
}

export default function PhotoSection({
  reporter,
}: PhotoSectionProps) {
  const imageSrc =
    reporter.photo ||
    reporter.profileImage ||
    "/images/default-avatar.png";

  const fullName = [reporter.firstName, reporter.lastName]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col items-center">

      {/* Photo Frame */}
      <div className="relative h-40 w-32 overflow-hidden rounded-xl border-[3px] border-white bg-white shadow-xl">

        <Image
          src={imageSrc}
          alt={fullName || "Reporter"}
          fill
          sizes="128px"
          className="object-cover"
          priority
        />

      </div>

      {/* Caption */}
      <div className="mt-2 w-full rounded-lg bg-black/25 px-2 py-1 text-center backdrop-blur-sm">

        <p className="truncate text-xs font-bold uppercase tracking-wide text-white">
          {fullName || "Reporter"}
        </p>

      </div>

    </div>
  );
}
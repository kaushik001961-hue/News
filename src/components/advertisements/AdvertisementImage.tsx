"use client";

import { useState } from "react";

interface AdvertisementImageProps {
  src: string;
  alt?: string;
}

export default function AdvertisementImage({
  src,
  alt = "Advertisement",
}: AdvertisementImageProps) {
  const [hasError, setHasError] =
    useState(false);

  if (
    !src ||
    src.trim() === "" ||
    hasError
  ) {
    return (
      <div className="flex min-h-[90px] w-full items-center justify-center bg-slate-100 px-2 text-center">
        <span className="text-xs font-medium text-slate-400">
          Advertisement
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="block h-auto max-h-[600px] w-full object-contain"
      loading="lazy"
      onError={() => {
        setHasError(true);
      }}
    />
  );
}
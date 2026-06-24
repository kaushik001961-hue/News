"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    fetch("/api/analytics/track", {
      method: "POST",
      body: JSON.stringify({
        path: pathname,
      }),
    });
  }, [pathname]);

  return null;
}
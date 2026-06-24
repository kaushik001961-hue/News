"use client";

import { useEffect } from "react";

export default function AdTracker({
  adId,
}: {
  adId: string;
}) {
  useEffect(() => {
    fetch(
      `/api/ads/${adId}/impression`,
      {
        method: "POST",
      }
    );
  }, [adId]);

  return null;
}
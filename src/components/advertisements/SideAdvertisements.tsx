"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Advertisement {
  id: string;
  title: string;
  image: string | null;
  htmlCode: string | null;
  targetUrl: string | null;
}

interface SideAdvertisementData {
  left: Advertisement | null;
  right: Advertisement | null;
}

export default function SideAdvertisements() {
  const [ads, setAds] =
    useState<SideAdvertisementData>({
      left: null,
      right: null,
    });

  const [visible, setVisible] =
    useState(false);

  /* =====================================================
     LOAD SIDE ADVERTISEMENTS
  ===================================================== */

  useEffect(() => {
    let mounted = true;

    async function loadAdvertisements() {
      try {
        const response = await fetch(
          "/api/advertisements/sidebar",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          console.error(
            "Sidebar advertisement API failed:",
            response.status
          );

          return;
        }

        const data =
          (await response.json()) as SideAdvertisementData;

        if (!mounted) {
          return;
        }

        setAds({
          left: data.left ?? null,
          right: data.right ?? null,
        });
      } catch (error) {
        console.error(
          "Failed to load side advertisements:",
          error
        );
      }
    }

    loadAdvertisements();

    return () => {
      mounted = false;
    };
  }, []);

  /* =====================================================
     SLIDE IN / SLIDE OUT
  ===================================================== */

  useEffect(() => {
    if (!ads.left && !ads.right) {
      setVisible(false);
      return;
    }

    const showTimer =
      window.setTimeout(() => {
        setVisible(true);
      }, 500);

    const hideTimer =
      window.setTimeout(() => {
        setVisible(false);
      }, 8500);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [ads]);

  /* =====================================================
     NOTHING TO DISPLAY
  ===================================================== */

  if (!ads.left && !ads.right) {
    return null;
  }

  return (
    <>
      {/* =================================================
          LEFT VERTICAL SIDEBAR AD
      ================================================= */}

      {ads.left && (
        <div
          className={[
            "pointer-events-none",
            "fixed",
            "left-0",
            "top-1/2",
            "z-[9990]",
            "-translate-y-1/2",

            /*
              Hide on mobile/tablet.
              Show only on large desktop screens.
            */
            "hidden",
            "lg:block",

            /*
              Animation
            */
            "transition-all",
            "duration-1000",
            "ease-in-out",

            visible
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0",
          ].join(" ")}
        >
          <AdvertisementContent
            advertisement={ads.left}
          />
        </div>
      )}

      {/* =================================================
          RIGHT VERTICAL SIDEBAR AD
      ================================================= */}

      {ads.right && (
        <div
          className={[
            "pointer-events-none",
            "fixed",
            "right-0",
            "top-1/2",
            "z-[9990]",
            "-translate-y-1/2",

            /*
              Hide on mobile/tablet.
              Show only on large desktop screens.
            */
            "hidden",
            "lg:block",

            /*
              Animation
            */
            "transition-all",
            "duration-1000",
            "ease-in-out",

            visible
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0",
          ].join(" ")}
        >
          <AdvertisementContent
            advertisement={ads.right}
          />
        </div>
      )}
    </>
  );
}

/* =======================================================
   VERTICAL ADVERTISEMENT CONTENT
======================================================= */

function AdvertisementContent({
  advertisement,
}: {
  advertisement: Advertisement;
}) {
  if (
    !advertisement.image &&
    !advertisement.htmlCode
  ) {
    return null;
  }

  /*
    TRUE VERTICAL SIDEBAR SIZE

    Desktop:
      width  = 210px
      height = 650px

    Large desktop:
      width  = 220px
      height = 680px
  */

  const content = advertisement.htmlCode ? (
    <div
      className="
        h-[650px]
        w-[210px]
        overflow-hidden
        rounded-xl
        bg-white
        shadow-2xl
        lg:h-[680px]
        lg:w-[220px]
      "
      dangerouslySetInnerHTML={{
        __html: advertisement.htmlCode,
      }}
    />
  ) : advertisement.image ? (
   <div
  className="
    relative
    h-[600px]
    w-[165px]
    overflow-hidden
    rounded-xl
    bg-white
    shadow-2xl
    lg:h-[640px]
    lg:w-[180px]
  "
>
  <Image
    src={advertisement.image}
    alt={
      advertisement.title ||
      "Advertisement"
    }
    fill
    sizes="180px"
    className="
      object-cover
      object-center
    "
    unoptimized
    priority
  />

  <div
    className="
      pointer-events-none
      absolute
      left-2
      top-2
      rounded-md
      bg-black/65
      px-2
      py-1
      text-[9px]
      font-bold
      uppercase
      tracking-wide
      text-white
      backdrop-blur-sm
    "
  >
    Advertisement
  </div>
</div>
  ) : null;

  if (!content) {
    return null;
  }

  /*
    CLICKABLE AD
  */

  if (advertisement.targetUrl) {
    return (
      <a
        href={advertisement.targetUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label={
          advertisement.title ||
          "Advertisement"
        }
        className="
          pointer-events-auto
          block
        "
      >
        {content}
      </a>
    );
  }

  return (
    <div className="pointer-events-auto">
      {content}
    </div>
  );
}
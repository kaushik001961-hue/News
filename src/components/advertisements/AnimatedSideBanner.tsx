"use client";

import { useEffect, useState } from "react";

interface AnimatedSideBannerProps {
  image?: string | null;
  htmlCode?: string | null;
  targetUrl?: string | null;
  title: string;
  side: "left" | "right";
}

/* =========================================================
   ANIMATED SIDE BANNER

   Animation sequence:

   1. Start outside screen
   2. Slide into screen
   3. Stay visible
   4. Slide outside screen
   5. Wait
   6. Repeat

   LEFT:
   translateX(-120%)

   RIGHT:
   translateX(120%)
========================================================= */

export default function AnimatedSideBanner({
  image,
  htmlCode,
  targetUrl,
  title,
  side,
}: AnimatedSideBannerProps) {
  const [visible, setVisible] =
    useState(false);

  /* =======================================================
     ANIMATION LOOP
  ======================================================= */

  useEffect(() => {
    let timer: ReturnType<
      typeof setTimeout
    >;

    let mounted = true;

    function startAnimation() {
      if (!mounted) {
        return;
      }

      /* -----------------------------------------------
         SLIDE IN
      ----------------------------------------------- */

      setVisible(true);

      /* -----------------------------------------------
         STAY VISIBLE

         6.5 seconds after entering,
         start sliding out.
      ----------------------------------------------- */

      timer = setTimeout(() => {
        if (!mounted) {
          return;
        }

        setVisible(false);

        /* ---------------------------------------------
           WAIT AFTER SLIDE OUT

           Then start the next cycle.
        --------------------------------------------- */

        timer = setTimeout(() => {
          startAnimation();
        }, 1800);
      }, 6500);
    }

    /* -----------------------------------------------
       Small initial delay

       This makes the first slide-in clearly visible.
    ----------------------------------------------- */

    timer = setTimeout(() => {
      startAnimation();
    }, 300);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  /* =======================================================
     TRANSFORM
  ======================================================= */

  const hiddenTransform =
    side === "left"
      ? "translate3d(-120%, 0, 0)"
      : "translate3d(120%, 0, 0)";

  const currentTransform =
    visible
      ? "translate3d(0, 0, 0)"
      : hiddenTransform;

  /* =======================================================
     COMMON STYLE
  ======================================================= */

  const bannerStyle: React.CSSProperties = {
    transform: currentTransform,
    opacity: visible ? 1 : 0,

    transition:
      "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease",

    willChange:
      "transform, opacity",
  };

  /* =======================================================
     HTML ADVERTISEMENT
  ======================================================= */

  if (htmlCode) {
    const htmlBanner = (
      <div
        className="
          group
          relative
          h-full
          w-full
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
        style={bannerStyle}
        dangerouslySetInnerHTML={{
          __html: htmlCode,
        }}
      />
    );

    if (targetUrl) {
      return (
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          aria-label={title}
          className="
            block
            h-full
            w-full
          "
        >
          {htmlBanner}
        </a>
      );
    }

    return htmlBanner;
  }

  /* =======================================================
     NO IMAGE
  ======================================================= */

  if (!image) {
    return null;
  }

  /* =======================================================
     IMAGE BANNER
  ======================================================= */

  const imageBanner = (
    <div
      className="
        group
        relative
        h-full
        w-full
        overflow-hidden
        rounded-xl
        border
        border-white/40
        bg-white
        shadow-2xl
        ring-1
        ring-black/10
      "
      style={bannerStyle}
    >
      {/* =================================================
          IMAGE
      ================================================= */}

      <img
        src={image}
        alt={title}
        className="
          block
          h-full
          w-full
          object-cover
          object-center
          transition-transform
          duration-[3000ms]
          ease-out
          group-hover:scale-[1.04]
        "
      />

      {/* =================================================
          DARK OVERLAY
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-gradient-to-b
          from-black/10
          via-transparent
          to-black/25
        "
      />

      {/* =================================================
          SHINE

          This uses CSS transition-independent
          animation through a moving element.
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-[-80%]
          w-[35%]
          rotate-12
          bg-white/20
          blur-2xl
          transition-transform
          duration-[1800ms]
          ease-out
          group-hover:translate-x-[500%]
        "
      />

      {/* =================================================
          AD LABEL
      ================================================= */}

      <div
        className="
          absolute
          left-2
          top-2
          rounded-md
          bg-black/60
          px-2
          py-1
          text-[8px]
          font-bold
          uppercase
          tracking-wide
          text-white
          backdrop-blur-sm
        "
      >
        Advertisement
      </div>

      {/* =================================================
          BOTTOM GRADIENT
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-24
          bg-gradient-to-t
          from-black/25
          to-transparent
        "
      />

      {/* =================================================
          SIDE LABEL

          Only visible on hover.
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-3
          left-1/2
          -translate-x-1/2
          rounded-full
          bg-black/60
          px-2
          py-1
          text-[7px]
          font-semibold
          text-white
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
      >
        {side === "left"
          ? "ADVERTISEMENT"
          : "ADVERTISEMENT"}
      </div>
    </div>
  );

  /* =======================================================
     CLICKABLE
  ======================================================= */

  if (targetUrl) {
    return (
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label={title}
        className="
          block
          h-full
          w-full
        "
      >
        {imageBanner}
      </a>
    );
  }

  return imageBanner;
}
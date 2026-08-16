"use client";

import {
  useEffect,
  useState,
} from "react";

interface PopupAdvertisementClientProps {
  id: string;
  title: string;
  image?: string | null;
  htmlCode?: string | null;
  targetUrl?: string | null;
}

export default function PopupAdvertisementClient({
  id,
  title,
  image,
  htmlCode,
  targetUrl,
}: PopupAdvertisementClientProps) {
  const [open, setOpen] = useState(false);

  const [scale, setScale] =
    useState(0.85);

  const [closing, setClosing] =
    useState(false);

  /* =====================================================
     OPEN POPUP
  ===================================================== */

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        setOpen(true);

        /*
         * Start slightly smaller.
         */
        setScale(0.85);

        /*
         * Slowly grow to 1.08.
         */
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setScale(1.08);
          });
        });
      }, 700);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /* =====================================================
     HOLD THEN CLOSE
  ===================================================== */

  useEffect(() => {
    if (!open || closing) {
      return;
    }

    /*
     * Keep the enlarged popup visible
     * for 2 seconds.
     */
    const timer =
      window.setTimeout(() => {
        setClosing(true);

        /*
         * Slowly shrink.
         */
        setScale(0.85);

        /*
         * Remove only after
         * shrink animation finishes.
         */
        window.setTimeout(() => {
          setOpen(false);
          setClosing(false);
        }, 900);
      }, 2000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [open, closing]);

  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        closePopup();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  /* =====================================================
     CLOSE
  ===================================================== */

  function closePopup() {
    if (closing) {
      return;
    }

    setClosing(true);

    setScale(0.85);

    window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 900);
  }

  /* =====================================================
     HIDDEN
  ===================================================== */

  if (!open) {
    return null;
  }

  /* =====================================================
     CONTENT
  ===================================================== */

  let content: React.ReactNode =
    null;

  if (htmlCode) {
    content = (
      <div
        className="
          h-full
          w-full
          overflow-auto
          bg-white
        "
        dangerouslySetInnerHTML={{
          __html: htmlCode,
        }}
      />
    );
  } else if (image) {
    const imageElement = (
      <img
        src={image}
        alt={title}
        className="
          block
          h-full
          w-full
          object-contain
          bg-white
        "
      />
    );

    content = targetUrl ? (
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
        {imageElement}
      </a>
    ) : (
      imageElement
    );
  }

  if (!content) {
    return null;
  }

  /* =====================================================
     POPUP
  ===================================================== */

  return (
    <div
      className="
        fixed
        inset-0
        z-[99999]
        flex
        items-center
        justify-center
        bg-black/70
        p-3
        backdrop-blur-[3px]
        sm:p-5
      "
      style={{
        opacity: closing ? 0 : 1,

        transition:
          "opacity 900ms ease-in-out",

        pointerEvents:
          closing
            ? "none"
            : "auto",
      }}
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          closePopup();
        }
      }}
    >
      {/* =================================================
          POPUP BOX
      ================================================= */}

      <div
        className="
          relative
          aspect-[4/3]
          w-[calc(100vw-24px)]
          max-h-[85vh]
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-[0_25px_100px_rgba(0,0,0,0.65)]
          sm:w-[calc(100vw-40px)]
          md:w-[min(800px,85vw)]
          lg:w-[800px]
        "
        style={{
          transform:
            `scale(${scale})`,

          transition:
            "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)",

          transformOrigin:
            "center center",

          willChange:
            "transform",
        }}
      >
        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={closePopup}
          aria-label="Close advertisement"
          className="
            absolute
            right-2
            top-2
            z-30
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-black/75
            text-2xl
            font-bold
            text-white
            shadow-lg
            transition
            hover:scale-110
            hover:bg-black
          "
        >
          ×
        </button>

        {/* =================================================
            AD CONTENT
        ================================================= */}

        <div className="h-full w-full">
          {content}
        </div>

        {/* =================================================
            LABEL
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-2
            left-1/2
            -translate-x-1/2
            rounded-full
            bg-black/60
            px-3
            py-1
            text-[9px]
            font-semibold
            uppercase
            tracking-wider
            text-white
            backdrop-blur-sm
          "
        >
          Advertisement
        </div>
      </div>
    </div>
  );
}
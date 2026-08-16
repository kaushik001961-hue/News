"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";

interface HeroPost {
  id: string;
  title: string;
  slug: string;
  image?: string | null;
  video?: string | null;
  excerpt?: string | null;
  category?: {
    id?: string;
    name: string;
    slug?: string;
  } | null;
}

interface HeroNewsProps {
  posts: HeroPost[];
}

/* =========================================================
   YOUTUBE URL → EMBED URL
========================================================= */

function getYouTubeEmbedUrl(
  url?: string | null
) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    let videoId = "";

    /* -------------------------------------------------------
       youtube.com/watch?v=...
    ------------------------------------------------------- */

    if (
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtube.com" ||
      parsed.hostname === "m.youtube.com"
    ) {
      videoId =
        parsed.searchParams.get("v") || "";

      /* /shorts/VIDEO_ID */

      if (
        !videoId &&
        parsed.pathname.startsWith("/shorts/")
      ) {
        videoId =
          parsed.pathname.split("/shorts/")[1] ||
          "";
      }

      /* /embed/VIDEO_ID */

      if (
        !videoId &&
        parsed.pathname.startsWith("/embed/")
      ) {
        videoId =
          parsed.pathname.split("/embed/")[1] ||
          "";
      }

      /* /live/VIDEO_ID */

      if (
        !videoId &&
        parsed.pathname.startsWith("/live/")
      ) {
        videoId =
          parsed.pathname.split("/live/")[1] ||
          "";
      }
    }

    /* -------------------------------------------------------
       youtu.be/VIDEO_ID
    ------------------------------------------------------- */

    if (
      parsed.hostname === "youtu.be"
    ) {
      videoId =
        parsed.pathname.replace(
          /^\/+/,
          ""
        );
    }

    if (!videoId) {
      return null;
    }

    /* Remove accidental query/path data */

    videoId =
      videoId.split("&")[0]
        .split("?")[0]
        .split("/")[0];

    if (!videoId) {
      return null;
    }

    return (
      `https://www.youtube.com/embed/${videoId}` +
      `?autoplay=1` +
      `&mute=1` +
      `&rel=0` +
      `&playsinline=1` +
      `&enablejsapi=1`
    );
  } catch {
    return null;
  }
}

/* =========================================================
   HERO NEWS
========================================================= */

export default function HeroNews({
  posts,
}: HeroNewsProps) {
  const [current, setCurrent] =
    useState(0);

  const [muted, setMuted] =
    useState(true);

  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (!posts || posts.length === 0) {
    return null;
  }

  /* =======================================================
     CURRENT POST
  ======================================================= */

  const post =
    posts[current] || posts[0];

  /* =======================================================
     VIDEO
  ======================================================= */

  const videoUrl =
    getYouTubeEmbedUrl(post.video);

  /* =======================================================
     NEXT
  ======================================================= */

  function nextSlide() {
    setCurrent(
      (previous) =>
        (previous + 1) % posts.length
    );
  }

  /* =======================================================
     PREVIOUS
  ======================================================= */

  function previousSlide() {
    setCurrent(
      (previous) =>
        (previous - 1 + posts.length) %
        posts.length
    );
  }

  /* =======================================================
     AUTO SLIDE
     
     IMPORTANT:
     
     Do not automatically move away from a video too
     quickly. Give video users enough time to watch.
  ======================================================= */

  useEffect(() => {
    const currentPost =
      posts[current];

    /*
     * If the current Hero contains a video,
     * allow it to remain visible for longer.
     */
    const delay =
      currentPost?.video
        ? 30000
        : 7000;

    const timer =
      setTimeout(() => {
        setCurrent(
          (previous) =>
            (previous + 1) %
            posts.length
        );
      }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [
    current,
    posts,
  ]);

  /* =======================================================
     VIDEO CHANGE KEY
     
     Changing the iframe key forces YouTube to start
     the new Hero video.
  ======================================================= */

  const videoKey =
    `${post.id}-${current}`;

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-slate-950
      "
    >
      {/* ===================================================
          HERO CONTAINER
      =================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-[1600px]
          overflow-hidden
          bg-black
        "
      >
        {/* =================================================
            MEDIA
        ================================================= */}

        <div
          className="
            relative
            aspect-[16/9]
            min-h-[420px]
            w-full
            overflow-hidden
            sm:min-h-[500px]
            lg:aspect-[21/9]
            lg:min-h-[560px]
          "
        >
          {/* ===============================================
              YOUTUBE VIDEO
          =============================================== */}

          {videoUrl ? (
            <>
              <iframe
                key={videoKey}
                src={videoUrl}
                title={post.title}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  border-0
                  object-cover
                "
                allow="
                  autoplay;
                  encrypted-media;
                  picture-in-picture;
                  fullscreen
                "
                allowFullScreen
              />

              {/* VIDEO OVERLAY */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/20
                  to-black/10
                "
              />

              {/* LIVE VIDEO BADGE */}

              <div
                className="
                  absolute
                  left-4
                  top-4
                  z-20
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-red-600
                  px-4
                  py-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-white
                  shadow-xl
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    animate-pulse
                    rounded-full
                    bg-white
                  "
                />

                Video
              </div>

              {/* AUTOPLAY INFO */}

              <div
                className="
                  absolute
                  right-4
                  top-4
                  z-20
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-black/60
                  px-3
                  py-2
                  text-xs
                  text-white
                  backdrop-blur-sm
                "
              >
                {muted ? (
                  <>
                    <VolumeX size={14} />
                    Muted
                  </>
                ) : (
                  <>
                    <Volume2 size={14} />
                    Sound
                  </>
                )}
              </div>
            </>
          ) : (
            /* =============================================
               FEATURED IMAGE FALLBACK
            ============================================= */

            <Link
              href={`/news/${post.slug}`}
              className="absolute inset-0"
            >
              <Image
                src={
                  post.image ||
                  "/placeholder.jpg"
                }
                alt={post.title}
                fill
                priority
                sizes="
                  100vw
                "
                className="
                  object-cover
                  transition
                  duration-700
                "
              />

              {/* IMAGE OVERLAY */}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/90
                  via-black/30
                  to-transparent
                "
              />
            </Link>
          )}

          {/* =================================================
              TEXT CONTENT
          ================================================= */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              z-20
              px-5
              pb-8
              sm:px-8
              sm:pb-10
              lg:px-12
              lg:pb-12
            "
          >
            <div
              className="
                max-w-4xl
              "
            >
              {/* CATEGORY */}

              {post.category?.name && (
                <div className="mb-3">
                  <span
                    className="
                      inline-flex
                      rounded-full
                      bg-red-600
                      px-4
                      py-2
                      text-xs
                      font-bold
                      uppercase
                      tracking-wide
                      text-white
                    "
                  >
                    {post.category.name}
                  </span>
                </div>
              )}

              {/* VIDEO LABEL */}

              {videoUrl && (
                <div
                  className="
                    mb-3
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  <span
                    className="
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      bg-red-600
                    "
                  >
                    <Play
                      size={13}
                      fill="currentColor"
                    />
                  </span>

                  Video News
                </div>
              )}

              {/* TITLE */}

              <Link
                href={`/news/${post.slug}`}
              >
                <h1
                  className="
                    line-clamp-3
                    text-3xl
                    font-extrabold
                    leading-tight
                    text-white
                    drop-shadow-lg
                    transition
                    hover:text-red-200
                    sm:text-4xl
                    lg:text-5xl
                    xl:text-6xl
                  "
                >
                  {post.title}
                </h1>
              </Link>

              {/* EXCERPT */}

              {post.excerpt && (
                <p
                  className="
                    mt-4
                    line-clamp-2
                    max-w-3xl
                    text-sm
                    leading-6
                    text-white/85
                    sm:text-base
                    sm:leading-7
                  "
                >
                  {post.excerpt}
                </p>
              )}

              {/* READ MORE */}

              <Link
                href={`/news/${post.slug}`}
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-slate-900
                  shadow-xl
                  transition
                  hover:bg-red-600
                  hover:text-white
                "
              >
                {videoUrl
                  ? "Watch News"
                  : "Read Full News"}

                <ChevronRight
                  size={17}
                />
              </Link>
            </div>
          </div>

          {/* =================================================
              PREVIOUS BUTTON
          ================================================= */}

          {posts.length > 1 && (
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous hero news"
              className="
                absolute
                left-4
                top-1/2
                z-30
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-black/60
                text-white
                shadow-xl
                backdrop-blur-sm
                transition
                hover:scale-105
                hover:bg-black/80
              "
            >
              <ChevronLeft
                size={24}
              />
            </button>
          )}

          {/* =================================================
              NEXT BUTTON
          ================================================= */}

          {posts.length > 1 && (
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next hero news"
              className="
                absolute
                right-4
                top-1/2
                z-30
                flex
                h-11
                w-11
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                bg-black/60
                text-white
                shadow-xl
                backdrop-blur-sm
                transition
                hover:scale-105
                hover:bg-black/80
              "
            >
              <ChevronRight
                size={24}
              />
            </button>
          )}

          {/* =================================================
              SLIDE INDICATORS
          ================================================= */}

          {posts.length > 1 && (
            <div
              className="
                absolute
                bottom-5
                right-5
                z-30
                flex
                items-center
                gap-2
                rounded-full
                bg-black/50
                px-3
                py-2
                backdrop-blur-sm
              "
            >
              {posts.map(
                (item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setCurrent(index)
                    }
                    aria-label={`Go to hero news ${
                      index + 1
                    }`}
                    className={`
                      h-2
                      rounded-full
                      transition-all
                      ${
                        index === current
                          ? "w-7 bg-white"
                          : "w-2 bg-white/50"
                      }
                    `}
                  />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
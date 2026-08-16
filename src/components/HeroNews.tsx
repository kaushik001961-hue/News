"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface HeroPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  image?: string | null;
  video?: string | null;
}

interface HeroNewsProps {
  posts: HeroPost[];
}

/* =========================================================
   YOUTUBE URL → EMBED URL
========================================================= */

function getYouTubeEmbedUrl(
  url: string
): string | null {
  try {
    const trimmed = url.trim();

    if (!trimmed) {
      return null;
    }

    /* Already an embed URL */

    if (
      trimmed.includes(
        "youtube.com/embed/"
      )
    ) {
      const separator =
        trimmed.includes("?")
          ? "&"
          : "?";

      return (
        `${trimmed}${separator}` +
        `autoplay=1` +
        `&mute=1` +
        `&rel=0` +
        `&playsinline=1`
      );
    }

    const parsed =
      new URL(trimmed);

    let videoId = "";

    /* youtube.com/watch?v= */

    if (
      parsed.hostname.includes(
        "youtube.com"
      ) &&
      parsed.pathname === "/watch"
    ) {
      videoId =
        parsed.searchParams.get("v") ||
        "";
    }

    /* youtu.be */

    if (
      parsed.hostname ===
      "youtu.be"
    ) {
      videoId =
        parsed.pathname
          .replace(/^\/+/, "")
          .split("/")[0] || "";
    }

    /* youtube.com/live */

    if (
      parsed.hostname.includes(
        "youtube.com"
      ) &&
      parsed.pathname.startsWith(
        "/live/"
      )
    ) {
      videoId =
        parsed.pathname
          .replace("/live/", "")
          .split("/")[0] || "";
    }

    /* youtube.com/shorts */

    if (
      parsed.hostname.includes(
        "youtube.com"
      ) &&
      parsed.pathname.startsWith(
        "/shorts/"
      )
    ) {
      videoId =
        parsed.pathname
          .replace("/shorts/", "")
          .split("/")[0] || "";
    }

    if (!videoId) {
      return null;
    }

    return (
      `https://www.youtube.com/embed/${videoId}` +
      `?autoplay=1` +
      `&mute=1` +
      `&rel=0` +
      `&playsinline=1`
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

  const [isPaused, setIsPaused] =
    useState(false);

  if (!posts || posts.length === 0) {
    return null;
  }

  /* =======================================================
     VIDEO STORIES FIRST
     
     If a video exists, put it into the Hero rotation.
  ======================================================= */

  const orderedPosts =
    useMemo(() => {
      const videoPosts =
        posts.filter(
          (post) =>
            typeof post.video ===
              "string" &&
            post.video.trim() !== ""
        );

      const imagePosts =
        posts.filter(
          (post) =>
            !post.video ||
            post.video.trim() === ""
        );

      return [
        ...videoPosts,
        ...imagePosts,
      ];
    }, [posts]);

  /* =======================================================
     CURRENT POST
  ======================================================= */

  const featured =
    orderedPosts[current] ||
    orderedPosts[0];

  /* =======================================================
     SIDE STORIES
  ======================================================= */

  const sideStories =
    orderedPosts
      .filter(
        (post) =>
          post.id !== featured.id
      )
      .slice(0, 4);

  /* =======================================================
     YOUTUBE URL
  ======================================================= */

  const youtubeEmbedUrl =
    featured.video
      ? getYouTubeEmbedUrl(
          featured.video
        )
      : null;

  /* =======================================================
     AUTOMATIC ROTATION
     
     Image = 7 seconds
     Video = 15 seconds
  ======================================================= */

  useEffect(() => {
    if (
      isPaused ||
      orderedPosts.length <= 1
    ) {
      return;
    }

    const delay =
      youtubeEmbedUrl
        ? 15000
        : 7000;

    const timer =
      window.setTimeout(() => {
        setCurrent(
          (previous) =>
            (previous + 1) %
            orderedPosts.length
        );
      }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    current,
    youtubeEmbedUrl,
    isPaused,
    orderedPosts.length,
  ]);

  /* =======================================================
     NEXT
  ======================================================= */

  function nextSlide() {
    setCurrent(
      (previous) =>
        (previous + 1) %
        orderedPosts.length
    );
  }

  /* =======================================================
     PREVIOUS
  ======================================================= */

  function previousSlide() {
    setCurrent(
      (previous) =>
        (previous -
          1 +
          orderedPosts.length) %
        orderedPosts.length
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      className="mx-auto max-w-7xl px-4 pt-2 pb-6"
      onMouseEnter={() =>
        setIsPaused(true)
      }
      onMouseLeave={() =>
        setIsPaused(false)
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">

        {/* =================================================
            MAIN HERO
        ================================================= */}

        <div className="group lg:col-span-2">
          <div className="relative h-[480px] overflow-hidden rounded-3xl bg-black md:h-[520px]">

            {/* =============================================
                YOUTUBE VIDEO
            ============================================= */}

            {youtubeEmbedUrl ? (
              <iframe
                key={`${featured.id}-${current}`}
                src={youtubeEmbedUrl}
                title={featured.title}
                className="absolute inset-0 h-full w-full border-0"
                allow="
                  autoplay;
                  encrypted-media;
                  picture-in-picture;
                  fullscreen
                "
                allowFullScreen
                loading="eager"
              />
            ) : featured.image ? (

              /* ===========================================
                 IMAGE
              =========================================== */

              <img
                src={featured.image}
                alt={featured.title}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-105
                "
              />

            ) : (

              /* ===========================================
                 FALLBACK
              =========================================== */

              <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                <span className="text-xl font-bold text-white">
                  AGS NEWS
                </span>
              </div>
            )}

            {/* =============================================
                OVERLAY
            ============================================= */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* =============================================
                VIDEO BADGE
            ============================================= */}

            {youtubeEmbedUrl && (
              <div className="absolute left-5 top-5 z-20">
                <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-white" />

                  Live Video
                </span>
              </div>
            )}

            {/* =============================================
                PAUSED INDICATOR
            ============================================= */}

            {isPaused && (
              <div className="pointer-events-none absolute right-5 top-5 z-20 rounded-full bg-black/60 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                Paused
              </div>
            )}

            {/* =============================================
                TEXT
            ============================================= */}

            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">

              <span className="inline-flex items-center rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white md:text-sm">
                🔴 Featured Story
              </span>

              <Link
                href={`/news/${featured.slug}`}
                className="block"
              >
                <h1 className="mt-4 text-2xl font-bold leading-tight text-white transition hover:text-red-300 md:text-4xl">
                  {featured.title}
                </h1>
              </Link>

              {featured.excerpt && (
                <p className="mt-3 line-clamp-2 max-w-3xl text-base text-gray-200 md:text-lg">
                  {featured.excerpt}
                </p>
              )}

              <Link
                href={`/news/${featured.slug}`}
                className="mt-5 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-red-600 hover:text-white"
              >
                {youtubeEmbedUrl
                  ? "Watch News"
                  : "Read Full News"}
              </Link>
            </div>

            {/* =============================================
                PREVIOUS
            ============================================= */}

            {orderedPosts.length > 1 && (
              <button
                type="button"
                onClick={previousSlide}
                aria-label="Previous news"
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
                  text-xl
                  text-white
                  shadow-lg
                  transition
                  hover:scale-110
                  hover:bg-black/80
                "
              >
                ‹
              </button>
            )}

            {/* =============================================
                NEXT
            ============================================= */}

            {orderedPosts.length > 1 && (
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next news"
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
                  text-xl
                  text-white
                  shadow-lg
                  transition
                  hover:scale-110
                  hover:bg-black/80
                "
              >
                ›
              </button>
            )}

            {/* =============================================
                DOTS
            ============================================= */}

            {orderedPosts.length > 1 && (
              <div className="absolute bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-black/50 px-3 py-2 backdrop-blur-sm">
                {orderedPosts.map(
                  (post, index) => (
                    <button
                      key={post.id}
                      type="button"
                      onClick={() =>
                        setCurrent(index)
                      }
                      aria-label={`Show news ${index + 1}`}
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

        {/* =================================================
            TOP STORIES
        ================================================= */}

        <div className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-lg">
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold md:text-2xl">
                Top Stories
              </h2>

              <span className="text-sm font-semibold text-red-600">
                Trending
              </span>
            </div>

            <div className="space-y-4">
              {sideStories.map(
                (story, index) => (
                  <Link
                    key={story.id}
                    href={`/news/${story.slug}`}
                    className="group flex items-start gap-4"
                  >
                    <div className="min-w-[20px] text-base font-bold text-red-600">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 transition group-hover:text-red-600">
                        {story.title}
                      </h3>

                      <div className="mt-1 flex items-center gap-2">
                        <p className="text-xs text-gray-500">
                          AGS News
                        </p>

                        {story.video && (
                          <span className="text-[10px] font-bold uppercase text-red-600">
                            Video
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>

          <Link
            href={`/news/${featured.slug}`}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            {youtubeEmbedUrl
              ? "Watch News"
              : "Read Full News"}
          </Link>
        </div>
      </div>
    </section>
  );
}
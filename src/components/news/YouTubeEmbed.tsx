"use client";

interface YouTubeEmbedProps {
  url?: string | null;
  title?: string;
  className?: string;
  autoplay?: boolean;
}

function getYouTubeVideoId(
  url: string
): string | null {
  try {
    const parsed =
      new URL(url.trim());

    const hostname =
      parsed.hostname.toLowerCase();

    /* =========================================
       youtu.be/VIDEO_ID
    ========================================= */

    if (
      hostname === "youtu.be"
    ) {
      return (
        parsed.pathname
          .split("/")
          .filter(Boolean)[0] ||
        null
      );
    }

    /* =========================================
       youtube.com
    ========================================= */

    if (
      hostname ===
        "youtube.com" ||
      hostname ===
        "www.youtube.com" ||
      hostname ===
        "m.youtube.com"
    ) {
      /* WATCH */

      const watchId =
        parsed.searchParams.get(
          "v"
        );

      if (watchId) {
        return watchId;
      }

      /* LIVE */

      const liveMatch =
        parsed.pathname.match(
          /^\/live\/([^/?]+)/
        );

      if (liveMatch?.[1]) {
        return liveMatch[1];
      }

      /* SHORTS */

      const shortsMatch =
        parsed.pathname.match(
          /^\/shorts\/([^/?]+)/
        );

      if (shortsMatch?.[1]) {
        return shortsMatch[1];
      }

      /* EMBED */

      const embedMatch =
        parsed.pathname.match(
          /^\/embed\/([^/?]+)/
        );

      if (embedMatch?.[1]) {
        return embedMatch[1];
      }
    }

    return null;
  } catch {
    return null;
  }
}

export default function YouTubeEmbed({
  url,
  title = "YouTube Video",
  className = "",
  autoplay = false,
}: YouTubeEmbedProps) {
  if (!url?.trim()) {
    return null;
  }

  const videoId =
    getYouTubeVideoId(url);

  if (!videoId) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        Invalid YouTube URL.
      </div>
    );
  }

  const params =
    new URLSearchParams();

  params.set(
    "rel",
    "0"
  );

  params.set(
    "modestbranding",
    "1"
  );

  params.set(
    "playsinline",
    "1"
  );

  if (autoplay) {
    params.set(
      "autoplay",
      "1"
    );

    params.set(
      "mute",
      "1"
    );
  }

  const embedUrl =
    `https://www.youtube.com/embed/${encodeURIComponent(
      videoId
    )}?${params.toString()}`;

  return (
    <div
      className={[
        "relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg",
        className,
      ].join(" ")}
    >
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 h-full w-full"
        loading="lazy"
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
          web-share
        "
        allowFullScreen
      />
    </div>
  );
}
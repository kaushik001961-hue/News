import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Eye,
  User,
  ArrowLeft,
  Share2,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import YouTubeEmbed from "@/components/news/YouTubeEmbed";

/* =========================================================
   TYPES
========================================================= */

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

/* =========================================================
   PAGE
========================================================= */

export default async function NewsDetailsPage({
  params,
}: Props) {
  /* =======================================================
     NEXT.JS 16
     
     params is a Promise.
  ======================================================= */

  const { slug } = await params;

  /* =======================================================
     GET NEWS
  ======================================================= */

  const post =
    await prisma.post.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
      },

      include: {
        category: true,
        author: true,
        state: true,
        district: true,
        taluka: true,
      },
    });

  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!post) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-20">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900">
              News Not Found
            </h1>

            <p className="mt-3 text-slate-500">
              The News you are looking for does not exist
              or is no longer published.
            </p>

            <Link
              href="/"
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-red-600
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-red-700
              "
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* =======================================================
     VIEW COUNT

     Keep this simple and safe. If your Post model does
     not expose updateable views in the current schema,
     the article still renders normally.
  ======================================================= */

  try {
    await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    console.error(
      "Failed to increment News views:",
      error
    );
  }

  /* =======================================================
     DATE
  ======================================================= */

  const publishedDate =
    post.publishedAt ??
    post.createdAt;

  /* =======================================================
     AUTHOR
  ======================================================= */

  const authorName =
    post.author?.name ||
    "AGS NEWS";

  /* =======================================================
     LOCATION
  ======================================================= */

  const locationParts = [
    post.taluka?.name,
    post.district?.name,
    post.state?.name,
  ].filter(Boolean);

  const location =
    locationParts.length > 0
      ? locationParts.join(", ")
      : null;

  /* =======================================================
     CONTENT
  ======================================================= */

  const content =
    typeof post.content ===
    "string"
      ? post.content
      : "";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ===================================================
          TOP
      =================================================== */}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* =================================================
            BREADCRUMB
        ================================================= */}

        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <Link
            href="/"
            className="transition hover:text-red-600"
          >
            Home
          </Link>

          <span>/</span>

          {post.category && (
            <>
              <Link
                href={`/category/${post.category.slug}`}
                className="transition hover:text-red-600"
              >
                {post.category.name}
              </Link>

              <span>/</span>
            </>
          )}

          <span className="text-slate-700">
            News
          </span>
        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* =================================================
              ARTICLE
          ================================================= */}

          <article className="lg:col-span-8">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              {/* ===========================================
                  ARTICLE HEADER
              =========================================== */}

              <div className="p-5 sm:p-8">
                {/* CATEGORY */}

                {post.category && (
                  <Link
                    href={`/category/${post.category.slug}`}
                    className="
                      inline-flex
                      rounded-full
                      bg-red-50
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-red-600
                      transition
                      hover:bg-red-100
                    "
                  >
                    {post.category.name}
                  </Link>
                )}

                {/* TITLE */}

                <h1
                  className="
                    mt-5
                    text-3xl
                    font-extrabold
                    leading-tight
                    tracking-tight
                    text-slate-950
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  {post.title}
                </h1>

                {/* EXCERPT */}

                {post.excerpt && (
                  <p
                    className="
                      mt-5
                      text-lg
                      leading-8
                      text-slate-600
                    "
                  >
                    {post.excerpt}
                  </p>
                )}

                {/* META */}

                <div
                  className="
                    mt-6
                    flex
                    flex-wrap
                    items-center
                    gap-x-5
                    gap-y-3
                    border-y
                    border-slate-100
                    py-4
                    text-sm
                    text-slate-500
                  "
                >
                  <div className="flex items-center gap-2">
                    <User
                      size={16}
                      className="text-red-600"
                    />

                    <span>
                      {authorName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CalendarDays
                      size={16}
                      className="text-red-600"
                    />

                    <span>
                      {new Date(
                        publishedDate
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Eye
                      size={16}
                      className="text-red-600"
                    />

                    <span>
                      {post.views ?? 0} views
                    </span>
                  </div>
                </div>

                {/* LOCATION */}

                {location && (
                  <div className="mt-5">
                    <span className="inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                      📍 {location}
                    </span>
                  </div>
                )}
              </div>

              {/* ===========================================
                  MEDIA
                  
                  IMPORTANT:
                  
                  VIDEO FIRST
                  IMAGE SECOND
              =========================================== */}

              {post.video ? (
                <div className="px-5 pb-5 sm:px-8 sm:pb-8">
                  <div className="overflow-hidden rounded-2xl">
                    <YouTubeEmbed
                      url={post.video}
                      title={post.title}
                    />
                  </div>
                </div>
              ) : post.image ? (
                <div className="px-5 pb-5 sm:px-8 sm:pb-8">
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      priority
                      sizes="
                        (max-width: 640px) 100vw,
                        (max-width: 1024px) 90vw,
                        800px
                      "
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : null}

              {/* ===========================================
                  ARTICLE BODY
              =========================================== */}

              <div className="px-5 pb-8 sm:px-8">
                <div
                  className="
                    news-content
                    max-w-none
                    text-[17px]
                    leading-8
                    text-slate-800
                  "
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              </div>

              {/* ===========================================
                  SHARE
              =========================================== */}

              <div
                className="
                  border-t
                  border-slate-100
                  px-5
                  py-5
                  sm:px-8
                "
              >
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                    <Share2 size={17} />
                    Share News
                  </div>

                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `/news/${post.slug}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      rounded-lg
                      bg-blue-600
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-blue-700
                    "
                  >
                    Facebook
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                      `/news/${post.slug}`
                    )}&text=${encodeURIComponent(
                      post.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      rounded-lg
                      bg-slate-900
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-slate-800
                    "
                  >
                    X
                  </a>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      `${post.title} /news/${post.slug}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      rounded-lg
                      bg-green-600
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:bg-green-700
                    "
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="lg:col-span-4">
            <div className="space-y-6">
              {/* =========================================
                  NEWS INFORMATION
              ========================================= */}

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900">
                  News Information
                </h2>

                <div className="mt-5 space-y-4">
                  {post.category && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Category
                      </p>

                      <Link
                        href={`/category/${post.category.slug}`}
                        className="mt-1 block font-semibold text-red-600 hover:underline"
                      >
                        {post.category.name}
                      </Link>
                    </div>
                  )}

                  {location && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Location
                      </p>

                      <p className="mt-1 font-medium text-slate-800">
                        {location}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Published
                    </p>

                    <p className="mt-1 font-medium text-slate-800">
                      {new Date(
                        publishedDate
                      ).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Author
                    </p>

                    <p className="mt-1 font-medium text-slate-800">
                      {authorName}
                    </p>
                  </div>
                </div>
              </div>

              {/* =========================================
                  VIDEO INFORMATION
              ========================================= */}

              {post.video && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white">
                      ▶
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900">
                        Video News
                      </h2>

                      <p className="text-sm text-slate-500">
                        YouTube video attached
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* =========================================
                  BACK
              ========================================= */}

              <Link
                href="/"
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-3
                  font-semibold
                  text-slate-700
                  shadow-sm
                  transition
                  hover:border-red-200
                  hover:bg-red-50
                  hover:text-red-600
                "
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* ===================================================
          CONTENT STYLES
      =================================================== */}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .news-content h1,
            .news-content h2,
            .news-content h3,
            .news-content h4 {
              margin-top: 1.75rem;
              margin-bottom: 0.75rem;
              font-weight: 700;
              line-height: 1.3;
              color: #0f172a;
            }

            .news-content h2 {
              font-size: 1.5rem;
            }

            .news-content h3 {
              font-size: 1.25rem;
            }

            .news-content p {
              margin-top: 1rem;
              margin-bottom: 1rem;
            }

            .news-content ul {
              list-style: disc;
              padding-left: 1.5rem;
              margin-top: 1rem;
              margin-bottom: 1rem;
            }

            .news-content ol {
              list-style: decimal;
              padding-left: 1.5rem;
              margin-top: 1rem;
              margin-bottom: 1rem;
            }

            .news-content li {
              margin-top: 0.35rem;
              margin-bottom: 0.35rem;
            }

            .news-content a {
              color: #dc2626;
              text-decoration: underline;
            }

            .news-content blockquote {
              margin: 1.5rem 0;
              border-left: 4px solid #dc2626;
              padding: 1rem 1.25rem;
              background: #f8fafc;
              font-style: italic;
              color: #475569;
            }

            .news-content img {
              max-width: 100%;
              height: auto;
              border-radius: 1rem;
              margin-top: 1.5rem;
              margin-bottom: 1.5rem;
            }

            .news-content iframe {
              width: 100%;
              aspect-ratio: 16 / 9;
              border: 0;
              border-radius: 1rem;
              margin-top: 1.5rem;
              margin-bottom: 1.5rem;
            }

            .news-content strong {
              font-weight: 700;
              color: #0f172a;
            }
          `,
        }}
      />
    </main>
  );
}
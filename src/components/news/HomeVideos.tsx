import Link from "next/link";

import YouTubeEmbed from "@/components/news/YouTubeEmbed";

interface HomeVideoPost {
  id: string;
  title: string;
  slug: string;
  video?: string | null;
  image?: string | null;
}

interface HomeVideosProps {
  posts: HomeVideoPost[];
}

export default function HomeVideos({
  posts,
}: HomeVideosProps) {
  const videoPosts = posts.filter(
    (post) => post.video
  );

  if (videoPosts.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-8 w-1 rounded-full bg-red-600" />

            <h2 className="text-2xl font-bold text-slate-900">
              Video News
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Latest News videos and live coverage
          </p>
        </div>

        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
          VIDEO
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videoPosts.map((post) => (
          <article
            key={post.id}
            className="
              overflow-hidden
              rounded-2xl
              border
              border-slate-200
              bg-white
              shadow-sm
              transition
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <YouTubeEmbed
              url={post.video}
              title={post.title}
            />

            <div className="p-5">
              <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
                {post.title}
              </h3>

              <Link
                href={`/news/${post.slug}`}
                className="
                  mt-4
                  inline-flex
                  items-center
                  text-sm
                  font-semibold
                  text-red-600
                  hover:text-red-700
                "
              >
                Read Full News →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
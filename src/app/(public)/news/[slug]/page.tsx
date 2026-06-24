import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock3,
  User,
  Share2,
  ChevronLeft,
} from "lucide-react";

export default async function NewsDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Replace with your Prisma query
  const article = {
    title: "India signs historic technology partnership",
    category: "Technology",
    image: "/placeholder.jpg",
    author: "AGS News Desk",
    published: "June 19, 2026",
    readTime: "6 min read",
    content: `
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Praesent interdum ligula sit amet justo fermentum,
vitae bibendum purus gravida.

Curabitur tincidunt purus non eros vulputate
condimentum.

Vestibulum ante ipsum primis in faucibus orci luctus
et ultrices posuere cubilia curae.

Sed ut perspiciatis unde omnis iste natus error
sit voluptatem accusantium doloremque laudantium.

Nemo enim ipsam voluptatem quia voluptas sit
aspernatur aut odit aut fugit.

Ut enim ad minima veniam.

Quis autem vel eum iure reprehenderit.

Duis aute irure dolor in reprehenderit.

Excepteur sint occaecat cupidatat non proident.
`,
  };

  return (
    <div className="bg-white">

      <div className="max-w-7xl mx-auto px-6 py-8">

        <Link
          href="/"
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 mb-8"
        >
          <ChevronLeft size={18} />
          Back to Home
        </Link>

        <span className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
          {article.category}
        </span>

        <h1 className="text-5xl lg:text-7xl font-black leading-tight mt-6 max-w-5xl">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 mt-8 text-gray-500">

          <div className="flex items-center gap-2">
            <User size={16} />
            {article.author}
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {article.published}
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            {article.readTime}
          </div>

        </div>

        <div className="relative w-full h-[500px] lg:h-[650px] rounded-3xl overflow-hidden mt-10 shadow-2xl">

          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-[80px_1fr_320px] gap-12">

        {/* Share Sidebar */}

        <div className="hidden lg:flex flex-col gap-4 sticky top-32 h-fit">

          <button className="w-12 h-12 rounded-full bg-slate-100 hover:bg-red-600 hover:text-white transition flex items-center justify-center">
            <Share2 size={18} />
          </button>

          <button className="w-12 h-12 rounded-full bg-slate-100 hover:bg-red-600 hover:text-white transition flex items-center justify-center">
            F
          </button>

          <button className="w-12 h-12 rounded-full bg-slate-100 hover:bg-red-600 hover:text-white transition flex items-center justify-center">
            X
          </button>

          <button className="w-12 h-12 rounded-full bg-slate-100 hover:bg-red-600 hover:text-white transition flex items-center justify-center">
            W
          </button>

        </div>

        {/* Article */}

        <article className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-8">

          {article.content
            .split("\n")
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

        </article>

        {/* Sidebar */}

        <aside className="space-y-8">

          <div className="bg-gray-50 rounded-3xl p-8">

            <h3 className="text-2xl font-bold mb-4">
              Author
            </h3>

            <div className="flex gap-4 items-center">

              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl">
                AG
              </div>

              <div>

                <h4 className="font-bold">
                  AGS News Desk
                </h4>

                <p className="text-gray-500">
                  Senior Editor
                </p>

              </div>

            </div>

          </div>

          <div className="bg-gray-50 rounded-3xl p-8">

            <h3 className="text-2xl font-bold mb-6">
              Related News
            </h3>

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                className="flex gap-4 mb-6"
              >

                <div className="w-24 h-20 rounded-xl bg-gray-300" />

                <div>

                  <h4 className="font-semibold">
                    Related article headline goes here
                  </h4>

                  <span className="text-sm text-gray-500">
                    2 hours ago
                  </span>

                </div>

              </div>

            ))}

          </div>

        </aside>

      </div>

    </div>
  );
}

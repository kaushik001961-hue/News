"use client";

interface Props {
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  breaking: boolean;
  featured: boolean;
}

export default function PreviewPanel({
  title,
  content,
  image,
  category,
  author,
  breaking,
  featured,
}: Props) {
  const formattedDate = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">

      {/* Featured Image */}

      <div className="relative">

        <img
          src={
            image ||
            "/images/news-placeholder.jpg"
          }
          alt="Preview"
          className="h-72 w-full object-cover"
        />

        <div className="absolute left-4 top-4 flex gap-2">

          {breaking && (
            <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
              BREAKING
            </span>
          )}

          {featured && (
            <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-white">
              FEATURED
            </span>
          )}

        </div>

      </div>

      {/* Content */}

      <div className="space-y-4 p-6">

        <div className="text-sm font-medium text-red-600">
          {category || "General"}
        </div>

        <h1 className="text-3xl font-bold leading-tight">
          {title || "Your news title will appear here"}
        </h1>

        <div className="flex gap-4 text-sm text-gray-500">

          <span>
            👤 {author}
          </span>

          <span>
            📅 {formattedDate}
          </span>

        </div>

        <hr />

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html:
              content ||
              "<p>Your article content preview will appear here...</p>",
          }}
        />

      </div>

    </div>
  );
}

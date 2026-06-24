
"use client";

interface Props {
  title: string;
  content: string;
  image?: string;
  category?: string;
  author?: string;
  breaking?: boolean;
  featured?: boolean;
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

  const today = new Date().toLocaleDateString();

  return (

    <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">

      {/* Cover Image */}

      <div className="relative">

        <img
          src={image || "/news-placeholder.jpg"}
          alt="Preview"
          className="w-full h-72 object-cover"
        />

        <div className="absolute top-4 left-4 flex gap-2">

          {breaking && (
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              🔴 BREAKING
            </span>
          )}

          {featured && (
            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              ⭐ FEATURED
            </span>
          )}

        </div>

      </div>

      {/* Body */}

      <div className="p-6">

        <div className="text-red-600 font-semibold uppercase text-sm">

          {category || "General News"}

        </div>

        <h1 className="text-3xl font-bold mt-2 mb-3">

          {title || "Your Headline Appears Here"}

        </h1>

        <div className="text-gray-500 text-sm mb-5">

          By {author || "Reporter"} • {today}

        </div>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html:
              content ||
              "<p>Start writing your news article to see the live preview.</p>",
          }}
        />

      </div>

    </div>

  );

}

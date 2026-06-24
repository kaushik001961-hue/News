export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryCollectionPage({ params }: PageProps) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Category Header */}
      <div className="border-b border-gray-200 pb-5 mb-10">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 uppercase">
          {category.name}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Live coverage and breaking updates regarding {category.name.toLowerCase()}.
        </p>
      </div>

      {/* Posts Grid */}
      {category.posts.length === 0 ? (
        <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-400 font-medium text-sm">No articles found in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.posts.map((post, index) => (
            <Link 
              key={post.id} 
              href={`/news/${post.slug}`} 
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition duration-200"
            >
              {/* Image Frame Wrapper */}
              <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  // Explicitly providing width: "auto" alongside objectFit fixes the aspect ratio warning
                  style={{ objectFit: "cover", width: "auto", height: "auto" }}
                  priority={index === 0}
                  className="group-hover:scale-[1.02] transition duration-300"
                />
              </div>

              {/* Text Meta Container */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition duration-150 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3 leading-relaxed">
                    {post.content.replace(/<[^>]*>/g, "")}
                  </p>
                </div>
                
                <span className="text-xs font-semibold text-gray-400 mt-5 block">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
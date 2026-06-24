import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    include: {
      posts: {
        where: {
          status: "PUBLISHED",
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!category) {
    return (
      <main className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold">
          Category not found
        </h1>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        {category.name}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {category.posts.map((post) => (
          <div
            key={post.id}
            className="border rounded-lg overflow-hidden shadow"
          >

            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
            )}

            <div className="p-4">

              <h2 className="text-xl font-bold mb-3">
                {post.title}
              </h2>

              <Link
                href={`/news/${post.slug}`}
                className="text-red-600 font-semibold"
              >
                Read More →
              </Link>

            </div>

          </div>
        ))}

      </div>

    </main>
  );
}
import { prisma } from "@/lib/prisma";
import PostsTable from "@/components/dashboard/PostsTable";

export default async function PostsPage() {

  const posts = await prisma.post.findMany({
    include: {
      author: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Posts Management
        </h1>

        <a
          href="/editor/create"
          className="bg-red-600 text-white px-5 py-3 rounded-lg"
        >
          + Create Post
        </a>

      </div>

      <PostsTable posts={posts} />

    </div>

  );
}
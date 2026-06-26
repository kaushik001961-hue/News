import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PostForm from "@/components/editor/PostForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: PageProps) {
  const post = await prisma.post.findUnique({
    where: {
      id: params.id,
    },
    include: {
      author: true,
      category: true,
      tags: true,
      state: true,
      district: true,
      taluka: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Edit News Article
        </h1>

        <p className="text-gray-500 mt-2">
          Update article content, SEO, category, tags and publishing options.
        </p>
      </div>

      <PostForm
        mode="edit"
        initialData={post}
      />
    </div>
  );
}
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

type Params = Promise<{ id: string }>;

interface EditPostPageProps {
  params: Params;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  // 1. Fetch the post and available categories
  const [post, categories] = await Promise.all([
    prisma.post.findUnique({
      where: { id },
    }),
    prisma.category.findMany(),
  ]);

  if (!post) {
    notFound();
  }

  // 2. Server Action processing form elements + uploads + toggles + status flags
  async function updatePostAction(formData: FormData) {
    "use server";

    if (!post) {
      throw new Error("Post not found");
    }

    const title = formData.get("title") as string;
    const categoryId = formData.get("category") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File;

    const isBreaking = formData.get("isBreaking") === "on";
    const isFeatured = formData.get("isFeatured") === "on";

    // 🚀 READ STATUS: Captures whether the admin selected "PUBLISHED" or "DRAFT"
    const statusValue = formData.get("status") as string;
    const isPublishedBoolean = statusValue === "PUBLISHED";

    let imageUrl =
      (post as any)?.imageUrl ||
      (post as any)?.image ||
      (post as any)?.coverImage ||
      "";

    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
      try {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        imageUrl = `data:${imageFile.type};base64,${buffer.toString("base64")}`;
      } catch (err) {
        console.error("❌ Failed to process image file buffer:", err);
      }
    }

    const imageKey =
      "imageUrl" in post
        ? "imageUrl"
        : "image" in post
        ? "image"
        : "coverImage";

    // Update record in database
    await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        [imageKey]: imageUrl,
        ...("isBreaking" in post
          ? { isBreaking }
          : "breaking" in post
          ? { breaking: isBreaking }
          : {}),
        ...("isFeatured" in post
          ? { isFeatured }
          : "featured" in post
          ? { featured: isFeatured }
          : {}),

        // 🚀 DYNAMIC STATUS COUPLING: Maps correctly whether your DB uses an Enum String or a Boolean flag
        ...("status" in post
          ? { status: statusValue as any }
          : "isPublished" in post
          ? { isPublished: isPublishedBoolean }
          : "published" in post
          ? { published: isPublishedBoolean }
          : {}),

        category: {
          connect: { id: categoryId },
        },
      },
    });

    redirect("/admin/posts");
  }

  // Fallbacks to determine checked configurations
  const currentBreaking =
    (post as any)?.isBreaking || (post as any)?.breaking || false;
  const currentFeatured =
    (post as any)?.isFeatured || (post as any)?.featured || false;

  // Resolve current database status to string representation ("PUBLISHED" vs "DRAFT")
  const currentStatus = (post as any)?.status
    ? (post as any).status
    : (post as any)?.isPublished || (post as any)?.published
    ? "PUBLISHED"
    : "DRAFT";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col space-y-6 overflow-x-hidden p-4 md:p-8">
      {/* --- Breadcrumb Header Navigation --- */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-neutral-400">
          <span>Admin</span>
          <span>/</span>
          <span>Posts</span>
          <span>/</span>
          <span className="text-neutral-600">Edit</span>
        </div>
        <h1 className="text-2xl font-black tracking-tight text-neutral-900 md:text-3xl">
          Edit Post Details
        </h1>
      </div>

      {/* --- Main Edit Form Interface --- */}
      <form
        action={updatePostAction}
        className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm md:p-6"
      >
        {/* Input Field: Post Title */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold tracking-wide text-neutral-700">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={post.title}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-neutral-900 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Input Field: Category Selector */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold tracking-wide text-neutral-700">
            Category
          </label>
          <select
            name="category"
            defaultValue={post.categoryId || ""}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-neutral-900 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* 🚀 Publication Status Selector */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold tracking-wide text-neutral-700">
            Publication Status
          </label>
          <select
            name="status"
            defaultValue={currentStatus}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 font-medium text-neutral-900 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="DRAFT">📁 Save as Draft (Hidden from public)</option>
            <option value="PUBLISHED">🚀 Publish Live (Visible to everyone)</option>
          </select>
        </div>

        {/* Badges / Visibility Flag Layout Switches */}
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 sm:grid-cols-2">
          {/* Toggle: Breaking News */}
          <label className="flex cursor-pointer select-none items-center space-x-3">
            <input
              type="checkbox"
              name="isBreaking"
              defaultChecked={currentBreaking}
              className="h-5 w-5 cursor-pointer rounded border-neutral-300 text-red-600 transition focus:ring-red-500"
            />
            <div>
              <span className="block text-sm font-bold text-neutral-800">
                Breaking News
              </span>
              <span className="block text-xs text-neutral-400">
                Flash story on home headline
              </span>
            </div>
          </label>

          {/* Toggle: Featured News */}
          <label className="flex cursor-pointer select-none items-center space-x-3">
            <input
              type="checkbox"
              name="isFeatured"
              defaultChecked={currentFeatured}
              className="h-5 w-5 cursor-pointer rounded border-neutral-300 text-blue-600 transition focus:ring-blue-500"
            />
            <div>
              <span className="block text-sm font-bold text-neutral-800">
                Featured Post
              </span>
              <span className="block text-xs text-neutral-400">
                Pin story inside sidebars
              </span>
            </div>
          </label>
        </div>

        {/* Post Cover Image Upload Field */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold tracking-wide text-neutral-700">
            Cover Image
          </label>
          {((post as any)?.imageUrl || (post as any)?.image) && (
            <div className="mb-2 flex items-center gap-2 text-xs text-neutral-500">
              <span>Current Image:</span>
              <div className="h-12 w-12 overflow-hidden rounded border bg-gray-100">
                <img
                  src={(post as any)?.imageUrl || (post as any)?.image}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full cursor-pointer text-sm text-neutral-500 file:mr-4 file:rounded-xl file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Text Area Field: Content Editor Body */}
        <div className="space-y-1.5">
          <label className="block text-sm font-bold tracking-wide text-neutral-700">
            Content Body
          </label>
          <textarea
            name="content"
            defaultValue={post.content}
            className="h-64 w-full resize-y rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-neutral-900 transition focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* --- Form Footer Actions Layout --- */}
        <div className="flex flex-col-reverse justify-end gap-3 pt-2 sm:flex-row">
          <Link
            href="/admin/posts"
            className="block w-full rounded-xl border border-neutral-200 px-5 py-2.5 text-center text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 sm:w-auto"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}
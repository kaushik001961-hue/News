import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import MediaStats from "@/components/admin/media/MediaStats";
import MediaToolbar from "@/components/admin/media/MediaToolbar";
import MediaFilters from "@/components/admin/media/MediaFilters";
import MediaGrid from "@/components/admin/media/MediaGrid";

export default async function MediaLibraryPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const [
    media,
    totalFiles,
    totalImages,
    totalVideos,
  ] = await Promise.all([
    prisma.media.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.media.count(),

    prisma.media.count({
      where: {
        mimeType: {
          startsWith: "image/",
        },
      },
    }),

    prisma.media.count({
      where: {
        mimeType: {
          startsWith: "video/",
        },
      },
    }),
  ]);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-black text-slate-900">
          Media Library
        </h1>

        <p className="mt-2 text-slate-500">
          Upload, organize and manage all media files.
        </p>

      </div>

      {/* Statistics */}

      <MediaStats
        totalFiles={totalFiles}
        totalImages={totalImages}
        totalVideos={totalVideos}
      />

      {/* Toolbar */}

      <MediaToolbar />

      {/* Filters */}

      <MediaFilters />

      {/* Grid */}

      <MediaGrid media={media} />

    </div>
  );
}
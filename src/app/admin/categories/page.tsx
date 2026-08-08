import { prisma } from "@/lib/prisma";
import CategoryStats from "@/components/admin/categories/CategoryStats";
import CategoriesClient from "@/components/admin/categories/CategoriesClient";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Calculate stats dynamically from fetched categories
  const total = categories.length;
  // If your category model has an 'isActive' or 'status' field:
  const active = categories.filter((c: any) => c.isActive ?? true).length;
  const inactive = total - active;
  const totalNews = categories.reduce(
    (acc: number, c: any) => acc + (c._count?.posts || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Pass required stats props here */}
      <CategoryStats
        total={total}
        active={active}
        inactive={inactive}
        totalNews={totalNews}
      />
      <CategoriesClient categories={categories} />
    </div>
  );
}
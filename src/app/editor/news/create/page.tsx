import { prisma } from "@/lib/prisma";
import NewsForm from "@/components/news/NewsForm";

export default async function CreateNewsPage() {
  // Fetch categories and active reporters from database
  const [categories, reporters] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
    prisma.reporter.findMany({
      where: { active: true },
      orderBy: { firstName: "asc" },
    }),
  ]);

  // Placeholder form submit handler for server action / client submit
  const handleSubmit = async (data: any) => {
    "use server";
    // Place your creation action/API logic here
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Create News Article</h1>
      <NewsForm
        mode="create"
        role="EDITOR"
        categories={categories}
        reporters={reporters as any}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
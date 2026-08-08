import { prisma } from "@/lib/prisma";

export default async function TrashPage() {
  const archivedNews = await prisma.news.findMany({
    where: {
      status: "ARCHIVED",
    },
  });

  return (
    <div>
      <h1>Trash Page</h1>
    </div>
  );
}
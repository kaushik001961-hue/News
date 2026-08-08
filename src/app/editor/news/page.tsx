import { prisma } from "@/lib/prisma";
import { getNews } from "@/lib/news-query";

import StatsCards from "@/components/editor/dashboard/StatsCards";
import NewsTable from "@/components/editor/news/NewsTable";
import NewsTableClient from "@/components/news/table/NewsTableClient";

interface Props {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    category?: string;
    reporter?: string;
    sort?: string;
    date?: string;
  }>;
}

export default async function EditorNewsPage({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const search = params.search ?? "";
  const status = params.status ?? "";
  const category = params.category ?? "";
  const reporter = params.reporter ?? "";
  const sort = params.sort ?? "latest";

  const result = await getNews({
    page,
    search,
    status,
    category,
    reporter,
    sort,
    role: "EDITOR",
  });

  const news = result.news;
  const totalNews = result.total;

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const reporters = await prisma.reporter.findMany({
    where: { status: "APPROVED", active: true },
    orderBy: { firstName: "asc" },
    select: { id: true, firstName: true, lastName: true },
  });

  return (
    <div className="space-y-6">
      <StatsCards />

      <NewsTableClient
        total={totalNews}
        createUrl="/editor/news/create"
        categories={categories as any}
        reporters={reporters as any}
      >
        <NewsTable news={news as any} />
      </NewsTableClient>
    </div>
  );
}
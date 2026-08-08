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

export default async function AdminNewsPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;

  const page = Number(resolvedParams.page ?? "1");

  const search = resolvedParams.search ?? "";
  const status = resolvedParams.status ?? "";
  const category = resolvedParams.category ?? "";
  const reporter = resolvedParams.reporter ?? "";
  const sort = resolvedParams.sort ?? "latest";
  const date = resolvedParams.date ?? "ALL";

  const result = await getNews({
    page,
    search,
    status,
    category,
    reporter,
    sort,
    role: "ADMIN",
  });

  const news = result.news;
  const totalNews = result.total;

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const reporters = await prisma.reporter.findMany({
    where: {
      status: "APPROVED",
      active: true,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
    orderBy: {
      firstName: "asc",
    },
  });

  return (
    <div className="space-y-6">
      <StatsCards />

      <NewsTableClient
        total={totalNews}
        createUrl="/admin/news/create"
        categories={categories}
        reporters={reporters as any}
      >
        <NewsTable news={news as any} />
      </NewsTableClient>
    </div>
  );
}
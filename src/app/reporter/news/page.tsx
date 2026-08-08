import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getNews } from "@/lib/news-query";
import StatsCards from "@/components/editor/dashboard/StatsCards";
import NewsTable from "@/components/editor/news/NewsTable";
import NewsTableClient from "@/components/news/table/NewsTableClient";

interface Props {
  searchParams: {
    page?: string;
    search?: string;
    status?: string;
    category?: string;
    reporter?: string;
    sort?: string;
    date?: string;
  };
}

export default async function ReporterNewsPage({
  searchParams,
}: Props) {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const page = Number(searchParams.page ?? "1");

  const search = searchParams.search ?? "";
  const status = searchParams.status ?? "";
  const category = searchParams.category ?? "";
  const sort = searchParams.sort ?? "latest";
  const date = searchParams.date ?? "ALL";

  const result = await getNews({
    page,
    search,
    status,
    category,
    sort,
    role: "REPORTER",
    userId: session.user.id,
  });

  const news = result.news;
  const totalNews = result.total;

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="space-y-6">

      <StatsCards />

      <NewsTableClient
        total={totalNews}
        createUrl="/reporter/news/create"
        categories={categories}
        reporters={[]}
      >
       <NewsTable news={news as any} />
      </NewsTableClient>

    </div>
  );
}
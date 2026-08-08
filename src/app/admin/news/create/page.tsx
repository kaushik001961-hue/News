import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import NewsForm from "@/components/news/NewsForm";
import { createNews } from "@/actions/news/create-news";

export default async function CreateAdminNewsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Ensure only ADMIN users can access this page
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

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
    orderBy: {
      firstName: "asc",
    },
  });

  return (
    <NewsForm
      role="ADMIN"
      mode="create"
      categories={categories}
      reporters={reporters as any}
      onSubmit={createNews}
    />
  );
}
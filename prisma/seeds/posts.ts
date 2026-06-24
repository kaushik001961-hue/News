
import { PrismaClient } from "@prisma/client";

export default async function seedPosts(prisma: PrismaClient) {
  console.log("📰 Seeding Posts...");

  const admin = await prisma.user.findUnique({
    where: { email: "admin@news.com" },
  });

  const category = await prisma.category.findFirst();

  if (!admin || !category) {
    console.log("❌ Missing admin or category, skipping posts seed");
    return;
  }

  await prisma.post.createMany({
    data: [
      {
        title: "Welcome to AGS News CMS",
        slug: "welcome-to-ags-news-cms",
        content: "This is your first seeded news article.",
        excerpt: "AGS News CMS is now live.",
        status: "PUBLISHED",
        breaking: true,
        featured: true,
        authorId: admin.id,
        categoryId: category.id,
      },
      {
        title: "Breaking: System Successfully Initialized",
        slug: "system-initialized",
        content: "Your Prisma + Next.js CMS is working correctly.",
        status: "DRAFT",
        breaking: false,
        featured: false,
        authorId: admin.id,
        categoryId: category.id,
      },
    ],
  });

  console.log("📰 Posts seeded successfully");
}


import { PrismaClient } from "@prisma/client";

export default async function seedCategories(prisma: PrismaClient) {
  console.log("📂 Seeding Categories...");

  const categories = [
    { name: "Politics", slug: "politics" },
    { name: "Business", slug: "business" },
    { name: "Sports", slug: "sports" },
    { name: "Technology", slug: "technology" },
    { name: "Entertainment", slug: "entertainment" },
    { name: "Gujarat News", slug: "gujarat-news" },
    { name: "India News", slug: "india-news" },
    { name: "World News", slug: "world-news" },
    { name: "Education", slug: "education" },
    { name: "Health", slug: "health" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        slug: category.slug,
      },
      update: {
        name: category.name,
      },
      create: {
        name: category.name,
        slug: category.slug,
      },
    });

    console.log(`✅ Category seeded: ${category.name}`);
  }

  console.log("📂 Categories seeding completed.");
}

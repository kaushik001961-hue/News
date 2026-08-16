import { PrismaClient } from "@prisma/client";

export default async function seedPosts(
  prisma: PrismaClient
) {
  console.log("📰 Seeding Posts...");

  const author = await prisma.user.findUnique({
    where: {
      email: "editor@news.com",
    },
  });

  if (!author) {
    throw new Error(
      "❌ editor@news.com not found. Seed users first."
    );
  }

  const categories = await prisma.category.findMany();

  const categoryMap = new Map(
    categories.map((category) => [
      category.slug,
      category.id,
    ])
  );

  const posts = [
    {
      title: "Gujarat Development News",
      slug: "gujarat-development-news",
      content:
        "Latest development news from Gujarat.",
      excerpt:
        "Latest development news from Gujarat.",
      categorySlug: "gujarat-news",
    },
    {
      title: "India Latest News",
      slug: "india-latest-news",
      content:
        "Latest news and updates from across India.",
      excerpt:
        "Latest news and updates from across India.",
      categorySlug: "india-news",
    },
    {
      title: "Technology Latest Updates",
      slug: "technology-latest-updates",
      content:
        "Latest technology news and updates.",
      excerpt:
        "Latest technology news and updates.",
      categorySlug: "technology",
    },
    {
      title: "Sports Latest News",
      slug: "sports-latest-news",
      content:
        "Latest sports news and updates.",
      excerpt:
        "Latest sports news and updates.",
      categorySlug: "sports",
    },
  ];

  for (const post of posts) {
    const existing = await prisma.post.findUnique({
      where: {
        slug: post.slug,
      },
    });

    if (existing) {
      console.log(
        `⏭️ Post already exists: ${post.slug}`
      );

      continue;
    }

    const categoryId =
      categoryMap.get(post.categorySlug);

    if (!categoryId) {
      console.log(
        `⚠️ Category not found: ${post.categorySlug}`
      );

      continue;
    }

    await prisma.post.create({
      data: {
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,

        authorId: author.id,

        categoryId,

        status: "PUBLISHED",

        publishedAt: new Date(),

        breaking: false,
        featured: false,
        hero: false,
        trending: false,
        editorsPick: false,

        views: 0,
        likes: 0,
        shares: 0,
      },
    });

    console.log(
      `✅ Post seeded: ${post.title}`
    );
  }

  console.log("📰 Posts seeding completed.");
}
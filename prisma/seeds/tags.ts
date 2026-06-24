import { PrismaClient } from "@prisma/client";

export default async function seedTags(prisma: PrismaClient) {
  console.log("🏷️ Seeding Tags...");

  const tags = [
    "Breaking",
    "Exclusive",
    "Politics",
    "Election",
    "Government",
    "Parliament",
    "Business",
    "Economy",
    "Stock Market",
    "Startup",
    "Technology",
    "AI",
    "Cyber Security",
    "Mobile",
    "Sports",
    "Cricket",
    "Football",
    "Olympics",
    "Entertainment",
    "Bollywood",
    "Hollywood",
    "Health",
    "Medical",
    "Education",
    "Jobs",
    "Weather",
    "Crime",
    "Accident",
    "Local News",
    "Gujarat",
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Godhra",
    "Panchmahal",
    "International",
    "India",
    "World",
    "Environment",
    "Agriculture",
    "Science",
    "Space",
    "Finance",
    "Investment",
    "Banking",
    "Real Estate",
    "Lifestyle",
    "Travel",
    "Festival",
    "Culture",
    "Opinion",
    "Editorial",
    "Interview",
    "Live",
    "Video",
    "Photo Story",
    "Trending",
    "Viral",
    "Update"
  ];

  for (const tagName of tags) {
    // Generate a valid slug (lowercased, spaces replaced with dashes)
    const tagSlug = tagName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
      .replace(/(^-|-$)+/g, '');    // Clean up trailing or leading dashes

    await prisma.tag.upsert({
      where: {
        slug: tagSlug, // Using the unique 'slug' field to satisfy Prisma's types
      },
      update: {},
      create: {
        name: tagName,
        slug: tagSlug, // Make sure slug is provided on creation
      },
    });

    console.log(`✅ ${tagName} (${tagSlug})`);
  }

  console.log("");
  console.log("🏷️ Tags seeding completed.");
}
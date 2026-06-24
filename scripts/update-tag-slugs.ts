
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

async function main() {
  const tags = await prisma.tag.findMany();

  for (const tag of tags) {
    const slug = slugify(tag.name);

    await prisma.tag.update({
      where: {
        id: tag.id,
      },
      data: {
        slug,
      },
    });

    console.log(`Updated: ${tag.name} -> ${slug}`);
  }

  console.log("✅ All tag slugs updated!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

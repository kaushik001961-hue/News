import { PrismaClient } from "@prisma/client";

import seedUsers from "./seeds/users";
import seedReporters from "./seeds/reporters";
import seedCategories from "./seeds/categories";
import seedTags from "./seeds/tags";
import seedStates from "./seeds/states";
import seedDistricts from "./seeds/districts";
import seedTalukas from "./seeds/talukas";
import seedPosts from "./seeds/posts";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...\n");

  // Users must be seeded first because
  // Reporter.userId references User.id.
  await seedUsers(prisma);

  // Create Reporter profiles linked to
  // the seeded User records.
  await seedReporters(prisma);

  await seedCategories(prisma);
  await seedTags(prisma);
  await seedStates(prisma);
  await seedDistricts(prisma);
  await seedTalukas(prisma);
  await seedPosts(prisma);

  console.log("\n🌱 Database seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:");
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
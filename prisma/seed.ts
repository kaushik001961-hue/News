
import { PrismaClient } from "@prisma/client";

import seedUsers from "./seeds/users";
import seedCategories from "./seeds/categories";
import seedTags from "./seeds/tags";
import seedStates from "./seeds/states";
import seedDistricts from "./seeds/districts";
import seedTalukas from "./seeds/talukas";
import seedPosts from "./seeds/posts";

const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
  await seedCategories(prisma);
  await seedTags(prisma);
  await seedStates(prisma);
  await seedDistricts(prisma);
  await seedTalukas(prisma);
  await seedPosts(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

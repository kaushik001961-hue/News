
import { PrismaClient } from "@prisma/client";

export default async function seedDistricts(
  prisma: PrismaClient
) {
  console.log("Seeding Districts (basic)...");

  const gujarat = await prisma.state.findUnique({
    where: {
      slug: "gujarat",
    },
  });

  if (!gujarat) {
    console.log(
      "Gujarat state not found. Skipping district seeding."
    );
    return;
  }

  console.log("District seeding completed.");
}

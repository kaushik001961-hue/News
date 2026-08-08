
import { PrismaClient } from "@prisma/client";

export default async function seedTalukas(prisma: PrismaClient) {
  console.log("🏘️ Seeding Talukas (basic)...");

  const panchmahal = await prisma.district.findUnique({
    where: { slug: "panchmahal" },
  });

  if (!panchmahal) {
    console.log("❌ Panchmahal district not found");
    return;
  }

  const talukas = [
    { name: "Godhra", slug: "godhra", districtId: panchmahal.id },
    { name: "Halol", slug: "halol", districtId: panchmahal.id },
    { name: "Kalol", slug: "kalol", districtId: panchmahal.id },
    { name: "Morva Hadaf", slug: "morva-hadaf", districtId: panchmahal.id },
  ];

  for (const t of talukas) {
    await prisma.taluka.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    });

    console.log("✅ Taluka:", t.name);
  }

  console.log("🏘️ Talukas seeding done.");
}

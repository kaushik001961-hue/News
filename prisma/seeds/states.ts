
import { PrismaClient } from "@prisma/client";

export default async function seedStates(prisma: PrismaClient) {
  console.log("🗺️ Seeding States & Union Territories...");

  const states = [
    // ===== STATES (28) =====
    { name: "Andhra Pradesh", slug: "andhra-pradesh" },
    { name: "Arunachal Pradesh", slug: "arunachal-pradesh" },
    { name: "Assam", slug: "assam" },
    { name: "Bihar", slug: "bihar" },
    { name: "Chhattisgarh", slug: "chhattisgarh" },
    { name: "Goa", slug: "goa" },
    { name: "Gujarat", slug: "gujarat" },
    { name: "Haryana", slug: "haryana" },
    { name: "Himachal Pradesh", slug: "himachal-pradesh" },
    { name: "Jharkhand", slug: "jharkhand" },
    { name: "Karnataka", slug: "karnataka" },
    { name: "Kerala", slug: "kerala" },
    { name: "Madhya Pradesh", slug: "madhya-pradesh" },
    { name: "Maharashtra", slug: "maharashtra" },
    { name: "Manipur", slug: "manipur" },
    { name: "Meghalaya", slug: "meghalaya" },
    { name: "Mizoram", slug: "mizoram" },
    { name: "Nagaland", slug: "nagaland" },
    { name: "Odisha", slug: "odisha" },
    { name: "Punjab", slug: "punjab" },
    { name: "Rajasthan", slug: "rajasthan" },
    { name: "Sikkim", slug: "sikkim" },
    { name: "Tamil Nadu", slug: "tamil-nadu" },
    { name: "Telangana", slug: "telangana" },
    { name: "Tripura", slug: "tripura" },
    { name: "Uttar Pradesh", slug: "uttar-pradesh" },
    { name: "Uttarakhand", slug: "uttarakhand" },
    { name: "West Bengal", slug: "west-bengal" },

    // ===== UNION TERRITORIES (8) =====
    { name: "Andaman and Nicobar Islands", slug: "andaman-nicobar" },
    { name: "Chandigarh", slug: "chandigarh" },
    { name: "Dadra and Nagar Haveli and Daman and Diu", slug: "dnh-dd" },
    { name: "Delhi", slug: "delhi" },
    { name: "Jammu and Kashmir", slug: "jammu-kashmir" },
    { name: "Ladakh", slug: "ladakh" },
    { name: "Lakshadweep", slug: "lakshadweep" },
    { name: "Puducherry", slug: "puducherry" },
  ];

  for (const state of states) {
    await prisma.state.upsert({
      where: {
        slug: state.slug,
      },
      update: {
        name: state.name,
      },
      create: {
        name: state.name,
        slug: state.slug,
      },
    });

    console.log(`✅ State seeded: ${state.name}`);
  }

  console.log("🗺️ States seeding completed.");
}

import { PrismaClient } from "@prisma/client";

const districts = [
  {
    name: "Ahmedabad",
    slug: "ahmedabad",
  },
  {
    name: "Amreli",
    slug: "amreli",
  },
  {
    name: "Anand",
    slug: "anand",
  },
  {
    name: "Aravalli",
    slug: "aravalli",
  },
  {
    name: "Banaskantha",
    slug: "banaskantha",
  },
  {
    name: "Bharuch",
    slug: "bharuch",
  },
  {
    name: "Bhavnagar",
    slug: "bhavnagar",
  },
  {
    name: "Botad",
    slug: "botad",
  },
  {
    name: "Chhota Udaipur",
    slug: "chhota-udaipur",
  },
  {
    name: "Dahod",
    slug: "dahod",
  },
  {
    name: "Dang",
    slug: "dang",
  },
  {
    name: "Devbhoomi Dwarka",
    slug: "devbhoomi-dwarka",
  },
  {
    name: "Gandhinagar",
    slug: "gandhinagar",
  },
  {
    name: "Gir Somnath",
    slug: "gir-somnath",
  },
  {
    name: "Jamnagar",
    slug: "jamnagar",
  },
  {
    name: "Junagadh",
    slug: "junagadh",
  },
  {
    name: "Kheda",
    slug: "kheda",
  },
  {
    name: "Kutch",
    slug: "kutch",
  },
  {
    name: "Mahisagar",
    slug: "mahisagar",
  },
  {
    name: "Mehsana",
    slug: "mehsana",
  },
  {
    name: "Morbi",
    slug: "morbi",
  },
  {
    name: "Narmada",
    slug: "narmada",
  },
  {
    name: "Navsari",
    slug: "navsari",
  },
  {
    name: "Panchmahal",
    slug: "panchmahal",
  },
  {
    name: "Patan",
    slug: "patan",
  },
  {
    name: "Porbandar",
    slug: "porbandar",
  },
  {
    name: "Rajkot",
    slug: "rajkot",
  },
  {
    name: "Sabarkantha",
    slug: "sabarkantha",
  },
  {
    name: "Surat",
    slug: "surat",
  },
  {
    name: "Surendranagar",
    slug: "surendranagar",
  },
  {
    name: "Tapi",
    slug: "tapi",
  },
  {
    name: "Vadodara",
    slug: "vadodara",
  },
  {
    name: "Valsad",
    slug: "valsad",
  },
  {
    name: "Vav-Tharad",
    slug: "vav-tharad",
  },
];

export default async function seedDistricts(
  prisma: PrismaClient
) {
  console.log(
    "🌍 Seeding Gujarat Districts..."
  );

  const gujarat =
    await prisma.state.findUnique({
      where: {
        slug: "gujarat",
      },
    });

  if (!gujarat) {
    console.error(
      "❌ Gujarat state not found."
    );

    console.error(
      "Run the State seed before District seed."
    );

    return;
  }

  for (const district of districts) {
    await prisma.district.upsert({
      where: {
        slug: district.slug,
      },

      update: {
        name: district.name,
        stateId: gujarat.id,
      },

      create: {
        name: district.name,
        slug: district.slug,
        stateId: gujarat.id,
      },
    });
  }

  console.log(
    `✅ ${districts.length} Gujarat districts seeded.`
  );
}
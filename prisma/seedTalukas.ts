import { prisma } from "../../src/lib/prisma";
import talukas from "../data/talukas.json";

export async function seedTalukas() {

  for (const taluka of talukas) {

    await prisma.taluka.upsert({

      where: {
        code: taluka.code,
      },

      update: {},

      create: taluka,

    });

  }

  console.log("Talukas Seeded");

}
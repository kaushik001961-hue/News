import { PrismaClient } from "@prisma/client";
import states from "../data/states.json";

// Instantiate PrismaClient directly for the seed script
const prisma = new PrismaClient();

export async function seedStates() {
  for (const state of states) {
    await prisma.state.upsert({
      where: {
        code: state.code,
      },
      update: {},
      create: state,
    });
  }

  console.log("States Seeded");
}
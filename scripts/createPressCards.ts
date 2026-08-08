import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const reporters = await prisma.reporter.findMany({
    where: {
      status: "APPROVED",
      PressCard: null,
    },
  });

  let counter = 1;

  for (const reporter of reporters) {
    await prisma.pressCard.create({
      data: {
        reporterId: reporter.id,
        cardNumber: `AGS-PC-2026-${String(counter).padStart(4, "0")}`,
        issueDate: reporter.approvedAt ?? new Date(),
        expiryDate: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ),
        active: true,
      },
    });

    counter++;
  }

  console.log(`Created ${counter - 1} Press Cards`);
}

main()
  .finally(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
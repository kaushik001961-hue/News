
import bcrypt from "bcryptjs";
import { PrismaClient, Role } from "@prisma/client";

export default async function seedUsers(prisma: PrismaClient) {
  console.log("👤 Seeding Users...");

  const users = [
    {
      name: "Admin",
      email: "admin@news.com",
      password: "admin123",
      role: Role.ADMIN,
    },
    {
      name: "Editor",
      email: "editor@news.com",
      password: "editor123",
      role: Role.EDITOR,
    },
    {
      name: "Reporter",
      email: "reporter@news.com",
      password: "reporter123",
      role: Role.REPORTER,
    },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        name: user.name,
        password: hashedPassword,
        role: user.role,
      },
      create: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      },
    });

    console.log(`✅ User seeded: ${user.email}`);
  }

  console.log("👤 Users seeding completed.");
}

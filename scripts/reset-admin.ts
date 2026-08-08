
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.update({
    where: {
      email: "admin@news.com",
    },
    data: {
      password: hashedPassword,
    },
  });

  console.log("✅ Password reset successfully");
  console.log("Email: admin@news.com");
  console.log("Password: admin123");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

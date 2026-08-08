const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function reset() {
  // Hash your brand new custom password
  const newPasswordHash = await bcrypt.hash("YOUR_NEW_PASSWORD_HERE", 10);

  // Update the user in your local database
  await prisma.user.update({
    where: { email: "jalpeshbhatt@gmail.com" },
    data: { password: newPasswordHash },
  });

  console.log("Password updated successfully!");
  await prisma.$disconnect();y
  
}

reset();
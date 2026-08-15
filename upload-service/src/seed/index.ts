import { prisma } from "../lib/prisma.js";

export const seedAdmin = async () => {
  return await prisma.admin.create({
    data: {
      userName: "admin",
      password: "admin",
    },
  });
};

seedAdmin()
  .then((data) => console.log("admin created", data))
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

import prisma from "@/libs/prisma";

export default async function getAllUsers() {
  return await prisma.user.findMany();
}

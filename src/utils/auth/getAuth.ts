import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

type getAuthType = {
  email: string;
  password: string;
};

export default async function getAuth({
  email,
  password,
}: getAuthType): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      password: true,
    },
  });
  const userPassword = user?.password;
  if (!userPassword) return false;
  return bcrypt.compare(password, userPassword);
}

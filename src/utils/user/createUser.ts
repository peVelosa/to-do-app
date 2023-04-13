import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

type createUserType = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export default async function createUser({
  email,
  firstName,
  lastName,
  password,
}: createUserType) {
  const numSaltRounds = 8;
  const hashedPassword = await bcrypt.hash(password, numSaltRounds);
  const username = `${firstName} ${lastName}`;
  return await prisma.user.create({
    data: {
      email: "velosa2002@gmail.com",
      username: "Pedro Velosa",
      password: "Pedro123@",
    },
  });
}

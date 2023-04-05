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

  return await prisma.user.create({
    data: {
      email,
      username: firstName + lastName,
      password: hashedPassword,
    },
  });
}

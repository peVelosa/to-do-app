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
}: createUserType): Promise<void> {
  const numSaltRounds = 8;
  const hashedPassword = await bcrypt.hash(password, numSaltRounds);
  await prisma.user.create({
    data: {
      email: email.toLocaleLowerCase(),
      username: `${firstName} ${lastName}`,
      password: hashedPassword,
    },
  });
}

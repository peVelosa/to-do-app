import prisma from "@/libs/prisma";

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
  return await prisma.user.create({
    data: {
      email,
      username: firstName + lastName,
      password: password,
    },
  });
}

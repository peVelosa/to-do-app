import prisma from "@/libs/prisma";

type getUserType = {
  email?: string;
  id?: string;
};

export default async function getUser({ email, id }: getUserType) {
  if (email) {
    return await prisma.user.findUnique({
      where: {
        email: email.toLocaleLowerCase(),
      },
      select: {
        username: true,
        id: true,
        email: true,
      },
    });
  }
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      id: true,
      email: true,
    },
  });
}

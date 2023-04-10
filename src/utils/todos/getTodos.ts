import prisma from "@/libs/prisma";

type getTodosType = {
  user_Id: string;
};

export default async function getTodos({ user_Id }: getTodosType) {
  return await prisma.to_do.findMany({
    where: {
      user_Id,
    },
  });
}

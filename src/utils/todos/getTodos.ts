import prisma from "@/libs/prisma";
import { ToDoType } from "@/types/Todo";
type getTodosType = {
  user_Id: string;
};

export default async function getTodos({
  user_Id,
}: getTodosType): Promise<ToDoType[]> {
  return await prisma.to_do.findMany({
    where: {
      user_Id,
    },
    select: {
      id: true,
      status: true,
      title: true,
      description: true,
      tasks: {
        select: {
          id: true,
          title: true,
          done: true,
          to_do_Id: true,
        },
      },
      updatedAt: true,
      user_Id: true,
    },
  });
}

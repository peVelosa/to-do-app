import prisma from "@/libs/prisma";
import { ToDoType } from "@/types/Todo";

type updateTodoProps = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export default async function updateTodo({
  id,
  title,
  description,
  status,
}: updateTodoProps) {
  await prisma.to_do.update({
    where: {
      id: id,
    },
    data: {
      title,
      description,
      status,
      updatedAt: new Date(),
    },
  });
}

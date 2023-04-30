import prisma from "@/libs/prisma";

type updateTodoProps = {
  id: string;
  title: string;
  description: string;
  status: string;
};

export default async function updateTodo({
  id,
  title,
  description = "",
  status,
}: updateTodoProps): Promise<void> {
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

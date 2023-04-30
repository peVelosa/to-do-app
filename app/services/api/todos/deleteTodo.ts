import prisma from "@/libs/prisma";

type deleteTodoType = {
  id: string;
};

export default async function deleteTodo({
  id,
}: deleteTodoType): Promise<void> {
  if (!id) new Error("Ops...");
  await prisma.to_do.delete({
    where: {
      id,
    },
  });
}

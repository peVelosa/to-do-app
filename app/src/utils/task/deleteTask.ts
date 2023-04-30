import prisma from "@/libs/prisma";

type deleteTaskProps = {
  id: string;
};

export default async function deleteTask({
  id,
}: deleteTaskProps): Promise<void> {
  await prisma.tasks.delete({
    where: {
      id,
    },
  });
}

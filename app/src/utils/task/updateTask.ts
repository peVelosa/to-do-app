import prisma from "@/libs/prisma";

type updateTaskProps = {
  id: string;
  done: boolean;
};

export default async function updateTask({
  id,
  done,
}: updateTaskProps): Promise<void> {
  await prisma.tasks.update({
    where: {
      id,
    },
    data: {
      done,
    },
  });
}

import prisma from "@/libs/prisma";

type createTaskProps = {
  title: string;
  to_do_Id: string;
};

export default async function createTask({
  title,
  to_do_Id,
}: createTaskProps): Promise<void> {
  await prisma.tasks.create({
    data: {
      title,
      to_do_Id,
      done: false,
    },
  });
}

import prisma from "@/libs/prisma";

type createTodoType = {
  newItem: string;
  user_Id: string;
};

export default async function createTodo({
  newItem,
  user_Id,
}: createTodoType): Promise<void> {
  if (!user_Id) new Error("Ops...");
  await prisma.to_do.create({
    data: {
      user_Id,
      status: "to-do",
      title: newItem,
    },
  });
}

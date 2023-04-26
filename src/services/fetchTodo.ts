import axios from "@/libs/axios";
import { FormatedToDoType } from "@/types/Todo";

export async function fetchTodo({
  user_Id,
}: {
  user_Id: string | undefined;
}): Promise<FormatedToDoType | undefined> {
  if (!user_Id) return;
  return await axios
    .get("/todo", {
      params: {
        user_Id,
      },
    })
    .then((res) => res.data);
}

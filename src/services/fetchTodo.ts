import axios from "@/libs/axios";

export async function fetchTodo({ user_Id }: { user_Id: string | undefined }) {
  if (!user_Id) return;
  return await axios
    .get("/todo", {
      params: {
        user_Id,
      },
    })
    .then((res) => res.data);
}

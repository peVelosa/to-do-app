import React from "react";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "@/libs/axios";
import useAuth from "@/utils/hooks/useAuth";
import { ToDoType } from "@/types/Todo";

async function fetchTodo({ user_Id }: { user_Id: string | undefined }) {
  if (!user_Id) return;
  return await axios
    .get("/todo", {
      params: {
        user_Id,
      },
    })
    .then((res) => res.data);
}

const Main = () => {
  const { user } = useAuth();
  const { data } = useQuery<ToDoType | undefined>({
    queryKey: ["todos"],
    queryFn: () => fetchTodo({ user_Id: user?.id }),
    enabled: !!user,
  });
  console.log(data);
  return <Container component={"main"}>Main</Container>;
};

export default Main;

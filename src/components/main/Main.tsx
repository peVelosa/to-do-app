import React from "react";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/utils/hooks/useAuth";
import { FormatedToDoType } from "@/types/Todo";
import { fetchTodo } from "@/services/fetchTodo";

const Main = () => {
  const { user } = useAuth();
  const { data } = useQuery<FormatedToDoType | undefined>({
    queryKey: ["todos"],
    queryFn: () => fetchTodo({ user_Id: user?.id }),
    enabled: !!user,
  });
  console.log(data);
  return <Container component={"main"}>Main</Container>;
};

export default Main;

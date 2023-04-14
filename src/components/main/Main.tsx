import React from "react";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/utils/hooks/useAuth";
import { fetchTodo } from "@/services/fetchTodo";
import DraggableSection from "./DragSection/DraggableSection";
import type { FormatedToDoType } from "@/types/Todo";

const Main = () => {
  const { user } = useAuth();
  const { data } = useQuery<FormatedToDoType | undefined>({
    queryKey: ["todos"],
    queryFn: () => fetchTodo({ user_Id: user?.id }),
    enabled: !!user,
  });

  if (!data) {
    return <h1>oi</h1>;
  }

  return (
    <Container component={"main"}>
      <DraggableSection status={"to-do"} toDos={data["to-do"]} />
      <DraggableSection status={"doing"} toDos={data["doing"]} />
      <DraggableSection status={"done"} toDos={data["done"]} />
    </Container>
  );
};

export default Main;

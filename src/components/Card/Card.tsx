import React from "react";
import { ToDoType } from "@/types/Todo";
import { Card as CardMui, Box, CardContent } from "@mui/material";
import { useDrag } from "react-dnd";

type CardProps = {
  isDragging: boolean;
  toDo: ToDoType;
};

const Card = ({ toDo }: CardProps) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "card",
      item: { toDo },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );
  return (
    <CardMui
      ref={dragRef}
      style={{ opacity }}
      sx={{ width: "100%", cursor: "pointer" }}
    >
      <CardContent>
        <h1>{toDo.title}</h1>
      </CardContent>
    </CardMui>
  );
};

export default Card;

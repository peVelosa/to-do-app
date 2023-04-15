import React from "react";
import { ToDoType } from "@/types/Todo";
import { Card as CardMui, CardContent } from "@mui/material";
import { useDrag } from "react-dnd";
import { CardType } from "@/libs/CardType";

type CardProps = {
  isDragging: boolean;
  toDo: ToDoType;
};

const Card = ({ toDo }: CardProps) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: CardType,
      item: toDo,
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

import React, { useState } from "react";
import {
  Card as CardMui,
  CardContent,
  Typography,
  Divider,
  CardActions,
} from "@mui/material";
import { useDrag } from "react-dnd";
import Tasks from "./Tasks/Tasks";
import AddTask from "./Tasks/AddTask";
import { CardType } from "@/libs/CardType";
import type { ToDoType } from "@/types/Todo";

type CardProps = {
  isDragging: boolean;
  toDo: ToDoType;
};

const Card = ({ toDo }: CardProps) => {
  const { title, tasks, status, id } = toDo;

  const [isNewTaskActive, setIsNewTaskActive] = useState<boolean>(false);

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

  const openNewTask = () => setIsNewTaskActive(true);
  const closeNewTask = () => setIsNewTaskActive(false);

  return (
    <CardMui ref={dragRef} style={{ opacity }} sx={{ width: "100%" }}>
      <CardContent>
        <Typography component={"h1"} variant="h6" gutterBottom>
          {title}
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardActions>
        <AddTask openNewTask={openNewTask} />
      </CardActions>
      <CardContent sx={{ py: 0, m: 0, px: 1 }}>
        <Tasks
          toDoId={id}
          tasks={tasks}
          status={status}
          isNewTaskActive={isNewTaskActive}
          closeNewTask={closeNewTask}
        />
      </CardContent>
    </CardMui>
  );
};

export default Card;

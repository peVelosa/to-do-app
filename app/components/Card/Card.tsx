"use client";

import React, { useState } from "react";
import { CardType } from "@/libs/CardType";
import { useDrag } from "react-dnd";

import {
  Card as CardMui,
  CardContent,
  Typography,
  Divider,
  CardActions,
} from "@mui/material";
import Tasks from "./Tasks/Tasks";
import AddTask from "./Tasks/AddTask";
import Modal from "../Modal/Modal";

import type { ToDoType } from "@/types/Todo";

type CardProps = {
  isDragging: boolean;
  toDo: ToDoType;
};

const Card = ({ toDo }: CardProps): JSX.Element => {
  const { title, tasks, status, id } = toDo;

  const [isNewTaskActive, setIsNewTaskActive] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: CardType,
      item: toDo,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [toDo]
  );

  const openNewTask = (): void => setIsNewTaskActive(true);
  const closeNewTask = (): void => setIsNewTaskActive(false);
  const setClose = (): void => setIsModalOpen(false);
  const handleOpen = (): void => setIsModalOpen(true);

  return (
    <>
      <Modal toDo={toDo} setClose={setClose} open={isModalOpen} />
      <CardMui
        ref={dragRef}
        style={{ opacity }}
        sx={{ width: "100%", color: "card.main" }}
      >
        <CardContent>
          <Typography
            component={"h1"}
            variant="h6"
            gutterBottom
            onClick={handleOpen}
            sx={{
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {title}
          </Typography>
          <Divider />
        </CardContent>
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
    </>
  );
};

export default Card;

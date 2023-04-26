import React, { useState } from "react";
import {
  Card as CardMui,
  CardContent,
  Typography,
  Divider,
  CardActions,
  Box,
} from "@mui/material";
import { useDrag } from "react-dnd";
import Tasks from "./Tasks/Tasks";
import AddTask from "./Tasks/AddTask";
import { CardType } from "@/libs/CardType";
import type { ToDoType } from "@/types/Todo";
import Modal from "../Modal/Modal";

type CardProps = {
  isDragging: boolean;
  toDo: ToDoType;
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Card = ({ toDo }: CardProps) => {
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

  const openNewTask = () => setIsNewTaskActive(true);
  const closeNewTask = () => setIsNewTaskActive(false);
  const setClose = () => setIsModalOpen(false);
  const handleOpen = () => setIsModalOpen(true);

  return (
    <>
      <Modal toDo={toDo} setClose={setClose} open={isModalOpen} />
      <CardMui ref={dragRef} style={{ opacity }} sx={{ width: "100%" }}>
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

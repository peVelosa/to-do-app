import React from "react";
import {
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import axios from "@/libs/axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FormatedToDoType, StatusType, TasksType } from "@/types/Todo";

type TaskItemProps = {
  task: TasksType;
  status: StatusType;
};

const TaskItem = ({ task, status }: TaskItemProps) => {
  const queryClient = useQueryClient();

  const updateTask = useMutation({
    mutationKey: ["todos"],
    mutationFn: () => {
      return axios.put(`/task/${task.id}/${String(!task.done)}`);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<FormatedToDoType>([
        "todos",
      ]);

      if (!previousTodos || task.to_do_Id === "1") return;

      queryClient.setQueryData<unknown>(["todos"], (old: FormatedToDoType) => ({
        ...old,
        [status]: old[status].map((toDo) => {
          if (toDo.id === task.to_do_Id) {
            return {
              ...toDo,
              tasks: toDo.tasks.map((t) => {
                if (t.id === task.id) {
                  return { ...t, done: !t.done };
                }
                return t;
              }),
            };
          }
          return toDo;
        }),
      }));

      return { previousTodos };
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<FormatedToDoType>(
          ["todos"],
          context.previousTodos
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const deleteTask = useMutation({
    mutationKey: ["todos"],
    mutationFn: () => {
      return axios.delete("/task", {
        data: {
          id: task.id,
        },
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<FormatedToDoType>([
        "todos",
      ]);

      if (!previousTodos || task.to_do_Id === "1") return;

      queryClient.setQueryData<unknown>(["todos"], (old: FormatedToDoType) => ({
        ...old,
        [status]: old[status].map((toDo) => {
          if (toDo.id === task.to_do_Id) {
            return {
              ...toDo,
              tasks: toDo.tasks.filter((t) => t.id !== task.id),
            };
          }
          return toDo;
        }),
      }));

      return { previousTodos };
    },
    onError: (err, variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<FormatedToDoType>(
          ["todos"],
          context.previousTodos
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });

  const handleToggle = () => {
    if (task.to_do_Id === "1" || task.id === "1") return;
    updateTask.mutate();
  };
  const handleDelete = () => {
    if (task.to_do_Id === "1" || task.id === "1") return;
    deleteTask.mutate();
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={handleDelete}>
          <DeleteForeverIcon color="error" />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton
        dense
        disableGutters
        sx={{ pl: 1 }}
        onClick={handleToggle}
      >
        <ListItemIcon sx={{ minWidth: 30 }}>
          {task.done ? <TaskOutlinedIcon /> : <ContentPasteIcon />}
        </ListItemIcon>
        <ListItemText
          primary={task.title}
          id={task.id}
          sx={{ textDecoration: task.done ? "line-through" : "none" }}
        />
        <Checkbox
          edge="end"
          checked={task.done}
          inputProps={{ "aria-labelledby": task.id }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TaskItem;

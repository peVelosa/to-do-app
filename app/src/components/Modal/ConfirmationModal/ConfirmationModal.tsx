"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/libs/axios";

import {
  Box,
  Button,
  Modal as MuiModal,
  Stack,
  Typography,
} from "@mui/material";

import type { FormatedToDoType, StatusType, ToDoType } from "@/types/Todo";

type ConfirmationModal = {
  id: string;
  status: StatusType;
  open: boolean;
  onClose: () => void;
};

const ConfirmationModal = ({
  id,
  status,
  open,
  onClose,
}: ConfirmationModal): JSX.Element => {
  const queryClient = useQueryClient();

  const deleteTodo = useMutation({
    mutationKey: ["todos"],
    mutationFn: ({ id, status }: Partial<ConfirmationModal>) => {
      //id === '1' =>opt ui / status === prevStatus => status does not changed
      if (id === "1") return null as any;
      return axios.delete(`/todo/${id}`);
    },
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<FormatedToDoType>([
        "todos",
      ]);
      if (!previousTodos || id === "1") return;

      queryClient.setQueryData<unknown>(["todos"], (old: FormatedToDoType) => ({
        ...old,
        [status!]: old[status!].filter((t: ToDoType) => t.id !== id),
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
      queryClient.invalidateQueries<FormatedToDoType>({
        queryKey: ["todos"],
      });
    },
  });

  const handleDelete = (): void => deleteTodo.mutate({ id, status });

  return (
    <MuiModal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography component={"h1"} variant="h6">
          Are you sure you want delete it?
        </Typography>
        <Stack
          spacing={2}
          direction="row"
          sx={{ mt: 2 }}
          justifyContent={"space-around"}
        >
          <Button variant="text" color="error" onClick={handleDelete}>
            Delete To Do
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Leave
          </Button>
        </Stack>
      </Box>
    </MuiModal>
  );
};

export default ConfirmationModal;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  width: "100%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

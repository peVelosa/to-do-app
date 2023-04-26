import React from "react";
import type { FormatedToDoType, StatusType, ToDoType } from "@/types/Todo";
import { useDrop } from "react-dnd";
import Card from "@/components/Card/Card";
import { Box, Divider, Stack, Typography } from "@mui/material";
import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "@/libs/axios";
import { Axios } from "axios";
import { CardType } from "@/libs/CardType";

type DraggableSectionProps = {
  toDos: ToDoType[] | [];
  status: StatusType;
};

type dropProps = {
  id: string;
  title: string;
  description: string;
  prevStatus: StatusType;
};

const DraggableSection = ({ toDos, status }: DraggableSectionProps) => {
  const queryClient = useQueryClient();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: CardType,
    drop: (toDo: ToDoType) => {
      changeStatus.mutate(toDo);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const changeStatus = useMutation({
    mutationKey: ["todos"],
    mutationFn: (toDo: ToDoType) => {
      const { id, title, description, status: prevStatus } = toDo;
      //id === '1' =>opt ui / status === prevStatus => status does not changed
      if (id === "1") return null as any;
      return axios.put("/todo", {
        id,
        title,
        description,
        status,
      });
    },
    onMutate: async (toDo) => {
      const { id, status: prevStatus } = toDo;
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<FormatedToDoType>([
        "todos",
      ]);
      if (!previousTodos || id === "1") return;

      queryClient.setQueryData<unknown>(["todos"], (old: FormatedToDoType) => ({
        ...old,
        [prevStatus]: old[prevStatus].filter((t: ToDoType) => t.id !== id),
      }));
      queryClient.setQueryData<unknown>(["todos"], (old: FormatedToDoType) => ({
        ...old,
        [status]: [{ ...toDo, status: status }, ...old[status]],
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

  return (
    <Box
      ref={drop}
      sx={{
        overflow: "auto",
        minWidth: 200,
        backgroundColor: "ButtonHighlight",
        flexGrow: 1,
        opacity: isOver ? 0.5 : 1,
        height: "100%",
        p: 2,
      }}
    >
      <Stack justifyContent={"center"} alignItems={"center"}>
        <Typography
          sx={{ textTransform: "capitalize" }}
          component={"h2"}
          variant="h6"
        >
          {status}
        </Typography>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Stack alignItems={"center"} gap={2}>
        {toDos.map((toDo) => (
          <Card isDragging={isOver} toDo={toDo} key={toDo.id} />
        ))}
      </Stack>
    </Box>
  );
};

export default DraggableSection;

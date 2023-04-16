import React from "react";
import { Box } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/libs/axios";
import { useForm } from "react-hook-form";
import useAuth from "@/utils/hooks/useAuth";
import NewItemInput from "./fields/NewItem/NewItemInput";
import type { NewItemType } from "@/types/NewItem";
import type { FormatedToDoType } from "@/types/Todo";

const NewToDo = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { control, setValue, handleSubmit } = useForm<NewItemType>({
    defaultValues: {
      newItem: "",
    },
  });

  const create = useMutation({
    mutationKey: ["todos"],
    mutationFn: ({ newItem }: { newItem: string }) => {
      setValue("newItem", "");
      return axios.post("/todo", {
        newItem,
        user_Id: user?.id,
      });
    },
    onMutate: async ({ newItem }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<FormatedToDoType>([
        "todos",
      ]);
      if (!previousTodos) return;

      queryClient.setQueryData<unknown>(["todos"], (old: FormatedToDoType) => ({
        ...old,
        ["to-do"]: [
          {
            id: "1",
            title: newItem,
            description: "",
            tasks: [],
            updatedAt: new Date(),
          },
          ...old["to-do"],
        ],
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

  const onSubmit = (data: NewItemType) =>
    create.mutate({ newItem: data.newItem });

  return (
    <Box sx={{ px: 2, mx: "auto", mb: 3, maxWidth: "45ch", width: "100%" }}>
      <NewItemInput
        control={control}
        name="newItem"
        rules={{ required: true }}
        onSubmit={handleSubmit(onSubmit)}
      />
    </Box>
  );
};

export default NewToDo;

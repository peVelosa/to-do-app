import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/libs/axios";
import { useForm } from "react-hook-form";
import NewItemInput from "../fields/NewItem/NewItemInput";
import { NewItemType } from "@/types/NewItem";
import useAuth from "@/utils/hooks/useAuth";

const NewToDo = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<NewItemType>({
    defaultValues: {
      newItem: "",
    },
  });

  const create = useMutation({
    mutationKey: ["todos"],
    mutationFn: ({ newItem }: { newItem: string }) => {
      return axios.post("/todo", {
        newItem,
        user_Id: user?.id,
      });
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const onSubmit = (data: NewItemType) =>
    create.mutate({ newItem: data.newItem });

  return (
    <Box sx={{ px: 2, mx: "auto", mb: 5, maxWidth: "45ch", width: "100%" }}>
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

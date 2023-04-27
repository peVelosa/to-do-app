import React, { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/libs/axios";

import { Box, Divider, Modal as MuiModal, Typography } from "@mui/material";
import Tasks from "../Card/Tasks/Tasks";
import AddTask from "../Card/Tasks/AddTask";
import StyledInput from "../fields/StyledInput";
import { useForm } from "react-hook-form";
import TitleInput from "../fields/Title/TitleInput";
import Status from "../fields/Status/Status";
import DeleteButton from "./DeleteButton";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";

import type {
  FormatedToDoType,
  StatusType,
  ToDoFormType,
  ToDoType,
} from "@/types/Todo";

type ModalProps = {
  toDo: ToDoType;
  open: boolean;
  setClose: () => void;
};

type updateTodoType = {
  id: string;
  prevStatus: StatusType;
  title: string;
  description: string;
  status: StatusType;
};

const Modal = ({ toDo, open, setClose }: ModalProps): JSX.Element => {
  const queryClient = useQueryClient();

  const [isNewTaskActive, setIsNewTaskActive] = useState<boolean>(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);

  const { control, setValue, handleSubmit, reset, getValues } =
    useForm<ToDoFormType>({
      defaultValues: {
        title: "",
        description: "",
        status: "" as StatusType,
      },
    });

  useEffect(() => {
    setValue("title", toDo.title);
    setValue("description", toDo.description);
    setValue("status", toDo.status);

    () => {
      reset();
    };
  }, [toDo, open, setValue, reset]);

  const updateTodo = useMutation({
    mutationKey: ["todos"],
    mutationFn: ({
      id,
      prevStatus,
      title,
      description,
      status,
    }: updateTodoType) => {
      //id === '1' =>opt ui / status === prevStatus => status does not changed
      if (id === "1") return null as any;
      return axios.put("/todo", {
        id,
        title,
        description,
        status,
      });
    },
    onMutate: async ({ id, prevStatus, title, description, status }) => {
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
        [status]: [
          {
            ...toDo,
            title,
            description,
            status,
          },
          ...old[status],
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

  const onSubmit = (data: ToDoFormType): void => {
    const { title, status, description } = data;
    if (
      title === toDo.title &&
      status === toDo.status &&
      description === toDo.description
    )
      return setClose();
    const newTitle = getValues("title");
    const newDescription = getValues("description");
    const newStatus = getValues("status");
    updateTodo.mutate({
      id: toDo.id,
      prevStatus: toDo.status,
      title: newTitle,
      description: newDescription,
      status: newStatus,
    });
    setClose();
  };
  const openNewTask = (): void => setIsNewTaskActive(true);
  const closeNewTask = (): void => setIsNewTaskActive(false);
  const openConfirmationModal = (): void => setIsConfirmationModalOpen(true);
  const onClose = (): void => setIsConfirmationModalOpen(false);

  return (
    <>
      <ConfirmationModal
        id={toDo.id}
        status={toDo.status}
        open={isConfirmationModalOpen}
        onClose={onClose}
      />
      <MuiModal open={open} onClose={() => handleSubmit(onSubmit)()}>
        <Box sx={style}>
          <DeleteButton openConfirmationModal={openConfirmationModal} />
          <TitleInput
            control={control}
            name="title"
            rules={{ required: true }}
            label=""
            type="text"
          />
          <Status control={control} name="status" rules={{}} />
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography id="modal-toDo-title" variant="h6" component="h2">
              Description
            </Typography>
            <StyledInput
              control={control}
              label=""
              name="description"
              rules={{}}
              multiline={true}
              rows={4}
              fullWidth
              type="text"
              required={false}
              placeholder={"Type something..."}
            />
          </Box>
          <Divider sx={{ my: 2 }} />
          <AddTask openNewTask={openNewTask} />
          <Tasks
            tasks={toDo.tasks}
            status={toDo.status}
            toDoId={toDo.id}
            isNewTaskActive={isNewTaskActive}
            closeNewTask={closeNewTask}
            maxHeight={250}
          />
        </Box>
      </MuiModal>
    </>
  );
};

export default Modal;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 800,
  width: "100%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  color: "card.main",
  pt: 6,
  pb: 2,
  px: 4,
};

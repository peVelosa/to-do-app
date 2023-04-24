import React from "react";
import NewTask from "@/components/fields/NewTask/NewTask";
import { List } from "@mui/material";
import { useForm } from "react-hook-form";
import TaskItem from "./TaskItem";
import type {
  FormatedToDoType,
  NewTaskType,
  StatusType,
  TasksType,
  ToDoType,
} from "@/types/Todo";
import axios from "@/libs/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TasksProps = {
  toDoId: string;
  tasks: TasksType[];
  status: StatusType;
  isNewTaskActive: boolean;
  closeNewTask: () => void;
};

const Tasks = ({
  toDoId,
  tasks,
  isNewTaskActive,
  status,
  closeNewTask,
}: TasksProps) => {
  const { control, handleSubmit, reset } = useForm<NewTaskType>({
    defaultValues: {
      newTask: "",
    },
  });
  const queryClient = useQueryClient();

  const addTask = useMutation({
    mutationKey: ["todos"],
    mutationFn: ({ title }: Partial<TasksType>) => {
      return axios.post("/task", {
        title,
        to_do_Id: toDoId,
      });
    },
    onMutate: async ({ title }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<FormatedToDoType>([
        "todos",
      ]);

      if (!previousTodos) return;

      queryClient.setQueryData<unknown>(["todos"], (old: FormatedToDoType) => ({
        ...old,
        [status]: old[status].map((toDo) => {
          if (toDo.id === toDoId) {
            return {
              ...toDo,
              tasks: [
                ...toDo.tasks,
                { id: "1", title, done: false, to_do_Id: toDoId },
              ],
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
      queryClient.invalidateQueries<FormatedToDoType>({
        queryKey: ["todos"],
      });
    },
  });

  const onSubmit = (data: NewTaskType) => {
    const { newTask } = data;
    if (!newTask || toDoId === "1") return;
    addTask.mutate({ title: newTask });
    reset();
  };
  return (
    <>
      {tasks.length !== 0 ? (
        <List sx={{ maxHeight: 135, overflowY: "auto", mb: 3 }}>
          {tasks.map((task, index) => (
            <TaskItem
              key={`${task.id}${task.title}${index}`}
              task={task}
              status={status}
            />
          ))}
        </List>
      ) : null}

      {isNewTaskActive && (
        <NewTask
          control={control}
          name={"newTask"}
          rules={{}}
          closeNewTask={closeNewTask}
          onSubmit={handleSubmit(onSubmit)}
          resetNewTaskValue={reset}
        />
      )}
    </>
  );
};

export default Tasks;

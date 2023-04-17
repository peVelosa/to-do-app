import React from "react";
import NewTask from "@/components/fields/NewTask/NewTask";
import { List } from "@mui/material";
import { useForm } from "react-hook-form";
import TaskItem from "./TaskItem";
import type { NewTaskType, StatusType, TasksType } from "@/types/Todo";

type TasksProps = {
  tasks: TasksType[];
  status: StatusType;
  isNewTaskActive: boolean;
  closeNewTask: () => void;
};

const Tasks = ({
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

  const onSubmit = (data: NewTaskType) => {
    const { newTask } = data;
    if (!newTask) return;
    console.log("create task");
  };
  return (
    <>
      {tasks.length !== 0 ? (
        <List sx={{ maxHeight: 135, overflowY: "auto", mb: 3 }}>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} status={status} />
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

export type ToDoType = {
  id: string;
  title: string;
  status: StatusType;
  tasks: TasksType[];
  description: string;
  user_Id: string;
  updatedAt: Date;
};

export type StatusType = "to-do" | "doing" | "done";

export type TasksType = {
  id: string;
  title: string;
  done: boolean;
  to_do_Id: string;
};

export type FormatedToDoType = {
  "to-do": ToDoType[];
  doing: ToDoType[];
  done: ToDoType[];
};

export type NewTaskType = {
  newTask: string;
};

export type ToDoFormType = {
  title: string;
  description: string;
  status: StatusType;
};

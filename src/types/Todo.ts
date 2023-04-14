export type ToDoType = {
  id: string;
  title: string;
  status: "to-do" | "doing" | "done";
  tasks: TasksType[];
  description: string;
  user_Id: string;
  updatedAt: Date;
};

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

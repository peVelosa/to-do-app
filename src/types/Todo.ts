export type ToDoType = {
  id: string;
  title: string;
  status: "to-do" | "doing" | "done";
  description: string;
  user_Id: string;
  updatedAt: Date;
  createdAt: Date;
};

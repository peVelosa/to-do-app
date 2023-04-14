import { FormatedToDoType, ToDoType } from "@/types/Todo";

export function formatPrisma(data: ToDoType[]): FormatedToDoType {
  const formatedToDo: FormatedToDoType = { "to-do": [], doing: [], done: [] };

  data.forEach((toDo) => {
    formatedToDo[toDo.status] = [...formatedToDo[toDo.status], toDo];
  });

  return formatedToDo;
}

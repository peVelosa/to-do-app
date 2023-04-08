import { Tasks } from "@prisma/client";

export type UserType = {
  email: string;
  username: string;
  id: string;
  To_do: {
    id: string;
    description: string;
    status: string;
    tasks: Tasks[];
    title: string;
  };
};

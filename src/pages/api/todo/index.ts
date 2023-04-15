// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { formatPrisma } from "@/services/formatPrisma";
import createTodo from "@/utils/todos/createTodo";
import getTodos from "@/utils/todos/getTodos";
import updateTodo from "@/utils/todos/updateTodo";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { user_Id } = req.query as { user_Id: string };
      if (!user_Id) res.status(404).json({ err: "Something went wrong" });
      const data = await getTodos({ user_Id });
      const formattedData = formatPrisma(data);
      res.status(201).json(formattedData);
    } catch {
      res.status(404).end();
    }
  }
  if (req.method === "POST") {
    const { user_Id, newItem } = req.body;
    if (!user_Id) res.status(404).json({ err: "Something went wrong" });
    try {
      await createTodo({ newItem, user_Id });
      res.status(201).end();
    } catch {
      res.status(404).json("Something went wrong");
    }
  }
  if (req.method === "PUT") {
    const { id, title, description, status } = req.body;
    if (!id || !title || !status)
      res.status(404).json({ err: "Something went wrong" });
    try {
      await updateTodo({ id, title, description, status });
      res.status(201).end();
    } catch {
      res.status(404).json("Something went wrong");
    }
  }
}

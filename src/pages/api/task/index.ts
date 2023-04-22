// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createTask from "@/utils/task/createTask";
import deleteTask from "@/utils/task/deleteTask";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, to_do_Id } = req.body;

    if (!title || !to_do_Id)
      res.status(404).json({ err: "Something went wrong" });
    try {
      await createTask({ title, to_do_Id });
      res.status(201).end();
    } catch {
      res.status(404).json("Something went wrong");
    }
  }
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) res.status(404).json({ err: "Something went wrong" });
    try {
      await deleteTask({ id });
      res.status(201).json("Task deleted");
    } catch {
      res.status(404).json("Something went wrong");
    }
  }
}

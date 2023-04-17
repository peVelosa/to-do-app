// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import updateTask from "@/utils/task/updateTask";
import type { NextApiRequest, NextApiResponse } from "next";

type taskStatusType = [id: string, done: string];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { taskStatus } = req.query;
    const [id, done] = taskStatus as taskStatusType;

    const boolDone = done === "true";

    try {
      await updateTask({ id, done: boolDone });
      res.status(201).end();
    } catch {
      res.status(404).json({ err: "Something went wrong" });
    }
  }
}

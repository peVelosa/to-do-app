// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getTodos from "@/utils/todos/getTodos";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { user_Id } = req.body;
      const data = await getTodos({ user_Id });
      res.status(201).json(data);
    } catch {
      res.status(404).end();
    }
  }
}

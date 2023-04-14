// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { formatPrisma } from "@/services/formatPrisma";
import getTodos from "@/utils/todos/getTodos";
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
}

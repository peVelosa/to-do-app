// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getUser from "@/utils/user/getUser";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query as { id: string };

  try {
    const data = await getUser({ id });
    res.status(201).json(data);
  } catch {
    res.status(202).json({ err: "Email already exists" });
  }
}

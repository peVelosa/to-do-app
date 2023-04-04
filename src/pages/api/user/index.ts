// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createUser from "@/utils/user/createUser";
import getAllUsers from "@/utils/user/getAll";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await getAllUsers();
    res.status(200).json(data);
  }
  if (req.method === "POST") {
    const { email, firstName, lastName, password } = req.body.req;
    try {
      await createUser({ email, firstName, lastName, password });
      res.status(201).end();
    } catch {
      res.status(202).json({ err: "Email already exists" });
    }
  }
}

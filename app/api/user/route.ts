// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getAuth from "@/services/api/auth/getAuth";
import createUser from "@/services/api/user/createUser";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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

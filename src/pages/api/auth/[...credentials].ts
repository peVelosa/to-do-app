import getAuth from "@/utils/auth/getAuth";
import type { NextApiRequest, NextApiResponse } from "next";

type credentialsType = [email: string, password: string];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { credentials } = req.query;
    const [email, password] = credentials as credentialsType;
    try {
      const isAuth = await getAuth({ email, password });
      if (!isAuth) res.status(202).json({ data: "User not found" });
      res.status(200).end();
    } catch {
      res.status(404).json({ err: "Path not found" });
    }
  }
}

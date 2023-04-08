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
      const { isAuth, data } = await getAuth({ email, password });
      if (!isAuth) res.status(202).json({ err: "User not found" });
      res.status(200).json(data);
    } catch {
      res.status(404).json({ err: "Path not found" });
    }
  }
}

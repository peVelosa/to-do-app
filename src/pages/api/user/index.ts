// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createUser from "@/utils/user/createUser";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, firstName, lastName, password } = req.body.req;
    const numSaltRounds = 8;
    const hashedPassword = await bcrypt.hash(password, numSaltRounds);

    const data = await prisma.user.create({
      data: {
        email,
        username: `${firstName} ${lastName}`,
        password: hashedPassword,
      },
    });
    // await createUser({ email, firstName, lastName, password });
    res.status(201).json(data);
    // try {
    //   await createUser({ email, firstName, lastName, password });
    //   res.status(201).end();
    // } catch {
    //   res.status(202).json({ err: "Email already exists" });
    // }
  }
}

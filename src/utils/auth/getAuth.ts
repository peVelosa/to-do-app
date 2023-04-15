import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

type getAuthType = {
  email: string;
  password: string;
};

export default async function getAuth({ email, password }: getAuthType) {
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLocaleLowerCase(),
    },
    select: {
      password: true,
      username: true,
      id: true,
      email: true,
    },
  });
  const userPassword = user?.password;
  if (!userPassword) return { isAuth: false, data: {} };

  const isAuth = await bcrypt.compare(password, userPassword);

  if (!isAuth) return { isAuth, data: {} };

  return {
    isAuth,
    data: {
      email: user.email,
      id: user.id,
      username: user.username,
    },
  };
}

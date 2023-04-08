import axios from "@/libs/axios";
import { v4 as uuid } from "uuid";

type signInRequestProps = {
  email: string;
  password: string;
};

export default async function signInRequest({
  email,
  password,
}: signInRequestProps) {
  const res = await axios
    .get(`/auth/${email}/${password}`)
    .then((res) => res.data);

  return {
    token: uuid(),
    user: res,
  };
}

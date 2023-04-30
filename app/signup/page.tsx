import SignUp from "@/components/singup/SingUp";

import type { NextPage } from "next";
import Router from "next/navigation";
import { cookies } from "next/headers";

export const metadata = {
  title: "Sign Up",
};

const SignUpPage: NextPage = (): JSX.Element => {
  const nextCookies = cookies();
  const authToken = nextCookies.get("nextauth.token");
  const idToken = nextCookies.get("nextauth.id");
  if (authToken && idToken) {
    Router.redirect("/");
  }

  return (
    <>
      <SignUp />
    </>
  );
};

export default SignUpPage;

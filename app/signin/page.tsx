import SignIn from "@/components/signin/SignIn";

import { cookies } from "next/headers";
import Router from "next/navigation";
import type { NextPage } from "next";

export const metadata = {
  title: "Sign In",
};

const SignInPage: NextPage = (): JSX.Element => {
  const nextCookies = cookies();
  const authToken = nextCookies.get("nextauth.token");
  const idToken = nextCookies.get("nextauth.id");
  if (authToken && idToken) {
    Router.redirect("/");
  }

  return (
    <>
      <SignIn />
    </>
  );
};
export default SignInPage;

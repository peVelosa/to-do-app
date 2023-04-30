import SignIn from "@/components/signin/SignIn";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextPage } from "next";

export const metadata = {
  title: "Sign In",
};

const SignInPage: NextPage = (): JSX.Element => {
  const nextCookies = cookies();
  const authToken = nextCookies.get("nextauth.token");
  const idToken = nextCookies.get("nextauth.id");
  if (authToken && idToken) {
    redirect("/");
  }

  return (
    <>
      <SignIn />
    </>
  );
};
export default SignInPage;

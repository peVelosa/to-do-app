import Head from "next/head";

import SignIn from "@/components/signin/SignIn";

import type { NextPage } from "next";

const SignInPage: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignIn />
    </>
  );
};
export default SignInPage;

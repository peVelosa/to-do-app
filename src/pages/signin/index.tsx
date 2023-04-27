import Head from "next/head";

import SignIn from "@/components/signin/SignIn";
import dynamic from "next/dynamic";

import type { NextPage } from "next";

const DynamicSignInPage = dynamic(() => import("@/components/signin/SignIn"), {
  loading: () => <p>Loading...</p>,
});

const SignInPage: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DynamicSignInPage />
    </>
  );
};
export default SignInPage;

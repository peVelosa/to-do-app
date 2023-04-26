import React from "react";
import Head from "next/head";

import SignUp from "@/components/singup/SingUp";

import type { NextPage } from "next";

const SignUpPage: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUp />
    </>
  );
};

export default SignUpPage;

import React from "react";
import SignUp from "@/components/singup/SingUp";
import Head from "next/head";

const SignUpPage = () => {
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

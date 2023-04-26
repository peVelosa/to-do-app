import Head from "next/head";
import { parseCookies } from "nookies";
import getUser from "@/utils/user/getUser";
import Navbar from "@/components/Navbar";
import { User } from "@/types/Auth";
import Main from "@/components/Main/Main";
import NewToDo from "@/components/NewToDo";
import type { GetServerSideProps, NextPage } from "next";

type HomeProps = {
  user: User;
};

const Home: NextPage<HomeProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>My notes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar username={user.username} />
      <NewToDo />
      <Main />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { "nextauth.token": authToken, "nextauth.id": idToken } =
    parseCookies(ctx);

  if (!authToken) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  const user = await getUser({ id: idToken });

  return {
    props: { user },
  };
};

export default Home;

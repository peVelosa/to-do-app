import getUser from "@/utils/user/getUser";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main/Main";
import NewToDo from "@/components/NewToDo";
import Router from "next/navigation";
import { cookies } from "next/headers"; // Import cookies
import type { Metadata } from "next/types";

export async function generateMetadata(): Promise<Metadata> {
  const nextCookies = cookies(); // Get cookies object
  const idToken = nextCookies.get("nextauth.id");
  const user = await getUser({ id: idToken?.value });
  return { title: `My notes | ${user?.username ?? ""}` };
}

const Home = async () => {
  const nextCookies = cookies(); // Get cookies object
  const authToken = nextCookies.get("nextauth.token");
  const idToken = nextCookies.get("nextauth.id");
  if (!authToken || !idToken) {
    Router.redirect("/signin");
  }
  const user = await getUser({ id: idToken?.value });

  return (
    <>
      <Navbar username={user?.username} />
      <NewToDo />
      <Main />
    </>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { "nextauth.token": authToken, "nextauth.id": idToken } =
//     parseCookies(ctx);

//   if (!authToken) {
//     return {
//       redirect: {
//         destination: "/signin",
//         permanent: false,
//       },
//     };
//   }
//   const user = await getUser({ id: idToken });

//   return {
//     props: { user },
//   };
// };

export default Home;

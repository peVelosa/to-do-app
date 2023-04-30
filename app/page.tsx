import getUser from "@/services/api/user/getUser";
import Main from "@/components/Main/Main";
import NewToDo from "@/components/NewToDo";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"; // Import cookies
import Navbar from "@/components/Navbar/Navbar";
import { fetchTodo } from "@/services/fetchTodo";
import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import type { Metadata } from "next/types";

export async function generateMetadata(): Promise<Metadata> {
  const nextCookies = cookies(); // Get cookies object
  const idToken = nextCookies.get("nextauth.id");
  if (!idToken) {
    redirect("/signin");
  }
  const user = await getUser({ id: idToken?.value });
  return { title: `My notes | ${user?.username ?? ""}` };
}

const Home = async () => {
  const nextCookies = cookies(); // Get cookies object
  const authToken = nextCookies.get("nextauth.token");
  const idToken = nextCookies.get("nextauth.id");
  if (!authToken || !idToken) {
    redirect("/signin");
  }
  const user = await getUser({ id: idToken?.value });

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodo({ user_Id: user?.id }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <Hydrate state={dehydratedState}>
        <Navbar username={user?.username} />
        <NewToDo />
        <Main />
      </Hydrate>
    </>
  );
};

export default Home;

//default styles
import "@/styles/globals.css";

import AuthProvider from "@/utils/context/AuthContext";

//default AppProps types
import type { AppProps } from "next/app";

//basic setup react-dnd
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

//basic setup react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={HTML5Backend}>
          <Component {...pageProps} />
        </DndProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

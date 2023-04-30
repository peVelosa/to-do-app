"use client";
import AuthProvider from "@/utils/context/AuthContext";

//basic setup react-dnd
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  DndProvider,
  TouchTransition,
  MouseTransition,
} from "react-dnd-multi-backend";

//basic setup react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ColorModeProvider from "@/utils/context/ColorModeContext";
import { ReactNode, useState } from "react";

const HTML5toTouch = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};
const Provider = ({ children }: { children: ReactNode }) => {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  );
  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        <DndProvider options={HTML5toTouch}>
          <ColorModeProvider>{children}</ColorModeProvider>
        </DndProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default Provider;

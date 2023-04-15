import React from "react";
import {
  CircularProgress,
  Container,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/utils/hooks/useAuth";
import { fetchTodo } from "@/services/fetchTodo";
import DraggableSection from "./DragSection/DraggableSection";
import type { FormatedToDoType } from "@/types/Todo";

const theme = createTheme();

const Main = () => {
  const { user } = useAuth();
  const { data } = useQuery<FormatedToDoType | undefined>({
    queryKey: ["todos"],
    queryFn: () => fetchTodo({ user_Id: user?.id }),
    enabled: !!user,
  });

  if (!data) {
    return <CircularProgress />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component={"main"} sx={{ mb: 6, overflow: "auto" }}>
        <Stack
          flexDirection={"row"}
          gap={2}
          sx={{ height: "100%", overflow: "auto" }}
        >
          <DraggableSection status={"to-do"} toDos={data["to-do"]} />
          <DraggableSection status={"doing"} toDos={data["doing"]} />
          <DraggableSection status={"done"} toDos={data["done"]} />
        </Stack>
      </Container>
    </ThemeProvider>
  );
};

export default Main;

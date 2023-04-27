import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/utils/hooks/useAuth";
import { fetchTodo } from "@/services/fetchTodo";

import { CircularProgress, Container, Grid, Stack } from "@mui/material";
import DraggableSection from "./DragSection/DraggableSection";

import type { FormatedToDoType } from "@/types/Todo";

const Main = (): JSX.Element => {
  const { user } = useAuth();
  const { data } = useQuery<FormatedToDoType | undefined>({
    queryKey: ["todos"],
    queryFn: () => fetchTodo({ user_Id: user?.id }),
    enabled: !!user,
  });

  if (!data) {
    return (
      <Stack alignItems="center" sx={{ mt: 8 }}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Container component={"main"} sx={{ mb: 6, overflow: "auto" }}>
      <Grid
        container
        spacing={2}
        sx={{ height: "100%", overflow: "auto", flexWrap: "nowrap", gap: 2 }}
      >
        <Grid item xs={4} sx={{ minWidth: 200 }}>
          <DraggableSection status={"to-do"} toDos={data["to-do"]} />
        </Grid>
        <Grid item xs={4} sx={{ minWidth: 200 }}>
          <DraggableSection status={"doing"} toDos={data["doing"]} />
        </Grid>
        <Grid item xs={4} sx={{ minWidth: 200 }}>
          <DraggableSection status={"done"} toDos={data["done"]} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;

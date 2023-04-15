import React from "react";
import type { StatusType, ToDoType } from "@/types/Todo";
import { useDrop } from "react-dnd";
import Card from "@/components/Card/Card";
import { Box, Stack, ThemeProvider, createTheme } from "@mui/material";

type DraggableSectionProps = {
  toDos: ToDoType[] | [];
  status: StatusType;
};

const DraggableSection = ({ toDos, status }: DraggableSectionProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: "card",
    drop: (toDo) => console.log(toDo),
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={drop}
      sx={{
        overflow: "auto",
        minWidth: 200,
        backgroundColor: "ButtonHighlight",
        flexGrow: 1,
        opacity: isOver ? 0.5 : 1,
        height: "100%",
        p: 2,
      }}
    >
      <Stack alignItems={"center"} gap={2}>
        {toDos.map((toDo) => (
          <Card isDragging={isOver} toDo={toDo} key={toDo.id} />
        ))}
      </Stack>
    </Box>
  );
};

export default DraggableSection;

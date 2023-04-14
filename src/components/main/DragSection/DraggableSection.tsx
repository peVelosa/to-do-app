import React from "react";
import type { StatusType, ToDoType } from "@/types/Todo";
import { useDrop } from "react-dnd";
import Card from "@/components/Card/Card";

type DraggableSectionProps = {
  toDos: ToDoType[] | [];
  status: StatusType;
};

const DraggableSection = ({ toDos, status }: DraggableSectionProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    // The type (or types) to accept - strings or symbols
    accept: "card",
    drop: (text) => console.log(text),
    // Props to collect
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} style={{ opacity: isOver ? 0.5 : 1 }}>
      <h1>{status}</h1>
      <Card isDragging={isOver} text={"oi"} />
    </div>
  );
};

export default DraggableSection;

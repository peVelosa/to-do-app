import React from "react";
import { useDrag } from "react-dnd";

const Card = ({ isDragging, text }) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "card",
      item: { text, ola: "oi" },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );
  return (
    <div ref={dragRef} style={{ opacity }}>
      <h1>{text}</h1>
    </div>
  );
};

export default Card;

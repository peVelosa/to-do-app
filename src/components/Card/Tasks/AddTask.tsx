import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type AddTaskProps = {
  openNewTask: () => void;
};

const AddTask = ({ openNewTask }: AddTaskProps) => {
  return (
    <>
      <Button onClick={openNewTask} startIcon={<AddIcon color="success" />}>
        Add Task
      </Button>
    </>
  );
};

export default AddTask;

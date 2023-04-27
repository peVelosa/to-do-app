import React, { useEffect } from "react";
import { UseControllerProps, useController } from "react-hook-form";

import { FormControl, TextField } from "@mui/material";

import type { NewTaskType } from "@/types/Todo";
import useColorMode from "@/utils/hooks/useColorMode";
import { formColorMode } from "@/utils/FormColorMode";

interface NewTaskProps extends UseControllerProps<NewTaskType> {
  closeNewTask: () => void;
  onSubmit: () => void;
  resetNewTaskValue: () => void;
}

const NewTask = ({
  control,
  name,
  rules,
  closeNewTask,
  onSubmit,
  resetNewTaskValue,
}: NewTaskProps): JSX.Element => {
  const { field } = useController({ control, name, rules });
  const { mode } = useColorMode();

  useEffect(() => {
    return () => {
      resetNewTaskValue();
    };
  }, [resetNewTaskValue]);

  return (
    <FormControl
      component={"form"}
      sx={{
        mt: 1,
        ...formColorMode(mode),
      }}
      fullWidth
      onSubmit={onSubmit}
    >
      <TextField
        {...field}
        autoFocus
        size="small"
        inputProps={{ style: { color: mode === "dark" ? "white" : "black" } }}
        onBlur={() => {
          onSubmit();
          closeNewTask();
        }}
        placeholder="Enter new task"
      />
    </FormControl>
  );
};

export default NewTask;

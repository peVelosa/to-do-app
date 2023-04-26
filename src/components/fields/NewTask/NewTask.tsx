import React, { useEffect } from "react";
import { UseControllerProps, useController } from "react-hook-form";

import { FormControl, TextField } from "@mui/material";

import type { NewTaskType } from "@/types/Todo";

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

  useEffect(() => {
    return () => {
      resetNewTaskValue();
    };
  }, [resetNewTaskValue]);

  return (
    <FormControl
      component={"form"}
      sx={{ mt: 1 }}
      fullWidth
      onSubmit={onSubmit}
    >
      <TextField
        {...field}
        autoFocus
        size="small"
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

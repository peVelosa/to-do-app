import React, { HTMLInputTypeAttribute } from "react";
import { FormControl, TextField } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";
import HelperText from "../Errors/HelperText";
import { ToDoFormType } from "@/types/Todo";

interface TitleInputProps extends UseControllerProps<ToDoFormType> {
  type: HTMLInputTypeAttribute;
  label: string;
}

const TitleInput = ({ control, name, rules }: TitleInputProps) => {
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <FormControl
      sx={{ my: 1 }}
      variant="outlined"
      fullWidth
      error={!!fieldState.error}
    >
      <TextField
        id="outlined-multiline-static"
        {...field}
        fullWidth
        variant="standard"
      />
      {!fieldState.error ? null : fieldState.error.type === "required" ? (
        <HelperText message={"This is required"} />
      ) : (
        <HelperText message={fieldState.error.message} />
      )}
    </FormControl>
  );
};

export default TitleInput;

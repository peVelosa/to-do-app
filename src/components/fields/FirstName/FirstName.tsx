import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import type { SignUpFormType } from "@/types/Sign";
import { UseControllerProps, useController } from "react-hook-form";
import FirstNameError from "./FirstNameError";

const FirstName = ({
  control,
  name,
  rules,
}: UseControllerProps<SignUpFormType>) => {
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <FormControl sx={{ my: 1 }} variant="outlined" fullWidth required>
      <InputLabel htmlFor={name}>First Name</InputLabel>
      <OutlinedInput {...field} label="First Name" id={name} type={"text"} />
      {!fieldState.error ? null : fieldState.error.type === "required" ? (
        <FirstNameError message={"This is required"} />
      ) : (
        <FirstNameError message={fieldState.error.message} />
      )}
    </FormControl>
  );
};

export default FirstName;

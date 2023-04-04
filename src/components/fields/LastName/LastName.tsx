import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import type { SignUpFormType } from "@/types/Sign";
import { UseControllerProps, useController } from "react-hook-form";
import LastNameError from "./LastNameError";

const LastName = ({
  control,
  name,
  rules,
}: UseControllerProps<SignUpFormType>) => {
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <FormControl sx={{ my: 1 }} variant="outlined" fullWidth required>
      <InputLabel htmlFor={name}>Last Name</InputLabel>
      <OutlinedInput {...field} label="Last Name" id={name} type={"text"} />
      {!fieldState.error ? null : fieldState.error.type === "required" ? (
        <LastNameError message={"This is required"} />
      ) : (
        <LastNameError message={fieldState.error.message} />
      )}
    </FormControl>
  );
};

export default LastName;

import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import EmailError from "./EmailError";
import { useController, UseControllerProps } from "react-hook-form";
import { SignInFormType } from "@/types/Sign";

const Email = ({
  control,
  name,
  rules,
}: UseControllerProps<SignInFormType>) => {
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <FormControl sx={{ my: 1 }} variant="outlined" fullWidth required>
      <InputLabel htmlFor={name}>Email</InputLabel>
      <OutlinedInput {...field} label="Email" id={name} type={"text"} />
      {fieldState.error && <EmailError message={fieldState.error.message} />}
    </FormControl>
  );
};

export default Email;

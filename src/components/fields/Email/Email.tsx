import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import EmailError from "./EmailError";
import { SignInFormType, SignUpFormType } from "@/types/Sign";
import { UseControllerProps, useController } from "react-hook-form";

const Email = ({
  control,
  name,
  rules,
}: UseControllerProps<SignInFormType | SignUpFormType>) => {
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

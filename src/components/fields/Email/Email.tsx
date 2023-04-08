import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import EmailError from "./EmailError";
import type { SignInFormType, SignUpFormType } from "@/types/Sign";
import { UseControllerProps, useController } from "react-hook-form";

const Email = ({
  control,
  name,
  rules,
}: UseControllerProps<SignInFormType | SignUpFormType>) => {
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <FormControl
      sx={{ my: 1 }}
      variant="outlined"
      fullWidth
      required
      error={!!fieldState.error}
    >
      <InputLabel htmlFor={name}>Email</InputLabel>
      <OutlinedInput {...field} label="Email" id={name} type={"text"} />
      {!fieldState.error ? null : fieldState.error.type === "required" ? (
        <EmailError message={"This is required"} />
      ) : (
        <EmailError message={fieldState.error.message} />
      )}
    </FormControl>
  );
};

export default Email;

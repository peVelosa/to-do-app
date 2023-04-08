import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import type { SignUpFormType } from "@/types/Sign";
import PasswordConfirmationError from "./PasswordConfirmationError";

const PasswordConfirmation = ({
  control,
  name,
  rules,
}: UseControllerProps<SignUpFormType>) => {
  const { field, fieldState } = useController({ control, name, rules });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handlePassword = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <FormControl
      sx={{ my: 1 }}
      variant="outlined"
      fullWidth
      required
      error={!!fieldState.error}
    >
      <InputLabel htmlFor={name}>Password Confirmation</InputLabel>
      <OutlinedInput
        label="Password Confirmation"
        id={name}
        type={isPasswordVisible ? "text" : "password"}
        {...field}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password confirmation visibility"
              onClick={handlePassword}
              onMouseDown={handlePassword}
              edge="end"
            >
              {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {!fieldState.error ? null : fieldState.error.type === "required" ? (
        <PasswordConfirmationError message={"This is required"} />
      ) : (
        <PasswordConfirmationError message={fieldState.error.message} />
      )}
    </FormControl>
  );
};

export default PasswordConfirmation;

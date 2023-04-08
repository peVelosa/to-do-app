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
import { SignInFormType, SignUpFormType } from "@/types/Sign";
import PasswordError from "./PasswordError";

const Password = ({
  control,
  name,
  rules,
}: UseControllerProps<SignInFormType | SignUpFormType>) => {
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
      <InputLabel htmlFor={name}>Password</InputLabel>
      <OutlinedInput
        label="Password"
        id={name}
        type={isPasswordVisible ? "text" : "password"}
        {...field}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
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
        <PasswordError message={"This is required"} />
      ) : (
        <PasswordError message={fieldState.error.message} />
      )}
    </FormControl>
  );
};

export default Password;

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
import { SignInFormType } from "@/types/Sign";

const Password = ({
  control,
  name,
  rules,
}: UseControllerProps<SignInFormType>) => {
  const { field, fieldState } = useController({ control, name, rules });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handlePassword = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <FormControl sx={{ my: 1 }} variant="outlined" fullWidth required>
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
    </FormControl>
  );
};

export default Password;

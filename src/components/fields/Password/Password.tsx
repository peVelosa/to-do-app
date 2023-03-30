import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";

const Password = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handlePassword = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <FormControl sx={{ my: 1 }} variant="outlined" fullWidth required>
      <InputLabel htmlFor="password">Password</InputLabel>
      <OutlinedInput
        name="password"
        label="Password"
        id="password"
        type={isPasswordVisible ? "text" : "password"}
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

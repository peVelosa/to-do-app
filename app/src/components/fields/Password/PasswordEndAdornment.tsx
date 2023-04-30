"use client";

import React from "react";

import { IconButton, InputAdornment } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

type PasswordEndAdornmentProps = {
  isVisible: boolean;
  handleVisible: () => void;
};

const PasswordEndAdornment = ({
  isVisible,
  handleVisible,
}: PasswordEndAdornmentProps): JSX.Element => {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleVisible}
        onMouseDown={handleVisible}
        edge="end"
      >
        {isVisible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};

export default PasswordEndAdornment;

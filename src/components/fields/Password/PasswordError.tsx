import { Typography } from "@mui/material";
import React from "react";

type PasswordErrorProps = {
  message?: string;
};

const PasswordError = ({ message }: PasswordErrorProps) => {
  return (
    <Typography variant="subtitle2" color="error" component={"span"}>
      {message}
    </Typography>
  );
};

export default PasswordError;

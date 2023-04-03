import { Typography } from "@mui/material";
import React from "react";

type LastNameErrorProps = {
  message?: string;
};

const LastNameError = ({ message }: LastNameErrorProps) => {
  return (
    <Typography variant="subtitle2" color="error" component={"span"}>
      {message}
    </Typography>
  );
};

export default LastNameError;

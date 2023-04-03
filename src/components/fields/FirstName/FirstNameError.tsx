import { Typography } from "@mui/material";
import React from "react";

type FirstNameErrorProps = {
  message?: string;
};

const FirstNameError = ({ message }: FirstNameErrorProps) => {
  return (
    <Typography variant="subtitle2" color="error" component={"span"}>
      {message}
    </Typography>
  );
};

export default FirstNameError;

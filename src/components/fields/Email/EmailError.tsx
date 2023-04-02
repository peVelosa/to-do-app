import { Typography } from "@mui/material";
import React from "react";

type EmailErrorProps = {
  message?: string;
};

const EmailError = ({ message }: EmailErrorProps) => {
  return (
    <Typography variant="subtitle2" color="error" component={"span"}>
      {message}
    </Typography>
  );
};

export default EmailError;

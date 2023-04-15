import { Typography } from "@mui/material";
import React from "react";

type NewItemInputErrorProps = {
  message?: string;
};

const NewItemInputError = ({ message }: NewItemInputErrorProps) => {
  return (
    <Typography variant="subtitle2" color="error" component={"span"}>
      {message}
    </Typography>
  );
};

export default NewItemInputError;

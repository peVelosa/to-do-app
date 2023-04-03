import { Typography } from "@mui/material";
import React from "react";

type PasswordConfirmationEroorProps = {
  message?: string;
};

const PasswordConfirmationEroor = ({
  message,
}: PasswordConfirmationEroorProps) => {
  return (
    <Typography variant="subtitle2" color="error" component={"span"}>
      {message}
    </Typography>
  );
};

export default PasswordConfirmationEroor;

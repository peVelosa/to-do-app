import { Typography } from "@mui/material";
import React from "react";

const Information = (): JSX.Element => {
  return (
    <Typography
      variant="h6"
      color="error"
      component={"h2"}
      sx={{ textAlign: "center" }}
    >
      Do not use your personal email or password
    </Typography>
  );
};

export default Information;

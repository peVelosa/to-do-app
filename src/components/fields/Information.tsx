import { Typography } from "@mui/material";
import React from "react";

const Information = () => {
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

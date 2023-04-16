import React from "react";
import { FormHelperText } from "@mui/material";

type HelperTextProps = {
  message?: string;
};

const HelperText = ({ message }: HelperTextProps) => {
  return (
    <FormHelperText
      id="component-error-text"
      variant="standard"
      component={"span"}
      sx={{ fontSize: 14 }}
    >
      {message}
    </FormHelperText>
  );
};

export default HelperText;

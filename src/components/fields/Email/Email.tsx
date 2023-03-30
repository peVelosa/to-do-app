import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import EmailError from "./EmailError";

const Email = () => {
  return (
    <FormControl sx={{ my: 1 }} variant="outlined" fullWidth required>
      <InputLabel htmlFor="email">Email</InputLabel>
      <OutlinedInput name="email" label="Email" id="email" type={"text"} />
      <EmailError />
    </FormControl>
  );
};

export default Email;

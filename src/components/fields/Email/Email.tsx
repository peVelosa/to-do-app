import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import EmailError from "./EmailError";
import { ControllerRenderProps } from "react-hook-form";

type EmailProps = {
  field: ControllerRenderProps<
    {
      email: string;
      password: string;
    },
    "email"
  >;
};

const Email = ({ field }: EmailProps) => {
  return (
    <FormControl sx={{ my: 1 }} variant="outlined" fullWidth required>
      <InputLabel htmlFor="email">Email</InputLabel>
      <OutlinedInput {...field} label="Email" id="email" type={"text"} />
      <EmailError />
    </FormControl>
  );
};

export default Email;

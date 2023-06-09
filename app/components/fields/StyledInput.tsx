"use client";

import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useController } from "react-hook-form";
import HelperText from "./Errors/HelperText";
import useColorMode from "@/utils/hooks/useColorMode";
import { formColorMode } from "@/utils/FormColorMode";

import type { UseControllerProps } from "react-hook-form";
import type { HTMLInputTypeAttribute } from "react";

interface StyledInputProps extends UseControllerProps<any> {
  type: HTMLInputTypeAttribute;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
  endAdornment?: React.ReactNode;
  rows?: number;
  multiline?: boolean;
  placeholder?: string;
}

const StyledInput = ({
  control,
  name,
  rules,
  label,
  type = "text",
  endAdornment,
  required = true,
  fullWidth = true,
  rows = 1,
  multiline = false,
  placeholder = "",
}: StyledInputProps): JSX.Element => {
  const { field, fieldState } = useController({ control, name, rules });
  const { mode } = useColorMode();
  return (
    <FormControl
      sx={{
        my: 1,
        ...formColorMode(mode),
      }}
      variant="outlined"
      fullWidth={fullWidth}
      required={required}
      error={!!fieldState.error}
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        {...field}
        sx={{ color: mode === "dark" ? "white" : "black" }}
        label={label}
        id={name}
        type={type}
        endAdornment={endAdornment}
        multiline={multiline}
        rows={rows ?? 1}
        placeholder={placeholder}
      />
      {!fieldState.error ? null : fieldState.error.type === "required" ? (
        <HelperText message={"This is required"} />
      ) : (
        <HelperText message={fieldState.error.message} />
      )}
    </FormControl>
  );
};

export default StyledInput;

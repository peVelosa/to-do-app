import React, { HTMLInputTypeAttribute } from "react";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";
import HelperText from "./Errors/HelperText";

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
}: StyledInputProps) => {
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <FormControl
      sx={{ my: 1 }}
      variant="outlined"
      fullWidth={fullWidth}
      required={required}
      error={!!fieldState.error}
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        {...field}
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

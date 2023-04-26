import React from "react";
import { UseControllerProps, useController } from "react-hook-form";

import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import HelperText from "../Errors/HelperText";

import type { NewItemType } from "@/types/NewItem";

interface NewItemInputProps extends UseControllerProps<NewItemType> {
  onSubmit: () => void;
}

const NewItemInput = ({
  control,
  name,
  rules,
  onSubmit,
}: NewItemInputProps): JSX.Element => {
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <>
      <FormControl
        sx={{ width: "100%" }}
        component={"form"}
        variant="standard"
        error={!!fieldState.error}
        onSubmit={onSubmit}
        fullWidth
      >
        <InputLabel htmlFor={name}>New to do...</InputLabel>
        <Input
          id={name}
          type={"text"}
          {...field}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="create new to do" onClick={onSubmit}>
                <NoteAddIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        {!fieldState.error ? null : fieldState.error.type === "required" ? (
          <HelperText message={"This is required"} />
        ) : (
          <HelperText message={fieldState.error.message} />
        )}
      </FormControl>
    </>
  );
};

export default NewItemInput;

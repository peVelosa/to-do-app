import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React, { FormEvent } from "react";
import {
  SubmitHandler,
  UseControllerProps,
  UseFormHandleSubmit,
  useController,
} from "react-hook-form";
import NewItemInputError from "./NewItemInputError";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import type { NewItemType } from "@/types/NewItem";

interface NewItemInputProps extends UseControllerProps<NewItemType> {
  onSubmit: () => void;
}

const NewItemInput = ({
  control,
  name,
  rules,
  onSubmit,
}: NewItemInputProps) => {
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
          <NewItemInputError message={"This is required"} />
        ) : (
          <NewItemInputError message={fieldState.error.message} />
        )}
      </FormControl>
    </>
  );
};

export default NewItemInput;

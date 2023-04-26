import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";
import HelperText from "../Errors/HelperText";
import CircleIcon from "@mui/icons-material/Circle";
import { ToDoFormType } from "@/types/Todo";

const Status = ({ control, name, rules }: UseControllerProps<ToDoFormType>) => {
  const { field, fieldState } = useController({ control, name, rules });

  const color =
    field.value === "to-do"
      ? "error"
      : field.value === "doing"
      ? "warning"
      : "success";

  return (
    <FormControl sx={{ mt: 1 }} variant="outlined" error={!!fieldState.error}>
      <Stack flexDirection={"row"} alignItems={"flex-end"} gap={1}>
        <Typography variant="h6" component={"h3"}>
          Status:
        </Typography>
        <Box>
          <Select
            labelId="status-changer"
            {...field}
            // onChange={handleChange}
            label="Status"
            variant="standard"
          >
            <MenuItem value={"to-do"}>To do</MenuItem>
            <MenuItem value={"doing"}>Doing</MenuItem>
            <MenuItem value={"done"}>Done</MenuItem>
          </Select>
        </Box>
        <CircleIcon color={color} sx={{ mb: 0.5 }} />
      </Stack>

      {!fieldState.error ? null : fieldState.error.type === "required" ? (
        <HelperText message={"This is required"} />
      ) : (
        <HelperText message={fieldState.error.message} />
      )}
    </FormControl>
  );
};

export default Status;
"use client";
import { UseControllerProps, useController } from "react-hook-form";

import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import HelperText from "../Errors/HelperText";
import CircleIcon from "@mui/icons-material/Circle";

import useColorMode from "@/utils/hooks/useColorMode";
import type { ToDoFormType } from "@/types/Todo";

const Status = ({
  control,
  name,
  rules,
}: UseControllerProps<ToDoFormType>): JSX.Element => {
  const { field, fieldState } = useController({ control, name, rules });
  const { mode } = useColorMode();

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
            label="Status"
            variant="standard"
            sx={{ color: mode === "dark" ? "white" : "black" }}
          >
            <MenuItem
              value={"to-do"}
              sx={{ color: mode === "dark" ? "white" : "black" }}
            >
              To do
            </MenuItem>
            <MenuItem
              value={"doing"}
              sx={{ color: mode === "dark" ? "white" : "black" }}
            >
              Doing
            </MenuItem>
            <MenuItem
              value={"done"}
              sx={{ color: mode === "dark" ? "white" : "black" }}
            >
              Done
            </MenuItem>
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

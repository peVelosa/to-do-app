import React from "react";
import {
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import type { TasksType } from "@/types/Todo";

type TaskListProps = {
  task: TasksType;
};

const TaskList = ({ task }: TaskListProps) => {
  return (
    <ListItem
      secondaryAction={
        <Checkbox
          edge="end"
          // onChange={handleToggle(value)}
          checked={task.done}
          inputProps={{ "aria-labelledby": task.id }}
        />
      }
      disablePadding
    >
      <ListItemButton dense disableGutters sx={{ pl: 1 }}>
        <ListItemIcon sx={{ minWidth: 30 }}>
          <ContentPasteIcon />
        </ListItemIcon>
        <ListItemText
          primary={task.title}
          id={task.id}
          sx={{ textDecoration: task.done ? "line-through" : "none" }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TaskList;

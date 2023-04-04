import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";

type PasswordCheckListProps = {
  password: string;
};

const PasswordCheckList = ({ password = "" }: PasswordCheckListProps) => {
  const upperCase = /^(?=.*?[A-Z])/.test(password);
  const lowerCase = /(?=.*?[a-z])/.test(password);
  const digit = /(?=.*?[0-9])/.test(password);
  const specialCharacter = /(?=.*?[#?!@$%^&*-])/.test(password);
  const minLength = /.{8,}$/.test(password);

  return (
    <>
      <Box sx={{ my: 1, bgcolor: "ButtonFace", borderRadius: 2 }}>
        <List dense>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color={lowerCase ? "success" : "error"} />
            </ListItemIcon>
            <ListItemText primary="At least one lower case" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color={upperCase ? "success" : "error"} />
            </ListItemIcon>
            <ListItemText primary="At least one upper case" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color={digit ? "success" : "error"} />
            </ListItemIcon>
            <ListItemText primary="At least one digit" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color={specialCharacter ? "success" : "error"} />
            </ListItemIcon>
            <ListItemText primary="At least one special character" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleIcon color={minLength ? "success" : "error"} />
            </ListItemIcon>
            <ListItemText primary="Minimum eight in length" />
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default PasswordCheckList;

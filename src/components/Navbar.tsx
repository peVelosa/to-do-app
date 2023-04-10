import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAuth from "@/utils/hooks/useAuth";

type NavbarProps = {
  username: string | null;
};

export default function Navbar({ username = null }: NavbarProps) {
  const { user, signOut } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {username || user?.username}
          </Typography>
          <Button color="inherit" onClick={signOut}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

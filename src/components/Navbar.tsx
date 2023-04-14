import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useAuth from "@/utils/hooks/useAuth";
import { Container } from "@mui/material";

type NavbarProps = {
  username: string | null;
};

export default function Navbar({ username = null }: NavbarProps) {
  const { user, signOut } = useAuth();

  return (
    <Box sx={{ flexGrow: 1, mb: 8 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {username || user?.username}
            </Typography>
            <Button color="inherit" onClick={signOut}>
              Log Out
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

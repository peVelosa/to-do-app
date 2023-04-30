"use client";

import React from "react";
import useAuth from "@/utils/hooks/useAuth";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Container, Stack } from "@mui/material";
import ThemeToggle from "./ThemeToggle/ThemeToggle";

type NavbarProps = {
  username?: string;
};

const Navbar = ({ username }: NavbarProps): JSX.Element => {
  const { user, signOut } = useAuth();

  return (
    <Box sx={{ flexGrow: 1, mb: 8 }}>
      <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              {username || user?.username}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ flexGrow: { xs: 1, sm: 0 } }}
            >
              <Button color="inherit" onClick={signOut}>
                Log Out
              </Button>
              <ThemeToggle />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;

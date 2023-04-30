"use client";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/material";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LogOut from "./LogOut";

type NavbarProps = {
  username?: string;
};

const Navbar = ({ username }: NavbarProps): JSX.Element => {
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
              {username}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ flexGrow: { xs: 1, sm: 0 } }}
            >
              <LogOut />
              <ThemeToggle />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;

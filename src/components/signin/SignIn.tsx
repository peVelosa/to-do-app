import React, { useState } from "react";

import { ThemeProvider } from "@emotion/react";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  createTheme,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Email from "../fields/Email/Email";
import Password from "../fields/Password/Password";
import { Controller, useForm } from "react-hook-form";
import { SignInFormType } from "@/types/Sign";

const theme = createTheme();

const SignIn = () => {
  const { control, handleSubmit: formSubmit } = useForm<SignInFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formSubmit(onSubmit);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Email field={field} />}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => <Password field={field} />}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;

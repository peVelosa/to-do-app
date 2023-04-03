import React from "react";

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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Email from "../fields/Email/Email";
import Password from "../fields/Password/Password";
import { useForm } from "react-hook-form";
import { SignInFormType } from "@/types/Sign";
import Information from "../fields/Information";
import CustomLink from "../Link/Link";

const theme = createTheme();

const SignIn = () => {
  const { control, handleSubmit } = useForm<SignInFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: SignInFormType) => {
    const { email, password } = data;
    if (!email || !password) return;
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
          <Information />
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Email control={control} name="email" rules={{ required: true }} />
            <Password
              control={control}
              name="password"
              rules={{ required: true }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <CustomLink
                  href="/signup"
                  message="Don't have an account? Sign Up"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;

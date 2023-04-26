import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ThemeProvider } from "@emotion/react";
import useAuth from "@/utils/hooks/useAuth";

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
import Information from "@/fields/Information";
import CustomLink from "../Link/Link";
import CredentialNotFound from "@/fields/Errors/CredentialNotFound";
import StyledInput from "@/fields/StyledInput";
import PasswordEndAdornment from "@/fields/Password/PasswordEndAdornment";

import type { SignInFormType } from "@/types/Sign";

const theme = createTheme();

const SignIn = (): JSX.Element => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { signIn } = useAuth();

  const onSubmit = async (data: SignInFormType): Promise<void> => {
    const { email, password } = data;
    if (!email || !password) return;
    signIn({ email, password, setError });
  };

  const handlePassword = (): void => setIsPasswordVisible(!isPasswordVisible);

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
            <StyledInput
              control={control}
              name="email"
              rules={{ required: true }}
              label="Email"
              type="email"
            />
            <StyledInput
              control={control}
              name="password"
              rules={{ required: true }}
              label="Password"
              type={isPasswordVisible ? "text" : "password"}
              endAdornment={
                <PasswordEndAdornment
                  handleVisible={handlePassword}
                  isVisible={isPasswordVisible}
                />
              }
            />
            <CredentialNotFound errors={errors} />
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

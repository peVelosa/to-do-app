import React, { useState } from "react";

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
import { ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import Information from "@/fields/Information";
import CustomLink from "../Link/Link";
import PasswordCheckList from "../fields/Password/PasswordCheckList";
import { useRouter } from "next/router";
import axios from "@/libs/axios";
import StyledInput from "../fields/StyledInput";
import PasswordEndAdornment from "../fields/Password/PasswordEndAdornment";
import { emailRegex, onlyLetters, passwordRegex } from "@/utils/Regex/regex";
import type { SignUpFormType } from "@/types/Sign";

const theme = createTheme();

const SignUp = (): JSX.Element => {
  const router = useRouter();

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isPasswordConfirmationVisible, setIsPasswordConfirmationVisible] =
    useState<boolean>(false);

  const { control, handleSubmit, watch, setError } = useForm<SignUpFormType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const onSubmit = async (data: SignUpFormType) => {
    const { password, passwordConfirmation, email, firstName, lastName } = data;
    if (!onlyLetters.test(firstName)) {
      setError("firstName", {
        type: "custom",
        message: "First name must contain only letter",
      });
      return;
    }
    if (!onlyLetters.test(lastName)) {
      setError("lastName", {
        type: "custom",
        message: "Last name must contain only letter",
      });
      return;
    }
    if (!emailRegex.test(email)) {
      setError("email", {
        type: "custom",
        message: "Invalid email address!",
      });
      return;
    }
    if (!passwordRegex.test(password)) {
      setError("password", {
        type: "custom",
        message: "Password must contain the following rules",
      });
      return;
    }
    if (password != passwordConfirmation) {
      setError("password", {
        type: "custom",
        message: "Passwords differents",
      });
      return;
    }
    const res = await axios.post("/user", {
      req: data,
    });
    if (res.data.err) {
      setError("email", {
        type: "custom",
        message: "Email already exists",
      });
      return;
    }
    router.push("/signin");
  };

  const handlePassword = () => setIsPasswordVisible(!isPasswordVisible);
  const handlePasswordConfirmation = () =>
    setIsPasswordConfirmationVisible(!isPasswordConfirmationVisible);

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <StyledInput
                  control={control}
                  name="firstName"
                  label="First Name"
                  type="text"
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledInput
                  control={control}
                  name="lastName"
                  label="Last Name"
                  type="text"
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledInput
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <StyledInput
                  control={control}
                  name="password"
                  label="Password"
                  type={isPasswordVisible ? "text" : "password"}
                  rules={{ required: true }}
                  endAdornment={
                    <PasswordEndAdornment
                      handleVisible={handlePassword}
                      isVisible={isPasswordVisible}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordCheckList password={watch("password")} />
              </Grid>
              <Grid item xs={12}>
                <StyledInput
                  control={control}
                  name="passwordConfirmation"
                  label="Password Confirmation"
                  type={isPasswordConfirmationVisible ? "text" : "password"}
                  rules={{ required: true }}
                  endAdornment={
                    <PasswordEndAdornment
                      handleVisible={handlePasswordConfirmation}
                      isVisible={isPasswordConfirmationVisible}
                    />
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <CustomLink
                  href="/signin"
                  message="Already have an account? Sign in"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;

import React from "react";

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
import { Control, useForm } from "react-hook-form";
import { SignInFormType, SignUpFormType } from "@/types/Sign";
import Information from "@/fields/Information";
import Email from "@/fields/Email/Email";
import Password from "@/fields/Password/Password";
import LastName from "@/fields/LastName/LastName";
import FirstName from "@/fields/FirstName/FirstName";
import PasswordConfirmation from "@/fields/PasswordConfirmation/PasswordConfirmation";
import CustomLink from "../Link/Link";
import PasswordCheckList from "../fields/PasswordCheckList";
import axios from "@/libs/axios";

const theme = createTheme();

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const onlyLetters = /[a-z]/gi;

const SignUp = (): JSX.Element => {
  const { control, handleSubmit, watch, setError, setValue } =
    useForm<SignUpFormType>({
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
                <FirstName
                  control={control}
                  name="firstName"
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LastName
                  control={control}
                  name="lastName"
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Email
                  control={control as Control<SignInFormType | SignUpFormType>}
                  name="email"
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Password
                  control={control as Control<SignInFormType | SignUpFormType>}
                  name="password"
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordCheckList password={watch("password")} />
              </Grid>
              <Grid item xs={12}>
                <PasswordConfirmation
                  control={control}
                  name="passwordConfirmation"
                  rules={{ required: true }}
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

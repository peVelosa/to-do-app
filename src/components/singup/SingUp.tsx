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

const theme = createTheme();

const SignUp = (): JSX.Element => {
  const { control, handleSubmit } = useForm<SignUpFormType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const onSubmit = (data: SignUpFormType) => console.log(data);

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

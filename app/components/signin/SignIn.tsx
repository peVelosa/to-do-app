"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "@/utils/hooks/useAuth";
import { Container, Box, Button, Grid, Stack } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CustomLink from "../Link/Link";
import CredentialNotFound from "@/fields/Errors/CredentialNotFound";
import StyledInput from "@/fields/StyledInput";
import PasswordEndAdornment from "@/fields/Password/PasswordEndAdornment";

import type { SignInFormType } from "@/types/Sign";
import Header from "../fields/SignInfo/Header";

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
    <Container component="main" maxWidth="xs">
      <Stack
        sx={{
          marginTop: 8,
        }}
        alignItems={"center"}
      >
        <Header icon={<LockOutlinedIcon />} sign={"In"} />

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
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
            sx={{ mt: 3, mb: 2, backgroundColor: "link" }}
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
      </Stack>
    </Container>
  );
};

export default SignIn;

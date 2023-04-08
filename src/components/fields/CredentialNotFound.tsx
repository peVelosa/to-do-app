import { SignInFormType } from "@/types/Sign";
import { Typography } from "@mui/material";
import React from "react";
import { FieldErrors } from "react-hook-form";

type CredentialNotFoundProps = {
  errors: FieldErrors<SignInFormType>;
};

const CredentialNotFound = ({ errors }: CredentialNotFoundProps) => {
  return (
    <>
      {(errors.email?.type === "not found" ||
        errors.password?.type === "not found") && (
        <Typography component={"span"} variant="subtitle1" color={"error"}>
          Email or Password incorrect
        </Typography>
      )}
    </>
  );
};

export default CredentialNotFound;

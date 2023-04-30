import { Typography } from "@mui/material";

import type { SignInFormType } from "@/types/Sign";
import type { FieldErrors } from "react-hook-form";

type CredentialNotFoundProps = {
  errors: FieldErrors<SignInFormType>;
};

const CredentialNotFound = ({
  errors,
}: CredentialNotFoundProps): JSX.Element => {
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

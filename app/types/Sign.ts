import type { FieldPath, FieldValues } from "react-hook-form";

export type SignInFormType = {
  email: FieldPath<FieldValues>;
  password: FieldPath<FieldValues>;
};
export type SignUpFormType = {
  email: FieldPath<FieldValues>;
  password: FieldPath<FieldValues>;
  firstName: FieldPath<FieldValues>;
  lastName: FieldPath<FieldValues>;
  passwordConfirmation: FieldPath<FieldValues>;
};

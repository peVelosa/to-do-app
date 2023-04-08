import { UseFormSetError } from "react-hook-form";
import { SignInFormType } from "./Sign";

export type authType = {
  signIn: ({ email, password }: signInProps) => void;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User | null;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
export type signInProps = {
  email: string;
  password: string;
  setError: UseFormSetError<SignInFormType>;
};

export type User = {
  email: string;
  id: string;
  username: string;
};

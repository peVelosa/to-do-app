export type authType = {
  signIn: ({ email, password }: signInProps) => void;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
export type signInProps = {
  email: string;
  password: string;
};

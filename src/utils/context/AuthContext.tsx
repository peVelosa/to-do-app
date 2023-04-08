import React, { createContext } from "react";
import axios from "@/libs/axios";
import type { AuthProviderProps, authType, signInProps } from "@/types/Auth";

export const authContext = createContext({} as authType);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const signIn = async ({ email, password }: signInProps) => {
    const res = await axios.get(`/auth/${email}/${password}`);
    if (res.status === 200) {
      console.log("logado");
    }
  };

  return (
    <authContext.Provider value={{ signIn }}>{children}</authContext.Provider>
  );
};

export default AuthProvider;

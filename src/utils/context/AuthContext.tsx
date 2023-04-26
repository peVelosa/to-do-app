import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "@/libs/axios";
import type {
  AuthProviderProps,
  User,
  authType,
  signInProps,
} from "@/types/Auth";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import signInRequest from "@/services/signInRequest";

export const authContext = createContext({} as authType);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  const recoveryUserInfo = async ({ id }: { id: string }) => {
    const data = axios.get<User>(`/user/${id}`).then((res) => res.data);
    setUser(await data);
  };

  useEffect(() => {
    const { "nextauth.token": authToken, "nextauth.id": idToken } =
      parseCookies();
    if (!authToken || !idToken) return;
    recoveryUserInfo({ id: idToken });
  }, []);

  const isAuthenticated = !!user;

  const signIn = async ({ email, password, setError }: signInProps) => {
    const { user, token } = await signInRequest({ email, password });
    const ONE_HOUR = 60 * 60 * 1000;
    if (user.err) {
      setError("email", { type: "not found" });
      setError("password", { type: "not found" });
      return;
    }
    setCookie(undefined, "nextauth.token", token, { maxAge: ONE_HOUR });
    setCookie(undefined, "nextauth.id", user.id, { maxAge: ONE_HOUR });
    setUser(user);
    axios.defaults.headers["Authorization"] = token;
    router.push("/");
  };
  const signOut = () => {
    setUser(null);
    destroyCookie(null, "nextauth.token");
    destroyCookie(null, "nextauth.id");
    router.push("/signin");
  };

  return (
    <authContext.Provider value={{ user, signIn, isAuthenticated, signOut }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

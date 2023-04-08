import React, { useContext } from "react";
import { authContext } from "../context/AuthContext";

const useAuth = () => {
  const { signIn } = useContext(authContext);
  return { signIn };
};

export default useAuth;

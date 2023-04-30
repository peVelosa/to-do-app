"use client";

import React, { useContext } from "react";
import { authContext } from "../context/AuthContext";

const useAuth = () => {
  const { user, isAuthenticated, signIn, signOut } = useContext(authContext);
  return { user, isAuthenticated, signIn, signOut };
};

export default useAuth;

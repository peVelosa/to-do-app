import React, { useContext } from "react";
import { colorModeContext } from "../context/ColorModeContext";

const useColorMode = () => {
  const { mode, colorMode } = useContext(colorModeContext);
  return { mode, colorMode };
};

export default useColorMode;

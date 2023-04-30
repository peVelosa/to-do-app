"use client";
import { createContext, useState, useMemo, useEffect } from "react";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";

type colorModeContext = {
  colorMode: any;
  mode: "light" | "dark";
};

export const colorModeContext = createContext({} as colorModeContext);

const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (prefersDarkMode) return setMode("dark");
    setMode("light");
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            //@ts-ignore
            section: grey[400],
          },
          contrastThreshold: 4.5,
        },
      }),
    [mode]
  );

  return (
    <colorModeContext.Provider value={{ mode, colorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </colorModeContext.Provider>
  );
};

export default ColorModeProvider;

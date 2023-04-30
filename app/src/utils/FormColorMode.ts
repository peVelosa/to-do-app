export const formColorMode = (mode: "dark" | "light") => {
  return {
    "& label.Mui-focused": {
      color: mode === "dark" ? "white" : "",
    },
    // focused color for input with variant='standard'
    "& .MuiInput-underline:after": {
      borderBottomColor: mode === "dark" ? "white" : "",
    },
    // focused color for input with variant='filled'
    "& .MuiFilledInput-underline:after": {
      borderBottomColor: mode === "dark" ? "white" : "",
    },
    // focused color for input with variant='outlined'
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: mode === "dark" ? "white" : "",
      },
    },
  };
};

import { Stack, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useColorMode from "@/utils/hooks/useColorMode";

const ThemeToggle = () => {
  const { mode, colorMode } = useColorMode();

  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{
        color: "text.primary",
        borderRadius: 1,
        p: 1,
      }}
    >
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Stack>
  );
};

export default ThemeToggle;

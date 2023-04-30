import useAuth from "@/utils/hooks/useAuth";
import { Button } from "@mui/material";

const LogOut = () => {
  const { signOut } = useAuth();

  return (
    <Button color="inherit" onClick={signOut}>
      Log Out
    </Button>
  );
};

export default LogOut;

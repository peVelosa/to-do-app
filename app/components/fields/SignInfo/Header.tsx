import Information from "./Information";
import { Avatar, Typography } from "@mui/material";

type HeaderProps = {
  icon: React.ReactNode;
  sign: "In" | "Up";
};

const Header = ({ icon, sign }: HeaderProps) => {
  return (
    <>
      <Information />
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>{icon}</Avatar>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textTransform: "capitalize" }}
      >
        Sign {sign}
      </Typography>
    </>
  );
};

export default Header;

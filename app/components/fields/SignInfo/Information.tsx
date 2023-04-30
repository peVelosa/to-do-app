import { Typography } from "@mui/material";

const Information = (): JSX.Element => {
  return (
    <Typography
      variant="h6"
      color="error"
      component={"h2"}
      sx={{ textAlign: "center" }}
    >
      Do not use your personal email or password
    </Typography>
  );
};

export default Information;

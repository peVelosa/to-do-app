import { FormHelperText } from "@mui/material";

type HelperTextProps = {
  message?: string;
};

const HelperText = ({ message }: HelperTextProps): JSX.Element => {
  return (
    <FormHelperText
      id="component-error-text"
      variant="standard"
      component={"span"}
      sx={{ fontSize: 14 }}
    >
      {message}
    </FormHelperText>
  );
};

export default HelperText;

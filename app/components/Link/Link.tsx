import NextLink from "next/link";
import MuiLink from "@mui/material/Link";

type CustomLinkProps = {
  href: string;
  message: string;
};

const CustomLink = ({ href, message }: CustomLinkProps): JSX.Element => {
  return (
    <MuiLink href={href} component={NextLink}>
      {message}
    </MuiLink>
  );
};

export default CustomLink;

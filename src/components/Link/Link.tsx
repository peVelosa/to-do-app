import React from "react";
import Link from "next/link";
import MuiLink from "@mui/material/Link";

type CustomLinkProps = {
  href: string;
  message: string;
};

const CustomLink = ({ href, message }: CustomLinkProps) => {
  return (
    <Link href={href}>
      <MuiLink>{message}</MuiLink>
    </Link>
  );
};

export default CustomLink;

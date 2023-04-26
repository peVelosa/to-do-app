import React from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type CloseButtonProps = {
  handleClose: () => void;
};

const CloseButton = ({ handleClose }: CloseButtonProps) => {
  return (
    <Box sx={{ position: "absolute", right: 20, top: 8 }}>
      <IconButton aria-label="close modal" color="error" onClick={handleClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default CloseButton;

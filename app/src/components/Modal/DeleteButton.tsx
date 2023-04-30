"use client";

import React from "react";

import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type DeleteButtonProps = {
  openConfirmationModal: () => void;
};

const DeleteButton = ({
  openConfirmationModal,
}: DeleteButtonProps): JSX.Element => {
  return (
    <Box sx={{ position: "absolute", right: 20, top: 8 }}>
      <IconButton
        aria-label="close modal"
        color="error"
        onClick={openConfirmationModal}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default DeleteButton;

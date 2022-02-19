import React, { useState, useEffect } from "react";
import { Box, Hidden, Typography } from "@mui/material";
import { useStyles } from "../../Admins/Modal/modalStyling";
import Modal from "./Modal";

const EditUsers = () => {
  const styles = useStyles();
  const rows = JSON.parse(localStorage.getItem("data") as string);

  return (
    <>
      <Hidden smDown>
        <Box className={styles.modal}>
          <Modal row={rows} />
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box className={styles.modalmobile}>
          <Modal row={rows} />
        </Box>
      </Hidden>
    </>
  );
};

export default EditUsers;

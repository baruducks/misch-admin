import React, { useState } from "react";
import { Box, Hidden, Typography } from "@mui/material";
import { useStyles } from "../modalStyling";
import Modal from "./Modal";

const AddBatch = () => {
  const styles = useStyles();
  return (
    <>
      <Hidden smDown>
        <Box className={styles.modal}>
          <Modal />
        </Box>
      </Hidden>
      <Hidden smUp>
        <Box className={styles.modalmobile}>
          <Modal />
        </Box>
      </Hidden>
    </>
  );
};

export default AddBatch;

import React, { useState, useEffect } from "react";
import { Box, Hidden, Typography } from "@mui/material";
import { useStyles } from "../modalStyling";
import Modal from "./Modal";

const EditUsers = ({ row }: any) => {
  const styles = useStyles();
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    setRows(row);
  });

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

import React, { useEffect, useState } from "react";
import { Box, Hidden, Typography } from "@mui/material";
import { useStyles } from "../modalStyling";
import Modal from "../Edit Tenant/Modal";

const EditTenant = ({ row }: any) => {
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

export default EditTenant;

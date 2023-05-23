import React, { useEffect, useState } from "react";
import {
  TableCell,
  TableRow,
  Typography,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import { useStyles } from "../Tabel/RowStyling";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import Image from "next/image";

function Row(props: any) {
  const { row } = props;
  const styles = useStyles();

  const gender =
    row.gender === "Male" ? (
      <MaleIcon style={{ color: "#2196f3" }} className={styles.icongender} />
    ) : (
      <FemaleIcon style={{ color: "#e91e63" }} className={styles.icongender} />
    );

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left">
          <Typography>{row.alias}</Typography>
        </TableCell>
        <TableCell align="left">
          <ListItem disablePadding>
            {/* <ListItemText> */}
            <Typography className={styles.tebel}>{row.nama}</Typography>
            {/* </ListItemText> */}
            <ListItemIcon>{gender}</ListItemIcon>
          </ListItem>
        </TableCell>
        <TableCell align="left">
          <ListItem disablePadding>
            <Image src="/SLP.png" width={20} height={20} />
            <Typography> {parseInt(row.average)} SLP</Typography>
          </ListItem>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;

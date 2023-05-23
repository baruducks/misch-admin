import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  Typography,
  Grid,
  ListItem,
  List,
  ListItemIcon,
} from "@mui/material";
import { useStyles } from "./RowStyling";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

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
        <TableCell className={styles.row50}></TableCell>
        <TableCell align="left" className={styles.row100}>
          {row.alias}
        </TableCell>
        <TableCell align="left" className={styles.row280}>
          <ListItem disablePadding>
            {/* <ListItemText> */}
            <Typography className={styles.tebel}>{row.nama}</Typography>
            {/* </ListItemText> */}
            <ListItemIcon>{gender}</ListItemIcon>
          </ListItem>
        </TableCell>
        <TableCell align="left" className={styles.row150}>
          <Grid container={true}>
            <ListItem disablePadding>
              <Image src="/SLP.png" width={20} height={20} />
              <Typography className={styles.slp}>
                {row.ingameslp} SLP
              </Typography>
            </ListItem>
          </Grid>
        </TableCell>
        <TableCell align="left" className={styles.row150}>
          <Grid container={true}>
            <ListItem disablePadding>
              <Image src="/SLP.png" width={20} height={20} />
              <Typography className={styles.slp}>{row.average} SLP</Typography>
            </ListItem>
          </Grid>
        </TableCell>
        <TableCell align="left" className={styles.row150}>
          <Grid container={true}>
            <ListItem disablePadding>
              <Image src="/axieareanaswords.png" width={30} height={30} />
              <Typography className={styles.slp}>{row.mmr}</Typography>
            </ListItem>
          </Grid>
        </TableCell>
        <TableCell align="left" className={styles.row150}>
          <Typography>{row.earningrate}</Typography>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;

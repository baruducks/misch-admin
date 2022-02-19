import React, { useEffect, useState } from "react";
import {
  TableCell,
  TableRow,
  Modal,
  Backdrop,
  Paper,
  TextField,
} from "@mui/material";
import { useStyles } from "../PayrollsStyle";

function Row(props: any) {
  const styles = useStyles();
  const { row, setPayroll, dataPayroll, indexX } = props;
  const [open, setOpen] = useState(false);

  const handleModal = () => setOpen(!open);

  useEffect(() => {
    // console.log(dataPayroll);
  }, []);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">{row.nama}</TableCell>
        <TableCell align="center">{row.alias}</TableCell>
        <TableCell align="center">{row.tenant}</TableCell>
        <TableCell align="center">{row.slp_total}</TableCell>
        {/* <TableCell align="center">
          <TextField
            label="Scholar Profit Share"
            variant="standard"
            fullWidth
            onChange={(e: any) => {
              console.log(indexX);
              const newASD = [...dataPayroll];
              newASD[indexX].scholar = e.target.value;
              setPayroll(newASD);
            }}
            // error={
            //   ber(data.scholar) +
            //     Number(data.manager) +
            //     Number(data.owner) !=
            //   100Num
            // }
            type="number"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            defaultValue={row.scholar}
          />
        </TableCell>
        <TableCell align="center">
          <TextField
            label="Tenant Profit Share"
            variant="standard"
            fullWidth
            onChange={(e: any) => {
              console.log(indexX);
              const newASD = [...dataPayroll];
              newASD[indexX].owner = e.target.value;
              setPayroll(newASD);
            }}
            // error={
            //   ber(data.scholar) +
            //     Number(data.manager) +
            //     Number(data.owner) !=
            //   100Num
            // }
            type="number"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            defaultValue={row.owner}
          />
        </TableCell> */}
        <TableCell align="center">
          <TextField
            label="Claim SLP"
            // variant="standard"
            fullWidth
            onChange={(e: any) => {
              console.log(indexX);
              const newASD = [...dataPayroll];
              newASD[indexX].slp = e.target.value;
              setPayroll(newASD);
            }}
            // error={
            //   ber(data.scholar) +
            //     Number(data.manager) +
            //     Number(data.owner) !=
            //   100Num
            // }
            type="number"
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            placeholder={row.slp_total}
            // label={row.slp_total}
          />
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;

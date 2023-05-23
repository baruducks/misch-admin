import React, { useState } from "react";
import { TableCell, TableRow, Modal, Backdrop, Paper } from "@mui/material";
import { useStyles } from "../PayrollsStyle";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import Link from "next/link";
import axios from "axios";
import BerhasilPop from "../../Popup/BerhasilPop";
import Swal from "sweetalert2";

function Row(props: any) {
  const styles = useStyles();
  const { row } = props;
  const [open, setOpen] = useState(false);

  const handleModal = () => setOpen(!open);

  const steps = ["Initiated", "Claim", "Transfer", "Completed"];

  const deletePayroll = async () => {
    await axios
      .delete("http://localhost:5000/payroll", {
        data: {
          nama: row.batch,
        },
      })
      .then((res) => {
        console.log(res);
        const berhasil = "Payroll berhasil dihapus!";
        BerhasilPop(berhasil);
        beresPayroll();
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const download = async () => {
    await axios
      .post("http://localhost:5000/doc", {
        withCredentials: true,
        nama: row.batch,
      })
      .then((res) => {
        axios
          .post("http://localhost:5000/print", {
            withCredentials: true,
            filename: row.batch,
          })
          .catch((err) => {
            console.log(row.batch);
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePop = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
      },
    });

    swalWithBootstrapButtons
      .fire({
        title: "Anda Yakin?",
        text: "Payroll yang dihapus tidak bisa kembali lagi!",
        icon: "warning",
        iconColor: "Red",
        showCancelButton: true,
        confirmButtonText: "Delete Payroll",
        confirmButtonColor: "Red",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deletePayroll();
          swalWithBootstrapButtons
            .fire({
              title: "Deleted",
              text: "Payroll berhasil dihapus!",
              icon: "success",
              iconColor: "Green",
              confirmButtonText: "OK",
              confirmButtonColor: "Green",
            })
            .then((result) => {
              window.location.reload();
            });
        }
      });
  };

  const beresPayroll = async () => {
    await axios
      .post("http://localhost:5000/finalize", {
        tenantId: row.tenant,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(row);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center" sx={{ minWidth: 100 }}>
          {row.batch}
        </TableCell>
        <TableCell align="center" sx={{ minWidth: 150 }}>
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={row.status} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </TableCell>
        <TableCell align="center" sx={{ minWidth: 150 }}>
          <Link href={`/payrolls/${row.batch}`}>
            <Button disabled={row.status == 3}>
              <EditIcon />
            </Button>
          </Link>
          <Button onClick={deletePop}>
            <DeleteIcon />
          </Button>
          <Button disabled={row.status != 3} onClick={download}>
            <PrintIcon />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;

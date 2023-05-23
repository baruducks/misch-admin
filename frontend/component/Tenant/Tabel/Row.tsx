import React, { useEffect, useState } from "react";
import {
  TableCell,
  TableRow,
  Typography,
  ListItem,
  ListItemIcon,
  Grid,
  Button,
  Modal,
  Backdrop,
} from "@mui/material";
import { useStyles } from "../../Scholarship/List/Tabel/RowStyling";
import Swal from "sweetalert2";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import GagalPop from "../../Popup/GagalPop";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTenant from "../Edit Tenant/EditTenant";
import axios from "axios";
import { useAuth } from "../../../contexts/auth";
import { useRouter } from "next/router";

function Row(props: any) {
  const { row } = props;
  const { isAuthenticated }: any = useAuth();
  const router = useRouter();
  const styles = useStyles();
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!open);
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/tenant", {
        data: { nama: row.nama },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // console.log(row);
  });

  const data = JSON.parse(localStorage.getItem("data") as string);

  const verifyToken = async () => {
    await axios
      .get("http://localhost:5000/users", { withCredentials: true })
      .then((res) => {
        handleDelete();
      })
      .catch((err) => {
        if (err) {
          axios
            .get("http://localhost:5000/token", { withCredentials: true })
            .then((res) => {
              handleDelete();
            })
            .catch((err) => {
              if (!isAuthenticated && router.asPath !== "/login") {
                var msg = "Silahkan login kembali!";
                GagalPop(msg);
                router.push("/login");
              }
            });
        }
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
        text: "Tenant yang dihapus tidak bisa kembali lagi!",
        icon: "warning",
        iconColor: "Red",
        showCancelButton: true,
        confirmButtonText: "Delete Tenant",
        confirmButtonColor: "Red",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          verifyToken();
          swalWithBootstrapButtons
            .fire({
              title: "Deleted",
              text: "Tenant berhasil dihapus!",
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
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="left" />
        <TableCell align="left">
          <Typography>{row.nama}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{row.low}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{row.med}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography>{row.high}</Typography>
        </TableCell>
        <TableCell sx={{ width: "125px" }}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button onClick={handleModal} className={styles.button}>
                <EditIcon />
              </Button>
              <Modal
                open={open}
                onClose={handleModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <EditTenant row={row} />
              </Modal>
            </Grid>
            <Grid item xs={6}>
              <Button
                className={styles.button}
                onClick={deletePop}
                disabled={data && data.role === 2}
              >
                <DeleteIcon />
              </Button>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;

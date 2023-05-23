import React, { useState, useEffect } from "react";
import {
  TableCell,
  TableRow,
  Box,
  Collapse,
  Typography,
  Grid,
  ListItem,
  ListItemIcon,
  Link,
  Button,
  Backdrop,
  Modal,
} from "@mui/material";
import { useStyles } from "./RowStyling";
import { MdAccountCircle } from "react-icons/md";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditAdmin from "../Modal/Edit Admins/EditAdmin";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/auth";
import GagalPop from "../../Popup/GagalPop";

function Check() {
  const data = JSON.parse(localStorage.getItem("data") as string);
  if (data) {
    return data;
  } else {
    return undefined;
  }
}

function Row(props: any) {
  const { row } = props;
  const router = useRouter();
  const { isAuthenticated }: any = useAuth();
  const [open, setOpen] = useState(false);
  const [akun, setAkun] = useState({
    accessToken: "",
    name: "",
    tenant: "",
    userId: "",
    username: "",
  });
  const whatsapplink = `https://wa.me/`;
  const whatsappnumber = "62" + row.nowa.substring(1, row.nowa.length);
  const styles = useStyles();

  const handleModal = () => {
    setOpen(!open);
  };

  const check = row.username == akun.username;

  var role = "";

  if (row.role === 0) {
    role = "Master Admin";
  }
  if (row.role === 1) {
    role = "Admin";
  }
  if (row.role === 2) {
    role = "Tenant";
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data") as string);
    if (data) {
      setAkun({
        ...akun,
        accessToken: data.accessToken,
        name: data.name,
        tenant: data.tenant,
        userId: data.userId,
        username: data.username,
      });
    }
  }, []);

  const deletePop = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
      },
    });

    swalWithBootstrapButtons
      .fire({
        title: "Anda Yakin?",
        text: "Users yang dihapus tidak bisa kembali lagi!",
        icon: "warning",
        iconColor: "Red",
        showCancelButton: true,
        confirmButtonText: "Delete User",
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
              text: "User berhasil dihapus!",
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
              if (router.asPath !== "/login") {
                var msg = "Silahkan login kembali!";
                GagalPop(msg);
                router.push("/login");
              }
            });
        }
      });
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/admin", {
        data: { username: row.username },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell className={styles.row50}></TableCell>
        <TableCell align="left" className={styles.row280}>
          <Grid container={true}>
            <ListItem disablePadding>
              <ListItemIcon className={styles.iconavatar}>
                <MdAccountCircle />
              </ListItemIcon>
              <Grid item>
                <ListItem disablePadding>
                  <Typography className={styles.tebel}>{row.name}</Typography>
                </ListItem>
                <Typography className={styles.username}>
                  {row.username}
                </Typography>
              </Grid>
            </ListItem>
          </Grid>
        </TableCell>
        <TableCell align="left" className={styles.row150}>
          <Typography className={styles.biasa}>{role}</Typography>
        </TableCell>
        <TableCell align="left" className={styles.row150}>
          <Grid>
            <ListItem disablePadding>
              <WhatsAppIcon />
              <Link
                href={whatsapplink + whatsappnumber}
                underline="none"
                target="_blank"
              >
                <Typography className={styles.isicontact}>
                  {row.nowa}
                </Typography>
              </Link>
            </ListItem>
            <ListItem disablePadding>
              <EmailIcon />
              <Typography className={styles.isicontact}>{row.email}</Typography>
            </ListItem>
          </Grid>
        </TableCell>
        <TableCell align="left" className={styles.row70}>
          <Grid container>
            <Grid item xs={6}>
              <Button
                className={styles.button}
                onClick={handleModal}
                // disabled={check}
              >
                <EditIcon />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                className={styles.button}
                onClick={deletePop}
                disabled={check}
              >
                <DeleteIcon />
              </Button>
            </Grid>
          </Grid>
        </TableCell>
        <Modal
          open={open}
          onClose={handleModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <EditAdmin row={row} />
        </Modal>
      </TableRow>
    </>
  );
}

export default Row;

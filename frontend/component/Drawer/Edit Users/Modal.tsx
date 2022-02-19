import React, { useState, useEffect, Fragment } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
  Button,
  InputAdornment,
} from "@mui/material";
import { useStyles } from "../../Admins/Modal/modalStyling";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";
import GagalPop from "../../Popup/GagalPop";
import BerhasilPop from "../../Popup/BerhasilPop";
import { useRouter } from "next/router";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Modal = ({ row }: any) => {
  const style = useStyles();
  const router = useRouter();
  const [data, setData] = useState({
    username: row.username,
    nama: row.name,
    email: row.email,
    whatsapp: row.nowa,
    tenantid: row.tenantId,
    roleid: row.role,
    id: row.id,
    newPassword: "",
    confnewPassword: "",
    passwordLama: "",
  });
  const [password, setChangePassword] = useState(false);
  const [error, setError] = useState(false);
  const [lengkap, setLengkap] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [muncul1, setMuncul1] = useState(false);
  const [muncul2, setMuncul2] = useState(false);
  const [muncul3, setMuncul3] = useState(false);

  const errorMessage = () => {
    if (
      data.nama === "" ||
      data.username === "" ||
      !validateWhatsapp(data.whatsapp) ||
      !validateEmail(data.email) ||
      data.confnewPassword !== data.newPassword
    ) {
      return (
        <Typography sx={{ color: "red" }}>
          Data masih salah! Silahkan coba lagi!
        </Typography>
      );
    }
  };

  const handlePassword = () => {
    setChangePassword(!password);
  };

  const validateEmail = (email: any) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateWhatsapp = (whatsapp: any) => {
    const wa = /^\d+$/;
    return wa.test(String(whatsapp));
  };

  const verifyToken = async (scholar: any) => {
    scholar.preventDefault();
    await axios
      .get("http://localhost:5000/users", { withCredentials: true })
      .then((res) => {
        edit();
      })
      .catch((err) => {
        if (err) {
          axios
            .get("http://localhost:5000/token", {
              withCredentials: true,
            })
            .then((res) => {
              edit();
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

  const edit = () => {
    if (!password) {
      EditnoPassword();
    } else {
      Edit();
    }
  };

  const erroralias = "Username sudah terdaftar!";
  const errordata = "Data masih tidak lengkap atau password tidak sama!";
  const berhasilmsg = "User Berhasil Diedit!";

  const Edit = async () => {
    axios
      .put("http://localhost:5000/admin", {
        name: data.nama,
        id: data.id,
        nowa: data.whatsapp,
        email: data.email,
        password: data.passwordLama,
        newPassword: data.newPassword,
      })
      .then((res) => {
        console.log(res);
        setError(false);
        const msg = "Berhasil diubah!";
        BerhasilPop(msg);
        setInterval(function () {
          window.location.reload();
        }, 2500);
      })
      .catch((err) => {
        console.log(err.response);
        const msg = "Password Salah!";
        GagalPop(msg);
        setLengkap(false);
        setError(true);
      });
  };

  const EditnoPassword = async () => {
    axios
      .put("http://localhost:5000/admin", {
        name: data.nama,
        id: data.id,
        nowa: data.whatsapp,
        email: data.email,
        password: data.passwordLama,
        // newPassword: data.newPassword,
      })
      .then((res) => {
        console.log(res);
        setError(false);
        const msg = "Berhasil diubah!";
        BerhasilPop(msg);
        setInterval(function () {
          window.location.reload();
        }, 2500);
      })
      .catch((err) => {
        console.log(err.response);
        const msg = "Password Salah!";
        GagalPop(msg);
        setLengkap(false);
        setError(true);
      });
  };

  const handleSubmit = (scholar: any) => {
    if (
      data.nama === "" ||
      data.username === "" ||
      !validateWhatsapp(data.whatsapp) ||
      !validateEmail(data.email) ||
      data.passwordLama === "" ||
      data.confnewPassword !== data.newPassword
    ) {
      console.log("gak lengakp di handle");
      console.log(data);
      GagalPop(errordata);
    } else {
      verifyToken(scholar);
      console.log(data);
    }
    setSubmit(true);
  };

  return (
    <>
      <Box>
        <Typography sx={{ marginBottom: 1 }} variant="h5">
          Edit User Info
        </Typography>
        {/* Baris Pertama */}
        <Grid container spacing={3} alignItems="center">
          <Grid item md={6} xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={1}>
                <AccountCircle
                  className={data.nama === "" ? style.iconError : style.icon}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  label="Nama"
                  error={data.nama === ""}
                  className={style.textfield}
                  onChange={(e) => {
                    setData({
                      ...data,
                      nama: e.target.value,
                    });
                  }}
                  variant="standard"
                  helperText={
                    data.nama === ""
                      ? "Nama tidak boleh kosong!"
                      : "Format Nama sudah benar!"
                  }
                  defaultValue={data.nama}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={1}>
                <AccountCircle
                  className={
                    data.username === "" ? style.iconError : style.icon
                  }
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  disabled
                  label="Username"
                  error={data.username === ""}
                  onChange={(e) => {
                    setData({
                      ...data,
                      username: e.target.value,
                    });
                  }}
                  variant="standard"
                  helperText={
                    data.username === ""
                      ? "Username tidak boleh kosong!"
                      : "Format Username sudah benar!"
                  }
                  defaultValue={data.username}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* Baris Kedua */}
          <Grid item md={6} xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={1}>
                <EmailIcon
                  className={
                    validateEmail(data.email) ? style.icon : style.iconError
                  }
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  label="Email"
                  error={!validateEmail(data.email)}
                  className={style.textfield}
                  onChange={(e) => {
                    setData({
                      ...data,
                      email: e.target.value,
                    });
                  }}
                  variant="standard"
                  helperText={
                    !validateEmail(data.email)
                      ? "Format Email Salah!"
                      : "Format Email sudah benar!"
                  }
                  defaultValue={data.email}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* Baris Kedua */}
          <Grid item md={6} xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={1}>
                <WhatsAppIcon
                  className={
                    !validateWhatsapp(data.whatsapp)
                      ? style.iconError
                      : style.icon
                  }
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Whatsapp"
                  fullWidth
                  error={!validateWhatsapp(data.whatsapp)}
                  onChange={(e) => {
                    setData({
                      ...data,
                      whatsapp: e.target.value,
                    });
                  }}
                  variant="standard"
                  helperText={
                    !validateWhatsapp(data.whatsapp)
                      ? "Whatsapp tidak boleh kosong dan hanya angka!"
                      : "Format Whatsapp sudah benar!"
                  }
                  defaultValue={data.whatsapp}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* Baris Ketiga */}
          <Grid item md={6} xs={12}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <FormControlLabel
                  sx={{ my: "auto", height: "100%" }}
                  control={
                    <Switch checked={password} onChange={handlePassword} />
                  }
                  label="Change Password?"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}></Grid>
          {password && (
            <>
              <Grid item md={6} xs={12}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={1}>
                    <VpnKeyIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      label="Password Baru"
                      fullWidth
                      type={muncul1 ? "text" : "password"}
                      error={data.newPassword === ""}
                      onChange={(e) => {
                        setData({
                          ...data,
                          newPassword: e.target.value,
                        });
                      }}
                      variant="standard"
                      helperText={
                        data.newPassword === ""
                          ? "Password tidak boleh kosong dan hanya angka!"
                          : "Format Password sudah benar!"
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                setMuncul1(!muncul1);
                              }}
                            >
                              {muncul1 ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      defaultValue={data.newPassword}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={6} xs={12}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={1}>
                    <VpnKeyIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      label="Konfirmasi Password Baru"
                      fullWidth
                      type={muncul2 ? "text" : "password"}
                      error={data.confnewPassword === ""}
                      onChange={(e) => {
                        setData({
                          ...data,
                          confnewPassword: e.target.value,
                        });
                      }}
                      variant="standard"
                      helperText={
                        data.confnewPassword === ""
                          ? "Password tidak boleh kosong dan hanya angka!"
                          : "Password sudah benar!"
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => {
                                setMuncul2(!muncul2);
                              }}
                            >
                              {muncul2 ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      defaultValue={data.confnewPassword}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
          <Grid item md={12} xs={12}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <TextField
                  label="Password Sekarang"
                  fullWidth
                  type={muncul3 ? "text" : "password"}
                  error={data.passwordLama === ""}
                  onChange={(e) => {
                    setData({
                      ...data,
                      passwordLama: e.target.value,
                    });
                  }}
                  variant="standard"
                  helperText={
                    data.passwordLama === ""
                      ? "Password tidak boleh kosong dan hanya angka!"
                      : "Format Password sudah benar!"
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            setMuncul3(!muncul3);
                          }}
                        >
                          {muncul3 ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    ),
                  }}
                  defaultValue={data.passwordLama}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <div>{submit && errorMessage()}</div>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row-reverse">
              <Button onClick={handleSubmit}>Edit User!</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Modal;

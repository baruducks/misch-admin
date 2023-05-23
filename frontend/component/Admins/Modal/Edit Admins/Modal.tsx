import React, { useState, useEffect, Fragment } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  FormHelperText,
  FormControlLabel,
  Switch,
  Button,
  InputAdornment,
} from "@mui/material";
import { useStyles } from "../modalStyling";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import WcIcon from "@mui/icons-material/Wc";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import EventIcon from "@mui/icons-material/Event";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PercentIcon from "@mui/icons-material/Percent";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import WorkIcon from "@mui/icons-material/Work";
import axios from "axios";
import GagalPop from "../../../Popup/GagalPop";
import BerhasilPop from "../../../Popup/BerhasilPop";
import { useAuth } from "../../../../contexts/auth";
import { useRouter } from "next/router";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";

const Modal = ({ row }: any) => {
  const style = useStyles();
  const router = useRouter();
  const { isAuthenticated }: any = useAuth();
  const [data, setData] = useState({
    username: row.username,
    nama: row.name,
    email: row.email,
    whatsapp: row.nowa,
    tenantid: row.tenantId,
    roleid: row.role,
    id: row.id,
  });
  const empty = " ";
  const [date, setDate] = useState<Date | any>(new Date());
  const [manager, toggleManager] = useState(false);
  const [error, setError] = useState(false);
  const [lengkap, setLengkap] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [berhasil, setBerhasil] = useState(false);
  const [tenant, setTenant] = useState<any[]>([]);
  console.log(data);
  console.log(row);
  const errorMessage = () => {
    if (
      data.nama === "" ||
      data.username === "" ||
      !validateWhatsapp(data.whatsapp) ||
      !validateEmail(data.email)
    ) {
      return (
        <Typography sx={{ color: "red" }}>
          Data masih salah! Silahkan coba lagi!
        </Typography>
      );
    }
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
        editAdmin();
      })
      .catch((err) => {
        if (err) {
          axios
            .get("http://localhost:5000/token", { withCredentials: true })
            .then((res) => {
              editAdmin();
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

  const editAdmin = async () => {
    axios
      .put("http://localhost:5000/user", {
        name: data.nama,
        id: data.id,
        // username: data.username,
        email: data.email,
        nowa: data.whatsapp,
        role: data.roleid,
        tenantId: data.tenantid,
      })
      .then((res) => {
        BerhasilPop(berhasilmsg);
        setError(false);
        console.log(res);
        setInterval(function () {
          window.location.reload();
        }, 2500);
      })
      .catch((err) => {
        console.log(err.response.data);
        GagalPop(erroralias);
        setLengkap(false);
        setError(true);
      });
  };

  const erroralias = "Username sudah terdaftar!";
  const errordata = "Data masih tidak lengkap!";
  const berhasilmsg = "User Berhasil Diedit!";

  const getTenant = async () => {
    try {
      const data = await axios.get("http://localhost:5000/tenant");
      // console.log(data.data);
      setTenant(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTenant();
    // console.log(row);
    // console.log(tenant);
  }, []);

  const handleSubmit = (scholar: any) => {
    if (
      data.nama === "" ||
      data.username === "" ||
      !validateWhatsapp(data.whatsapp) ||
      !validateEmail(data.email)
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
          Edit User
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
                    setData({ ...data, nama: e.target.value });
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
                    setData({ ...data, username: e.target.value });
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
                    setData({ ...data, email: e.target.value });
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
          {/* Baris Ketiga */}
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
                    setData({ ...data, whatsapp: e.target.value });
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
              <Grid item xs={1}>
                <SupervisorAccountIcon />
              </Grid>
              <Grid item xs={11}>
                <FormControl
                  variant="standard"
                  sx={{ minWidth: "100%" }}
                  // error={data.gender === ""}
                >
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={row.roleid}
                    onChange={(e: any) => {
                      if (e.target.value == 0 || e.target.value == 1) {
                        setData({
                          ...data,
                          tenantid: 0,
                          roleid: e.target.value,
                        });
                      } else {
                        setData({ ...data, roleid: e.target.value });
                      }
                    }}
                    label="Tenant"
                    defaultValue={data.roleid}
                  >
                    <MenuItem value={0}>Master Admin</MenuItem>
                    <MenuItem value={1}>Admin</MenuItem>
                    <MenuItem value={2}>Tenant</MenuItem>
                    {/* <MenuItem value=""></MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem> */}
                  </Select>
                  <FormHelperText>{empty}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            {data.roleid == 2 && (
              <>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={1}>
                    <WorkIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <FormControl
                      variant="standard"
                      sx={{ minWidth: "100%" }}
                      // error={data.gender === ""}
                    >
                      <InputLabel>Tenant</InputLabel>
                      <Select
                        value={row.tenantid}
                        onChange={(e: any) => {
                          setData({ ...data, tenantid: e.target.value });
                        }}
                        label="Tenant"
                        defaultValue={data.tenantid}
                      >
                        {/* <MenuItem value="Misch">Misch</MenuItem> */}
                        {tenant.map((test: any, index: any) => {
                          return (
                            <MenuItem value={tenant[index].id}>
                              {tenant[index].nama}
                            </MenuItem>
                          );
                        })}
                        {/* <MenuItem value=""></MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem> */}
                      </Select>
                      <FormHelperText>{empty}</FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>
              </>
            )}
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

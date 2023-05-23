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
import GagalPop from "../../../../Popup/GagalPop";
import BerhasilPop from "../../../../Popup/BerhasilPop";
import { useAuth } from "../../../../../contexts/auth";
import { useRouter } from "next/router";

const Modal = () => {
  const style = useStyles();
  const router = useRouter();
  const { isAuthenticated }: any = useAuth();
  const [data, setData] = useState({
    nama: "",
    alias: "",
    email: "",
    whatsapp: "",
    gender: "",
    scholar: 0,
    owner: 0,
    manager: 0,
    address: "",
    tenantid: 0,
    managername: "Misch",
  });
  const empty = " ";
  const [date, setDate] = useState<Date | any>(new Date());
  const [manager, toggleManager] = useState(false);
  const [error, setError] = useState(false);
  const [lengkap, setLengkap] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [berhasil, setBerhasil] = useState(false);
  const [tenant, setTenant] = useState<any[]>([]);

  const errorMessage = () => {
    if (
      data.nama === "" ||
      data.alias === "" ||
      !validateWhatsapp(data.whatsapp) ||
      data.gender === "" ||
      Number(data.scholar) + Number(data.manager) + Number(data.owner) != 100 ||
      data.address === "" ||
      !validateEmail(data.email)
    ) {
      return (
        <Typography sx={{ color: "red" }}>
          Data masih salah! Silahkan coba lagi!
        </Typography>
      );
    } else {
      if (manager) {
        if (data.managername === "") {
          return (
            <Typography sx={{ color: "red" }}>
              Data masih salah! Silahkan coba lagi!
            </Typography>
          );
        } else {
          console.log("lengkap di error");
        }
      }
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

  const handleManager = () => {
    setData({ ...data, tenantid: 1, manager: 0 });
    toggleManager(!manager);
  };

  const verifyToken = async (scholar: any) => {
    scholar.preventDefault();
    await axios
      .get("http://localhost:5000/users", { withCredentials: true })
      .then((res) => {
        addScholar();
      })
      .catch((err) => {
        if (err) {
          axios
            .get("http://localhost:5000/token", { withCredentials: true })
            .then((res) => {
              addScholar();
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
  const addScholar = async () => {
    axios
      .post("http://localhost:5000/scholar", {
        nama: data.nama,
        alias: data.alias,
        email: data.email,
        nowa: data.whatsapp,
        gender: data.gender,
        scholarpshare: data.scholar,
        ownerpshare: data.owner,
        managerpshare: data.manager,
        addressronin: data.address,
        tgllahir: date,
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

  const erroralias = "Alias sudah terdaftar!";
  const errordata = "Data masih tidak lengkap!";
  const berhasilmsg = "Berhasil Ditambahkan!";

  const getTenant = async () => {
    try {
      const data = await axios.get("http://localhost:5000/tenant");
      console.log(data.data);
      setTenant(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTenant();
    console.log(tenant);
  }, []);

  const handleSubmit = (scholar: any) => {
    if (
      data.nama === "" ||
      data.alias === "" ||
      !validateWhatsapp(data.whatsapp) ||
      data.gender === "" ||
      Number(data.scholar) + Number(data.manager) + Number(data.owner) != 100 ||
      data.address === "" ||
      !validateEmail(data.email)
    ) {
      console.log("gak lengakp di handle");
      GagalPop(errordata);
    } else {
      verifyToken(scholar);
    }
    setSubmit(true);
  };

  return (
    <>
      <Box>
        <Typography sx={{ marginBottom: 1 }} variant="h5">
          Add Scholar
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
                  className={data.alias === "" ? style.iconError : style.icon}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  label="Alias"
                  error={data.alias === ""}
                  onChange={(e) => {
                    setData({ ...data, alias: e.target.value });
                  }}
                  variant="standard"
                  helperText={
                    data.alias === ""
                      ? "Alias tidak boleh kosong!"
                      : "Format Alias sudah benar!"
                  }
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
                <EventIcon />
              </Grid>
              <Grid item xs={11}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    inputFormat="MM/dd/yyyy"
                    label="Tanggal Lahir"
                    value={date}
                    onChange={(newValue: any) => {
                      setDate(newValue.toISOString().slice(0, 10));
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth variant="standard" {...params} />
                    )}
                  />
                </LocalizationProvider>
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
                <WcIcon
                  className={data.gender === "" ? style.iconError : style.icon}
                />
              </Grid>
              <Grid item xs={11}>
                <FormControl
                  variant="standard"
                  sx={{ minWidth: "100%" }}
                  error={data.gender === ""}
                >
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={data.gender}
                    onChange={(e: any) => {
                      setData({ ...data, gender: e.target.value });
                    }}
                    label="Gender"
                  >
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                  {data.gender === "" && (
                    <FormHelperText style={{ color: "#e54d42" }}>
                      Gender tidak boleh kosong!
                    </FormHelperText>
                  )}
                  {!(data.gender === "") && (
                    <FormHelperText>Format Gender sudah benar!</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          {/* Baris Keempat */}
          <Grid item md={6} xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={1}>
                <PercentIcon />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Scholar Profit Share"
                  variant="standard"
                  fullWidth
                  onChange={(e: any) => {
                    setData({ ...data, scholar: Number(e.target.value) });
                  }}
                  error={
                    Number(data.scholar) +
                      Number(data.manager) +
                      Number(data.owner) !=
                    100
                  }
                  type="number"
                  InputProps={{
                    inputProps: {
                      max: 100,
                      min: 0,
                    },
                  }}
                  helperText={
                    Number(data.scholar) +
                      Number(data.manager) +
                      Number(data.owner) !=
                    100
                      ? "Profit Sharing Harus berjumlah 100%"
                      : " "
                  }
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
                <PercentIcon />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Owner Profit Share"
                  variant="standard"
                  fullWidth
                  onChange={(e: any) => {
                    setData({ ...data, owner: Number(e.target.value) });
                  }}
                  error={
                    Number(data.scholar) +
                      Number(data.manager) +
                      Number(data.owner) !=
                    100
                  }
                  type="number"
                  InputProps={{
                    inputProps: {
                      max: 100,
                      min: 0,
                    },
                  }}
                  helperText={
                    Number(data.scholar) +
                      Number(data.manager) +
                      Number(data.owner) !=
                    100
                      ? "Profit Sharing Harus berjumlah 100%"
                      : " "
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {/* Manager Section */}
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12}>
                <FormControlLabel
                  sx={{ my: "auto", height: "100%" }}
                  control={
                    <Switch checked={manager} onChange={handleManager} />
                  }
                  label="Tenant?"
                />
              </Grid>
            </Grid>
          </Grid>
          {manager && (
            <Fragment>
              <Grid item md={6} xs={12}>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={1}>
                    <WorkIcon
                      className={
                        data.managername === "" ? style.iconError : style.icon
                      }
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <FormControl
                      variant="standard"
                      sx={{ minWidth: "100%" }}
                      // error={data.gender === ""}
                    >
                      <InputLabel>Tenant</InputLabel>
                      <Select
                        value={data.tenantid}
                        onChange={(e: any) => {
                          setData({ ...data, tenantid: e.target.value });
                        }}
                        label="Tenant"
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
                      {data.gender === "" && (
                        <FormHelperText style={{ color: "#e54d42" }}>
                          {empty}
                        </FormHelperText>
                      )}
                      {!(data.gender === "") && (
                        <FormHelperText>{empty}</FormHelperText>
                      )}
                    </FormControl>
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
                    <PercentIcon />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      label="Manager Profit Share"
                      variant="standard"
                      margin="none"
                      fullWidth
                      onChange={(e: any) => {
                        setData({ ...data, manager: Number(e.target.value) });
                      }}
                      error={
                        Number(data.scholar) +
                          Number(data.manager) +
                          Number(data.owner) !=
                        100
                      }
                      type="number"
                      InputProps={{
                        inputProps: {
                          max: 100,
                          min: 0,
                        },
                      }}
                      helperText={
                        Number(data.scholar) +
                          Number(data.manager) +
                          Number(data.owner) !=
                        100
                          ? "Profit Sharing Harus berjumlah 100%"
                          : " "
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          )}
          <Grid item xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              {/* <Grid item xs={1}>
                <AccountBalanceWalletIcon
                  className={data.address === "" ? style.iconError : style.icon}
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ronin Wallet Adress"
                  error={data.address === ""}
                  className={style.textfield}
                  onChange={(e) => {
                    setData({ ...data, address: e.target.value });
                  }}
                  variant="standard"
                  helperText={
                    data.address === ""
                      ? "Ronin Wallet Adress tidak boleh kosong dan tidak boleh ada spasi!"
                      : " "
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBalanceWalletIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <div>{submit && errorMessage()}</div>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row-reverse">
              <Button onClick={handleSubmit}>Add Scholar!</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Modal;

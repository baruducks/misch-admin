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

const Modal = ({ row }: any) => {
  const style = useStyles();
  const { isAuthenticated }: any = useAuth();
  const router = useRouter();
  const [data, setData] = useState({
    id: row.id,
    nama: row.nama,
    alias: row.alias,
    email: row.email,
    whatsapp: row.nowa,
    gender: row.gender,
    scholar: row.scholarpshare,
    owner: row.ownerpshare,
    manager: row.managerpshare,
    address: row.addressronin,
    managername: row.tenant,
    tenantId: row.tenantId,
  });
  const empty = " ";
  const [date, setDate] = useState<Date | any>(new Date());
  const [manager, toggleManager] = useState(true);
  const [error, setError] = useState(false);
  const [lengkap, setLengkap] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [berhasil, setBerhasil] = useState(false);
  const [tenant, setTenant] = useState<any[]>([]);

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
    setData({ ...data, manager: 0 });
    toggleManager(!manager);
    console.log(data);
  };

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

  const editScholarNoAlias = async () => {
    axios
      .put(
        `http://localhost:5000/scholar/`,
        {
          id: data.id,
          nama: data.nama,
          email: data.email,
          // alias: data.alias,
          nowa: data.whatsapp,
          gender: data.gender,
          scholarpshare: data.scholar,
          ownerpshare: data.owner,
          managerpshare: data.manager,
          addressronin: data.address,
          tenant: data.managername,
          tgllahir: date,
          tenantId: data.tenantId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        BerhasilPop(berhasilmsg);
        setError(false);
        console.log(res);
        setInterval(function () {
          window.location.reload();
        }, 2500);
      })
      .catch((err) => {
        console.log(err.response.data + " ini error");
        console.log(err);
        GagalPop(erroralias);
        setError(true);
        setLengkap(false);
      });
  };

  const editScholarAlias = async () => {
    axios
      .put(
        `http://localhost:5000/scholar/`,
        {
          id: data.id,
          nama: data.nama,
          email: data.email,
          alias: data.alias,
          nowa: data.whatsapp,
          gender: data.gender,
          scholarpshare: data.scholar,
          ownerpshare: data.owner,
          managerpshare: data.manager,
          addressronin: data.address,
          tenant: data.managername,
          tgllahir: date,
          tenantId: data.tenantId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        BerhasilPop(berhasilmsg);
        setError(false);
        console.log(res);
        setInterval(function () {
          window.location.reload();
        }, 2500);
      })
      .catch((err) => {
        console.log(err.response.data + " ini error");
        console.log(err);
        GagalPop(erroralias);
        setError(true);
        setLengkap(false);
      });
  };

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
    console.log(row);
    setDate(row.tgllahir);
    getTenant();
  }, []);

  const erroralias = "Alias sudah terdaftar!";
  const errordata = "Data masih tidak lengkap!";
  const berhasilmsg = "Berhasil Diedit!";

  const handleSubmit = (scholar: any) => {
    if (data.alias === row.alias) {
      if (
        data.nama === "" ||
        data.alias === "" ||
        !validateWhatsapp(data.whatsapp) ||
        data.gender === "" ||
        Number(data.scholar) + Number(data.manager) + Number(data.owner) !=
          100 ||
        data.address === "" ||
        !validateEmail(data.email)
      ) {
        console.log("gak lengakp di handle");
        GagalPop(errordata);
      } else {
        verifyTokenNoAlias(scholar);
      }
    } else {
      if (
        data.nama === "" ||
        data.alias === "" ||
        !validateWhatsapp(data.whatsapp) ||
        data.gender === "" ||
        Number(data.scholar) + Number(data.manager) + Number(data.owner) !=
          100 ||
        data.address === "" ||
        !validateEmail(data.email)
      ) {
        console.log("gak lengakp di handle");
        GagalPop(errordata);
      } else {
        verifyTokenAlias(scholar);
      }
    }
    setSubmit(true);
  };

  const verifyTokenAlias = async (scholar: any) => {
    scholar.preventDefault();
    await axios
      .get("http://localhost:5000/users", { withCredentials: true })
      .then((res) => {
        editScholarAlias();
      })
      .catch((err) => {
        if (err) {
          axios
            .get("http://localhost:5000/token", { withCredentials: true })
            .then((res) => {
              editScholarAlias();
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

  const verifyTokenNoAlias = async (scholar: any) => {
    scholar.preventDefault();
    await axios
      .get("http://localhost:5000/users", { withCredentials: true })
      .then((res) => {
        editScholarNoAlias();
      })
      .catch((err) => {
        if (err) {
          axios
            .get("http://localhost:5000/token", { withCredentials: true })
            .then((res) => {
              editScholarNoAlias();
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

  return (
    <>
      <Box>
        <Typography sx={{ marginBottom: 1 }} variant="h5">
          Edit Scholar
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
                  className={data.alias === "" ? style.iconError : style.icon}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  // disabled
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
                  defaultValue={data.alias}
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
                  defaultValue={data.scholar}
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
                  defaultValue={data.owner}
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
                        value={data.tenantId}
                        onChange={(e: any) => {
                          setData({ ...data, tenantId: e.target.value });
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
                      defaultValue={data.manager}
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
                      ? "Ronin Wallet Adress tidak boleh kosong!"
                      : " "
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountBalanceWalletIcon />
                      </InputAdornment>
                    ),
                  }}
                  defaultValue={data.address}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{ zIndex: 5000000000000 }}>
            {/* {!validateEmail(data.email) && (
              <>
                <Typography sx={{ color: "red" }}>
                  Data masih tidak lengkap!
                </Typography>
              </>
            )} */}
            <div style={{ zIndex: 5000000 }}>{submit && errorMessage()}</div>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row-reverse">
              <Button onClick={handleSubmit}>Edit Scholar!</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Modal;

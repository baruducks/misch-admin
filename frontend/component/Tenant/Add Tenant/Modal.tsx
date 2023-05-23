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
import axios from "axios";
import GagalPop from "../../Popup/GagalPop";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import BerhasilPop from "../../Popup/BerhasilPop";
import { useRouter } from "next/router";
import { useAuth } from "../../../contexts/auth";

const Modal = () => {
  const style = useStyles();
  const { isAuthenticated }: any = useAuth();
  const router = useRouter();
  const [data, setData] = useState({
    nama: "",
    low: 0,
    med: 0,
    high: 0,
  });
  const [error, setError] = useState(false);
  const [lengkap, setLengkap] = useState(false);
  const [submit, setSubmit] = useState(false);

  const errorMessage = () => {
    if (data.nama === "" || data.low == 0 || data.med == 0 || data.high == 0) {
      return (
        <Typography sx={{ color: "red" }}>
          Data masih salah! Silahkan coba lagi!
        </Typography>
      );
    }
  };

  const verifyToken = async (scholar: any) => {
    scholar.preventDefault();
    await axios
      .get("http://localhost:5000/users", { withCredentials: true })
      .then((res) => {
        addTenant();
      })
      .catch((err) => {
        if (err) {
          axios
            .get("http://localhost:5000/token", { withCredentials: true })
            .then((res) => {
              addTenant();
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

  const addTenant = async () => {
    axios
      .post("http://localhost:5000/tenant", {
        nama: data.nama,
        low: data.low,
        med: data.med,
        high: data.high,
      })
      .then((res) => {
        const msg = "Tenant berhasil ditambahkan!";
        BerhasilPop(msg);
        setError(false);
        console.log(res);
        setInterval(function () {
          window.location.reload();
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        GagalPop(datasalah);
        setLengkap(false);
        setError(true);
      });
  };

  const datasalah = "Data Masih tidak lengkap!";

  const handleSubmit = (tenant: any) => {
    if (data.nama === "" || data.low == 0 || data.med == 0 || data.high == 0) {
      console.log("gak lengkap di handle");
      GagalPop(datasalah);
    } else {
      verifyToken(tenant);
    }
    setSubmit(true);
  };

  return (
    <>
      <Box>
        <Typography sx={{ marginBottom: 1 }} variant="h5">
          Add Tenant
        </Typography>
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
                <LightbulbIcon
                  className={data.low === 0 ? style.iconError : style.icon}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Low"
                  variant="standard"
                  fullWidth
                  onChange={(e: any) => {
                    setData({ ...data, low: Number(e.target.value) });
                  }}
                  error={Number(data.low) == 0}
                  type="number"
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  helperText={
                    Number(data.low) == 0 ? "Low tidak boleh 0!" : " "
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
                <LightbulbIcon
                  className={data.med === 0 ? style.iconError : style.icon}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="Med"
                  variant="standard"
                  fullWidth
                  onChange={(e: any) => {
                    setData({ ...data, med: Number(e.target.value) });
                  }}
                  error={Number(data.med) == 0}
                  type="number"
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  helperText={
                    Number(data.med) == 0 ? "Med tidak boleh 0!" : " "
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
                <LightbulbIcon
                  className={data.high === 0 ? style.iconError : style.icon}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  label="High"
                  variant="standard"
                  fullWidth
                  onChange={(e: any) => {
                    setData({ ...data, high: Number(e.target.value) });
                  }}
                  error={Number(data.high) == 0}
                  type="number"
                  InputProps={{
                    inputProps: {
                      min: 0,
                    },
                  }}
                  helperText={
                    Number(data.high) == 0 ? "High tidak boleh 0!" : " "
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <div>{submit && errorMessage()}</div>
          </Grid>
          <Grid item xs={6}>
            <Grid container direction="row-reverse">
              <Button onClick={handleSubmit}>Add Tenant!</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Modal;

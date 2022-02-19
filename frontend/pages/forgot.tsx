import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import Copyright from "../component/Layout/Copyright";
import { Link, Button } from "@mui/material";
import { Divider, IconButton, InputAdornment, Paper } from "@mui/material";
import { useStyles } from "../component/Login/LoginStyle";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import clsx from "clsx";
import axios from "axios";
import { useRouter } from "next/router";
import LoadingComponent from "../component/Loading/LoadingComponent";
import GagalPop from "../component/Popup/GagalPop";
import BerhasilPop from "../component/Popup/BerhasilPop";
import { useAuth } from "../contexts/auth";
import Image from "next/image";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Forgot() {
  const { login, isAuthenticated }: any = useAuth();
  // console.log(isAuthenticated);
  if (isAuthenticated) {
    // const msg = "Anda sudah log in!";
    // GagalPop(msg);
    // useRouter().push("/");
  }

  const style = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [foto, setFoto] = useState(Math.floor(Math.random() * 10) + 1);
  // console.log(foto);
  const [user, setUser] = useState({
    nowhatsapp: "",
  });
  const handleClickPassword = () => setShowPassword(!showPassword);

  const handleForgot = async (e: any) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/lupa", {
        nowa: user.nowhatsapp,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // console.log(user);
  });

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Head>
          <title>Misch | Forgot Password</title>
        </Head>
        <div className={style.page}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            style={{ height: "100vh" }}
          >
            <Grid item xs={10} md={8}>
              <Grid
                container
                className={style.login}
                style={{ alignItems: "center" }}
                justifyContent="center"
              >
                <Grid item xs={12} md={7} style={{}}>
                  <div className={style.paper}>
                    {foto % 2 == 0 && (
                      <>
                        <Image
                          src="/logonew-blue.svg"
                          // layout="fill"
                          width={150}
                          height={150}
                          // style={{ maxWidth: 150, marginBottom: "20px" }}
                        />
                      </>
                    )}
                    {foto % 2 != 0 && (
                      <>
                        <Image
                          src="/logonew-orange.svg"
                          width={150}
                          height={150}
                          // style={{ maxWidth: 150, marginBottom: "20px" }}
                        />
                      </>
                    )}
                    <Typography variant="h4" style={{ textAlign: "center" }}>
                      <b>Lupa Password</b>
                    </Typography>
                    <Divider
                      style={{
                        width: "40px",
                        height: "3px",
                        borderRadius: "3px",
                      }}
                    />
                    <form className={style.form} noValidate>
                      <TextField
                        size="small"
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        label="No Whatsapp"
                        onChange={(e) => {
                          setUser({ ...user, nowhatsapp: e.target.value });
                        }}
                        onKeyPress={(e: any) => {
                          if (e.which == 13) {
                            handleForgot(e);
                          }
                        }}
                      />
                    </form>
                    <Button
                      type="submit"
                      fullWidth
                      sx={{ width: "150px", textAlign: "center", mt: 2 }}
                      className={clsx(
                        foto % 2 == 0 ? style.buttonOren : style.buttonBiru
                      )}
                      onClick={handleForgot}
                    >
                      Kirim Password
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </>
  );
}

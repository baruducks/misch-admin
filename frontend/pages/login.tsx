import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { Button } from "@mui/material";
import Link from "next/link";
import { Divider, IconButton, InputAdornment, Paper } from "@mui/material";
import { useStyles } from "../component/Login/LoginStyle";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/auth";
import Image from "next/image";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Login() {
  const { login, isAuthenticated }: any = useAuth();
  // console.log(isAuthenticated);
  if (isAuthenticated) {
    // const msg = "Anda sudah log in!";
    // GagalPop(msg);
    useRouter().push("/");
  }

  const style = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [foto, setFoto] = useState(Math.floor(Math.random() * 10) + 1);
  // console.log(foto);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleClickPassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    login(user.username, user.password);
  };

  useEffect(() => {
    // console.log(user);
  });

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Head>
          <title>Misch | Login</title>
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
                      <b>Masuk</b>
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
                        label="Username"
                        onChange={(e) => {
                          setUser({ ...user, username: e.target.value });
                        }}
                        onKeyPress={(e: any) => {
                          if (e.which == 13) {
                            handleLogin(e);
                          }
                        }}
                      />
                      <TextField
                        size="small"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => {
                          setUser({ ...user, password: e.target.value });
                        }}
                        onKeyPress={(e: any) => {
                          if (e.which == 13) {
                            handleLogin(e);
                          }
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Grid item>
                        <Grid container justifyContent="flex-end">
                          <Grid
                            item
                            style={{
                              textAlign: "right",
                              // color: "inherit",
                              // textDecoration: "inherit",
                            }}
                          >
                            <Link href="/forgot" passHref>
                              <div style={{ cursor: "pointer" }}>
                                Lupa password?
                              </div>
                            </Link>
                          </Grid>
                        </Grid>
                      </Grid>
                    </form>
                    <Button
                      type="submit"
                      fullWidth
                      sx={{ width: "150px", textAlign: "center", mt: 2 }}
                      className={clsx(
                        foto % 2 == 0 ? style.buttonOren : style.buttonBiru
                      )}
                      onClick={handleLogin}
                    >
                      Masuk
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

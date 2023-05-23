import React, { useEffect, useState } from "react";
import Topbar from "../Bar/Bar";
import { Box } from "@mui/system";
import Head from "next/head";
import { useAuth } from "../../contexts/auth";
import axios from "axios";

const Layout = ({ children }: any) => {
  const [akun, setAkun] = useState({
    email: "",
    id: "",
    name: "",
    nowa: "",
    role: "",
    tenantId: "",
    username: "",
  });
  const [logged, setLogged] = useState(false);

  const getProfile = async () => {
    const data = JSON.parse(localStorage.getItem("data") as string);
    // console.log(data);
    // if (data) {
    //   });
    // }
    // console.log(akun);
    if (data) {
      axios
        .post("http://localhost:5000/profile", {
          username: data.username,
        })
        .then((res) => {
          if (res.data) {
            setAkun({
              ...akun,
              email: res.data.email,
              id: res.data.id,
              name: res.data.name,
              nowa: res.data.nowa,
              role: res.data.role,
              tenantId: res.data.tenantId,
              username: res.data.username,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setLogged(true);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
        />
      </Head>
      <Box>
        {logged && (
          <>
            <Topbar akun={akun} />
          </>
        )}
        {children}
      </Box>
    </>
  );
};

export default Layout;

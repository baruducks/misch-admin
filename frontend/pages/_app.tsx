import { AppProps } from "next/app";
import React, { useState } from "react";
import { NextPage } from "next";
import { ReactNode } from "react";
import Router from "next/router";
import Loading from "../component/Loading/Loading";
import LoadingComponent from "../component/Loading/LoadingComponent";

import { AuthProvider, useAuth } from "../contexts/auth";
import { PrivateRoute } from "../contexts/protectroute";

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

const MyApp = ({ Component, pageProps }: Props) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    // console.log("router ganti");
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    // console.log("router beres");
    setLoading(false);
  });
  const protectedRoutes = [
    "/scholarship/list",
    "/scholarship/[id]",
    "/statistics",
    "/statistics/[id]",
    "/admins",
    "/tenant",
    "/admins/[id]",
    "/tenant/[id]",
    "/payrolls",
    "/404",
  ];

  return getLayout(
    <>
      <AuthProvider>
        <PrivateRoute protectedRoutes={protectedRoutes}>
          {loading ? <Loading /> : <Component {...pageProps} />}
        </PrivateRoute>
      </AuthProvider>
    </>
  );
};

export default MyApp;

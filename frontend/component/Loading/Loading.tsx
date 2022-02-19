import React, { useState } from "react";
import Main from "../../component/Minor Styling/Main";
import DrawerHeader from "../../component/Minor Styling/DrawerHeader";
import { Hidden } from "@mui/material";
import MainMobile from "../../component/Minor Styling/MainMobile";
import Layout from "../../component/Layout/Layout";
import LoadingComponent from "./LoadingComponent";
import Head from "next/head";

function Loading() {
  return (
    <>
      <Head>
        <title>Misch PTE Scholarship</title>
      </Head>
      <Hidden smDown>
        {/* <Main> */}
        {/* <DrawerHeader /> */}
        <LoadingComponent />
        {/* </Main> */}
      </Hidden>
      <Hidden smUp>
        {/* <MainMobile> */}
        {/* <DrawerHeader /> */}
        <LoadingComponent />
        {/* </MainMobile> */}
      </Hidden>
    </>
  );
}

Loading.getLayout = function getLayout(page: any) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};

export default Loading;

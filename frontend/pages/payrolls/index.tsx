import React, { useState } from "react";
import Main from "../../component/Minor Styling/Main";
import DrawerHeader from "../../component/Minor Styling/DrawerHeader";
import { Hidden } from "@mui/material";
import MainMobile from "../../component/Minor Styling/MainMobile";
import Payrolls from "../../component/Payrolls/PayrollsList";
import Layout from "../../component/Layout/Layout";
import Head from "next/head";
import EditPayrolls from "../../component/Payrolls/NewPayrolls";

function Index() {
  return (
    <>
      <Head>
        <title>Payrolls | Misch PTE Scholarship</title>
      </Head>
      <Hidden smDown>
        <Main>
          <DrawerHeader />
          <Payrolls />
        </Main>
      </Hidden>
      <Hidden smUp>
        <MainMobile>
          <DrawerHeader />
          <Payrolls />
        </MainMobile>
      </Hidden>
    </>
  );
}

Index.getLayout = function getLayout(page: any) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};

export default Index;

import React, { useState } from "react";
import { Hidden } from "@mui/material";
import Main from "../../component/Minor Styling/Main";
import DrawerHeader from "../../component/Minor Styling/DrawerHeader";
import MainMobile from "../../component/Minor Styling/MainMobile";
import ListByTenant from "../../component/Scholarship/List/ListByTenant";
import Layout from "../../component/Layout/Layout";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import PayrollsID from "../../component/Payrolls/PayrollsID";

const Payrolls = ({ scholar }: any) => {
  return (
    <>
      <Head>
        <title>Scholarship List | Misch PTE Scholarship</title>
      </Head>
      <Hidden smDown>
        <Main>
          <DrawerHeader />
          <PayrollsID />
        </Main>
      </Hidden>
      <Hidden smUp>
        <MainMobile>
          <DrawerHeader />
          <PayrollsID />
        </MainMobile>
      </Hidden>
    </>
  );
};

Payrolls.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export default Payrolls;

import React from "react";
import Layout from "../../component/Layout/Layout";
import MainMobile from "../../component/Minor Styling/MainMobile";
import Main from "../../component/Minor Styling/Main";
import DrawerHeader from "../../component/Minor Styling/DrawerHeader";
import { Hidden } from "@mui/material";
import Head from "next/head";
import NewPayrolls from "../../component/Payrolls/NewPayrolls";

const New = () => {
  return (
    <>
      <Head>
        <title>New Payrolls | Misch PTE Scholarship</title>
      </Head>
      <Hidden smDown>
        <Main>
          <DrawerHeader />
          <NewPayrolls />
        </Main>
      </Hidden>
      <Hidden smUp>
        <MainMobile>
          <DrawerHeader />
          <NewPayrolls />
        </MainMobile>
      </Hidden>
    </>
  );
};

New.getLayout = function getLayout(page: any) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};
export default New;

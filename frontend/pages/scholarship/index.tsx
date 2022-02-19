import Layout from "../../component/Layout/Layout";
import Head from "next/head";
import { Hidden } from "@mui/material";
import DrawerHeader from "../../component/Minor Styling/DrawerHeader";
import MainMobile from "../../component/Minor Styling/MainMobile";
import Main from "../../component/Minor Styling/Main";
import Landing from "../../component/Layout/Landing";

const Scholarship = () => {
  return (
    <>
      <Head>
        <title>Scholarship | Misch PTE Scholarship</title>
      </Head>
      <Hidden smDown>
        <Main>
          <DrawerHeader />
          <Landing />
        </Main>
      </Hidden>
      <Hidden smUp>
        <MainMobile>
          <DrawerHeader />
          <Landing />
        </MainMobile>
      </Hidden>
    </>
  );
};

export default Scholarship;

Scholarship.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

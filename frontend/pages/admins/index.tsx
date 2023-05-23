import Layout from "../../component/Layout/Layout";
import Main from "../../component/Minor Styling/Main";
import MainMobile from "../../component/Minor Styling/MainMobile";
import { Hidden } from "@mui/material";
import DrawerHeader from "../../component/Minor Styling/DrawerHeader";
import Head from "next/head";
import Admins from "../../component/Admins/Admins";

function Index() {
  return (
    <>
      <Head>
        <title>Admins | Misch PTE Scholarship</title>
      </Head>
      <Hidden smDown>
        <Main>
          <DrawerHeader />
          <Admins />
        </Main>
      </Hidden>
      <Hidden smUp>
        <MainMobile>
          <DrawerHeader />
          <Admins />
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

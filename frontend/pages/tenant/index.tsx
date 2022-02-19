import { Hidden } from "@mui/material";
import Main from "../../component/Minor Styling/Main";
import MainMobile from "../../component/Minor Styling/MainMobile";
import DrawerHeader from "../../component/Minor Styling/DrawerHeader";
import Layout from "../../component/Layout/Layout";
import Head from "next/head";
import Tenant from "../../component/Tenant/Tenant";

const Index = () => {
  return (
    <>
      <Head>
        <title>Tenant List | Misch PTE Scholarship</title>
      </Head>
      <Hidden smDown>
        <Main>
          <DrawerHeader />
          <Tenant />
        </Main>
      </Hidden>
      <Hidden smUp>
        <MainMobile>
          <DrawerHeader />
          <Tenant />
        </MainMobile>
      </Hidden>
    </>
  );
};

Index.getLayout = function getLayout(page: any) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};

export default Index;

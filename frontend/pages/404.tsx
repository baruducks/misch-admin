import { Hidden } from "@mui/material";
import Layout from "../component/Layout/Layout";
import Head from "next/head";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import Router from "next/router";
import GagalPop from "../component/Popup/GagalPop";
import { useAuth } from "../contexts/auth";

function Custom404() {
  const { isAuthenticated }: any = useAuth();
  // if (!isAuthenticated) {
  //   useRouter().push("/login");
  // }
  // Router.push("/login");
  return (
    <>
      <Head>
        <title>Misch PTE Scholarship</title>
      </Head>
      <Hidden smDown>
        <ErrorPage statusCode={404} />
      </Hidden>
      <Hidden smUp>
        <ErrorPage statusCode={404} />
      </Hidden>
    </>
  );
}

Custom404.getLayout = function getLayout(page: any) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};

export default Custom404;

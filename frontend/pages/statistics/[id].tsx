import { Hidden } from "@mui/material";
import Main from "../../component/Minor Styling/Main";
import DrawerHeader from "../../component/Minor Styling/DrawerHeader";
import Layout from "../../component/Layout/Layout";
import Head from "next/head";
import MainMobile from "../../component/Minor Styling/MainMobile";
import DailyByTenant from "../../component/Scholarship/Daily/DailyByTenant";
import axios from "axios";

const Daily = ({ daily, average }: any) => {
  return (
    <>
      <Head>
        <title>Daily | Misch PTE Scholarship</title>
      </Head>
      <Hidden smDown>
        <Main>
          <DrawerHeader />
          <DailyByTenant daily={daily} rata={average} />
        </Main>
      </Hidden>
      <Hidden smUp>
        <MainMobile>
          <DrawerHeader />
          <DailyByTenant daily={daily} rata={average} />
        </MainMobile>
      </Hidden>
    </>
  );
};

Daily.getLayout = function getLayout(page: any) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};

export const getServerSideProps = async (nama: any) => {
  const { params } = nama;
  const getDaily = await axios.post("http://localhost:5000/daily/list", {
    tenant: params.id,
  });
  const getAverage = await axios.post("http://localhost:5000/average", {
    tenant: params.id,
  });
  // const refreshData = await axios({
  //   method: "POST",
  //   url: "http://localhost:5000/daily",
  // });
  const [daily, average] = await Promise.all([
    getDaily,
    getAverage,
    // refreshData,
  ]);
  return {
    props: {
      daily: daily.data,
      average: average.data[0],
    },
  };
};

export default Daily;

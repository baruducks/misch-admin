import { Hidden } from "@mui/material";
import Main from "../../component/Minor Styling/Main";
import DrawerHeader from "../../component/Minor Styling/DrawerHeader";
import Layout from "../../component/Layout/Layout";
import Head from "next/head";
import MainMobile from "../../component/Minor Styling/MainMobile";
import Scholarshipdaily from "../../component/Scholarship/Daily/Scholarshipdaily";
import axios from "axios";
import { useAuth } from "../../contexts/auth";

const Daily = ({ daily, average }: any) => {
  return (
    <>
      <Head>
        <title>Daily | Misch PTE Scholarship</title>
      </Head>
      <Hidden smDown>
        <Main>
          <DrawerHeader />
          <Scholarshipdaily daily={daily} average={average} />
        </Main>
      </Hidden>
      <Hidden smUp>
        <MainMobile>
          <DrawerHeader />
          <Scholarshipdaily daily={daily} average={average} />
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

export const getServerSideProps = async () => {
  const getDaily = await axios({
    method: "POST",
    url: "http://localhost:5000/daily/list",
  });
  const getAverage = await axios({
    method: "POST",
    url: "http://localhost:5000/average",
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

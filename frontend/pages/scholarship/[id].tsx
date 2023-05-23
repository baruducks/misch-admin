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

const List = ({ scholar }: any) => {
  return (
    <>
      <Head>
        <title>Scholarship List | Misch PTE Scholarship</title>
      </Head>
      <Hidden smDown>
        <Main>
          <DrawerHeader />
          <ListByTenant scholar={scholar} />
        </Main>
      </Hidden>
      <Hidden smUp>
        <MainMobile>
          <DrawerHeader />
          <ListByTenant scholar={scholar} />
        </MainMobile>
      </Hidden>
    </>
  );
};

List.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (nama: any) => {
  const { params } = nama;
  const getScholar = await axios.post("http://localhost:5000/scholar/list", {
    tenant: params.id,
  });
  const [scholar] = await Promise.all([getScholar]);
  console.log(scholar);
  if (!scholar) {
    return { notFound: true };
  }
  return {
    props: {
      scholar: scholar.data,
    },
  };
};

export default List;

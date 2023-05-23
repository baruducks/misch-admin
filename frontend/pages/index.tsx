import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import Layout from "../component/Layout/Layout";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data") as string);
    if (data) {
      console.log(data.role);
      if (data.role === 2) {
        router.push(`/scholarship/${data.tenant}`);
      } else {
        router.push("/scholarship/list");
      }
    }
  }, []);
  return (
    <>
      <Head>
        <title>Misch PTE Scholarship</title>
      </Head>
      <div></div>
    </>
  );
};

Home.getLayout = function getLayout(page: any) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};

export default Home;

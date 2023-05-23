import React, { useEffect, useState } from "react";
import { Hidden } from "@mui/material";
import Main from "../../component/Minor Styling/Main";
import DrawerHeader from "../../component/Minor Styling/DrawerHeader";
import MainMobile from "../../component/Minor Styling/MainMobile";
import ScholarshipList from "../../component/Scholarship/List/Scholarshiplist";
import Layout from "../../component/Layout/Layout";
import Head from "next/head";
import axios from "axios";

const List = ({ scholar }: any) => {
	return (
		<>
			<Head>
				<title>Scholarship List | Misch PTE Scholarship</title>
			</Head>
			<Hidden smDown>
				<Main>
					<DrawerHeader />
					<ScholarshipList scholar={scholar} />
				</Main>
			</Hidden>
			<Hidden smUp>
				<MainMobile>
					<DrawerHeader />
					<ScholarshipList scholar={scholar} />
				</MainMobile>
			</Hidden>
		</>
	);
};

List.getLayout = function getLayout(page: any) {
	return <Layout>{page}</Layout>;
};

export const getServerSideProps = async () => {
	const getScholar = await axios({
		method: "POST",
		url: "http://localhost:5000/scholar/list",
	});
	const [scholar] = await Promise.all([getScholar]);
	return {
		props: {
			scholar: scholar.data,
		},
	};
};

export default List;

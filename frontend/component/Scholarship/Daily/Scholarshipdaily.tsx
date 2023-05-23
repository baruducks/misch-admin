import React, { useState, useEffect } from "react";
import { Paper, Typography, Grid } from "@mui/material";
import BarCharts from "../../Charts/BarCharts";
import LineCharts from "../../Charts/LineCharts";
import { useStyles } from "../List/ScholarshiplistStyle";
import Loading from "../../Loading/Loading";
import Announcement from "../../Overview/Announcement";

const Scholarshipdaily = ({ daily, average }: any) => {
	const style = useStyles();

	const [loaded, setLoaded] = useState(false);

	const data = JSON.parse(localStorage.getItem("data") as string);

	useEffect(() => {
		setTimeout(() => {
			setLoaded(true);
		}, 300);
	}, []);

	return (
		<>
			{loaded && data && data.role !== 2 && (
				<>
					<Paper elevation={0} className={style.paper}>
						<div className={style.topjudul}>
							<Typography variant="h4" sx={{ mr: "auto", marginBottom: "20px", px: 2 }}>
								Daily
							</Typography>
						</div>
						<Grid container>
							<Announcement tenant={daily} average={average} />
						</Grid>
						<Grid container>
							<Grid item xs={12} md={6}>
								<BarCharts data={daily} datakey="daily" />
							</Grid>
							<Grid item xs={12} md={6}>
								<LineCharts data={daily} datakey="akumulasi" />
							</Grid>
						</Grid>
					</Paper>
				</>
			)}
		</>
	);
};

export default Scholarshipdaily;

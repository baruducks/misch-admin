import React, { useState, useEffect } from "react";
import { Paper, Typography, Grid } from "@mui/material";
import { useRouter } from "next/router";
import BarCharts from "../../Charts/BarCharts";
import LineCharts from "../../Charts/LineCharts";
import { useStyles } from "../List/ScholarshiplistStyle";
import Loading from "../../Loading/Loading";
import Announcement from "../../Overview/Announcement";

const DailyByTenant = ({ daily, rata }: any) => {
  const router = useRouter();
  const pid = router.query;
  const style = useStyles();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 300);
  }, []);

  const data = JSON.parse(localStorage.getItem("data") as string);

  return (
    <>
      {loaded && data && (data.tenant == pid.id || data.role != 2) && (
        <>
          {rata.average == null ? (
            <>
              <Paper elevation={0} className={style.paper}>
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ minHeight: "50%" }}
                >
                  <Typography variant="h2" sx={{ color: "red" }}>
                    TIDAK ADA SCHOLAR!
                  </Typography>
                </Grid>
              </Paper>
            </>
          ) : (
            <>
              <Paper elevation={0} className={style.paper}>
                <div className={style.topjudul}>
                  <Typography
                    variant="h4"
                    sx={{ mr: "auto", marginBottom: "20px", px: 2 }}
                  >
                    Daily of {pid.id}
                  </Typography>
                </div>
                <Grid container>
                  <Announcement tenant={daily} average={rata} />
                </Grid>
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <BarCharts data={daily} datakey="daily" />
                    {/* <Typography>TESTOS 1</Typography> */}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <LineCharts data={daily} datakey="akumulasi" />
                    {/* <Typography>TESTOS 2</Typography> */}
                  </Grid>
                </Grid>
              </Paper>
            </>
          )}
        </>
      )}
    </>
  );
};

export default DailyByTenant;

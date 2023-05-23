import { useStyles } from "../Admins/AdminsStyle";
import { Paper, Grid } from "@mui/material";
import Head from "next/head";

const LoadingComponent = () => {
  const styles = useStyles();
  return (
    <>
      <Head>
        <title>Misch PTE Scholarship</title>
      </Head>
      <Paper elevation={0} className={styles.paper}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: "50vh" }}
        >
          <img src="/loading.svg" />
        </Grid>
      </Paper>
    </>
  );
};

export default LoadingComponent;

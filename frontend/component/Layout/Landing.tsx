import { useStyles } from "../Admins/AdminsStyle";
import { Paper, Grid, Typography } from "@mui/material";
import Head from "next/head";

const Landing = () => {
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
          <Typography variant="h3">
            Selamat datang di MISCH PTE SCHOLARSHIP!
          </Typography>
        </Grid>
      </Paper>
    </>
  );
};

export default Landing;

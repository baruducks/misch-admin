import React, { useState, useEffect, Fragment } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { useStyles } from "../modalStyling";
import Article from "@mui/icons-material/Article";

const Modal = () => {
  const style = useStyles();
  const [data, setData] = useState({
    batchname: "",
  });

  const handleSubmit = () => {};

  return (
    <>
      <Box>
        <Typography sx={{ marginBottom: 1 }} variant="h5">
          Add New Payrolls
        </Typography>
        {/* Baris Pertama */}
        <Grid container spacing={3} alignItems="center">
          <Grid item md={6} xs={12}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={1}>
                <Article
                  className={
                    data.batchname === "" ? style.iconError : style.icon
                  }
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  label="Nama Batch"
                  error={data.batchname === ""}
                  className={style.textfield}
                  onChange={(e) => {
                    setData({ ...data, batchname: e.target.value });
                  }}
                  variant="standard"
                  helperText={
                    data.batchname === ""
                      ? "Nama batch tidak boleh kosong!"
                      : " "
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container direction="row-reverse">
              <Button>Add New Payrolls</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Modal;

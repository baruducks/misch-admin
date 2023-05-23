import { useRouter } from "next/router";
import {
  Paper,
  Grid,
  Typography,
  TableContainer,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useStyles } from "./PayrollsStyle";
import React, { useState, useEffect } from "react";
import Text from "../Minor Styling/Typography";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import TablePagination from "../Tabel/tablepagination";
import judulBar2 from "./Data/judulBar2";
import Row from "./Tabel/Row2";
import BerhasilPop from "../Popup/BerhasilPop";
import GagalPop from "../Popup/GagalPop";
import Swal from "sweetalert2";

const columns: GridColDef[] = [
  {
    field: "nama",
    headerName: "Nama",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "alias",
    headerName: "Alias",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "tenant",
    headerName: "Tenant",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "slp",
    headerName: "SLP",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "scholar",
    headerName: "Scholar Cut",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "owner",
    headerName: "Tenant Cut",
    flex: 1,
    minWidth: 150,
  },
  {
    field: "admin",
    headerName: "Owner Cut",
    flex: 1,
    minWidth: 150,
  },
];

const PayrollsID = () => {
  const router = useRouter();
  const pid = router.query.id;
  const styles = useStyles();
  const [dataPayroll, setPayroll] = useState<any[]>([]);
  const [status, setStatus] = useState(0);
  const [selectionModel, setSelectionModel] = React.useState([]);

  const [loading, setLoading] = useState(false);

  const popUpdate = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
      },
    });

    swalWithBootstrapButtons
      .fire({
        title: "Finalisasi Payroll?",
        text: `Payroll yang sudah final tidak bisa diganti lagi!`,
        icon: "question",
        iconColor: "#B00020",
        showCancelButton: true,
        confirmButtonText: "Finalisasi Payroll",
        confirmButtonColor: "#B00020",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          berhasilPayroll();
          finalize();
          swalWithBootstrapButtons
            .fire({
              title: "Payroll selesai!",
              icon: "success",
              iconColor: "Green",
              confirmButtonText: "OK",
              confirmButtonColor: "Green",
            })
            .then((result) => {
              router.push("/payrolls");
            });
        }
      });
  };

  const finalize = async () => {
    await axios
      .post("http://localhost:5000/finalize", {
        tenantId: dataPayroll[0].tenantId,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(dataPayroll);
  const getPayroll = async () => {
    await axios
      .post("http://localhost:5000/bebas", {
        nama: pid,
      })
      .then((res) => {
        const test = res.data;
        setPayroll(test);
        setStatus(test[0].status);
        setLoading(true);
        console.log(dataPayroll);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postPayroll = async () => {
    await axios
      .post("http://localhost:5000/editpayroll", {
        data: dataPayroll,
        status: 2,
      })
      .then((res) => {
        console.log(dataPayroll);
        console.log(res.data);
        console.log(res);
        const berhasil = "Payrolls berhasil diedit!";
        BerhasilPop(berhasil);
        router.push("/payrolls");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const backPayroll = async () => {
    await axios
      .post("http://localhost:5000/editpayroll", {
        data: dataPayroll,
        status: 1,
      })
      .then((res) => {
        console.log(dataPayroll);
        console.log(res.data);
        console.log(res);
        getPayroll();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const berhasilPayroll = async () => {
    await axios
      .post("http://localhost:5000/editpayroll", {
        data: dataPayroll,
        status: 3,
      })
      .then((res) => {
        console.log(dataPayroll);
        console.log(res.data);
        console.log(res);
        getPayroll();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPayroll();
  }, []);

  console.log(dataPayroll);

  return (
    <>
      {(status == 0 || status == 1) && loading && dataPayroll && (
        <>
          <Paper elevation={0} className={styles.paper}>
            <Grid>
              <div className={styles.topjudul}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item md={12} sm={12}>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {pid} {status}
                    </Typography>
                  </Grid>
                  <Grid item md={12} sm={12}></Grid>
                </Grid>
              </div>
              <Grid container>
                <Grid item xs={12}>
                  <div className={styles.searchContainer2}>
                    <Grid
                      container
                      direction="row-reverse"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item></Grid>
                    </Grid>
                    <TableContainer
                      component={Paper}
                      elevation={0}
                      className={styles.table}
                    >
                      <Table aria-labelledby="tableTitle">
                        <TableHead>
                          <TableRow>
                            {judulBar2.map((page, index) => (
                              <React.Fragment key={index + 2727}>
                                <TableCell
                                  align="center"
                                  sx={{ minWidth: page.minWidth }}
                                >
                                  <Text className={styles.judulBar}>
                                    {page.name}
                                  </Text>
                                </TableCell>
                              </React.Fragment>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dataPayroll.map((row: any, index: any) => (
                            <Row
                              row={row}
                              key={index}
                              indexX={index}
                              setPayroll={setPayroll}
                              dataPayroll={dataPayroll}
                            />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {/* <Button onClick={cobain}>api</Button> */}{" "}
                    <Grid
                      item
                      container
                      direction="row-reverse"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item>
                        <Button onClick={postPayroll} size="large">SIMPAN</Button>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
      {status == 2 && loading && dataPayroll && (
        <>
          <Paper elevation={0} className={styles.paper}>
            <Grid>
              <div className={styles.topjudul}>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item md={12} sm={12}>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {pid} {status}
                    </Typography>
                  </Grid>
                  <Grid item md={12} sm={12}></Grid>
                </Grid>
              </div>
              <Grid container>
                <Grid item xs={12}>
                  <div className={styles.searchContainer2}>
                    <Grid
                      container
                      direction="row-reverse"
                      justifyContent="flex-start"
                      alignItems="center"
                    >
                      <Grid item></Grid>
                    </Grid>
                    <DataGrid
                      rows={dataPayroll}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10, 25, 50]}
                      checkboxSelection
                      onSelectionModelChange={(newSelection: any) => {
                        setSelectionModel(newSelection);
                      }}
                      initialState={{
                        sorting: {
                          sortModel: [{ field: "ingameslp", sort: "desc" }],
                        },
                      }}
                      // selectionModel={selectionModel}
                      localeText={{
                        noRowsLabel:
                          "SCHOLAR TIDAK DITEMUKAN! SILAHKAN PILIH TENANT YANG LAIN!",
                        footerTotalRows: "Total Scholar:",
                      }}
                    />
                    {/* <Button onClick={cobain}>api</Button> */}
                    <Grid
                      item
                      container
                      direction="row-reverse"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item>
                        <Button
                          onClick={backPayroll}
                          size="large"
                          sx={{ mr: 2 }}
                        >
                          Kembali
                        </Button>
                        <Button
                          onClick={popUpdate}
                          disabled={selectionModel.length != dataPayroll.length}
                          size="large"
                        >
                          Finalisasi
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
};
export default PayrollsID;

import {
  Paper,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  TableContainer,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
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
import PercentIcon from "@mui/icons-material/Percent";
import { useRouter } from "next/router";

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
    field: "ingameslp",
    headerName: "SLP",
    flex: 1,
    minWidth: 150,
  },
];

function NewPayrolls() {
  const data = JSON.parse(localStorage.getItem("data") as string);
  const styles = useStyles();
  const router = useRouter();
  const [scholar, setScholar] = useState<any[]>([]);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [tenant, setTenant] = useState<any[]>([]);
  const [batch, setBatch] = useState("");
  const [siapa, setSiapa] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPage, setrowsPage] = useState(5);
  const [next, setNext] = useState(false);
  const [dataPayroll, setPayroll] = useState<any[]>([]);
  const [adminfee, setAdminFee] = useState(0);
  const empty = "";

  // console.log(tenant);
  // console.log(siapa);

  const handleNew = (e: any) => {
    setBatch(e.target.value);
  };

  const handleAdmin = (e: any) => {
    setAdminFee(e.target.value);
  };

  const getTenants = async () => {
    try {
      const test = await axios.get("http://localhost:5000/tenant");
      // console.log(data);
      setTenant(test.data);
      // console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const cobain = async () => {
    await axios
      .post("http://localhost:5000/payroll", {
        id: selectionModel,
        nama: batch,
        fee: adminfee,
      })
      .then((res) => {
        // console.log(res);
        const berhasil = "Payroll berhasil ditambahkan!";
        BerhasilPop(berhasil);
        router.push("/payrolls");
      })
      .catch((err) => {
        // console.log(err);
        const gagal = "Nama Batch dan scholar tidak boleh kosong!";
        GagalPop(gagal);
      });
  };

  const nextHandle = () => {
    setNext(!next);
    getPayroll();
  };

  const handleChangePage = (
    e: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setrowsPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const getScholar = async (e: any) => {
    await axios
      .post("http://localhost:5000/scholar/list", {
        tenant: e,
      })
      .then((res) => {
        if (res.data) {
          setScholar(res.data);
          // console.log(scholar);
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  useEffect(() => {
    getTenants();
  }, []);
  // console.log(next);

  const handleClick = (e: any) => {
    // console.log(e.target.value);
    setSiapa(e.target.value);
    getScholar(e.target.value);
  };

  const getPayroll = async () => {
    await axios
      .post("http://localhost:5000/bebas", {
        nama: batch,
      })
      .then((res) => {
        // console.log(res.data);
        setPayroll(res.data);
        // console.log(dataPayroll);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  // console.log(dataPayroll);
  return (
    <>
      {data && data.role !== 2 && !next && (
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
                      Add Payrolls
                    </Typography>
                  </Grid>
                </Grid>
              </div>
              <Grid container sx={{ marginTop: 1 }}>
                <Grid item xs={12}>
                  <div className={styles.searchContainer2}>
                    <Grid container spacing={5}>
                      <Grid item xs={9}>
                        <TextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AddIcon className={styles.searchIcon} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{ marginBottom: 2 }}
                          className={styles.searchInput}
                          label="Nama Batch"
                          variant="outlined"
                          fullWidth
                          error={!batch}
                          onChange={handleNew}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel>Tenant</InputLabel>
                          <Select
                            value={siapa}
                            onChange={handleClick}
                            label="Tenant"
                          >
                            {/* <MenuItem value="Misch">Misch</MenuItem> */}
                            {tenant.map((test: any, index: any) => {
                              return (
                                <MenuItem value={tenant[index].nama}>
                                  {tenant[index].nama}
                                </MenuItem>
                              );
                            })}
                            {/* <MenuItem value=""></MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12}>
                        <TextField
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PercentIcon className={styles.searchIcon} />
                              </InputAdornment>
                            ),
                            inputProps: {
                              min: 0,
                              max: 100,
                            },
                          }}
                          sx={{ marginBottom: 2 }}
                          className={styles.searchInput}
                          label="Admin Fee (%)"
                          variant="outlined"
                          placeholder="10"
                          fullWidth
                          type="number"
                          error={adminfee > 100 || adminfee < 0}
                          onChange={handleAdmin}
                        />
                      </Grid>
                    </Grid>
                    <DataGrid
                      rows={scholar}
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
                          onClick={cobain}
                          size="large"
                          sx={{ marginTop: 2 }}
                        >
                          Tambahkan Payrolls!
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
}

export default NewPayrolls;

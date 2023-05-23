import { useStyles } from "./ScholarshiplistStyle";
import {
  Typography,
  Paper,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TablePagination,
  TableFooter,
  TableBody,
  Grid,
  Modal,
  Button,
  Backdrop,
  Container,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState, useEffect } from "react";
import Text from "../../Minor Styling/Typography";
import judulBar from "./Data/judulBar";
import Row from "./Tabel/Row";
import TablePaginationActions from "../../Tabel/tablepagination";
import AddUsers from "./Modal/Add Users/AddUsers";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import GagalPop from "../../Popup/GagalPop";
import { useAuth } from "../../../contexts/auth";

const Scholarshiplist = ({ scholar }: any) => {
  const styles = useStyles();
  const router = useRouter();
  const pid = router.query;
  console.log(pid);

  console.log(scholar);
  const [page, setPage] = useState(0);
  const [rowsPage, setrowsPage] = useState(5);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen(!open);

  const popUpdate = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
      },
    });

    swalWithBootstrapButtons
      .fire({
        title: "Update Scholar?",
        text: `Anda akan melakukan pemanggilan API sebanyak ${
          Object.keys(scholar).length
        } kali!`,
        icon: "question",
        iconColor: "#B00020",
        showCancelButton: true,
        confirmButtonText: "Update Data",
        confirmButtonColor: "#B00020",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          updateData();
          swalWithBootstrapButtons
            .fire({
              title: "Data sudah terupdate",
              icon: "success",
              iconColor: "Green",
              confirmButtonText: "OK",
              confirmButtonColor: "Green",
            })
            .then((result) => {
              window.location.reload();
            });
        }
      });
  };

  const download = async () => {
    const date = new Date().toDateString().replace(/ /g, "_");
    await axios
      .post("http://localhost:5000/doc", {
        tenant: pid.id,
      })
      .then((res) => {
        axios
          .post("http://localhost:5000/print", {
            filename: date + "_" + pid.id,
            tenant: pid.id,
          })
          .catch((err) => {
            console.log(date + "_" + pid.id + ".pdf");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateData = async () => {
    await axios
      .get("http://localhost:5000/users", { withCredentials: true })
      .then((res) => {
        try {
          const ax = axios.post("http://localhost:5000/refreshdata");
          console.log("test kena di atas");
          console.log(ax);
        } catch (e) {
          console.log(e);
        }
      })
      .catch((err) => {
        if (err) {
          axios
            .get("http://localhost:5000/token", {
              withCredentials: true,
            })
            .then((res) => {
              try {
                const ax = axios.post("http://localhost:5000/refreshdata");
                console.log("test kena di bawah");
                console.log(ax);
              } catch (e) {
                console.log(e);
              }
            })
            .catch((err) => {
              console.log(err);
              if (router.asPath !== "/login") {
                var msg = "Silahkan login kembali!";
                GagalPop(msg);
                router.push("/login");
              }
            });
        }
      });
  };

  // useEffect(() => {
  //   getScholar();
  //   console.log(rows);
  // }, []);

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

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const data = JSON.parse(localStorage.getItem("data") as string);

  return (
    <>
      {data && (data.tenant == pid.id || data.role != 2) && (
        <>
          <Paper elevation={0} className={styles.paper}>
            <div className={styles.topjudul}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item md={12} sm={12}>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    Scholarship List of {pid.id}
                  </Typography>
                </Grid>
                <Grid item md={12} container justifyContent="flex-end" sm={12}>
                  <Button
                    onClick={popUpdate}
                    variant="outlined"
                    disableElevation
                    sx={{ mr: "15px" }}
                  >
                    Update Data
                  </Button>
                  <Button
                    onClick={handleModal}
                    variant="outlined"
                    disableElevation
                  >
                    Add Scholar
                  </Button>
                  {/* <Button
                    onClick={download}
                    variant="outlined"
                    disableElevation
                  >
                    Download
                  </Button> */}
                </Grid>
              </Grid>
            </div>
            <Modal
              open={open}
              onClose={handleModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <AddUsers />
            </Modal>
            <Grid container sx={{ marginTop: 1 }}>
              <Grid item xs={12}>
                <div className={styles.searchContainer}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon className={styles.searchIcon} />
                        </InputAdornment>
                      ),
                    }}
                    className={styles.searchInput}
                    label="Search"
                    variant="outlined"
                    fullWidth
                    onChange={handleSearch}
                  />
                </div>
              </Grid>
              <TableContainer
                component={Paper}
                elevation={0}
                className={styles.table}
              >
                <Table aria-labelledby="tableTitle">
                  <TableHead>
                    <TableRow>
                      {judulBar.map((page) => (
                        <React.Fragment key={page.key}>
                          <TableCell align="left">
                            <Text className={styles.judulBar}>{page.name}</Text>
                          </TableCell>
                        </React.Fragment>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {rows
                  .slice(page * rowsPage, page * rowsPage + rowsPage)
                  .map((row: any) => (
                    <Row key={row.name} row={row} />
                  ))} */}
                    {scholar
                      .filter((row: any) => {
                        if (search == "") {
                          return row;
                        } else if (
                          row.nama
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          row.alias
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          row.tenant
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return row;
                        }
                      })
                      .slice(page * rowsPage, page * rowsPage + rowsPage)
                      .map((row: any, index: any) => (
                        <Row row={row} key={index} />
                      ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={12}
                        count={scholar.length}
                        rowsPerPage={rowsPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
};

export default Scholarshiplist;

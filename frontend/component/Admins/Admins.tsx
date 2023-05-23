import React, { useEffect, useState } from "react";
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
  InputAdornment,
} from "@mui/material";
import { useStyles } from "./AdminsStyle";
import SearchIcon from "@mui/icons-material/Search";
import Text from "../Minor Styling/Typography";
import judulBar from "./Data/judulBar";
import Row from "./Tabel/Row";
import TablePaginationActions from "../Tabel/tablepagination";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/auth";
import AddAdmin from "./Modal/Add Admins/AddAdmin";
import axios from "axios";
import GagalPop from "../Popup/GagalPop";

const Admins = () => {
  const router = useRouter();
  const { isAuthenticated }: any = useAuth();
  const styles = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPage, setrowsPage] = useState(5);
  const [search, setSearch] = useState("");
  const [admin, setAdmin] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!open);
  };

  const data = JSON.parse(localStorage.getItem("data") as string);

  const verifyToken = async () => {
    await axios
      .get("http://localhost:5000/users", { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        setAdmin(res.data);
        // console.log(admin);
      })
      .catch((err) => {
        if (err) {
          axios
            .get("http://localhost:5000/token", { withCredentials: true })
            .then((res) => {
              verifyToken();
              // console.log(admin);
            })
            .catch((err) => {
              if (router.asPath !== "/login") {
                var msg = "Silahkan login kembali!";
                GagalPop(msg);
                router.push("/login");
              }
            });
        }
      });
  };

  console.log(admin);
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
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

  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <>
      {data.role !== 2 && (
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
                  <Grid item md={7} sm={12}>
                    <Typography variant="h4">Users</Typography>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    container
                    justifyContent="flex-end"
                    sm={12}
                  >
                    <Button
                      onClick={handleModal}
                      variant="outlined"
                      disableElevation
                    >
                      Add Admin
                    </Button>
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
                <AddAdmin />
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
              </Grid>
              <TableContainer
                component={Paper}
                elevation={0}
                className={styles.table}
              >
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      {judulBar.map((page, index: any) => (
                        <React.Fragment key={index + 4200}>
                          <TableCell align="left">
                            <Text className={styles.judulBar}>{page.name}</Text>
                          </TableCell>
                        </React.Fragment>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {admin
                      .filter((row) => {
                        if (search == "") {
                          return row;
                        } else if (
                          row.name
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          row.username
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          row.role
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          row.email.toLowerCase().includes(search.toLowerCase())
                        ) {
                          return row;
                        }
                      })
                      .slice(page * rowsPage, page * rowsPage + rowsPage)
                      .map((row: any, index: any) => (
                        <React.Fragment key={index + 420}>
                          <Row row={row} />
                        </React.Fragment>
                      ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={12}
                        count={admin.length}
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

export default Admins;

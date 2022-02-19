import { useStyles } from "./PayrollsStyle";
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
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import Text from "../Minor Styling/Typography";
import judulBar from "./Data/judulBar";
import Row from "./Tabel/Row";
import rows from "./Data/isiTable";
import TablePaginationActions from "../Tabel/tablepagination";
import Link from "next/link";
import AddUsers from "../Scholarship/List/Modal/Add Users/AddUsers";
import axios from "axios";

const Payrolls = () => {
  const styles = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPage, setrowsPage] = useState(5);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const data = JSON.parse(localStorage.getItem("data") as string);
  const [payrolls, setPayrolls] = useState<any[]>([]);

  const handleModal = () => setOpen(!open);

  const getPayrolls = async () => {
    await axios
      .get("http://localhost:5000/payroll")
      .then((res) => {
        // console.log(res.data);
        setPayrolls(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(payrolls);
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

  useEffect(() => {
    getPayrolls();
  }, []);
  console.log(payrolls);
  return (
    <>
      {data && data.role != 2 && (
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
                      Payrolls
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    md={12}
                    container
                    justifyContent="flex-end"
                    sm={12}
                  >
                    <Link href="/payrolls/new">
                      <Button variant="outlined" disableElevation>
                        Add Payrolls
                      </Button>
                    </Link>
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
                            <TableCell align="center">
                              <Text className={styles.judulBar}>
                                {page.name}
                              </Text>
                            </TableCell>
                          </React.Fragment>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {payrolls
                        .filter((row: any) => {
                          if (search == "") {
                            return row;
                          } else if (
                            row.batch
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
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={10}
                        count={rows.length}
                        rowsPerPage={rowsPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPage}
                        ActionsComponent={TablePaginationActions}
                      />
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
};

export default Payrolls;

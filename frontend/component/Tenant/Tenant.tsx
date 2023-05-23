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
import { useStyles } from "./TenantStyle";
import SearchIcon from "@mui/icons-material/Search";
import Text from "../Minor Styling/Typography";
import TablePaginationActions from "../Tabel/tablepagination";
import AddIcon from "@mui/icons-material/Add";
import judulBar from "./Data/judulBar";
import axios from "axios";
import Row from "./Tabel/Row";
import AddTenant from "./Add Tenant/AddTenant";

const Tenant = () => {
  const styles = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPage, setrowsPage] = useState(5);
  const [search, setSearch] = useState("");
  const [tenant, setTenant] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!open);
  };

  const getTenant = async () => {
    try {
      const data = await axios.get("http://localhost:5000/tenant");
      console.log(data.data);
      setTenant(data.data);
      console.log(tenant);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    getTenant();
  }, []);

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

  const data = JSON.parse(localStorage.getItem("data") as string);

  return (
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
                <Typography variant="h4">Tenant</Typography>
              </Grid>
              {data && data.role !== 2 && (
                <>
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
                      Add Tenant
                    </Button>
                  </Grid>
                </>
              )}
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
            <AddTenant />
          </Modal>
          <Grid container sx={{ marginTop: 1 }}>
            <Grid item xs={12}>
              <div className={styles.searchContainer}>
                {data && data.role !== 2 && (
                  <>
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
                  </>
                )}
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
                {tenant
                  .filter((row) => {
                    if (data.role !== 2) {
                      if (search == "") {
                        return row;
                      } else if (
                        row.nama.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return row;
                      }
                    } else {
                      return row;
                    }
                  })
                  .slice(page * rowsPage, page * rowsPage + rowsPage)
                  .map((row: any, index: any) => (
                    <React.Fragment key={index + 420}>
                      {tenant &&
                        data.role === 2 &&
                        data.tenant == tenant[index].nama && (
                          <>
                            <Row row={row} />
                          </>
                        )}
                      {tenant && data.role !== 2 && (
                        <>
                          <Row row={row} />
                        </>
                      )}
                    </React.Fragment>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={12}
                    count={tenant.length}
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
  );
};

export default Tenant;

import {
  Grid,
  Typography,
  Box,
  ListItem,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  TableFooter,
  Hidden,
} from "@mui/material";
import { useStyles } from "./Announcementstyle";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Row from "./Tabel/Row";
import judulBar from "./Tabel/judulBar";
import Text from "../Minor Styling/Typography";
import axios from "axios";
import TablePaginationActions from "../Tabel/tablepagination";
import { useRouter } from "next/router";

const Announcement = (props: any) => {
  const style = useStyles();
  const router = useRouter();
  const pid = router.query;
  const [toggle, setToggle] = useState("");
  const [scholar, setScholar] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPage, setrowsPage] = useState(5);

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

  const handleClick = (e: any) => {
    setToggle(e.target.value);
    getScholar(e.target.value);
  };

  const getScholar = async (earnrating: any) => {
    await axios
      .post("http://localhost:5000/scholar/list", {
        tenant: pid.id,
        earningrating: earnrating,
      })
      .then(function (res) {
        setScholar(res.data);
      })
      .catch(function (e) {
        console.log(e);
      });
  };
  const month = Number(Math.ceil(props.average.average * 30));
  const today = new Date().toISOString().split("T")[0];

  const parseDate = (date: any) => {
    return new Date(date);
  };

  const datediff = (first: any, second: any) => {
    let day = Math.round((second - first) / (1000 * 60 * 60 * 24));
    if (day > 0) {
      return day;
    } else {
      return 0;
    }
  };

  const daysCount = datediff(
    parseDate(today),
    parseDate(props.average.nextclaim)
  );
  useEffect(() => {
    console.log(props.tenant);
  }, []);
  return (
    <>
      {props.tenant && scholar && props.average && (
        <>
          <Grid
            container
            spacing={2}
            sx={{ mb: 3, px: 2 }}
            style={{
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            <Grid item md={3} xs={12} zeroMinWidth>
              <Box
                sx={{
                  backgroundColor: "#faf9fa",
                  borderRadius: 4,
                  mr: 2,
                  p: 2,
                  height: "420px",
                }}
                style={{
                  overflow: "auto",
                  overflowY: "scroll",
                }}
              >
                <Typography
                  className={style.judul}
                  sx={{ color: "#41b1f0", mb: "2vh" }}
                >
                  Forecast
                </Typography>
                <Typography className={style.judul2}>
                  Today projection:
                </Typography>
                <ListItem disablePadding>
                  <Image src="/SLP.png" width={20} height={20} />
                  <Typography className={style.isi}>
                    {parseInt(
                      props.tenant[Object.keys(props.tenant).length - 1]
                        .akumulasi + props.average.average
                    )}{" "}
                    SLP
                  </Typography>
                </ListItem>
                <Typography className={style.judul2} sx={{ mt: "6vh" }}>
                  In {daysCount} days you can claim:
                </Typography>
                {!daysCount && (
                  <>
                    <Typography className={style.judul2}>
                      You can already claim some scholars!
                    </Typography>
                  </>
                )}
                <ListItem disablePadding>
                  <Image src="/SLP.png" width={20} height={20} />
                  <Typography className={style.isi}>
                    {
                      props.tenant[Object.keys(props.tenant).length - 1]
                        .akumulasi
                    }{" "}
                    SLP{" "}
                  </Typography>
                </ListItem>
                <Typography className={style.judul2} sx={{ mt: "6vh" }}>
                  In 30 days you can claim:
                </Typography>
                <ListItem disablePadding>
                  <Image src="/SLP.png" width={20} height={20} />
                  <Typography className={style.isi}>{month} SLP</Typography>
                </ListItem>
              </Box>
            </Grid>
            <Grid item md={9} xs={12} zeroMinWidth>
              <Box
                sx={{
                  backgroundColor: "#faf9fa",
                  borderRadius: 4,
                  p: 2,
                  mr: 2,
                  height: "420px",
                }}
                style={{
                  overflow: "auto",
                  overflowY: "scroll",
                }}
              >
                <Grid container>
                  <Grid item md={12} xs={12}>
                    <Typography
                      className={style.judul}
                      sx={{ color: "#41b1f0" }}
                    >
                      Overview
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <FormControl sx={{ width: "100%", mt: "1vh" }}>
                      <InputLabel>Earning Rating</InputLabel>
                      <Select
                        value={toggle}
                        onChange={handleClick}
                        sx={{ width: "100%" }}
                        label="Earning Rating"
                      >
                        <MenuItem value="Low">Low</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="High">High</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Table aria-label="collapsible table">
                      <TableHead>
                        <TableRow>
                          {judulBar.map((page: any, index: any) => (
                            <React.Fragment key={index + 10000}>
                              <TableCell align="left">
                                <Text>{page.name}</Text>
                              </TableCell>
                            </React.Fragment>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {scholar
                          .slice(page * rowsPage, page * rowsPage + rowsPage)
                          .map((page: any, index: any) => (
                            <React.Fragment key={index}>
                              <Row row={page} />
                            </React.Fragment>
                          ))}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <Hidden smDown>
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
                          </Hidden>
                          <Hidden smUp>
                            <TablePagination
                              rowsPerPageOptions={[]}
                              colSpan={12}
                              count={scholar.length}
                              rowsPerPage={rowsPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPage}
                              ActionsComponent={TablePaginationActions}
                            />
                          </Hidden>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Announcement;

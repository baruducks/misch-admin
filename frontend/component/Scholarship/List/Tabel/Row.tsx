import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect } from "react";
import {
	TableCell,
	TableRow,
	Box,
	Collapse,
	Typography,
	Grid,
	ListItem,
	ListItemIcon,
	Link,
	Button,
	Modal,
	Backdrop,
	FormControlLabel,
	Switch,
	Card,
	CardContent,
	CardMedia,
	CardActions,
	CardActionArea,
} from "@mui/material";
import { useStyles } from "./RowStyling";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditUsers from "../Modal/Edit Users/EditUsers";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";
import { useAuth } from "../../../../contexts/auth";
import { useRouter } from "next/router";
import GagalPop from "../../../Popup/GagalPop";

function Row(props: any) {
	const { row } = props;
	const { isAuthenticated }: any = useAuth();
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [modal, setModal] = useState(false);
	const [axie, setAxie] = useState<any[]>([]);
	const [axief, setAxief] = useState(false);
	const [renderAxie, setrenderAxie] = useState(false);
	const [axieLoading, setAxieLoading] = useState(true);
	var foto = 0;

	const Fotoaxie = () => {
		return (
			<>
				{axie.map((photo: any, index: any) => (
					<React.Fragment key={index}>
						<Grid item xs={4}>
							<Link
								href={`https://marketplace.axieinfinity.com/axie/` + axie[index].id}
								sx={{ color: "inherit", textDecoration: "inherit" }}
								target="_blank"
							>
								{/* <Image
                  src={
                    `https://storage.googleapis.com/assets.axieinfinity.com/axies/` +
                    axie[index].id +
                    `/axie/axie-full-transparent.png`
                  }
                  width={400}
                  height={300}
                /> */}
								<Card
									sx={{
										height: "100%",
										pointerEvents: "none",
										boxShadow: 0,
										background: "transparent",
									}}
								>
									<CardActionArea>
										<CardMedia
											component="img"
											height={150}
											image={
												`https://storage.googleapis.com/assets.axieinfinity.com/axies/` +
												axie[index].id +
												`/axie/axie-full-transparent.png`
											}
										/>
										<CardContent>
											<Typography
												variant="body1"
												component="div"
												style={{
													whiteSpace: "pre-wrap",
													overflowWrap: "break-word",
												}}
												textAlign="center"
											>
												{axie[index].name}
											</Typography>
										</CardContent>
										{/* <CardActions>
                      <Button size="small">Share</Button>
                      <Button size="small">Learn More</Button>
                    </CardActions> */}
									</CardActionArea>
								</Card>
							</Link>
						</Grid>
					</React.Fragment>
				))}
			</>
		);
	};
	const styles = useStyles();
	const whatsapplink = `https://wa.me/`;
	const whatsappnumber = "62" + row.nowa.substring(1, row.nowa.length);
	const gender =
		row.gender === "Male" ? (
			<MaleIcon style={{ color: "#2196f3" }} className={styles.icongender} />
		) : (
			<FemaleIcon style={{ color: "#e91e63" }} className={styles.icongender} />
		);
	const today = new Date().toISOString().split("T")[0];

	const handleCollapse = () => {
		setOpen(!open);
	};

	const handleModal = () => {
		setModal(!modal);
	};

	const parseDate = (date: any) => {
		return new Date(date);
	};

	const datediff = (first: any, second: any) => {
		return Math.abs(Math.round((second - first) / (1000 * 60 * 60 * 24)));
	};

	const daysCount = datediff(parseDate(today), parseDate(row.createdAt));

	const deletePop = () => {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: "btn btn-success",
			},
		});

		swalWithBootstrapButtons
			.fire({
				title: "Anda Yakin?",
				text: "Scholar yang dihapus tidak bisa kembali lagi!",
				icon: "warning",
				iconColor: "Red",
				showCancelButton: true,
				confirmButtonText: "Delete Scholar",
				confirmButtonColor: "Red",
				cancelButtonText: "Cancel",
				reverseButtons: true,
			})
			.then((result) => {
				if (result.isConfirmed) {
					verifyToken();
					swalWithBootstrapButtons
						.fire({
							title: "Deleted",
							text: "Scholar berhasil dihapus!",
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

	const verifyToken = async () => {
		await axios
			.get("http://localhost:5000/users", { withCredentials: true })
			.then((res) => {
				handleDelete();
			})
			.catch((err) => {
				if (err) {
					axios
						.get("http://localhost:5000/token", { withCredentials: true })
						.then((res) => {
							handleDelete();
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

	const handleDelete = async () => {
		try {
			await axios.delete("http://localhost:5000/scholar", {
				data: { id: row.id },
			});
		} catch (e) {
			console.log(e);
		}
	};

	function addressBeneran(address: any) {
		if (address.slice(0, 2) !== "0x") {
			return "0x".concat(address.slice(6));
		} else {
			return address;
		}
	}

	const handleAxie = () => {
		if (!axief) {
			axios
				.post("https://graphql-gateway.axieinfinity.com/graphql", {
					query: `query GetAxieBriefList(
  $owner: String
  ) {
  axies(
    owner: $owner
  ) {
    total
    results {
      ...AxieBrief
    }
  }
  }
  
  fragment AxieBrief on Axie {
  id
  name
  }`,
					variables: {
						owner: addressBeneran(row.addressronin),
					},
				})
				.then((res) => {
					setAxie(res.data.data.axies.results);
					setAxief(true);
					console.log(res.data.data.axies);
					console.log("kena api");
					setAxieLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	useEffect(() => {
		// console.log(Object.keys(axie).length);/*  */
	});

	return (
		<>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell className={styles.row50}>
					<IconButton aria-label="expand row" size="small" onClick={handleCollapse}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell align="left" className={styles.row100}>
					{row.alias}
				</TableCell>
				<TableCell align="left" className={styles.row280}>
					<ListItem disablePadding>
						{/* <ListItemText> */}
						<Typography className={styles.tebel}>{row.nama}</Typography>
						{/* </ListItemText> */}
						<ListItemIcon>{gender}</ListItemIcon>
					</ListItem>
				</TableCell>
				<TableCell align="left" className={styles.row300}>
					<Grid>
						<ListItem disablePadding>
							<WhatsAppIcon />
							<Link href={whatsapplink + whatsappnumber} underline="none" target="_blank">
								<Typography className={styles.isicontact}>{row.nowa}</Typography>
							</Link>
						</ListItem>
						<ListItem disablePadding>
							<EmailIcon />
							<Typography className={styles.isicontact}>{row.email}</Typography>
						</ListItem>
					</Grid>
				</TableCell>
				<TableCell align="left" className={styles.row150}>
					{row.tenant}
				</TableCell>
				<TableCell align="left" className={styles.row150}>
					<Grid item>
						<ListItem disablePadding>
							<Typography className={styles.tebel}>Owner</Typography>
						</ListItem>
						<ListItem disablePadding>
							<Typography sx={{ fontSize: 15 }}>{row.ownerpshare}%</Typography>
						</ListItem>
					</Grid>
				</TableCell>
				<TableCell align="left" className={styles.row150}>
					<Grid item>
						<ListItem disablePadding>
							<Typography className={styles.tebel}>Manager</Typography>
						</ListItem>
						<ListItem disablePadding>
							<Typography className={styles.bagiprofit}>{row.managerpshare}%</Typography>
						</ListItem>
					</Grid>
				</TableCell>
				<TableCell align="left" className={styles.row150}>
					<Grid item>
						<ListItem disablePadding>
							<Typography className={styles.tebel}>Scholar</Typography>
						</ListItem>
						<ListItem disablePadding>
							<Typography className={styles.bagiprofit}>{row.scholarpshare}%</Typography>
						</ListItem>
					</Grid>
				</TableCell>
				<TableCell align="left" className={styles.row150}>
					<Typography>{row.earningrating}</Typography>
				</TableCell>
				<TableCell align="left" className={styles.row150}>
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<Button onClick={handleModal} className={styles.button}>
								<EditIcon />
							</Button>
							<Modal
								open={modal}
								onClose={handleModal}
								closeAfterTransition
								BackdropComponent={Backdrop}
								BackdropProps={{
									timeout: 500,
								}}
							>
								<EditUsers row={row} />
							</Modal>
						</Grid>
						<Grid item xs={6}>
							<Button className={styles.button} onClick={deletePop}>
								<DeleteIcon />
							</Button>
						</Grid>
					</Grid>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell colSpan={12} className={styles.tabelcollapse}>
					<Collapse in={open}>
						{row.mmr == null && (
							<Box className={styles.collapseError}>
								<Grid direction="column" alignItems="center" justifyContent="center" container={true}>
									<Grid item xs={12} sx={{ padding: "30px" }}>
										<Typography sx={{ color: "red", fontSize: 30, fontWeight: "bold" }}>
											Adress Ronin tidak ditemukan! Pastikan tidak ada spasi dan coba update data!
										</Typography>
									</Grid>
								</Grid>
							</Box>
						)}
						{row.mmr != null && (
							<Box className={styles.collapse}>
								<Grid
									item
									xs={6}
									md={6}
									container
									direction="row"
									justifyContent="center"
									alignItems="center"
									sx={{ marginBottom: 2 }}
								>
									<Typography className={styles.judulcollapse}>
										Address Ronin : {row.addressronin}
									</Typography>
								</Grid>
								<Grid container>
									<Grid item xs={6} container>
										<Grid item xs={4}>
											<Typography className={styles.judulcollapse}>Scholar Duration</Typography>
											<Typography className={styles.isicollapse}>{daysCount} Days</Typography>
											<Typography className={styles.judulcollapse}>Last Claimed</Typography>
											<Typography className={styles.isicollapse}>{row.lastclaim}</Typography>
											<Typography className={styles.judulcollapse}>Unlocked On</Typography>
											<Typography className={styles.isicollapse}>{row.nextclaim}</Typography>
										</Grid>
										<Grid item xs={4}>
											<Typography className={styles.judulcollapse}>
												Total Wallet Amount
											</Typography>
											<Typography className={styles.isicollapse}>
												<Grid container={true}>
													<ListItem disablePadding>
														<Image src="/SLP.png" width={20} height={20} />
														{row.ingameslp} SLP
													</ListItem>
												</Grid>
											</Typography>
											<Typography className={styles.judulcollapse}>
												Average Daily Earning
											</Typography>
											<Typography className={styles.isicollapse}>
												<Grid container={true}>
													<ListItem disablePadding>
														<Image src="/SLP.png" width={20} height={20} />
														{row.average} SLP
													</ListItem>
												</Grid>
											</Typography>
											<Typography className={styles.judulcollapse}>Current MMR</Typography>
											<Typography className={styles.isicollapse}>
												<Grid container={true}>
													<ListItem disablePadding>
														<Image src="/axieareanaswords.png" width={20} height={20} />
														{row.mmr}
													</ListItem>
												</Grid>
											</Typography>
											<Typography className={styles.judulcollapse}>Earning Rate</Typography>
											<Typography className={styles.isicollapse}>{row.earningrating}</Typography>
										</Grid>
										<Grid item xs={4}>
											<Typography className={styles.judulcollapse}>
												Owner Estimate Share - {row.ownerpshare}%
											</Typography>
											<Typography className={styles.isicollapse}>
												<Grid container={true}>
													<ListItem disablePadding>
														<Image src="/SLP.png" width={20} height={20} />
														{row.ingameslp * (row.ownerpshare / 100)} SLP
													</ListItem>
												</Grid>
											</Typography>
											<Typography className={styles.judulcollapse}>
												Manager Estimate Share - {row.managerpshare}%
											</Typography>
											<Typography className={styles.isicollapse}>
												<Grid container={true}>
													<ListItem disablePadding>
														<Image src="/SLP.png" width={20} height={20} />
														{row.ingameslp * (row.managerpshare / 100)} SLP
													</ListItem>
												</Grid>
											</Typography>
											<Typography className={styles.judulcollapse}>
												Scholar Estimate Share - {row.scholarpshare}%
											</Typography>
											<Typography className={styles.isicollapse}>
												<Grid container={true}>
													<ListItem disablePadding>
														<Image src="/SLP.png" width={20} height={20} />
														{row.ingameslp * (row.scholarpshare / 100)} SLP
													</ListItem>
												</Grid>
											</Typography>
											<FormControlLabel
												control={
													<Switch
														checked={renderAxie}
														onChange={() => setrenderAxie(!renderAxie)}
													/>
												}
												label="Show Axie"
												onClick={handleAxie}
											/>
										</Grid>
									</Grid>
									<Grid item xs={6} container alignItems="stretch">
										{(() => {
											if (renderAxie) {
												if (!axieLoading) {
													if (Object.keys(axie).length > 0) {
														return <Fotoaxie />;
													} else {
														return (
															<>
																<Grid
																	sx={{ mx: "auto", my: "auto" }}
																	alignItems="center"
																	justifyContent="center"
																>
																	<Typography>
																		Tidak ditemukan axie di wallet ini!
																	</Typography>
																</Grid>
															</>
														);
													}
												}
												if (axieLoading) {
													return (
														<>
															<Grid
																sx={{ mx: "auto" }}
																alignItems="center"
																justifyContent="center"
															>
																<Grid item xs={12}>
																	<img src="/loading.svg" />
																</Grid>
															</Grid>
															<Fotoaxie />
														</>
													);
												}
											}
										})()}
									</Grid>
								</Grid>
							</Box>
						)}
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

export default Row;

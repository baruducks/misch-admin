import {
  Box,
  Hidden,
  Toolbar,
  IconButton,
  Stack,
  AppBar,
  SwipeableDrawer,
  Menu,
  MenuItem,
  Typography,
  Grid,
  ListItem,
  ListItemIcon,
  Divider,
  Modal,
  Backdrop,
} from "@mui/material";
import { useStyles } from "./BarStyle";
import { CgMenu } from "react-icons/cg";
import Text from "../Minor Styling/Typography";
import PersonIcon from "@mui/icons-material/Person";
import { CssBaseline } from "@mui/material";
import { Drawer } from "@mui/material";
import AppBarStyled from "../Minor Styling/Appbar";
import DrawerContent from "../Drawer/DrawerContent";
import SettingsIcon from "@mui/icons-material/Settings";
import Settings from "@mui/icons-material/Settings";
import { Logout } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/router";
import BerhasilPop from "../Popup/BerhasilPop";
import { useAuth } from "../../contexts/auth";
import EditUsers from "../Drawer/Edit Users/EditUsers";
import React, { useEffect, useState } from "react";

const Topbar = ({ akun }: any) => {
  const styles = useStyles();
  const router = useRouter();

  const [open, setOpen] = useState(true);
  const [edit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menu = Boolean(anchorEl);

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleModal = () => {
    setEdit(!edit);
  };
  const menuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const menuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e: any) => {
    const msg = "Logout Berhasil!";
    e.preventDefault();
    axios
      .delete("http://localhost:5000/logout", { withCredentials: true })
      .then((res) => {
        localStorage.removeItem("data");
        router.push("/login");
        BerhasilPop(msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Hidden smDown>
        <CssBaseline />
        <AppBarStyled position="fixed" className={styles.color} open={open}>
          <Toolbar>
            {/* <IconButton className={styles.icon} onClick={handleDrawer}>
              <CgMenu />
            </IconButton> */}
            <Grid
              container
              direction="row-reverse"
              justifyContent="flex-start"
              alignItems="baseline"
            >
              <Box className={styles.isiApp}>
                <Text variant="h6" sx={{ mx: 2 }}>
                  {akun.name}
                </Text>
                <IconButton className={styles.icon2} onClick={menuOpen}>
                  <SettingsIcon />
                </IconButton>
              </Box>
            </Grid>
          </Toolbar>
        </AppBarStyled>
        <Drawer
          className={styles.drawer}
          variant="persistent"
          anchor="left"
          open={true}
          sx={{
            // marginRight: open ? 30 : 0,
            marginRight: 500000,
          }}
        >
          <Stack className={styles.fotoDrawer}>
            <img src="/logonew-blue.svg" style={{ maxWidth: 100 }} />
          </Stack>
          <DrawerContent akun={akun} />
        </Drawer>
      </Hidden>
      <Hidden smUp>
        <AppBar position="fixed" className={styles.color}>
          <Toolbar>
            <IconButton className={styles.icon} onClick={handleDrawer}>
              <CgMenu />
            </IconButton>
            <Box className={styles.isiApp}>
              <Text variant="h6" sx={{ mx: 1 }}>
                {akun.name}
              </Text>
              <IconButton className={styles.icon2mobile} onClick={menuOpen}>
                <SettingsIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
          open={open}
          anchor="left"
          onOpen={() => handleDrawer()}
          onClose={() => handleDrawer()}
          className={styles.drawerMobile}
        >
          <Stack className={styles.fotoDrawer}>
            <img src="/logonew-blue.svg" style={{ maxWidth: 100 }} />
          </Stack>
          <DrawerContent />
        </SwipeableDrawer>
      </Hidden>
      <Menu
        anchorEl={anchorEl}
        open={menu}
        onClose={menuClose}
        onClick={menuClose}
        PaperProps={{
          sx: {
            width: 250,
            p: "6px",
          },
        }}
      >
        <MenuItem sx={{ padding: 0, marginBottom: 1 }}>
          <Grid container={true} className={styles.menu}>
            <ListItem disablePadding>
              <ListItemIcon className={styles.iconavatar2}>
                <PersonIcon />
              </ListItemIcon>
              <Grid item>
                <ListItem disablePadding>
                  <Typography className={styles.namaMenu}>
                    {akun.name}
                  </Typography>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon className={styles.usernameMenu}>
                    {akun.username}
                  </ListItemIcon>
                </ListItem>
              </Grid>
            </ListItem>
          </Grid>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ padding: 0 }}>
          <Grid container={true} className={styles.menu}>
            <ListItem disablePadding>
              <ListItemIcon className={styles.iconavatar2}>
                <Settings />
              </ListItemIcon>
              <ListItem disablePadding onClick={handleModal}>
                <Typography className={styles.fontMenu}>
                  Edit Profile
                </Typography>
              </ListItem>
            </ListItem>
          </Grid>
        </MenuItem>
        <MenuItem sx={{ padding: 0 }}>
          <Grid container={true} className={styles.menu}>
            <ListItem disablePadding onClick={handleLogout}>
              <ListItemIcon className={styles.iconavatar2}>
                <Logout />
              </ListItemIcon>
              <ListItem disablePadding onClick={handleLogout}>
                <Typography className={styles.fontMenu}>Logout</Typography>
              </ListItem>
            </ListItem>
          </Grid>
        </MenuItem>
      </Menu>
      <Modal
        open={edit}
        onClose={handleModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <EditUsers />
      </Modal>
    </>
  );
};

export default Topbar;

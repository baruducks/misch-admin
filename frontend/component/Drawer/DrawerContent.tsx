import {
  List,
  Collapse,
  Typography,
  ThemeProvider,
  Divider,
  ListItemText,
} from "@mui/material";
import { useStyles } from "../Bar/BarStyle";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ListSubheader } from "@mui/material";
import { ExpandLess, ExpandMore, Pages } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import Text from "../Minor Styling/Typography";
import Link from "next/link";
import { GoMortarBoard } from "react-icons/go";
import { useRouter } from "next/router";
import clsx from "clsx";
import { MdAttachMoney } from "react-icons/md";
import axios from "axios";
import theme from "../../src/theme";
import { RiAdminFill } from "react-icons/ri";
import { GoGraph } from "react-icons/go";

const otherNav = [
  {
    name: "User List",
    href: "/admins",
    icon: <RiAdminFill />,
    key: 503,
  },
  { name: "Tenant List", href: "/tenant", icon: <RiAdminFill />, key: 700 },
];

const DrawerContent = ({ akun }: any) => {
  const styles = useStyles();
  const [data, setData] = useState<any[]>([]);
  const [openNav, setOpenNav] = useState(false);
  const [openNav2, setOpenNav2] = useState(false);
  const [openNav3, setOpenNav3] = useState(false);
  const [openNav4, setOpenNav4] = useState(false);
  const router = useRouter();
  const [asPath, setasPath] = useState(router.asPath);

  const handlePath = () => {
    // console.log(asPath);
    setasPath(router.asPath);
  };

  const handleDrawerNav = () => {
    setOpenNav(!openNav);
  };

  const handleDrawerNav2 = () => {
    setOpenNav2(!openNav2);
  };

  const handleDrawerNav3 = () => {
    setOpenNav3(!openNav3);
  };

  const handleDrawerNav4 = () => {
    setOpenNav4(!openNav4);
  };

  const getTenants = async () => {
    try {
      const test = await axios.get("http://localhost:5000/tenant");
      // console.log(data);
      setData(test.data);
      // console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTenants();
    console.log(data);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <List
          className={styles.wrapperList}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Scholarship Portal
            </ListSubheader>
          }
          component="nav"
        >
          {/* Tombol Scholarship semua */}
          <ListItemButton
            className={clsx(
              styles.listButton
              // openNav == true ? styles.listButtonActive : styles.listButton
            )}
            onClick={handleDrawerNav}
          >
            <ListItemIcon className={styles.iconList}>
              <GoMortarBoard />
            </ListItemIcon>
            <ListItemText>
              <Text className={styles.hurufButton}>Scholarship</Text>
            </ListItemText>
            {openNav ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* Dalem Scholarship semua */}
          <Collapse in={openNav} timeout="auto" unmountOnExit>
            {/* Scholarship List */}
            <ListItemButton
              className={clsx(
                styles.listButton
                // openNav2 == true ? styles.listButtonActive : styles.listButton
              )}
              onClick={handleDrawerNav2}
            >
              <ListItemIcon className={styles.iconList}></ListItemIcon>
              <Text className={styles.hurufButtonDalem}>Scholar List</Text>
              {openNav2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            {/* Isi Scholarship List */}
            <Collapse in={openNav2} timeout="auto" unmountOnExit>
              {/* All Scholar */}
              {akun && akun.role != 2 && (
                <>
                  <Link href={"/scholarship/list"} passHref>
                    <ListItemButton
                      className={clsx(
                        styles.listButton,
                        router.asPath == "/scholarship/list"
                          ? styles.listButtonActive
                          : styles.listButton
                      )}
                    >
                      <ListItemIcon></ListItemIcon>
                      <Text className={styles.hurufButtonDalem}>
                        All Scholar
                      </Text>
                    </ListItemButton>
                  </Link>
                </>
              )}
              {data.map((page, index: any) => (
                <React.Fragment key={index}>
                  {akun && akun.role === 2 && akun.tenantId === data[index].id && (
                    <>
                      <Link href={`/scholarship/${data[index].nama}`} passHref>
                        <ListItemButton
                          className={clsx(
                            styles.listButton,
                            router.asPath ===
                              `/scholarship/${data[index].nama.replace(
                                /\s+/g,
                                "%20"
                              )}`
                              ? styles.listButtonActive
                              : styles.listButton
                          )}
                          onClick={handlePath}
                        >
                          <ListItemIcon></ListItemIcon>
                          {/* <ListItemText disableTypography> */}
                          <Text
                            className={styles.hurufButtonDalem}
                            key={page.name}
                            noWrap
                          >
                            {data[index].nama}
                          </Text>
                          {/* </ListItemText> */}
                        </ListItemButton>
                      </Link>
                    </>
                  )}
                  {akun && akun.role !== 2 && (
                    <>
                      <Link href={`/scholarship/${data[index].nama}`} passHref>
                        <ListItemButton
                          className={clsx(
                            styles.listButton,
                            router.asPath ===
                              `/scholarship/${data[index].nama.replace(
                                /\s+/g,
                                "%20"
                              )}`
                              ? styles.listButtonActive
                              : styles.listButton
                          )}
                          onClick={handlePath}
                        >
                          <ListItemIcon></ListItemIcon>
                          {/* <ListItemText disableTypography> */}
                          <Text
                            className={styles.hurufButtonDalem}
                            key={page.name}
                            noWrap
                          >
                            {data[index].nama}
                          </Text>
                          {/* </ListItemText> */}
                        </ListItemButton>
                      </Link>
                    </>
                  )}
                </React.Fragment>
              ))}
            </Collapse>
          </Collapse>
          <List disablePadding>
            <ListItemButton
              className={clsx(
                styles.listButton
                // openNav3 == true ? styles.listButtonActive : styles.listButton
              )}
              onClick={handleDrawerNav3}
            >
              <ListItemIcon className={styles.iconList}>
                <GoGraph />
              </ListItemIcon>
              <Text className={styles.hurufButton}>Statistics</Text>
              {openNav3 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openNav3} timeout="auto" unmountOnExit>
              {akun && akun.role !== 2 && (
                <>
                  <Link href={"/statistics"}>
                    <ListItemButton
                      className={clsx(
                        styles.listButton,
                        router.asPath == "/statistics"
                          ? styles.listButtonActive
                          : styles.listButton
                      )}
                      onClick={handlePath}
                    >
                      <ListItemIcon className={styles.iconList}></ListItemIcon>
                      <Text className={styles.hurufButtonDalem}>
                        All Statistics
                      </Text>
                    </ListItemButton>
                  </Link>
                </>
              )}
              {data.map((page, index: any) => (
                <React.Fragment key={index + 10}>
                  {akun && akun.role === 2 && akun.tenantId === data[index].id && (
                    <>
                      <Link
                        href={`/statistics/${data[index].nama}`}
                        key={index}
                        passHref
                      >
                        <ListItemButton
                          className={clsx(
                            styles.listButton,
                            router.asPath ===
                              `/statistics/${data[index].nama.replace(
                                /\s+/g,
                                "%20"
                              )}`
                              ? styles.listButtonActive
                              : styles.listButton
                          )}
                          key={page.key}
                        >
                          <ListItemIcon></ListItemIcon>
                          {/* <ListItemText disableTypography> */}
                          <Text
                            className={styles.hurufButtonDalem}
                            key={page.name}
                            noWrap
                          >
                            {data[index].nama}
                          </Text>
                          {/* </ListItemText> */}
                        </ListItemButton>
                      </Link>
                    </>
                  )}
                  {akun && akun.role !== 2 && (
                    <>
                      <Link
                        href={`/statistics/${data[index].nama}`}
                        key={index}
                        passHref
                      >
                        <ListItemButton
                          className={clsx(
                            styles.listButton,
                            router.asPath ===
                              `/statistics/${data[index].nama.replace(
                                /\s+/g,
                                "%20"
                              )}`
                              ? styles.listButtonActive
                              : styles.listButton
                          )}
                          key={page.key}
                        >
                          <ListItemIcon></ListItemIcon>
                          <Text
                            className={styles.hurufButtonDalem}
                            key={page.name}
                            noWrap
                          >
                            {data[index].nama}
                          </Text>
                        </ListItemButton>
                      </Link>
                    </>
                  )}
                </React.Fragment>
              ))}
            </Collapse>
          </List>
          {/* Payrolls */}
          {akun && akun.role !== 2 && (
            <>
              <Link href={`/payrolls`} passHref>
                <ListItemButton className={clsx(styles.listButton)}>
                  <ListItemIcon className={styles.iconList}>
                    <MdAttachMoney />
                  </ListItemIcon>
                  <Text className={styles.hurufButton}>Payrolls</Text>
                </ListItemButton>
              </Link>
            </>
          )}
          {akun && akun.role !== 2 && (
            <>
              <List disablePadding>
                <ListItemButton
                  className={clsx(styles.listButton)}
                  onClick={handleDrawerNav4}
                >
                  <ListItemIcon className={styles.iconList}>
                    <RiAdminFill />
                  </ListItemIcon>
                  <ListItemText>
                    <Text className={styles.hurufButton}>Admin</Text>
                  </ListItemText>
                  {openNav4 ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openNav4} timeout="auto" unmountOnExit>
                  {otherNav.map((page, index: any) => (
                    <React.Fragment key={index + 6969}>
                      <Link href={page.href} passHref>
                        <ListItemButton
                          className={clsx(
                            styles.listButton,
                            router.asPath == `${page.href}`
                              ? styles.listButtonActive
                              : styles.listButton
                          )}
                          onClick={handlePath}
                        >
                          <ListItemIcon></ListItemIcon>
                          <Text
                            className={styles.hurufButtonDalem}
                            key={page.name}
                            noWrap
                          >
                            {page.name}
                          </Text>
                        </ListItemButton>
                      </Link>
                    </React.Fragment>
                  ))}
                </Collapse>
              </List>
            </>
          )}
        </List>
      </ThemeProvider>
    </>
  );
};

export default DrawerContent;

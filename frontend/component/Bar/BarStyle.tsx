import { makeStyles } from "@mui/styles";
import theme from "../../src/theme";

const useStyles = makeStyles(() => ({
  color: {
    backgroundColor: "#14161C",
  },
  isiApp: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
  icon: {
    color: "white",
    marginRight: "auto",
  },
  icon2: {
    padding: 1,
    fontSize: 40,
    color: "white",
  },
  icon2mobile: {
    padding: 1,
    fontSize: 30,
    color: "white",
  },
  fotoDrawer: {
    alignItems: "center",
    padding: 24,
    marginBottom: 5,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 240,
      boxSizing: "border-box",
    },
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerMobile: {
    width: 240,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: 240,
      boxSizing: "border-box",
    },
  },
  wrapperList: {
    // maxWidth: 240,
  },
  judulList: {
    fontSize: 16,
  },
  iconList: {
    marginLeft: 0,
    marginRight: 0,
    fontSize: "25px",
  },
  listButton: {
    height: "40px",
    marginRight: "8px",
    marginLeft: "8px",
    padding: "8px",
  },
  list: {
    padding: 0,
    textAlign: "center",
  },
  hurufButton: {
    marginRight: "auto",
    fontSize: 15,
    fontWeight: 600,
  },
  listButtonActive: {
    color: "#1976d2",
    background: "#DCDCDC",
  },
  iconavatar: {
    padding: 0,
    marginRight: 8,
    fontSize: 30,
  },
  menu: {
    padding: 4,
    minWidth: 200,
  },
  namaMenu: {
    fontSize: 15,
  },
  usernameMenu: {
    fontSize: 14,
  },
  fontMenu: {
    fontSize: 14,
  },
  iconavatar2: {
    padding: 0,
    marginRight: 8,
    fontSize: 30,
  },
  hurufButtonDalem: {
    marginRight: "auto",
    fontSize: 13,
    fontWeight: 600,
  },
}));

export { useStyles };

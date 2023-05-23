import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    backgroundColor: "white",
    padding: "25px",
    // display: "block",
    maxHeight: "80%",
    right: "auto",
    bottom: "auto",
    overflow: "auto",
    scrollbarColor: "transparent transparent",
  },

  modalmobile: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    backgroundColor: "white",
    padding: "32px",
    overflow: "auto",
    // height: "75%",
    display: "block",
  },
  iconError: {
    color: "#d32f2f",
  },
  icon: {
    // marginRight: "8px",
  },
  textfield: {},
  swallainx: {
    zIndex: 1000,
  },
}));

export { useStyles };

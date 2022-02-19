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
    display: "block",
  },
  modalmobile: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    backgroundColor: "white",
    padding: "32px",
    overflow: "scroll",
    maxHeight: "75%",
    display: "block",
  },
  iconError: {
    color: "#d32f2f",
  },
  icon: {
    // marginRight: "8px",
  },
  textfield: {},
}));

export { useStyles };

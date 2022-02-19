import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  modal: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 800,
    backgroundColor: "white",
    padding: "25px",
    // display: "block",
    maxHeight: "80%",
    right: "auto",
    bottom: "auto",
    overflow: "auto",
    scrollbarColor: "transparent transparent",
  },
  page: {
    // backgroundImage: `url(${"logonew-blue.svg"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "300px 100px",
    backgroundPosition: "center center",
    // backgroundSize: "cover",
    // backgroundAttachment: "fixed",
  },
  login: {
    alignItems: "center",
    justify: "center",
    margin: "auto",
    // backgroundColor: "red",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  buttonOren: {
    textTransform: "none",
    borderColor: "#e54d42",
    borderRadius: "50px",
    backgroundColor: "#e54d42",
    border: "1px solid #e54d42",
    color: "#FFFFFF",
    "&:hover": {
      border: "1px solid #e54d42",
      backgroundColor: "transparent",
      color: "#e54d42",
    },
    "&:focus": {
      border: "1px solid #e54d42",
      backgroundColor: "transparent",
      color: "#e54d42",
    },
    "&:disabled": {
      backgroundColor: "#dedede",
    },
  },
  buttonBiru: {
    textTransform: "none",
    borderColor: "#30A8F7",
    borderRadius: "50px",
    backgroundColor: "#30A8F7",
    border: "1px solid #30A8F7",
    color: "#FFFFFF",
    "&:hover": {
      border: "1px solid #30A8F7",
      backgroundColor: "transparent",
      color: "#30A8F7",
    },
    "&:focus": {
      border: "1px solid #30A8F7",
      backgroundColor: "transparent",
      color: "#30A8F7",
    },
    "&:disabled": {
      backgroundColor: "#dedede",
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    alignItems: "center",
    // marginTop: theme.spacing(1),
  },
}));

export { useStyles };

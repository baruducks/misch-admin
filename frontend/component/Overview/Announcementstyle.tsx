import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: "8px",
    marginBottom: "8px",
    width: "100%",
  },
  table: {
    marginTop: "8px",
    marginBottom: "8px",
    elevation: 0,
    // maxWidth: 1900,
    border: "2px solid #D3D3D3",
    boxShadow: "none",
    "& .MuiTableCell-root": {
      // border: 0,
    },
  },
  judul: {
    fontSize: 18,
    fontWeight: "bold",
  },
  judul2: {
    fontSize: 17,
    fontWeight: 500,
  },
  isi: {
    fontSize: 17,
    marginLeft: 4,
    fontWeight: 500,
  },
}));

export { useStyles };

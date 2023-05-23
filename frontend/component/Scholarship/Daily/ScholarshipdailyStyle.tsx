import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: "8px",
    marginBottom: "8px",
    width: "100%",
  },
  topjudul: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: "20px",
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
  searchContainer: {
    display: "flex",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    margin: "5px",
    width: "100%",
  },
  judulBar: {
    fontSize: 14,
  },
}));

export { useStyles };

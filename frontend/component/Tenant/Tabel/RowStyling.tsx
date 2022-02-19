import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  row100: {
    minWidth: 110,
    width: 120,
  },
  row280: {
    minWidth: 280,
  },
  row50: {
    minWidth: 30,
    width: 50,
  },
  row150: {
    minWidth: 150,
  },
  collapse: {
    padding: 16,
    maxHeight: "250px",
    width: "100%",
  },
  judulcollapse: {
    fontSize: 14,
    fontWeight: "bold",
  },
  isicollapse: {
    fontSize: 14,
    marginBottom: "8px",
  },
  topjudul: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  iconavatar: {
    padding: 0,
    margin: 0,
    fontSize: 40,
  },
  icongender: {
    padding: 0,
    margin: 0,
    marginLeft: "0.2em",
    fontSize: 17,
  },
  isicontact: {
    marginLeft: "0.2em",
    fontSize: 15,
  },
  tebel: {
    fontWeight: 500,
    fontSize: 16,
  },
  bagiprofit: {
    fontSize: 15,
  },
  slp: {
    fontSize: 17,
    marginLeft: 8,
  },
}));

export { useStyles };

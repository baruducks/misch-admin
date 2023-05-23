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
		border: "2px solid #D3D3D3",
		boxShadow: "none",
		"& .MuiTableCell-root": {
			// border: 0,
		},
		tableLayout: "fixed",
		whiteSpace: "nowrap",
	},
	searchContainer: {
		// paddingLeft: "20px",
		// paddingRight: "20px",
		marginTop: "5px",
		marginBottom: "5px",
		// width: "100%",
		// width: "100%",
	},
	searchIcon: {
		// alignSelf: "flex-end",
		// marginBottom: "5px",
	},
	searchInput: {
		// margin: "5px",
		width: "100%",
		// minWidth: "750px",
	},
	judulBar: {
		fontSize: 14,
	},
	topjudul: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
	},
}));

export { useStyles };

import { Typography } from "@mui/material";
import { withStyles } from "@mui/styles";

const Text = withStyles({
  root: {
    fontFamily: "Montserrat",
  },
})((props: any) => <Typography {...props} />);

export default Text;

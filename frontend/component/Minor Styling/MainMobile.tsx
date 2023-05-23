import { styled } from "@mui/material";

const MainMobile = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})<{}>(({ theme }) => ({
  flexGrow: 1,
  margin: 5,
}));

export default MainMobile;

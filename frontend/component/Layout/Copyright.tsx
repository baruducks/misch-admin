import { Typography, Link } from "@mui/material";
import React from "react";

function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://misch.gg/">
          Misch.gg
        </Link>
        {" 2021"}
        {"."}
      </Typography>
    );
  }

export default Copyright;
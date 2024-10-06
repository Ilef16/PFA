import React from "react";
import { Typography } from "@mui/material";

const MKTypography = ({ variant, color, children }) => {
  return (
    <Typography variant={variant} color={color}>
      {children}
    </Typography>
  );
};

export default MKTypography;
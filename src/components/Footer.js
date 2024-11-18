import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => (
  <Box sx={{ bgcolor: "background.paper", p: 3 }} textAlign="center">
    <Typography variant="body2" color="textSecondary">
      &copy; {new Date().getFullYear()} Movie Recommender. All rights reserved.
    </Typography>
  </Box>
);

export default Footer;

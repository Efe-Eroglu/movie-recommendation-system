import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => (
  <AppBar
    position="relative"
    elevation={0}
    sx={{
      bgcolor: "black",
      height: 80,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Toolbar
      sx={{
        height: "100%",
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <Box
        component="img"
        src="/icon.png"
        alt="Logo"
        sx={{
          height: 45,
          width: 45,
          marginRight: 2,
        }}
      />

      <Typography
        variant="h5"
        sx={{
          flexGrow: 1,
          fontWeight: "bold",
          fontSize: "1.5rem",
          textTransform: "uppercase",
          backgroundImage:
            "linear-gradient(to right, #F33131FF, #9E0C0CFF, #7C0808FF)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Movie Recommender
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: "1rem",
            "&:hover": {
              color: "#E40808FF",
            },
          }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/recommendations"
          sx={{
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: "1rem",
            "&:hover": {
              color: "#E40808FF",
            },
          }}
        >
          Recommender
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/about"
          sx={{
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: "1rem",
            "&:hover": {
              color: "#E40808FF",
            },
          }}
        >
          ABOUT US
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;

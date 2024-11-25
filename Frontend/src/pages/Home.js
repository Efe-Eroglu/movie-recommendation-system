import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Home = () => (
  <Box
    sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      backgroundImage:
        "linear-gradient(to bottom, #000000, #0F0F0FFF, #1D1D1DFF, #2E2E2EFF)",
      color: "#FFFFFF",
      padding: 4,
    }}
  >
    <Typography
      variant="h2"
      sx={{
        fontWeight: "bold",
        textTransform: "uppercase",
        backgroundImage: "linear-gradient(to right, #FF0000, #CC0E0E, #FF4500)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: 2,
      }}
    >
      Fİlm Önerİcİye Hoşgeldİnİz
    </Typography>

    <Typography
      variant="h5"
      sx={{
        maxWidth: "600px",
        marginBottom: 4,
        lineHeight: 1.6,
      }}
    >
      Size özel olarak kişiselleştirilmiş en iyi filmleri keşfet ve Tadına bak.
    </Typography>

    <Box sx={{ display: "flex", gap: 3 }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#FFFFFF00",
          color: "#FFFFFF",
          padding: "10px 20px",
          border: "1px solid #FFFFFF",
          fontSize: "1rem",
          fontWeight: "bold",
          transition: "all 0.5s ease",
          "&:hover": {
            backgroundColor: "transparent",
            border: "1px solid #FFFFFF",
            color: "#D62424FF",
          },
        }}
        href="/recommendations"
      >
        Tavsiye Al
      </Button>

      <Button
        variant="outlined"
        sx={{
          borderColor: "#FF0000",
          color: "#FF0000",
          padding: "10px 20px",
          fontSize: "1rem",
          fontWeight: "bold",
          transition: "all 0.5s ease",
          "&:hover": {
            backgroundColor: "#C21919FF",
            color: "#FFFFFF",
            borderColor: "#7E0404FF",
          },
        }}
        href="/about"
      >
        Daha Fazla Bilgi
      </Button>
    </Box>
  </Box>
);

export default Home;

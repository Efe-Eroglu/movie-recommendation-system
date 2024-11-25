import React from "react";
import { Box, Typography, Button, Link, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Twitter, Facebook } from "@mui/icons-material";

const About = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundImage:
          "linear-gradient(to bottom, #000000, #1a1a1a, #333333)",
        color: "#FFFFFF",
        padding: 4,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase",
          backgroundImage:
            "linear-gradient(to right, #FF0000, #CC0E0E, #FF4500)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 2,
        }}
      >
        Hakkımızda
      </Typography>

      <Typography
        variant="h5"
        sx={{
          maxWidth: "1000px",
          marginBottom: 4,
          marginTop: 3,
          lineHeight: 1.6,
        }}
      >
        Movie Recommender projesi, kullanıcıların film tercihlerine göre
        kişiselleştirilmiş öneriler sunmayı amaçlayan modern bir web
        uygulamasıdır. Proje, popüler film verilerini analiz ederek kullanıcı
        alışkanlıklarına uygun öneriler üretir.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Bize Ulaşın
      </Typography>
      <Box sx={{ display: "flex", gap: 3, marginBottom: 4 }}>
        <IconButton
          href="https://github.com/Efe-Eroglu"
          target="_blank"
          sx={{
            backgroundImage:
              "linear-gradient(to right, #FF0000, #CC0E0E, #FF4500)",
            color: "#FFFFFF",
            borderRadius: "50%",
            "&:hover": {
              backgroundImage:
                "linear-gradient(to right, #CC0E0E, #FF4500, #FF0000)",
            },
          }}
        >
          <GitHub />
        </IconButton>
        <IconButton
          href="https://www.linkedin.com/in/efeeroglu/"
          target="_blank"
          sx={{
            backgroundImage:
              "linear-gradient(to right, #FF0000, #CC0E0E, #FF4500)",
            color: "#FFFFFF",
            borderRadius: "50%",
            "&:hover": {
              backgroundImage:
                "linear-gradient(to right, #CC0E0E, #FF4500, #FF0000)",
            },
          }}
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          href="https://twitter.com/your-profile"
          target="_blank"
          sx={{
            backgroundImage:
              "linear-gradient(to right, #FF0000, #CC0E0E, #FF4500)",
            color: "#FFFFFF",
            borderRadius: "50%",
            "&:hover": {
              backgroundImage:
                "linear-gradient(to right, #CC0E0E, #FF4500, #FF0000)",
            },
          }}
        >
          <Twitter />
        </IconButton>
        <IconButton
          href="https://facebook.com/your-profile"
          target="_blank"
          sx={{
            backgroundImage:
              "linear-gradient(to right, #FF0000, #CC0E0E, #FF4500)",
            color: "#FFFFFF",
            borderRadius: "50%",
            "&:hover": {
              backgroundImage:
                "linear-gradient(to right, #CC0E0E, #FF4500, #FF0000)",
            },
          }}
        >
          <Facebook />
        </IconButton>
      </Box>

      <Button
        variant="outlined"
        href="/"
        sx={{
          borderColor: "#FF0000",
          color: "#FF0000",
          padding: "10px 20px",
          fontSize: "1rem",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#FF0000",
            color: "#FFFFFF",
          },
        }}
      >
        Ana Sayfaya Dön
      </Button>
    </Box>
  );
};

export default About;

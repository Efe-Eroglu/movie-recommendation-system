import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import {
  GitHub,
  LinkedIn,
  YouTube,
} from "@mui/icons-material";

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
        About Us
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
        Movie Recommendation project based on users' movie preferences a modern
        web that aims to provide personalized recommendations Application. The
        project analyzes popular movie data to identify users produce
        suggestions appropriate to their habits.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Contact us
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
          href="https://www.youtube.com/@Efe-gg7ez"
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
          <YouTube />
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
        Back to Home Page
      </Button>
    </Box>
  );
};

export default About;

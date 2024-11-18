import React from "react";
import { Container, Typography } from "@mui/material";

const Home = () => (
  <Container>
    <Typography variant="h4" gutterBottom>
      Welcome to Movie Recommender
    </Typography>
    <Typography variant="body1">
      Find the best movies tailored to your taste.
    </Typography>
  </Container>
);

export default Home;

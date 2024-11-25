import React from "react";
import { Container, Box } from "@mui/material";
import MovieCard from "../components/MovieCard";

const Recommendations = () => {
  const movies = [
    { title: "Inception", description: "A mind-bending thriller", image: "image1.jpg" },
    { title: "The Dark Knight", description: "The legend of Batman", image: "image2.jpg" },
  ];

  return (
    <Container>
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        gap={3}
      >
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </Box>
    </Container>
  );
};

export default Recommendations;

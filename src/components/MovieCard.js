import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const MovieCard = ({ title, description, image }) => (
  <Card sx={{ maxWidth: 345, bgcolor: "background.paper" }}>
    <CardMedia component="img" height="140" image={image} alt={title} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default MovieCard;

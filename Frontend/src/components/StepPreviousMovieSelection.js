import React from "react";
import { Box, Typography, Autocomplete, TextField } from "@mui/material";

const StepPreviousMovieSelection = ({ formData, handleInputChange, movies }) => (
  <Box sx={{ width: "80%", textAlign: "center", mb: 4 }}>
    <Typography variant="h6" mb={2}>
      Daha önce izlediğiniz bir filmi seçin:
    </Typography>
    <Autocomplete
      options={movies}
      getOptionLabel={(option) => option}
      value={formData.previousMovie}
      onChange={(e, value) => handleInputChange("previousMovie", value)}
      renderInput={(params) => (
        <TextField {...params} label="Film" variant="outlined" />
      )}
      sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }}
    />
  </Box>
);

export default StepPreviousMovieSelection;

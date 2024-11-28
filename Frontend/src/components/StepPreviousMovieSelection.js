import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import { fetchMovies } from "../service/apiService";

const StepPreviousMovieSelection = ({ formData, handleInputChange }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 30;

  const loadMoreMovies = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const newMovies = await fetchMovies(limit, offset);
      if (newMovies.length < limit) setHasMore(false);
      setMovies((prev) => [...prev, ...newMovies]);
      setOffset((prevOffset) => prevOffset + limit);
    } catch (err) {
      console.error("Failed to load movie data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreMovies();
  }, []);

  return (
    <Box sx={{ width: "80%", textAlign: "center", mb: 4 }}>
      <Typography variant="h6" mb={2}>
        Choose a movie you have seen before:
      </Typography>
      <Autocomplete
        options={movies}
        getOptionLabel={(option) => option.movie_title}
        value={formData.previousMovie}
        onChange={(e, value) => handleInputChange("previousMovie", value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Previous Watch Movie"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": { color: "#000000" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#FF0000" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF4500",
              },
              "& .MuiInputLabel-root": { color: "#FF0000", fontWeight: "bold" },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FF0000",
                fontWeight: "bold",
                fontSize: "1.2rem",
              },
            }}
          />
        )}
        ListboxProps={{
          onScroll: (event) => {
            const listboxNode = event.currentTarget;
            if (
              listboxNode.scrollTop + listboxNode.clientHeight ===
              listboxNode.scrollHeight
            ) {
              loadMoreMovies();
            }
          },
        }}
        loading={loading}
        loadingText="Loading..."
        sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }}
      />
      {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
    </Box>
  );
};

export default StepPreviousMovieSelection;

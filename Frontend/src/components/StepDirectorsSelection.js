import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
} from "@mui/material";
import { fetchDirectors } from "../service/apiService";

const StepDirectorSelection = ({ formData, handleInputChange }) => {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 30;

  const loadMoreDirectors = async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const newDirectors = await fetchDirectors(limit, offset);
      if (newDirectors.length < limit) setHasMore(false);
      setDirectors((prev) => [...prev, ...newDirectors]);
      setOffset((prevOffset) => prevOffset + limit);
    } catch (err) {
      console.error("Yönetmen verileri yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreDirectors();
  }, []);

  return (
    <Box sx={{ width: "80%", textAlign: "center", mb: 4 }}>
      <Typography variant="h6" mb={2}>
      Choose your favorite director:
      </Typography>
      <Autocomplete
        options={directors}
        getOptionLabel={(option) => option}
        value={formData.director}
        onChange={(e, value) => handleInputChange("director", value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Your Favourite Director"
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
              loadMoreDirectors();
            }
          },
        }}
        loading={loading}
        loadingText="Yükleniyor..."
        disablePortal
        sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }}
      />
      {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
    </Box>
  );
};

export default StepDirectorSelection;

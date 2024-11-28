import React, { useState, useEffect } from "react";
import { Box, Typography, Autocomplete, TextField, CircularProgress } from "@mui/material";
import { fetchMovies } from "../service/apiService";

const StepPreviousMovieSelection = ({ formData, handleInputChange }) => {
  const [movies, setMovies] = useState([]); // Yüklenen filmler
  const [loading, setLoading] = useState(false); // Yükleme durumunu izler
  const [offset, setOffset] = useState(0); // Veri kaydırması için offset
  const [hasMore, setHasMore] = useState(true); // Daha fazla veri olup olmadığını kontrol eder
  const limit = 10; // Her yüklemede alınacak veri sayısı

  const loadMoreMovies = async () => {
    if (!hasMore || loading) return; // Daha fazla veri yoksa veya zaten yükleniyorsa işlemi durdur
    setLoading(true);
    try {
      const newMovies = await fetchMovies(limit, offset); // Yeni verileri al
      if (newMovies.length < limit) setHasMore(false); // Gelen veri sayısı limitten azsa daha fazla veri yok
      setMovies((prev) => [...prev, ...newMovies]); // Yeni verileri mevcut verilerin sonuna ekle
      setOffset((prevOffset) => prevOffset + limit); // Offset'i artır
    } catch (err) {
      console.error("Film verileri yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreMovies(); // İlk veri yüklemesi
  }, []);

  return (
    <Box sx={{ width: "80%", textAlign: "center", mb: 4 }}>
      <Typography variant="h6" mb={2}>
        Daha önce izlediğiniz bir filmi seçin:
      </Typography>
      <Autocomplete
        options={movies}
        getOptionLabel={(option) => option.movie_title} // Sadece film başlığını göster
        value={formData.previousMovie}
        onChange={(e, value) => handleInputChange("previousMovie", value)}
        renderInput={(params) => (
          <TextField {...params} label="Film" variant="outlined" />
        )}
        ListboxProps={{
          onScroll: (event) => {
            const listboxNode = event.currentTarget;
            if (
              listboxNode.scrollTop + listboxNode.clientHeight ===
              listboxNode.scrollHeight
            ) {
              loadMoreMovies(); // Kaydırma çubuğu sona ulaştığında daha fazla veri yükle
            }
          },
        }}
        loading={loading} // Yükleniyor durumunu göster
        loadingText="Yükleniyor..."
      />
      {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
    </Box>
  );
};

export default StepPreviousMovieSelection;

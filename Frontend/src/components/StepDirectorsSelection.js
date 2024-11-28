import React, { useState, useEffect } from "react";
import { Box, Typography, Autocomplete, TextField, CircularProgress } from "@mui/material";
import { fetchDirectors } from "../service/apiService";

const StepDirectorSelection = ({ formData, handleInputChange }) => {
  const [directors, setDirectors] = useState([]); // Yüklenen yönetmenler
  const [loading, setLoading] = useState(false); // Yükleme durumunu izler
  const [offset, setOffset] = useState(0); // Veri kaydırması için offset
  const [hasMore, setHasMore] = useState(true); // Daha fazla veri olup olmadığını kontrol eder
  const limit = 10; // Her yüklemede alınacak veri sayısı

  const loadMoreDirectors = async () => {
    if (!hasMore || loading) return; // Daha fazla veri yoksa veya zaten yükleniyorsa işlemi durdur
    setLoading(true);
    try {
      const newDirectors = await fetchDirectors(limit, offset); // Yeni verileri al
      if (newDirectors.length < limit) setHasMore(false); // Gelen veri sayısı limitten azsa daha fazla veri yok
      setDirectors((prev) => [...prev, ...newDirectors]); // Yeni verileri mevcut verilerin sonuna ekle
      setOffset((prevOffset) => prevOffset + limit); // Offset'i artır
    } catch (err) {
      console.error("Yönetmen verileri yüklenemedi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreDirectors(); // İlk veri yüklemesi
  }, []);

  return (
    <Box sx={{ width: "80%", textAlign: "center", mb: 4 }}>
      <Typography variant="h6" mb={2}>
        Sevdiğiniz yönetmeni seçin:
      </Typography>
      <Autocomplete
        options={directors}
        getOptionLabel={(option) => option} // Sadece yönetmen adını göster
        value={formData.director}
        onChange={(e, value) => handleInputChange("director", value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Yönetmen"
            variant="outlined"
            sx={{
              "& .MuiInputBase-root": { color: "#000000" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#FF0000" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#FF4500" },
              "& .MuiInputLabel-root": { color: "#FF0000", fontWeight: "bold" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#FF0000", fontWeight: "bold", fontSize: "1.2rem" },
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
              loadMoreDirectors()
            }
          },
        }}
        loading={loading}
        loadingText="Yükleniyor..."
        disablePortal
      />
      {loading && <CircularProgress size={24} sx={{ mt: 2 }} />}
    </Box>
  );
};

export default StepDirectorSelection;

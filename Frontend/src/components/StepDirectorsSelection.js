import React from "react";
import { Box, Typography, Autocomplete, TextField } from "@mui/material";

const StepDirectorSelection = ({ formData, handleInputChange, directors }) => (
  <Box sx={{ width: "80%", textAlign: "center", mb: 4 }}>
    <Typography variant="h6" mb={2}>
      Sevdiğiniz yönetmeni seçin:
    </Typography>
    <Autocomplete
      options={directors}
      getOptionLabel={(option) => option}
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
      sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }}
    />
  </Box>
);

export default StepDirectorSelection;

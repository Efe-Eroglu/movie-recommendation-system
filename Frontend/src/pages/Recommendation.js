import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Autocomplete,
  Popper,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

// Her zaman aşağı doğru açılan özelleştirilmiş Popper
const CustomPopper = (props) => {
  return <Popper {...props} placement="bottom-start" />;
};

const Recommendations = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    genre: "",
    director: "",
    previousMovie: "",
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const steps = ["Film Türü", "Sevdiğiniz Yönetmen", "Önceki İzlenen Film"];
  const genres = [
    "Aksiyon",
    "Komedi",
    "Drama",
    "Bilim Kurgu",
    "Romantik",
    "Korku",
    "Macera",
  ];
  const directors = [
    "Christopher Nolan",
    "Quentin Tarantino",
    "Steven Spielberg",
    "Martin Scorsese",
    "Alfred Hitchcock",
  ];
  const movies = [
    "Inception",
    "The Dark Knight",
    "Pulp Fiction",
    "The Godfather",
    "Schindler's List",
  ];

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      // Tüm adımlar tamamlandı, API çağrısını yap
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post("http://127.0.0.1:5000/recommend", formData);
        if (response.data.status === "success") {
          setRecommendations(response.data.recommendations);
        } else {
          throw new Error(response.data.message || "Beklenmeyen bir hata oluştu.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #000000, #1a1a1a, #333333)",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase",
          backgroundImage: "linear-gradient(to right, #FF0000, #CC0E0E, #FF4500)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 4,
        }}
      >
        Film Önerisi
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: "80%", mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel sx={{ color: "#FFFFFF" }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box sx={{ width: "80%", textAlign: "center", mb: 4 }}>
          <Typography variant="h6" mb={2}>
            İzlemek istediğiniz film türünü seçin:
          </Typography>
          <Autocomplete
            options={genres}
            getOptionLabel={(option) => option}
            value={formData.genre}
            onChange={(e, value) => handleInputChange("genre", value)}
            disablePortal
            PopperComponent={CustomPopper} // Özelleştirilmiş Popper
            renderInput={(params) => (
              <TextField
                {...params}
                label="Film Türü"
                variant="outlined"
                sx={{
                  "& .MuiInputBase-root": {
                    color: "#000000",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FF0000",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FF4500",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#FF0000",
                    fontWeight: "bold",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#FF0000",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  },
                }}
              />
            )}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }}
          />
        </Box>
      )}

      {activeStep === 1 && (
        <Box sx={{ width: "80%", textAlign: "center", mb: 4 }}>
          <Typography variant="h6" mb={2}>
            Sevdiğiniz yönetmeni seçin:
          </Typography>
          <Autocomplete
            options={directors}
            getOptionLabel={(option) => option}
            value={formData.director}
            onChange={(e, value) => handleInputChange("director", value)}
            disablePortal
            PopperComponent={CustomPopper}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Yönetmen"
                variant="outlined"
                sx={{
                  "& .MuiInputBase-root": {
                    color: "#000000",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FF0000",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FF4500",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#FF0000",
                    fontWeight: "bold",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#FF0000",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  },
                }}
              />
            )}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }}
          />
        </Box>
      )}

      {activeStep === 2 && (
        <Box sx={{ width: "80%", textAlign: "center", mb: 4 }}>
          <Typography variant="h6" mb={2}>
            Daha önce izlediğiniz bir filmi seçin:
          </Typography>
          <Autocomplete
            options={movies}
            getOptionLabel={(option) => option}
            value={formData.previousMovie}
            onChange={(e, value) => handleInputChange("previousMovie", value)}
            disablePortal
            PopperComponent={CustomPopper}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Film"
                variant="outlined"
                sx={{
                  "& .MuiInputBase-root": {
                    color: "#000000",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FF0000",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#FF4500",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#FF0000",
                    fontWeight: "bold",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#FF0000",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  },
                }}
              />
            )}
            sx={{ backgroundColor: "#FFFFFF", borderRadius: 1 }}
          />
        </Box>
      )}

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {recommendations.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Önerilen Filmler:</Typography>
          <ul>
            {recommendations.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{
            color: "#FFFFFF",
            borderColor: "#FF0000",
            "&:hover": {
              backgroundColor: "#FF0000",
              color: "#FFFFFF",
            },
          }}
        >
          Geri
        </Button>
        <Button
          onClick={handleNext}
          disabled={
            (activeStep === 0 && !formData.genre) ||
            (activeStep === 1 && !formData.director) ||
            (activeStep === 2 && !formData.previousMovie)
          }
          sx={{
            color: "#FFFFFF",
            borderColor: "#FF0000",
            "&:hover": {
              backgroundColor: "#FF0000",
              color: "#FFFFFF",
            },
          }}
        >
          {activeStep === steps.length - 1 ? "Tamamla" : "İleri"}
        </Button>
      </Box>
    </Box>
  );
};

export default Recommendations;

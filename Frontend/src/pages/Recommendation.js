import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import StepperComponent from "../components/StepperComponent";
import StepGenreSelection from "../components/StepGenreSelection";
import StepDirectorSelection from "../components/StepDirectorsSelection";
import StepPreviousMovieSelection from "../components/StepPreviousMovieSelection";
import NavigationButtons from "../components/NavigationButton";
import {
  getRecommendations,
  fetchGenres,
  fetchDirectors,
  fetchMovies,
} from "../service/apiService";

const Recommendations = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    genre: "",
    director: "",
    previousMovie: "",
  });
  const [recommendations, setRecommendations] = useState([]);
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const steps = ["Movie Genre", "Your Favorite Director", "Previous Watch Movie"];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [genresData, directorsData, moviesData] = await Promise.all([
          fetchGenres(),
          fetchDirectors(),
          fetchMovies(),
        ]);
        setGenres(genresData);
        setDirectors(directorsData);
        setMovies(moviesData);
      } catch (err) {
        setError("Veriler yüklenirken bir hata oluştu.");
      }
    };
    loadData();
  }, []);

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setLoading(true);
      setError("");
      try {
        const response = await getRecommendations(formData);
        setRecommendations(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const handleInputChange = (field, value) =>
    setFormData({ ...formData, [field]: value });

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
          backgroundImage:
            "linear-gradient(to right, #FF0000, #CC0E0E, #FF4500)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 4,
        }}
      >
        Movie Recommendation
      </Typography>

      {recommendations.length === 0 && !loading ? (
        <>
          <StepperComponent steps={steps} activeStep={activeStep} />

          {activeStep === 0 && (
            <StepGenreSelection
              formData={formData}
              handleInputChange={handleInputChange}
              genres={genres}
            />
          )}
          {activeStep === 1 && (
            <StepDirectorSelection
              formData={formData}
              handleInputChange={handleInputChange}
              directors={directors}
            />
          )}
          {activeStep === 2 && (
            <StepPreviousMovieSelection
              formData={formData}
              handleInputChange={handleInputChange}
              movies={movies}
            />
          )}

          <NavigationButtons
            activeStep={activeStep}
            steps={steps}
            handleBack={handleBack}
            handleNext={handleNext}
            formData={formData}
          />
        </>
      ) : loading ? (
        <CircularProgress sx={{ color: "#FF0000", mt: 4 }} />
      ) : (
        <>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Recommended Movies For You:
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            {recommendations.map((rec, index) => (
              <Typography key={index} sx={{ mb: 2 }}>
                {index + 1}. {rec.movie_title} - Tür: {rec.movie_genres} -
                Yönetmen: {rec.director_names}
              </Typography>
            ))}
          </Box>
          <Button
            variant="outlined"
            sx={{
              color: "#FFFFFF",
              borderColor: "#FF0000",
              mt: 4,
              "&:hover": { backgroundColor: "#FF0000", color: "#FFFFFF" },
            }}
            onClick={() => {
              setRecommendations([]);
              setActiveStep(0);
              setFormData({ genre: "", director: "", previousMovie: "" });
            }}
          >
            Restart
          </Button>
        </>
      )}

      {error && (
        <Typography variant="body1" sx={{ color: "red", mt: 2 }}>
          Error: {error}
        </Typography>
      )}
    </Box>
  );
};

export default Recommendations;

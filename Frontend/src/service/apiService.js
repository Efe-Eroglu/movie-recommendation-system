import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export const getRecommendations = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recommend`, {
      topic: formData.genre,
      director: formData.director,
      liked_movie: formData.previousMovie,
    });

    if (response.data.recommendations) {
      return response.data.recommendations;
    } else {
      throw new Error(response.data.message || "Beklenmeyen bir hata oluştu.");
    }
  } catch (error) {
    throw new Error(error.message || "Sunucuya bağlanırken bir hata oluştu.");
  }
};

export const fetchGenres = async () => {
  const response = await axios.get(`${API_BASE_URL}/genres`);
  return response.data.unique_movie_genres;
};

export const fetchDirectors = async (limit = 10, offset = 0) => {
  const response = await axios.get(`${API_BASE_URL}/directors?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const fetchMovies = async (limit = 10, offset = 0) => {
  const response = await axios.get(`${API_BASE_URL}/movies?limit=${limit}&offset=${offset}`);
  return response.data;
};

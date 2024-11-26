import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

export const getRecommendations = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recommend`, formData);
    if (response.data.status === "success") {
      return response.data.recommendations;
    } else {
      throw new Error(response.data.message || "Beklenmeyen bir hata oluştu.");
    }
  } catch (error) {
    throw new Error(error.message || "Sunucuya bağlanırken bir hata oluştu.");
  }
};

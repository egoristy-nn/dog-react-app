// api/DogApi.ts
import axios from "axios";

const API_URL = 'http://localhost:8080/dogPost';

export const fetchDogs = (page: number, perPage: number) => {
  const skip = (page - 1) * perPage;
  const limit = perPage;

  return axios.get(API_URL, { params: { skip, limit } })
    .then(response => {
      console.log("Полученные данные:", response.data);
      return response.data;
    })
    .catch(error => {
      console.error("Ошибка при получении данных:", error.message);
      throw error;
    });
};

export const likeImage = (id: number): Promise<void> => {
  return axios.post(`${API_URL}/${id}/like`)
    .then(response => response.data)
    .catch(error => {
      throw error.response?.data || error.message;
    });
};

export const unlikeImage = (id: number): Promise<void> => {
  return axios.post(`${API_URL}/${id}/unlike`)
    .then(response => response.data)
    .catch(error => {
      throw error.response?.data || error.message;
    });
};
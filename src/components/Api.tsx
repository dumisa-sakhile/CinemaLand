import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

const token = process.env.API_KEY;

tmdbApi.interceptors.request.use((config) => {
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const getPopularMovies = async (pageNumber: number) => {
  const response = await tmdbApi.get(`movie/popular?`, {
    params: {
      page: `${pageNumber}`,
    },
  });
  return response.data;
};

export const getTopRatedMovies = async (pageNumber: number) => {
  const response = await tmdbApi.get(`movie/top_rated?`, {
    params: {
      page: `${pageNumber}`,
    },
  });
  return response.data;  
};

export const getUpcomingMovies = async (pageNumber: number) => {
  const response = await tmdbApi.get(`movie/upcoming?`, {
    params: {
      page: `${pageNumber}`,
    },
  });
  return response.data;      
};

export const getNowPlayingMovies = async (pageNumber: number) => {
  const response = await tmdbApi.get(`movie/now_playing?`, {
    params: {
      page: `${pageNumber}`,
    },
  });
  return response.data;      
};



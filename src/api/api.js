import axios from "axios";

const ACCES_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGEzNmY3MzBiZGZhZGEzOGM3M2I5YTk0NTNjNTA3NCIsInN1YiI6IjY1Y2E1OWVkNTRhMDk4MDE2MzAyOTRlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._IdvqX_NJNG1hTkDxjew2bJ-6kP2xcczX8veJpDtLlI";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const headers = {
  Authorization: `Bearer ${ACCES_KEY}`,
  accept: "application/json",
};

export const getTrendMovie = async ({ page, abortController }) => {
  const options = {
    method: "GET",
    headers,
    url: `trending/movie/day`,
    params: { page, language: "en-US" },
    signal: abortController.signal,
  };

  const response = await axios(options);

  return response.data;
};

export const getMovieById = async (movieId) => {
  const options = {
    method: "GET",
    headers,
    url: `/movie/${movieId}`,
    params: { language: "en-US" },
  };

  const response = await axios(options);

  return response.data;
};

export const getMovieCreditsById = async (movieId) => {
  const options = {
    method: "GET",
    headers,
    url: `/movie/${movieId}/credits`,
    params: { language: "en-US" },
  };

  const response = await axios(options);

  return response.data;
};

export const getMovieReviewsById = async (movieId) => {
  const options = {
    method: "GET",
    headers,
    url: `/movie/${movieId}/reviews`,
    params: { language: "en-US" },
  };

  const response = await axios(options);

  return response.data;
};

export const getMovieReviewsBySearch = async ({ query, page }) => {
  const options = {
    method: "GET",
    headers,
    url: `search/movie`,
    params: { include_adult: false, language: "en-US", query, page },
  };

  const response = await axios(options);

  return response.data;
};

// js/config.js
export const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzkzNzQ2NTlkZTA4YjkzOTQ5OWE1MGFmNDcxNTIxNiIsIm5iZiI6MTc3MDkwMTExNy41MzYsInN1YiI6IjY5OGRjZTdkZjQ5NjQ5NjdhZjc4ZGIyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.43r7w2iLgabx7vIMZvpl-80P7fYGw9YG6F4CLzvk4vA";

export const TMDB_BASE = "https://api.themoviedb.org/3";

export const headers = {
  Authorization: `Bearer ${TMDB_TOKEN}`,
  "Content-Type": "application/json"
};

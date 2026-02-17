// ================= CONFIG =================
const API_KEY = "YOUR_TMDB_API_KEY"; // ← এখানে key বসাও
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// ================= DOM =================
const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");

// ================= FETCH TRENDING =================
async function loadTrendingMovies() {
  const res = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );
  const data = await res.json();
  displayMovies(data.results);
}

// ================= SEARCH =================
async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  displayMovies(data.results);
}

// ================= DISPLAY =================
function displayMovies(movies) {
  movieGrid.innerHTML = "";

  movies.forEach(movie => {
    if (!movie.poster_path) return;

    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" />
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
    `;

    card.onclick = () => {
      window.location.href = `movie.html?id=${movie.id}`;
    };

    movieGrid.appendChild(card);
  });
}

// ================= EVENTS =================
searchInput.addEventListener("keyup", e => {
  const value = e.target.value.trim();
  if (value.length > 2) {
    searchMovies(value);
  } else {
    loadTrendingMovies();
  }
});

// ================= INIT =================
loadTrendingMovies();

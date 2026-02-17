/* =========================
   CONFIG
========================= */
const API_KEY = "YOUR_TMDB_API_KEY"; // এখানে তোমার TMDB API KEY বসাও
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

/* =========================
   ELEMENTS
========================= */
const movieList = document.getElementById("movie-list");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

/* =========================
   THEME (DARK / LIGHT)
========================= */
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
});

/* =========================
   FETCH TRENDING MOVIES
========================= */
async function loadTrendingMovies() {
  movieList.innerHTML = "<p>Loading movies...</p>";

  try {
    const res = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    const data = await res.json();
    renderMovies(data.results);
  } catch (err) {
    movieList.innerHTML = "<p>Error loading movies</p>";
  }
}

/* =========================
   SEARCH MOVIES
========================= */
searchInput.addEventListener("keyup", async (e) => {
  const query = e.target.value.trim();

  if (query.length === 0) {
    loadTrendingMovies();
    return;
  }

  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  const data = await res.json();
  renderMovies(data.results);
});

/* =========================
   RENDER MOVIES
========================= */
function renderMovies(movies) {
  movieList.innerHTML = "";

  if (!movies || movies.length === 0) {
    movieList.innerHTML = "<p class='empty-msg'>No movies found</p>";
    return;
  }

  movies.forEach((movie) => {
    if (!movie.poster_path) return;

    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;

    card.onclick = () => {
      localStorage.setItem("currentMovie", JSON.stringify(movie));

      // Recently viewed
      let recent = JSON.parse(localStorage.getItem("recentMovies")) || [];
      recent = recent.filter(m => m.id !== movie.id);
      recent.unshift(movie);
      localStorage.setItem("recentMovies", JSON.stringify(recent.slice(0, 10)));

      window.location.href = "movie.html";
    };

    movieList.appendChild(card);
  });
}

/* =========================
   INIT
========================= */
loadTrendingMovies();

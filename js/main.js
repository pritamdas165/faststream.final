/* ===============================
   CONFIG
================================= */

const API_KEY = "cc9374659de08b939499a50af4715216"; // <-- এখানে নিজের TMDB API KEY দাও
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

let currentPage = 1;
let currentQuery = "";
let currentGenre = "";
let isLoading = false;

/* ===============================
   DOM ELEMENTS
================================= */

const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("searchInput");
const genreMenu = document.getElementById("genreMenu");
const toggleThemeBtn = document.getElementById("themeToggle");

/* ===============================
   THEME (DARK / LIGHT)
================================= */

function loadTheme() {
  const theme = localStorage.getItem("theme") || "dark";
  document.body.className = theme;
}

toggleThemeBtn?.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark")
    ? "light"
    : "dark";
  document.body.className = newTheme;
  localStorage.setItem("theme", newTheme);
});

/* ===============================
   FETCH MOVIES
================================= */

async function fetchMovies(url, append = true) {
  if (isLoading) return;
  isLoading = true;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!append) moviesContainer.innerHTML = "";

    data.results.forEach(renderMovieCard);
  } catch (err) {
    console.error("Movie fetch error:", err);
  } finally {
    isLoading = false;
  }
}

function renderMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";

  card.innerHTML = `
    <img src="${movie.poster_path ? IMG_URL + movie.poster_path : "assets/no-poster.png"}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <div class="movie-actions">
      <button onclick="openDetails(${movie.id})">Details</button>
      <button onclick="toggleFavorite(${movie.id}, '${movie.title.replace(/'/g, "")}')">❤️</button>
    </div>
  `;

  moviesContainer.appendChild(card);
}

/* ===============================
   HOME / TRENDING / TOP RATED
================================= */

function loadTrending() {
  currentPage = 1;
  fetchMovies(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${currentPage}`, false);
}

function loadTopRated() {
  currentPage = 1;
  fetchMovies(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${currentPage}`, false);
}

/* ===============================
   SEARCH
================================= */

searchInput?.addEventListener("keyup", e => {
  if (e.key === "Enter") {
    currentQuery = searchInput.value;
    currentPage = 1;
    fetchMovies(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${currentQuery}&page=${currentPage}`,
      false
    );
  }
});

/* ===============================
   GENRES
================================= */

async function loadGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();

  data.genres.forEach(genre => {
    const btn = document.createElement("button");
    btn.textContent = genre.name;
    btn.onclick = () => {
      currentGenre = genre.id;
      currentPage = 1;
      fetchMovies(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${currentGenre}&page=${currentPage}`,
        false
      );
    };
    genreMenu.appendChild(btn);
  });
}

/* ===============================
   INFINITE SCROLL
================================= */

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
    !isLoading
  ) {
    currentPage++;

    let url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${currentPage}`;

    if (currentQuery) {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${currentQuery}&page=${currentPage}`;
    } else if (currentGenre) {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${currentGenre}&page=${currentPage}`;
    }

    fetchMovies(url);
  }
});

/* ===============================
   MOVIE DETAILS PAGE
================================= */

function openDetails(id) {
  window.location.href = `movie.html?id=${id}`;
}

/* ===============================
   FAVORITES (localStorage)
================================= */

function toggleFavorite(id, title) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favs.find(m => m.id === id);

  if (exists) {
    favs = favs.filter(m => m.id !== id);
  } else {
    favs.push({ id, title });
  }

  localStorage.setItem("favorites", JSON.stringify(favs));
  alert("Favorites updated");
}

/* ===============================
   SAFE ADS REDIRECT LOGIC
================================= */

function watchMovie() {
  window.location.href = "/redirect/watch.html";
}

function downloadMovie() {
  window.location.href = "/redirect/download.html";
}

/* ===============================
   INIT
================================= */

loadTheme();
loadGenres();
loadTrending();

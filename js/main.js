/* =========================
   GLOBAL DATA (Demo Movies)
========================= */
const movies = [
  { id: 1, title: "Inception", poster: "https://i.imgur.com/Yo0pE5M.jpg", trending: true },
  { id: 2, title: "Interstellar", poster: "https://i.imgur.com/Exw6kZx.jpg", trending: true },
  { id: 3, title: "Joker", poster: "https://i.imgur.com/0rVeh4F.jpg", trending: false },
  { id: 4, title: "Avengers", poster: "https://i.imgur.com/2fDh8YF.jpg", trending: true },
  { id: 5, title: "Batman", poster: "https://i.imgur.com/fY2Xy5K.jpg", trending: false }
];

/* =========================
   ELEMENTS
========================= */
const allMoviesGrid = document.getElementById("allMovies");
const trendingRow = document.getElementById("trendingMovies");
const recentRow = document.getElementById("recentMovies");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  renderAllMovies(movies);
  renderTrending();
  renderRecentlyViewed();
});

/* =========================
   RENDER FUNCTIONS
========================= */
function renderAllMovies(list) {
  if (!allMoviesGrid) return;
  allMoviesGrid.innerHTML = "";
  list.forEach(movie => {
    allMoviesGrid.appendChild(createMovieCard(movie));
  });
}

function renderTrending() {
  if (!trendingRow) return;
  trendingRow.innerHTML = "";
  movies.filter(m => m.trending).forEach(movie => {
    trendingRow.appendChild(createMovieCard(movie, true));
  });
}

function renderRecentlyViewed() {
  if (!recentRow) return;
  const recent = JSON.parse(localStorage.getItem("recentMovies")) || [];
  recentRow.innerHTML = "";
  recent.forEach(movie => {
    recentRow.appendChild(createMovieCard(movie, true));
  });
}

/* =========================
   MOVIE CARD
========================= */
function createMovieCard(movie, small = false) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <button>View</button>
  `;
  card.onclick = () => openMovie(movie);
  return card;
}

/* =========================
   OPEN MOVIE
========================= */
function openMovie(movie) {
  saveRecentlyViewed(movie);
  window.location.href = `movie.html?id=${movie.id}`;
}

/* =========================
   RECENTLY VIEWED
========================= */
function saveRecentlyViewed(movie) {
  let recent = JSON.parse(localStorage.getItem("recentMovies")) || [];
  recent = recent.filter(m => m.id !== movie.id);
  recent.unshift(movie);
  if (recent.length > 10) recent.pop();
  localStorage.setItem("recentMovies", JSON.stringify(recent));
}

/* =========================
   SEARCH
========================= */
if (searchInput) {
  searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    const filtered = movies.filter(m =>
      m.title.toLowerCase().includes(value)
    );
    renderAllMovies(filtered);
    saveSearchHistory(value);
  });
}

/* =========================
   SEARCH HISTORY
========================= */
function saveSearchHistory(term) {
  if (!term) return;
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  history = history.filter(h => h !== term);
  history.unshift(term);
  if (history.length > 10) history.pop();
  localStorage.setItem("searchHistory", JSON.stringify(history));
}

/* =========================
   THEME (DARK / LIGHT)
========================= */
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  });
}

function loadTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
  }
}

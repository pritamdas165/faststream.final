/*********************************
 FASTSTREAM – MAIN JS
 All features wired together
**********************************/

/* =====================
   Sample Movie Data
===================== */
const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
  },
  {
    id: 2,
    title: "John Wick 4",
    poster: "https://image.tmdb.org/t/p/w500/gh2bmprLtUQ8oXCSluzfqaicyrm.jpg"
  },
  {
    id: 3,
    title: "Avatar: The Way of Water",
    poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg"
  },
  {
    id: 4,
    title: "Spider‑Man: No Way Home",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
  }
];

/* =====================
   DOM Elements
===================== */
const trendingRow = document.getElementById("trendingRow");
const recentlyViewedRow = document.getElementById("recentlyViewedRow");
const searchInput = document.getElementById("searchInput");
const searchHistoryList = document.getElementById("searchHistory");
const themeToggle = document.getElementById("themeToggle");

/* =====================
   Theme Toggle
===================== */
function loadTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "light") {
    document.body.classList.add("light");
  }
}

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
});

loadTheme();

/* =====================
   Render Movies
===================== */
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}">
    <h3>${movie.title}</h3>
  `;

  card.addEventListener("click", () => {
    saveRecentlyViewed(movie);
    window.location.href = `movie.html?id=${movie.id}`;
  });

  return card;
}

function renderTrending() {
  if (!trendingRow) return;
  trendingRow.innerHTML = "";
  movies.forEach(movie => {
    trendingRow.appendChild(createMovieCard(movie));
  });
}

/* =====================
   Recently Viewed
===================== */
function saveRecentlyViewed(movie) {
  let recent = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
  recent = recent.filter(m => m.id !== movie.id);
  recent.unshift(movie);
  recent = recent.slice(0, 10);
  localStorage.setItem("recentlyViewed", JSON.stringify(recent));
}

function renderRecentlyViewed() {
  if (!recentlyViewedRow) return;
  const recent = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
  recentlyViewedRow.innerHTML = "";

  recent.forEach(movie => {
    recentlyViewedRow.appendChild(createMovieCard(movie));
  });
}

/* =====================
   Search + History
===================== */
function saveSearch(term) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  history = history.filter(item => item !== term);
  history.unshift(term);
  history = history.slice(0, 8);
  localStorage.setItem("searchHistory", JSON.stringify(history));
}

function renderSearchHistory() {
  if (!searchHistoryList) return;
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistoryList.innerHTML = "";

  history.forEach(term => {
    const li = document.createElement("li");
    li.textContent = term;
    searchHistoryList.appendChild(li);
  });
}

searchInput?.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  if (term.length < 2) return;

  saveSearch(term);
  renderSearchHistory();

  trendingRow.innerHTML = "";
  movies
    .filter(movie => movie.title.toLowerCase().includes(term))
    .forEach(movie => trendingRow.appendChild(createMovieCard(movie)));
});

/* =====================
   Init
===================== */
renderTrending();
renderRecentlyViewed();
renderSearchHistory();

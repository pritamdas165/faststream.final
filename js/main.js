// SAMPLE MOVIE DATA
const movies = [
  { id: 1, title: "Inception", poster: "https://via.placeholder.com/300x450?text=Inception" },
  { id: 2, title: "Interstellar", poster: "https://via.placeholder.com/300x450?text=Interstellar" },
  { id: 3, title: "Joker", poster: "https://via.placeholder.com/300x450?text=Joker" },
  { id: 4, title: "Avengers", poster: "https://via.placeholder.com/300x450?text=Avengers" }
];

const movieList = document.getElementById("movieList");
const trendingMovies = document.getElementById("trendingMovies");
const recentMovies = document.getElementById("recentMovies");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchHistoryBox = document.getElementById("searchHistory");
const themeToggle = document.getElementById("themeToggle");

// LOAD MOVIES
function renderMovies(container, list) {
  container.innerHTML = "";
  list.forEach(movie => {
    const div = document.createElement("div");
    div.className = "movie-card";
    div.innerHTML = `
      <img src="${movie.poster}">
      <h3>${movie.title}</h3>
    `;
    div.onclick = () => openMovie(movie);
    container.appendChild(div);
  });
}

// OPEN MOVIE
function openMovie(movie) {
  saveRecentlyViewed(movie);
  window.location.href = `movie.html?id=${movie.id}`;
}

// SEARCH
searchBtn.onclick = () => {
  const q = searchInput.value.trim();
  if (!q) return;
  saveSearch(q);
  const result = movies.filter(m => m.title.toLowerCase().includes(q.toLowerCase()));
  renderMovies(movieList, result);
};

// SEARCH HISTORY
function saveSearch(q) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(q)) history.unshift(q);
  history = history.slice(0, 5);
  localStorage.setItem("searchHistory", JSON.stringify(history));
  renderSearchHistory();
}

function renderSearchHistory() {
  const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  searchHistoryBox.innerHTML = "";
  history.forEach(h => {
    const span = document.createElement("span");
    span.className = "chip";
    span.innerText = h;
    span.onclick = () => {
      searchInput.value = h;
      searchBtn.click();
    };
    searchHistoryBox.appendChild(span);
  });
}

// RECENTLY VIEWED
function saveRecentlyViewed(movie) {
  let recent = JSON.parse(localStorage.getItem("recentMovies")) || [];
  recent = recent.filter(m => m.id !== movie.id);
  recent.unshift(movie);
  recent = recent.slice(0, 6);
  localStorage.setItem("recentMovies", JSON.stringify(recent));
}

function renderRecentlyViewed() {
  const recent = JSON.parse(localStorage.getItem("recentMovies")) || [];
  renderMovies(recentMovies, recent);
}

// THEME
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
};

if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark");
}

// INIT
renderMovies(movieList, movies);
renderMovies(trendingMovies, movies.slice(0, 3));
renderRecentlyViewed();
renderSearchHistory();

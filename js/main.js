/***********************
  GLOBAL MOVIE DATA
************************/
const movies = [
  {
    id: "m1",
    title: "Avengers Endgame",
    poster: "https://via.placeholder.com/200x300?text=Endgame",
  },
  {
    id: "m2",
    title: "Inception",
    poster: "https://via.placeholder.com/200x300?text=Inception",
  },
  {
    id: "m3",
    title: "Interstellar",
    poster: "https://via.placeholder.com/200x300?text=Interstellar",
  },
  {
    id: "m4",
    title: "Joker",
    poster: "https://via.placeholder.com/200x300?text=Joker",
  }
];

/***********************
  DOM ELEMENTS
************************/
const trendingEl = document.getElementById("trendingMovies");
const recentEl = document.getElementById("recentMovies");
const searchEl = document.getElementById("searchResults");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

/***********************
  INIT
************************/
loadTheme();
renderTrending();
renderRecent();

/***********************
  RENDER FUNCTIONS
************************/
function renderTrending() {
  trendingEl.innerHTML = "";
  movies.forEach(movie => {
    trendingEl.appendChild(createMovieCard(movie));
  });
}

function renderRecent() {
  recentEl.innerHTML = "";
  const recent = JSON.parse(localStorage.getItem("recentMovies")) || [];
  recent.forEach(movie => {
    recentEl.appendChild(createMovieCard(movie));
  });
}

function renderSearch(results) {
  searchEl.innerHTML = "";
  results.forEach(movie => {
    searchEl.appendChild(createMovieCard(movie));
  });
}

/***********************
  MOVIE CARD
************************/
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";

  card.innerHTML = `
    <img src="${movie.poster}" alt="${movie.title}">
    <h3>${movie.title}</h3>
    <button class="watch-btn">▶ Watch</button>
    <button class="fav-btn">❤️</button>
  `;

  // Watch click
  card.querySelector(".watch-btn").onclick = () => {
    saveRecent(movie);
    window.location.href = `movie.html?id=${movie.id}`;
  };

  // Favorite click
  card.querySelector(".fav-btn").onclick = () => {
    saveFavorite(movie);
    alert("Added to favorites");
  };

  return card;
}

/***********************
  SEARCH
************************/
searchInput.addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  if (!q) {
    searchEl.innerHTML = "";
    return;
  }
  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(q)
  );
  renderSearch(filtered);
});

/***********************
  RECENTLY VIEWED
************************/
function saveRecent(movie) {
  let recent = JSON.parse(localStorage.getItem("recentMovies")) || [];
  recent = recent.filter(m => m.id !== movie.id);
  recent.unshift(movie);
  recent = recent.slice(0, 6);
  localStorage.setItem("recentMovies", JSON.stringify(recent));
}

/***********************
  FAVORITES
************************/
function saveFavorite(movie) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favs.find(m => m.id === movie.id)) {
    favs.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favs));
  }
}

/***********************
  THEME (DARK / LIGHT)
************************/
function loadTheme() {
  const theme = localStorage.getItem("theme") || "light";
  document.body.className = theme;
  themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
  const newTheme =
    document.body.classList.contains("dark") ? "light" : "dark";
  document.body.className = newTheme;
  localStorage.setItem("theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

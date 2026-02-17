/* =========================
   CONFIG
========================= */
const IMG_URL = "https://image.tmdb.org/t/p/w500";

/* =========================
   ELEMENTS
========================= */
const movie = JSON.parse(localStorage.getItem("currentMovie"));

const poster = document.getElementById("moviePoster");
const titleEl = document.getElementById("movieTitle");
const overview = document.getElementById("movieOverview");
const rating = document.getElementById("movieRating");
const date = document.getElementById("movieDate");
const favBtn = document.getElementById("favBtn");
const watchBtn = document.getElementById("watchBtn");
const recentList = document.getElementById("recentList");

/* =========================
   REDIRECT IF NO MOVIE
========================= */
if (!movie) {
  window.location.href = "index.html";
}

/* =========================
   LOAD MOVIE DATA
========================= */
poster.src = movie.poster_path
  ? IMG_URL + movie.poster_path
  : "";

titleEl.innerText = movie.title;
overview.innerText = movie.overview || "No description available.";
rating.innerText = "⭐ " + (movie.vote_average || "N/A");
date.innerText = "📅 " + (movie.release_date || "Unknown");

/* =========================
   FAVORITES
========================= */
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function updateFavBtn() {
  const exists = favorites.find(m => m.id === movie.id);
  favBtn.innerText = exists ? "❤️ Favorited" : "♡ Favorite";
}

updateFavBtn();

favBtn.onclick = () => {
  const exists = favorites.find(m => m.id === movie.id);

  if (exists) {
    favorites = favorites.filter(m => m.id !== movie.id);
  } else {
    favorites.push(movie);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavBtn();
};

/* =========================
   WATCH BUTTON
========================= */
watchBtn.onclick = () => {
  localStorage.setItem("watchMovie", JSON.stringify(movie));
  window.location.href = "redirect.html";
};

/* =========================
   RECENTLY VIEWED
========================= */
function loadRecent() {
  const recent = JSON.parse(localStorage.getItem("recentMovies")) || [];
  recentList.innerHTML = "";

  recent.forEach(m => {
    if (!m.poster_path) return;

    const card = document.createElement("div");
    card.className = "movie-card small";

    card.innerHTML = `
      <img src="${IMG_URL + m.poster_path}" alt="${m.title}">
    `;

    card.onclick = () => {
      localStorage.setItem("currentMovie", JSON.stringify(m));
      window.location.reload();
    };

    recentList.appendChild(card);
  });
}

loadRecent();

/* =========================
   ANALYTICS (BASIC)
========================= */
let views = JSON.parse(localStorage.getItem("analytics")) || {};
views[movie.id] = (views[movie.id] || 0) + 1;
localStorage.setItem("analytics", JSON.stringify(views));

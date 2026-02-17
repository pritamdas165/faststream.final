/* =========================
   CONFIG
========================= */
const API_KEY = "cc9374659de08b939499a50af4715216"; // <-- নিজের TMDB key বসাও
const BASE_URL = https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=API_KEY
 "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER = "https://via.placeholder.com/300x450?text=No+Image";

/* =========================
   GET MOVIE ID
========================= */
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (!movieId) {
  window.location.href = "index.html";
}

/* =========================
   ELEMENTS
========================= */
const poster = document.getElementById("moviePoster");
const titleEl = document.getElementById("movieTitle");
const overview = document.getElementById("movieOverview");
const rating = document.getElementById("movieRating");
const date = document.getElementById("movieDate");
const genresEl = document.getElementById("movieGenres");
const trailerBox = document.getElementById("trailerBox");
const castList = document.getElementById("castList");
const similarBox = document.getElementById("similarMovies");
const favBtn = document.getElementById("favBtn");

/* =========================
   LOAD ALL DATA
========================= */
loadMovie();
loadCast();
loadTrailer();
loadSimilar();

/* =========================
   MOVIE DETAILS
========================= */
async function loadMovie() {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );
  const movie = await res.json();

  poster.src = movie.poster_path ? IMG_URL + movie.poster_path : PLACEHOLDER;
  titleEl.innerText = movie.title;
  overview.innerText = movie.overview || "No description available";
  rating.innerText = "⭐ " + movie.vote_average;
  date.innerText = movie.release_date || "N/A";
  genresEl.innerText = movie.genres.map(g => g.name).join(", ");

  setupFavorite(movie);
}

/* =========================
   CAST
========================= */
async function loadCast() {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  const data = await res.json();

  castList.innerHTML = "";
  data.cast.slice(0, 10).forEach(cast => {
    const div = document.createElement("div");
    div.className = "cast-card";
    div.innerHTML = `
      <img src="${cast.profile_path ? IMG_URL + cast.profile_path : PLACEHOLDER}">
      <p>${cast.name}</p>
    `;
    castList.appendChild(div);
  });
}

/* =========================
   TRAILER
========================= */
async function loadTrailer() {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  const data = await res.json();

  const trailer = data.results.find(v => v.type === "Trailer" && v.site === "YouTube");
  trailerBox.innerHTML = trailer
    ? `<iframe width="100%" height="315"
        src="https://www.youtube.com/embed/${trailer.key}"
        frameborder="0" allowfullscreen></iframe>`
    : "<p>No trailer available</p>";
}

/* =========================
   SIMILAR MOVIES
========================= */
async function loadSimilar() {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`
  );
  const data = await res.json();

  similarBox.innerHTML = "";
  data.results.slice(0, 8).forEach(movie => {
    if (!movie.poster_path) return;

    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}">
      <h3>${movie.title}</h3>
    `;
    card.onclick = () => {
      window.location.href = `movie.html?id=${movie.id}`;
    };
    similarBox.appendChild(card);
  });
}

/* =========================
   FAVORITES
========================= */
function setupFavorite(movie) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const updateBtn = () => {
    favBtn.innerText = favorites.find(m => m.id === movie.id)
      ? "❤️ Favorited"
      : "♡ Favorite";
  };

  updateBtn();

  favBtn.onclick = () => {
    if (!favorites.find(m => m.id === movie.id)) {
      favorites.push(movie);
    } else {
      favorites = favorites.filter(m => m.id !== movie.id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateBtn();
  };
}

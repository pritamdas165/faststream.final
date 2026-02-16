const API_KEY = "cc9374659de08b939499a50af4715216";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";

// get movie id from URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (!movieId) {
  document.body.innerHTML = "<h2>Movie not found</h2>";
}

// elements
const movieDetails = document.getElementById("movieDetails");
const castList = document.getElementById("castList");
const trailerBox = document.getElementById("trailerBox");
const similarMovies = document.getElementById("similarMovies");

// fetch movie details
async function loadMovie() {
  const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`);
  const movie = await res.json();

  movieDetails.innerHTML = `
    <div class="movie-details">
      <img src="${IMG + movie.poster_path}" />
      <div>
        <h1>${movie.title}</h1>
        <p>${movie.overview}</p>
        <p><b>Rating:</b> ⭐ ${movie.vote_average}</p>
        <p><b>Release:</b> ${movie.release_date}</p>

        <button onclick="showAdRedirect()">▶ Watch</button>
        <button onclick="showAdRedirect()">⬇ Download</button>
      </div>
    </div>
  `;
}

// cast
async function loadCast() {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  const data = await res.json();

  castList.innerHTML = data.cast.slice(0, 10).map(c => `
    <div class="cast-card">
      <img src="${c.profile_path ? IMG + c.profile_path : ''}" />
      <p>${c.name}</p>
    </div>
  `).join("");
}

// trailer
async function loadTrailer() {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
  const data = await res.json();
  const trailer = data.results.find(v => v.type === "Trailer");

  if (trailer) {
    trailerBox.innerHTML = `
      <iframe width="100%" height="400"
        src="https://www.youtube.com/embed/${trailer.key}"
        frameborder="0" allowfullscreen>
      </iframe>
    `;
  } else {
    trailerBox.innerHTML = "<p>No trailer available</p>";
  }
}

// similar movies
async function loadSimilar() {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);
  const data = await res.json();

  similarMovies.innerHTML = data.results.map(m => `
    <a href="movie.html?id=${m.id}" class="movie-card">
      <img src="${IMG + m.poster_path}" />
      <h4>${m.title}</h4>
    </a>
  `).join("");
}

// ads redirect (safe logic)
function showAdRedirect() {
  window.location.href = "redirect.html";
}

// init
loadMovie();
loadCast();
loadTrailer();
loadSimilar();

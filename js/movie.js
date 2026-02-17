// ===============================
// TMDB CONFIG
// ===============================
const TMDB_BEARER =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzkzNzQ2NTlkZTA4YjkzOTQ5OWE1MGFmNDcxNTIxNiIsIm5iZiI6MTc3MDkwMTExNy41MzYsInN1YiI6IjY5OGRjZTdkZjQ5NjQ5NjdhZjc4ZGIyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.43r7w2iLgabx7vIMZvpl-80P7fYGw9YG6F4CLzvk4vA";

const BASE = "https://api.themoviedb.org/3";
const IMG = "https://image.tmdb.org/t/p/w500";

const container = document.getElementById("movieContainer");

// ===============================
// LOAD MOVIE FROM STORAGE
// ===============================
const movie = JSON.parse(localStorage.getItem("selectedMovie"));

if (!movie) {
  container.innerHTML = "<h2>Movie not found</h2>";
  throw new Error("No movie data");
}

// ===============================
// FETCH EXTRA DATA
// ===============================
Promise.all([
  fetch(`${BASE}/movie/${movie.id}/credits`, {
    headers: { Authorization: `Bearer ${TMDB_BEARER}` },
  }).then((r) => r.json()),

  fetch(`${BASE}/movie/${movie.id}/videos`, {
    headers: { Authorization: `Bearer ${TMDB_BEARER}` },
  }).then((r) => r.json()),
])
  .then(([credits, videos]) => {
    renderMovie(movie, credits.cast, videos.results);
  })
  .catch((err) => {
    console.error(err);
    renderMovie(movie, [], []);
  });

// ===============================
// RENDER MOVIE
// ===============================
function renderMovie(movie, cast, videos) {
  const poster = movie.poster_path
    ? `${IMG}${movie.poster_path}`
    : "assets/placeholder.png";

  const genres = movie.genres
    ? movie.genres.map((g) => `<span>${g.name}</span>`).join("")
    : "";

  const castHTML = cast.slice(0, 8).map((c) => {
    const img = c.profile_path
      ? `${IMG}${c.profile_path}`
      : "assets/placeholder.png";

    return `
      <div class="cast-card">
        <img src="${img}" />
        <div>${c.name}</div>
        <small>${c.character || ""}</small>
      </div>
    `;
  }).join("");

  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  container.innerHTML = `
    <div class="movie">
      <img src="${poster}" />
      <div class="info">
        <h1>${movie.title}</h1>
        <div class="meta">
          ⭐ ${movie.vote_average} | 📅 ${movie.release_date}
        </div>
        <div class="genres">${genres}</div>
        <p>${movie.overview}</p>

        <div class="actions">
          <button onclick="addToFavorites()">❤️ Add to Favorites</button>
        </div>
      </div>
    </div>

    ${
      trailer
        ? `<iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>`
        : ""
    }

    <div class="cast">
      <h2>Cast</h2>
      <div class="cast-grid">
        ${castHTML}
      </div>
    </div>
  `;
}

// ===============================
// FAVORITES
// ===============================
function addToFavorites() {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favs.find((m) => m.id === movie.id)) {
    favs.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favs));
    alert("Added to favorites ❤️");
  } else {
    alert("Already in favorites");
  }
}

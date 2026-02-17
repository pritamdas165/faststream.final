// ===============================
// TMDB CONFIG
// ===============================

// ✅ OPTION 1 (RECOMMENDED): Bearer Token (TMDB v4)
const TMDB_BEARER =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzkzNzQ2NTlkZTA4YjkzOTQ5OWE1MGFmNDcxNTIxNiIsIm5iZiI6MTc3MDkwMTExNy41MzYsInN1YiI6IjY5OGRjZTdkZjQ5NjQ5NjdhZjc4ZGIyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.43r7w2iLgabx7vIMZvpl-80P7fYGw9YG6F4CLzvk4vA";

// ❌ OPTION 2 (Fallback – not used if bearer works)
// const TMDB_API_KEY = "cc9374659de08b939499a50af4715216";

const TMDB_BASE = "https://api.themoviedb.org/3";

// ===============================
// HELPERS
// ===============================
const errorBox = document.getElementById("error");

function showError(msg) {
  errorBox.textContent = msg;
}

// ===============================
// MAIN LOGIC
// ===============================
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (!movieId) {
  showError("❌ Invalid movie link");
  throw new Error("Movie ID missing");
}

// ===============================
// FETCH MOVIE (AUTH SAFE)
// ===============================
fetch(`${TMDB_BASE}/movie/${movieId}`, {
  headers: {
    Authorization: `Bearer ${TMDB_BEARER}`,
    "Content-Type": "application/json;charset=utf-8",
  },
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("TMDB request failed: " + res.status);
    }
    return res.json();
  })
  .then((movie) => {
    // Save for movie.html
    localStorage.setItem("selectedMovie", JSON.stringify(movie));

    // Redirect
    window.location.href = "movie.html";
  })
  .catch((err) => {
    console.error(err);
    showError("⚠️ Movie load failed. Please try again.");
  });

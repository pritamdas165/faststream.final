const API_KEY = "cc9374659de08b939499a50af4715216";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// Get movie ID from URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (!movieId) {
  document.body.innerHTML = "<h2>Movie not found</h2>";
}

// Elements
const movieDetails = document.getElementById("movieDetails");
const castList = document.getElementById("castList");
const similarMovies = document.getElementById("similarMovies");
const trailerModal = document.getElementById("trailerModal");
const trailerFrame = document.getElementById("trailerFrame");
const closeTrailer = document.getElementById("closeTrailer");

// Fetch Movie Details
fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(movie => {
    document.title = movie.title;

    movieDetails.innerHTML = `
      <div class="movie-detail-card">
        <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
        <div class="info">
          <h1>${movie.title}</h1>
          <p>${movie.overview}</p>
          <p><b>Rating:</b> ⭐ ${movie.vote_average}</p>
          <p><b>Release:</b> ${movie.release_date}</p>

          <button id="watchBtn">▶ Watch Trailer</button>
          <button id="downloadBtn">⬇ Download</button>
        </div>
      </div>
    `;

    document.getElementById("watchBtn").onclick = openTrailer;
    document.getElementById("downloadBtn").onclick = () => {
      window.location.href = "redirect.html";
    };
  });

// Fetch Cast
fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    castList.innerHTML = "";
    data.cast.slice(0, 10).forEach(cast => {
      castList.innerHTML += `
        <div class="cast-card">
          <img src="${cast.profile_path ? IMG_URL + cast.profile_path : ""}">
          <p>${cast.name}</p>
        </div>
      `;
    });
  });

// Fetch Similar Movies
fetch(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    similarMovies.innerHTML = "";
    data.results.slice(0, 8).forEach(movie => {
      similarMovies.innerHTML += `
        <a href="movie.html?id=${movie.id}" class="movie-card">
          <img src="${IMG_URL + movie.poster_path}">
          <h4>${movie.title}</h4>
        </a>
      `;
    });
  });

// Trailer
function openTrailer() {
  fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const trailer = data.results.find(v => v.type === "Trailer");
      if (!trailer) {
        alert("Trailer not available");
        return;
      }
      trailerFrame.src = `https://www.youtube.com/embed/${trailer.key}`;
      trailerModal.style.display = "flex";
    });
}

closeTrailer.onclick = () => {
  trailerModal.style.display = "none";
  trailerFrame.src = "";
};

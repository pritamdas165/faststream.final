const API_KEY = cc9374659de08b939499a50af4715216";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const titleEl = document.getElementById("title");
const posterEl = document.getElementById("poster");
const overviewEl = document.getElementById("overview");

async function loadMovie() {
  if (!movieId) {
    titleEl.textContent = "Movie not found";
    return;
  }

  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  const movie = await res.json();

  titleEl.textContent = movie.title;
  overviewEl.textContent = movie.overview;
  posterEl.src = IMG_URL + movie.poster_path;
}

function watchMovie() {
  window.location.href = "redirect.html?to=watch";
}

function downloadMovie() {
  window.location.href = "redirect.html?to=download";
}

loadMovie();

/********************************
  CONFIG
*********************************/
const API_KEY = "cc9374659de08b939499a50af4715216"; // পরে নিজের key বসাবে
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

/********************************
  GET MOVIE ID
*********************************/
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (!movieId) {
  alert("Movie not found");
  window.location.href = "index.html";
}

/********************************
  FETCH MOVIE DETAILS
*********************************/
async function loadMovie() {
  try {
    const res = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    const movie = await res.json();
    renderMovie(movie);
    saveRecentlyViewed(movie);
    saveContinueWatching(movie);
  } catch (err) {
    console.error(err);
  }
}

/********************************
  RENDER MOVIE
*********************************/
function renderMovie(movie) {
  document.getElementById("moviePoster").src =
    IMG_URL + movie.poster_path;
  document.getElementById("movieTitle").innerText = movie.title;
  document.getElementById("movieOverview").innerText = movie.overview;
  document.getElementById("movieRating").innerText =
    "⭐ " + movie.vote_average;
}

/********************************
  CONTINUE WATCHING
*********************************/
function saveContinueWatching(movie) {
  let list = JSON.parse(localStorage.getItem("continueWatching")) || [];
  list = list.filter((m) => m.id !== movie.id);
  list.unshift({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
  });
  localStorage.setItem(
    "continueWatching",
    JSON.stringify(list.slice(0, 10))
  );
}

/********************************
  RECENTLY VIEWED
*********************************/
function saveRecentlyViewed(movie) {
  let list = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
  list = list.filter((m) => m.id !== movie.id);
  list.unshift({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
  });
  localStorage.setItem(
    "recentlyViewed",
    JSON.stringify(list.slice(0, 12))
  );
}

/********************************
  FAVORITES
*********************************/
function toggleFavorite() {
  let fav = JSON.parse(localStorage.getItem("favorites")) || [];
  const exists = fav.find((m) => m.id == movieId);

  if (exists) {
    fav = fav.filter((m) => m.id != movieId);
    alert("Removed from favorites");
  } else {
    fav.push({
      id: movieId,
      title: document.getElementById("movieTitle").innerText,
      poster: document.getElementById("moviePoster").src,
    });
    alert("Added to favorites");
  }
  localStorage.setItem("favorites", JSON.stringify(fav));
}

/********************************
  INIT
*********************************/
loadMovie();

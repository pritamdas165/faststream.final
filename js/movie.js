const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("id");

const titleEl = document.getElementById("movieTitle");
const posterEl = document.getElementById("moviePoster");
const overviewEl = document.getElementById("movieOverview");
const watchBtn = document.getElementById("watchBtn");
const downloadBtn = document.getElementById("downloadBtn");
const favBtn = document.getElementById("favBtn");

// Demo movie data
const movies = [
  {
    id: "1",
    title: "Demo Movie One",
    overview: "This is a demo movie description.",
    poster_path: "/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg"
  },
  {
    id: "2",
    title: "Demo Movie Two",
    overview: "Another demo movie description.",
    poster_path: "/9O1Iy9od7kIuYt8KQ7x3aF3jG6b.jpg"
  }
];

const movie = movies.find(m => m.id === movieId);

if (!movie) {
  titleEl.innerText = "Movie not found";
} else {
  titleEl.innerText = movie.title;
  posterEl.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  overviewEl.innerText = movie.overview;
}

// ===== WATCH HISTORY SAVE =====
let watchHistory = JSON.parse(localStorage.getItem("watchHistory")) || [];

if (movie && !watchHistory.some(m => m.id === movie.id)) {
  watchHistory.push({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path
  });

  localStorage.setItem("watchHistory", JSON.stringify(watchHistory));
}

// Redirect logic
watchBtn.onclick = () => {
  window.location.href = `redirect.html?type=watch&id=${movieId}`;
};

downloadBtn.onclick = () => {
  window.location.href = `redirect.html?type=download&id=${movieId}`;
};

// ===== FAVORITES SYSTEM =====
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function isFavorite(id) {
  return favorites.some(m => m.id === id);
}

function updateFavButton() {
  if (!movie) return;
  favBtn.innerText = isFavorite(movie.id)
    ? "💔 Remove from Favorites"
    : "❤️ Add to Favorites";
}

favBtn.onclick = () => {
  if (!movie) return;

  if (isFavorite(movie.id)) {
    favorites = favorites.filter(m => m.id !== movie.id);
  } else {
    favorites.push({
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path
    });
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavButton();
};

updateFavButton();

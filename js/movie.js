 const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

const titleEl = document.getElementById("movieTitle");
const posterEl = document.getElementById("moviePoster");
const descEl = document.getElementById("movieDesc");
const watchBtn = document.getElementById("watchBtn");
const downloadBtn = document.getElementById("downloadBtn");

let currentMovie = null;

/* ===============================
   MOVIE DATA (Demo Static)
================================ */
const movies = [
  {
    id: "1",
    title: "Demo Movie One",
    poster: "/demo1.jpg",
    desc: "This is a demo movie description."
  },
  {
    id: "2",
    title: "Demo Movie Two",
    poster: "/demo2.jpg",
    desc: "Another demo movie description."
  }
];

/* ===============================
   LOAD MOVIE
================================ */
currentMovie = movies.find(m => m.id === movieId);

if (!currentMovie) {
  document.body.innerHTML = "<h2>Movie not found</h2>";
} else {
  titleEl.innerText = currentMovie.title;
  posterEl.src = currentMovie.poster;
  descEl.innerText = currentMovie.desc;

  saveWatchHistory(currentMovie);
}

/* ===============================
   CLICK TRACK FUNCTION
================================ */
function trackClick(movie, type) {
  let data = JSON.parse(localStorage.getItem("clickAnalytics")) || {};

  if (!data[movie.id]) {
    data[movie.id] = {
      title: movie.title,
      watch: 0,
      download: 0
    };
  }

  data[movie.id][type]++;
  localStorage.setItem("clickAnalytics", JSON.stringify(data));
}

/* ===============================
   BUTTON EVENTS
================================ */
watchBtn.onclick = () => {
  trackClick(currentMovie, "watch");
  window.location.href = "redirect.html?type=watch&id=" + currentMovie.id;
};

downloadBtn.onclick = () => {
  trackClick(currentMovie, "download");
  window.location.href = "redirect.html?type=download&id=" + currentMovie.id;
};

/* ===============================
   WATCH HISTORY
================================ */
function saveWatchHistory(movie) {
  let history = JSON.parse(localStorage.getItem("watchHistory")) || [];

  if (!history.find(m => m.id === movie.id)) {
    history.unshift(movie);
  }

  localStorage.setItem("watchHistory", JSON.stringify(history));
}

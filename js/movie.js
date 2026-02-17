/*************************
  GET MOVIE ID FROM URL
**************************/
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

/*************************
  MOVIE LIST (SAME IDS)
**************************/
const movies = [
  { id: "m1", title: "Avengers Endgame" },
  { id: "m2", title: "Inception" },
  { id: "m3", title: "Interstellar" },
  { id: "m4", title: "Joker" }
];

const movie = movies.find(m => m.id === movieId);

if (!movie) {
  alert("Movie not found");
  window.location.href = "index.html";
}

/*************************
  SET TITLE
**************************/
document.getElementById("movieTitle").innerText = movie.title;

/*************************
  CONTINUE WATCHING
**************************/
const video = document.getElementById("videoPlayer");
const progressKey = "progress_" + movie.id;

// Resume time
const savedTime = localStorage.getItem(progressKey);
if (savedTime) {
  video.currentTime = savedTime;
}

// Save progress
video.addEventListener("timeupdate", () => {
  localStorage.setItem(progressKey, video.currentTime);
});

/*************************
  ANALYTICS (WATCH / DOWNLOAD)
**************************/
function trackClick(type) {
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

document.getElementById("watchBtn").addEventListener("click", () => {
  trackClick("watch");
  alert("Watch counted");
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  trackClick("download");
  alert("Download counted");
});

/*************************
  RECENTLY VIEWED
**************************/
let recent = JSON.parse(localStorage.getItem("recentMovies")) || [];
recent = recent.filter(m => m.id !== movie.id);
recent.unshift(movie);
recent = recent.slice(0, 6);
localStorage.setItem("recentMovies", JSON.stringify(recent));

/*************************
  GET MOVIE ID
**************************/
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (!movieId) {
  alert("Invalid movie");
  window.location.href = "index.html";
}

/*************************
  SAMPLE MOVIE DATA
  (Later API replaceable)
**************************/
const movie = {
  id: movieId,
  title: movieId,
  video: "https://www.w3schools.com/html/mov_bbb.mp4"
};

/*************************
  SET MOVIE DATA
**************************/
const titleEl = document.getElementById("movieTitle");
const videoEl = document.getElementById("videoPlayer");
const sourceEl = document.getElementById("videoSource");
const downloadBtn = document.getElementById("downloadBtn");
const watchBtn = document.getElementById("watchBtn");
const favBtn = document.getElementById("favBtn");

titleEl.innerText = movie.title;
sourceEl.src = movie.video;
downloadBtn.href = movie.video;
videoEl.load();

/*************************
  CONTINUE WATCHING
**************************/
const progressKey = "progress_" + movie.id;

videoEl.addEventListener("timeupdate", () => {
  localStorage.setItem(progressKey, videoEl.currentTime);
});

videoEl.addEventListener("loadedmetadata", () => {
  const savedTime = localStorage.getItem(progressKey);
  if (savedTime) {
    videoEl.currentTime = savedTime;
  }
});

/*************************
  ANALYTICS
**************************/
let analytics = JSON.parse(localStorage.getItem("clickAnalytics")) || {};

if (!analytics[movie.id]) {
  analytics[movie.id] = {
    watch: 0,
    download: 0,
    open: 0
  };
}

analytics[movie.id].open++;
localStorage.setItem("clickAnalytics", JSON.stringify(analytics));

watchBtn.addEventListener("click", () => {
  analytics[movie.id].watch++;
  localStorage.setItem("clickAnalytics", JSON.stringify(analytics));
  alert("Watch counted ✅");
});

downloadBtn.addEventListener("click", () => {
  analytics[movie.id].download++;
  localStorage.setItem("clickAnalytics", JSON.stringify(analytics));
});

/*************************
  FAVORITES
**************************/
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function updateFavBtn() {
  const exists = favorites.find(m => m.id === movie.id);
  favBtn.innerText = exists ? "💔 Remove Favorite" : "❤️ Add Favorite";
}

favBtn.addEventListener("click", () => {
  const exists = favorites.find(m => m.id === movie.id);

  if (exists) {
    favorites = favorites.filter(m => m.id !== movie.id);
  } else {
    favorites.push({ id: movie.id, title: movie.title });
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavBtn();
});

updateFavBtn();

/*************************
  RECENTLY VIEWED
**************************/
let recent = JSON.parse(localStorage.getItem("recentlyViewed")) || [];

recent = recent.filter(m => m.id !== movie.id);
recent.unshift({ id: movie.id, title: movie.title });
recent = recent.slice(0, 10);

localStorage.setItem("recentlyViewed", JSON.stringify(recent));

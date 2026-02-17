// Get movie from URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

// Demo movie database
const movies = {
  "1": {
    id: "1",
    title: "Demo Movie One",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "This is a demo movie for FastStream."
  },
  "2": {
    id: "2",
    title: "Demo Movie Two",
    src: "https://www.w3schools.com/html/movie.mp4",
    description: "Another demo movie."
  }
};

const movie = movies[movieId];

if (!movie) {
  window.location.href = "index.html";
}

// DOM
const titleEl = document.getElementById("movieTitle");
const sourceEl = document.getElementById("movieSource");
const player = document.getElementById("moviePlayer");
const descEl = document.getElementById("movieDescription");

titleEl.innerText = movie.title;
sourceEl.src = movie.src;
descEl.innerText = movie.description;
player.load();

// ---- Recently Viewed ----
let recent = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
recent = recent.filter(m => m.id !== movie.id);
recent.unshift(movie);
localStorage.setItem("recentlyViewed", JSON.stringify(recent.slice(0, 10)));

// ---- Continue Watching ----
player.addEventListener("timeupdate", () => {
  const data = JSON.parse(localStorage.getItem("continueWatching")) || {};
  data[movie.id] = {
    ...movie,
    time: player.currentTime
  };
  localStorage.setItem("continueWatching", JSON.stringify(data));
});

// Resume
const cw = JSON.parse(localStorage.getItem("continueWatching")) || {};
if (cw[movie.id]) {
  player.currentTime = cw[movie.id].time || 0;
}

// ---- Analytics ----
function trackClick(type) {
  let data = JSON.parse(localStorage.getItem("clickAnalytics")) || {};
  if (!data[movie.id]) {
    data[movie.id] = { title: movie.title, watch: 0, download: 0 };
  }
  data[movie.id][type]++;
  localStorage.setItem("clickAnalytics", JSON.stringify(data));
}

document.getElementById("watchBtn").onclick = () => {
  trackClick("watch");
  player.play();
};

document.getElementById("downloadBtn").onclick = () => {
  trackClick("download");
  window.open(movie.src, "_blank");
};

// ---- Favorites ----
document.getElementById("favBtn").onclick = () => {
  let fav = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!fav.find(m => m.id === movie.id)) {
    fav.push(movie);
    localStorage.setItem("favorites", JSON.stringify(fav));
    alert("Added to Favorites ❤️");
  }
};

// ===============================
// Get Movie ID from URL
// ===============================
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id") || "demo1";

// ===============================
// Demo Movie Database
// ===============================
const moviesDB = [
  {
    id: "demo1",
    title: "Demo Movie One",
    poster: "https://via.placeholder.com/300x450?text=Movie+1",
    desc: "This is a demo movie description. Streaming test project."
  },
  {
    id: "demo2",
    title: "Demo Movie Two",
    poster: "https://via.placeholder.com/300x450?text=Movie+2",
    desc: "Second demo movie for testing purpose."
  }
];

// ===============================
// Load Movie Details
// ===============================
const movie = moviesDB.find(m => m.id === movieId) || moviesDB[0];

document.getElementById("movieTitle").innerText = movie.title;
document.getElementById("moviePoster").src = movie.poster;
document.getElementById("movieDesc").innerText = movie.desc;

// ===============================
// Analytics (Watch / Download)
// ===============================
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

// ===============================
// Continue Watching
// ===============================
function saveContinueWatching(movie) {
  let continueData =
    JSON.parse(localStorage.getItem("continueWatching")) || {};

  continueData[movie.id] = {
    title: movie.title,
    time: new Date().toLocaleTimeString()
  };

  localStorage.setItem(
    "continueWatching",
    JSON.stringify(continueData)
  );
}

function loadContinueWatching(movie) {
  let continueData =
    JSON.parse(localStorage.getItem("continueWatching")) || {};

  if (continueData[movie.id]) {
    document.getElementById("continueBox").style.display = "block";
    document.getElementById("continueTime").innerText =
      continueData[movie.id].time;
  }
}

// ===============================
// Recently Viewed
// ===============================
function addRecentlyViewed(movie) {
  let recent =
    JSON.parse(localStorage.getItem("recentMovies")) || [];

  recent = recent.filter(m => m.id !== movie.id);
  recent.unshift(movie);

  if (recent.length > 5) recent.pop();

  localStorage.setItem("recentMovies", JSON.stringify(recent));
}

function loadRecentlyViewed() {
  let recent =
    JSON.parse(localStorage.getItem("recentMovies")) || [];

  const container = document.getElementById("recentMovies");
  container.innerHTML = "";

  recent.forEach(m => {
    const div = document.createElement("div");
    div.className = "movie-card";
    div.innerHTML = `
      <a href="movie.html?id=${m.id}">
        <img src="${m.poster}" alt="${m.title}">
        <p>${m.title}</p>
      </a>
    `;
    container.appendChild(div);
  });
}

// ===============================
// Favorites
// ===============================
function addToFavorites(movie) {
  let favs =
    JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favs.find(m => m.id === movie.id)) {
    favs.push(movie);
    localStorage.setItem("favorites", JSON.stringify(favs));
    alert("Added to Favorites ❤️");
  } else {
    alert("Already in Favorites");
  }
}

// ===============================
// Button Events
// ===============================
document.getElementById("watchBtn").addEventListener("click", () => {
  trackClick(movie, "watch");
  saveContinueWatching(movie);
  window.location.href = "redirect.html?type=watch&id=" + movie.id;
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  trackClick(movie, "download");
  window.location.href = "redirect.html?type=download&id=" + movie.id;
});

document.getElementById("favBtn").addEventListener("click", () => {
  addToFavorites(movie);
});

// ===============================
// Init
// ===============================
addRecentlyViewed(movie);
loadRecentlyViewed();
loadContinueWatching(movie);

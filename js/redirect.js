/* =========================
   REDIRECT LOGIC
========================= */

// get movie id from URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

// basic validation
if (!movieId) {
  alert("Invalid movie link");
  window.location.href = "index.html";
}

// save continue watching
let continueWatching =
  JSON.parse(localStorage.getItem("continueWatching")) || [];

if (!continueWatching.includes(movieId)) {
  continueWatching.unshift(movieId);
  localStorage.setItem(
    "continueWatching",
    JSON.stringify(continueWatching.slice(0, 20))
  );
}

// fake delay for UX
setTimeout(() => {
  // real redirect (movie.html will load details)
  window.location.href = "movie.html";
}, 2000);

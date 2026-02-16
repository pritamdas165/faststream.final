const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const isContinue = params.get("continue");

/* Dummy data (same ids as main.js) */
const movies = [
  { id: "1", title: "Movie One", poster: "assets/poster1.jpg", desc: "Description one" },
  { id: "2", title: "Movie Two", poster: "assets/poster2.jpg", desc: "Description two" }
];

const movie = movies.find(m => m.id === movieId);

document.getElementById("movieTitle").innerText = movie.title;
document.getElementById("moviePoster").src = movie.poster;
document.getElementById("movieDesc").innerText = movie.desc;

/* Show continue message */
if (isContinue) {
  document.getElementById("continueMsg").style.display = "block";
}

/* SAVE LAST WATCHED */
function saveLastWatched() {
  localStorage.setItem("lastWatched", JSON.stringify({
    id: movie.id,
    title: movie.title,
    poster: movie.poster
  }));
}

document.getElementById("watchBtn").onclick = () => {
  saveLastWatched();
  window.location.href = "redirect.html?type=watch&id=" + movie.id;
};

document.getElementById("downloadBtn").onclick = () => {
  saveLastWatched();
  window.location.href = "redirect.html?type=download&id=" + movie.id;
};

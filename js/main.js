const movieList = document.getElementById("movieList");

/* Dummy movies (example) */
const movies = [
  { id: 1, title: "Movie One", poster: "assets/poster1.jpg" },
  { id: 2, title: "Movie Two", poster: "assets/poster2.jpg" }
];

/* Render movies */
movies.forEach(movie => {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <img src="${movie.poster}">
    <h3>${movie.title}</h3>
    <a href="movie.html?id=${movie.id}" class="primary-btn">View</a>
  `;
  movieList.appendChild(card);
});

/* ===== CONTINUE WATCHING LOGIC ===== */
const lastMovie = JSON.parse(localStorage.getItem("lastWatched"));

if (lastMovie) {
  document.getElementById("continueSection").style.display = "block";
  document.getElementById("continuePoster").src = lastMovie.poster;
  document.getElementById("continueTitle").innerText = lastMovie.title;
  document.getElementById("continueBtn").href =
    `movie.html?id=${lastMovie.id}&continue=1`;
}

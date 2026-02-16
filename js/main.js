const API_KEY = "cc9374659de08b939499a50af4715216";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const moviesEl = document.getElementById("movies");

async function loadMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  showMovies(data.results);
}

function showMovies(movies) {
  moviesEl.innerHTML = "";

  movies.forEach(movie => {
    if (!movie.poster_path) return;

    const div = document.createElement("div");
    div.className = "movie";

    div.innerHTML = `
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;

    div.addEventListener("click", () => {
      window.location.href = `movie.html?id=${movie.id}`;
    });

    moviesEl.appendChild(div);
  });
}

loadMovies();

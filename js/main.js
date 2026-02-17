import { TMDB_BASE, headers, IMG } from "./config.js";

const trending = document.getElementById("trending-movies");
const searchInput = document.getElementById("searchInput");

async function loadTrending() {
  const res = await fetch(`${TMDB_BASE}/trending/movie/week`, { headers });
  const data = await res.json();
  renderMovies(data.results);
}

function renderMovies(movies) {
  trending.innerHTML = "";
  movies.forEach(m => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${m.poster_path ? IMG + m.poster_path : 'assets/placeholder.png'}">
      <h3>${m.title}</h3>
    `;
    div.onclick = () => location.href = `redirect.html?id=${m.id}`;
    trending.appendChild(div);
  });
}

searchInput.addEventListener("keyup", async e => {
  if (!e.target.value) return loadTrending();
  const res = await fetch(
    `${TMDB_BASE}/search/movie?query=${e.target.value}`,
    { headers }
  );
  const data = await res.json();
  renderMovies(data.results);
});

loadTrending();

import { TMDB_BASE, headers } from "./config.js";

const trendingEl = document.getElementById("trending-movies");

async function loadTrending() {
  try {
    const res = await fetch(`${TMDB_BASE}/trending/movie/week`, {
      headers
    });

    const data = await res.json();
    trendingEl.innerHTML = "";

    data.results.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";

      card.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" />
        <h3>${movie.title}</h3>
      `;

      card.onclick = () => {
        window.location.href = `redirect.html?id=${movie.id}`;
      };

      trendingEl.appendChild(card);
    });

  } catch (err) {
    console.error("TMDB error:", err);
  }
}

loadTrending();

import { TMDB_BASE, headers, IMG } from "./config.js";

const id = new URLSearchParams(location.search).get("id");
const box = document.getElementById("movie");

async function loadMovie() {
  const res = await fetch(`${TMDB_BASE}/movie/${id}?append_to_response=videos`, { headers });
  const m = await res.json();

  const trailer = m.videos.results.find(v => v.type === "Trailer");

  box.innerHTML = `
    <h1>${m.title}</h1>
    <img src="${IMG + m.poster_path}">
    <p>${m.overview}</p>
    ${trailer ? `<iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>` : ""}
    <button onclick="addFav()">❤️ Favorite</button>
  `;
}

window.addFav = () => {
  const fav = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!fav.includes(id)) fav.push(id);
  localStorage.setItem("favorites", JSON.stringify(fav));
  alert("Added to favorites");
};

loadMovie();

import { TMDB_BASE, headers, IMG } from "./config.js";

const favBox = document.getElementById("fav");
const favs = JSON.parse(localStorage.getItem("favorites")) || [];

async function loadFav() {
  for (let id of favs) {
    const res = await fetch(`${TMDB_BASE}/movie/${id}`, { headers });
    const m = await res.json();

    const d = document.createElement("div");
    d.className = "card";
    d.innerHTML = `<img src="${IMG + m.poster_path}"><h3>${m.title}</h3>`;
    favBox.appendChild(d);
  }
}
loadFav();

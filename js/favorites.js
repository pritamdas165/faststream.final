/*************************
  GET FAVORITES
**************************/
const favoritesContainer = document.getElementById("favoritesContainer");
const emptyMsg = document.getElementById("emptyMsg");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/*************************
  RENDER FAVORITES
**************************/
function renderFavorites() {
  favoritesContainer.innerHTML = "";

  if (favorites.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  favorites.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <h3>${movie.title}</h3>
      <div class="card-actions">
        <a href="redirect.html?id=${movie.id}" class="btn">▶ Watch</a>
        <button class="btn danger" onclick="removeFavorite('${movie.id}')">❌ Remove</button>
      </div>
    `;

    favoritesContainer.appendChild(card);
  });
}

/*************************
  REMOVE FAVORITE
**************************/
function removeFavorite(id) {
  favorites = favorites.filter(movie => movie.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

/*************************
  INIT
**************************/
renderFavorites();

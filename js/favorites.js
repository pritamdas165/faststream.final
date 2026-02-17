const favoritesGrid = document.getElementById("favoritesGrid");
const emptyMsg = document.getElementById("emptyMsg");

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length === 0) {
  emptyMsg.style.display = "block";
} else {
  emptyMsg.style.display = "none";
  renderFavorites();
}

function renderFavorites() {
  favoritesGrid.innerHTML = "";

  favorites.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.poster}" />
      <h3>${movie.title}</h3>
      <button class="remove-btn">Remove</button>
    `;

    card.querySelector(".remove-btn").onclick = () => {
      removeFavorite(movie.id);
    };

    card.onclick = (e) => {
      if (!e.target.classList.contains("remove-btn")) {
        window.location.href = `movie.html?id=${movie.id}`;
      }
    };

    favoritesGrid.appendChild(card);
  });
}

function removeFavorite(id) {
  const updated = favorites.filter(m => m.id != id);
  localStorage.setItem("favorites", JSON.stringify(updated));
  location.reload();
}

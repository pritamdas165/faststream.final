// favorites.js - FULL FINAL WORKING

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favoritesContainer");
  const emptyMsg = document.getElementById("emptyMsg");

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  favorites.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.rating}</p>
      <button class="remove-btn">Remove</button>
    `;

    // Remove from favorites
    card.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromFavorites(movie.id);
    });

    container.appendChild(card);
  });
});

// Remove function
function removeFromFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(movie => movie.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  location.reload();
}

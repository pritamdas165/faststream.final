document.addEventListener("DOMContentLoaded", () => {
  const favoritesList = document.getElementById("favoritesList");
  const emptyMsg = document.getElementById("emptyMsg");

  // Get favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // If no favorites
  if (favorites.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  // Render favorites
  favorites.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <div class="movie-actions">
        <a href="movie.html?id=${movie.id}" class="btn watch-btn">▶ Watch</a>
        <button class="btn remove-btn">❌ Remove</button>
      </div>
    `;

    // Remove from favorites
    card.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromFavorites(movie.id);
    });

    favoritesList.appendChild(card);
  });
});

// Remove function
function removeFromFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(movie => movie.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  location.reload();
}

const favoritesList = document.getElementById("favoritesList");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if (favorites.length === 0) {
  favoritesList.innerHTML = "<p style='color:#fff'>No favorite movies yet ❤️</p>";
} else {
  favorites.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <button class="remove-btn">Remove</button>
    `;

    card.querySelector(".remove-btn").addEventListener("click", () => {
      removeFavorite(movie.id);
    });

    favoritesList.appendChild(card);
  });
}

function removeFavorite(id) {
  favorites = favorites.filter(movie => movie.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  location.reload();
}

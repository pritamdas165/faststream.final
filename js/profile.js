const historyList = document.getElementById("historyList");
const favoriteList = document.getElementById("favoriteList");

const history = JSON.parse(localStorage.getItem("watchHistory")) || [];
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function renderList(list, container, emptyText) {
  if (list.length === 0) {
    container.innerHTML = `<p class="empty-text">${emptyText}</p>`;
    return;
  }

  container.innerHTML = "";

  list.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <a href="movie.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w300${movie.poster}">
        <h3>${movie.title}</h3>
      </a>
    `;

    container.appendChild(card);
  });
}

renderList(history, historyList, "No watch history yet.");
renderList(favorites, favoriteList, "No favorites added.");

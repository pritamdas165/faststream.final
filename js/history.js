const historyList = document.getElementById("historyList");

let history = JSON.parse(localStorage.getItem("watchHistory")) || [];

if (history.length === 0) {
  historyList.innerHTML = `<p class="empty-text">No watch history yet.</p>`;
} else {
  historyList.innerHTML = "";

  history.reverse().forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <a href="movie.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w300${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      </a>
    `;

    historyList.appendChild(card);
  });
}

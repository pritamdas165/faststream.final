const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const searchResults = document.getElementById("searchResults");

// Demo data
const movies = [
  {
    id: "1",
    title: "Demo Movie One",
    type: "movie",
    poster_path: "/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg"
  },
  {
    id: "2",
    title: "Demo Movie Two",
    type: "movie",
    poster_path: "/9O1Iy9od7kIuYt8KQ7x3aF3jG6b.jpg"
  },
  {
    id: "3",
    title: "Demo Series One",
    type: "series",
    poster_path: "/r7XifzvtezNt31ypvsmb6Oqxw49.jpg"
  }
];

function renderResults(list) {
  if (list.length === 0) {
    searchResults.innerHTML = `<p class="empty-text">No result found.</p>`;
    return;
  }

  searchResults.innerHTML = "";

  list.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";

    card.innerHTML = `
      <a href="movie.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}">
        <h3>${movie.title}</h3>
      </a>
    `;

    searchResults.appendChild(card);
  });
}

function applySearch() {
  const keyword = searchInput.value.toLowerCase();
  const type = typeFilter.value;

  let filtered = movies.filter(m =>
    m.title.toLowerCase().includes(keyword)
  );

  if (type !== "all") {
    filtered = filtered.filter(m => m.type === type);
  }

  renderResults(filtered);
}

searchInput.addEventListener("input", applySearch);
typeFilter.addEventListener("change", applySearch);

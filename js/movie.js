const API_KEY = "cc9374659de08b939499a50af4715216";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const trendingContainer = document.getElementById("trendingMovies");

async function loadTrendingMovies() {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/movie/day?language=en-US&api_key=${API_KEY}`
    );

    if (!res.ok) {
      throw new Error("TMDB API Error: " + res.status);
    }

    const data = await res.json();
    trendingContainer.innerHTML = "";

    data.results.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";

      card.innerHTML = `
        <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average}</p>
      `;

      card.onclick = () => {
        window.location.href = `movie.html?id=${movie.id}`;
      };

      trendingContainer.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    trendingContainer.innerHTML = "<p>Movies failed to load</p>";
  }
}

loadTrendingMovies();

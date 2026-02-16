 const API_KEY = "cc9374659de08b939499a50af4715216";
const IMG = "https://image.tmdb.org/t/p/w500";

const moviesDiv = document.getElementById("movies");

fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    data.results.forEach(movie => {
      const div = document.createElement("div");
      div.className = "movie";
      div.innerHTML = `
        <img src="${IMG + movie.poster_path}">
        <h3>${movie.title}</h3>
      `;
      div.onclick = () => {
        window.location.href = `movie.html?id=${movie.id}`;
      };
      moviesDiv.appendChild(div);
    });
  });

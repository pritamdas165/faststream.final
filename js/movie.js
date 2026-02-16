const API_KEY = "cc9374659de08b939499a50af4715216";
const IMG = "https://image.tmdb.org/t/p/w500";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let movieData = null;

fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
  .then(res => res.json())
  .then(data => {
    movieData = data;
    document.getElementById("title").textContent = data.title;
    document.getElementById("overview").textContent = data.overview;
    document.getElementById("poster").src = IMG + data.poster_path;
  });

document.getElementById("favBtn").onclick = () => {
  let fav = JSON.parse(localStorage.getItem("favorites")) || [];

  if (fav.find(m => m.id === movieData.id)) {
    alert("Already added");
    return;
  }

  fav.push({
    id: movieData.id,
    title: movieData.title,
    poster: movieData.poster_path
  });

  localStorage.setItem("favorites", JSON.stringify(fav));
  alert("Added to favorites ❤️");
};

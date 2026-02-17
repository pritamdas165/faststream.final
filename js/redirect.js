/*************************
  GET QUERY PARAM
**************************/
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

/*************************
  REDIRECT LOGIC
**************************/
if (movieId) {
  // small delay for loader UX
  setTimeout(() => {
    window.location.href = `movie.html?id=${movieId}`;
  }, 1200);
} else {
  // fallback if id missing
  alert("Movie not found!");
  window.location.href = "index.html";
}

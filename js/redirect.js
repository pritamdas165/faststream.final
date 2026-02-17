/*************************
  GET MOVIE ID FROM URL
**************************/
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (!movieId) {
  alert("Invalid movie link");
  window.location.href = "index.html";
}

/*************************
  CLICK ANALYTICS (OPEN)
**************************/
let analytics = JSON.parse(localStorage.getItem("clickAnalytics")) || {};

if (!analytics[movieId]) {
  analytics[movieId] = {
    title: movieId,
    watch: 0,
    download: 0,
    open: 0
  };
}

analytics[movieId].open++;
localStorage.setItem("clickAnalytics", JSON.stringify(analytics));

/*************************
  REDIRECT TO MOVIE PAGE
**************************/
setTimeout(() => {
  window.location.href = "movie.html?id=" + movieId;
}, 500);

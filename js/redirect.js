const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  window.location.href = "index.html";
} else {
  window.location.href = "movie.html?id=" + id;
}

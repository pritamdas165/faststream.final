const list = document.getElementById("favList");
let fav = JSON.parse(localStorage.getItem("favorites")) || [];

if (fav.length === 0) {
  list.innerHTML = "<p style='padding:20px'>No favorites yet</p>";
}

fav.forEach(m => {
  const div = document.createElement("div");
  div.className = "movie";
  div.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${m.poster}">
    <h3>${m.title}</h3>
  `;
  div.onclick = () => {
    window.location.href = `movie.html?id=${m.id}`;
  };
  list.appendChild(div);
});

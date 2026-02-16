function trackClick(movie, type) {
  let data = JSON.parse(localStorage.getItem("clickAnalytics")) || {};

  if (!data[movie.id]) {
    data[movie.id] = {
      title: movie.title,
      watch: 0,
      download: 0
    };
  }

  data[movie.id][type]++;

  localStorage.setItem("clickAnalytics", JSON.stringify(data));
}

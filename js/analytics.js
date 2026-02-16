const analyticsList = document.getElementById("analyticsList");

const data = JSON.parse(localStorage.getItem("clickAnalytics")) || {};

analyticsList.innerHTML = "";

if (Object.keys(data).length === 0) {
  analyticsList.innerHTML = "<p style='color:#fff'>No analytics data yet</p>";
} else {
  Object.values(data).forEach(movie => {
    const box = document.createElement("div");
    box.className = "analytics-card";

    box.innerHTML = `
      <h3>${movie.title}</h3>
      <p>▶ Watch clicks: <b>${movie.watch}</b></p>
      <p>⬇ Download clicks: <b>${movie.download}</b></p>
    `;

    analyticsList.appendChild(box);
  });
}

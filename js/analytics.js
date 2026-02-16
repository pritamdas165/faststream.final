const body = document.getElementById("analyticsBody");
const resetBtn = document.getElementById("resetAnalytics");

const analytics = JSON.parse(localStorage.getItem("clickAnalytics")) || {};

function renderAnalytics() {
  body.innerHTML = "";

  const keys = Object.keys(analytics);

  if (keys.length === 0) {
    body.innerHTML = `
      <tr>
        <td colspan="3" style="text-align:center;">
          No analytics data yet
        </td>
      </tr>
    `;
    return;
  }

  keys.forEach(id => {
    const movie = analytics[id];

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${movie.title}</td>
      <td>${movie.watch || 0}</td>
      <td>${movie.download || 0}</td>
    `;

    body.appendChild(row);
  });
}

resetBtn.onclick = () => {
  if (confirm("Reset all analytics data?")) {
    localStorage.removeItem("clickAnalytics");
    location.reload();
  }
};

renderAnalytics();

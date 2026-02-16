const timeEl = document.getElementById("time");
const btn = document.getElementById("continueBtn");

let timeLeft = 5;

const params = new URLSearchParams(window.location.search);
const type = params.get("to"); // watch or download

const timer = setInterval(() => {
  timeLeft--;
  timeEl.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    btn.style.display = "inline-block";
  }
}, 1000);

btn.addEventListener("click", () => {
  if (type === "watch") {
    window.location.href = "https://example.com/watch";
  } else if (type === "download") {
    window.location.href = "https://example.com/download";
  } else {
    window.location.href = "index.html";
  }
});

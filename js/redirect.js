const params = new URLSearchParams(window.location.search);
const target = params.get("to"); // watch / download

let time = 5;
const timeEl = document.getElementById("time");
const btn = document.getElementById("continueBtn");

const timer = setInterval(() => {
  time--;
  timeEl.textContent = time;

  if (time === 0) {
    clearInterval(timer);
    btn.style.display = "block";
  }
}, 1000);

btn.onclick = () => {
  if (target === "watch") {
    window.location.href = "https://example.com/watch";
  } else if (target === "download") {
    window.location.href = "https://example.com/download";
  }
};

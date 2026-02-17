// redirect.js — FULL FINAL

// URL params থেকে data নেওয়া
const params = new URLSearchParams(window.location.search);
const targetUrl = params.get("url");
const movieId = params.get("id");
const actionType = params.get("type"); // watch / download

let counter = 5;
const msg = document.getElementById("msg");

// Analytics save
function saveAnalytics() {
  if (!movieId || !actionType) return;

  let data = JSON.parse(localStorage.getItem("clickAnalytics")) || {};

  if (!data[movieId]) {
    data[movieId] = {
      watch: 0,
      download: 0
    };
  }

  if (actionType === "watch") data[movieId].watch++;
  if (actionType === "download") data[movieId].download++;

  localStorage.setItem("clickAnalytics", JSON.stringify(data));
}

// Countdown + redirect
function startRedirect() {
  const timer = setInterval(() => {
    msg.innerText = `Redirecting in ${counter} seconds...`;
    counter--;

    if (counter < 0) {
      clearInterval(timer);
      saveAnalytics();
      if (targetUrl) {
        window.location.href = targetUrl;
      } else {
        msg.innerText = "Invalid redirect link!";
      }
    }
  }, 1000);
}

startRedirect();

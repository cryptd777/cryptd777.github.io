const current = location.pathname.split("/").pop() || "index.html";
const links = document.querySelectorAll(".nav-links a");
links.forEach((link) => {
  if (link.getAttribute("href") === current) {
    link.classList.add("active");
  }
});

const clock = document.querySelector("[data-live-clock]");
if (clock) {
  const updateClock = () => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const date = now.toLocaleDateString([], { year: "numeric", month: "short", day: "2-digit" });
    clock.textContent = `${date} ${time}`;
  };
  updateClock();
  setInterval(updateClock, 1000);
}

const countdownEls = document.querySelectorAll("[data-countdown]");
countdownEls.forEach((countdown) => {
  const raw = countdown.getAttribute("data-countdown");
  const label = countdown.getAttribute("data-countdown-label") || "Launch";

  const parseDate = (value) => {
    const direct = Date.parse(value);
    if (!Number.isNaN(direct)) return direct;
    const withZ = Date.parse(`${value}Z`);
    if (!Number.isNaN(withZ)) return withZ;
    return Number.NaN;
  };

  const target = parseDate(raw);

  const updateCountdown = () => {
    const now = Date.now();
    const diff = target - now;

    if (Number.isNaN(target)) {
      countdown.textContent = "Launch date not set.";
      return;
    }

    if (diff <= 0) {
      countdown.textContent = `${label}: LIVE`;
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    countdown.textContent = `${label}: ${days}d ${hours}h ${mins}m ${secs}s`;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
});

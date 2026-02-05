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

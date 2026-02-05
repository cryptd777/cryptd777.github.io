const current = location.pathname.split("/").pop() || "index.html";
const links = document.querySelectorAll(".nav-links a");
links.forEach((link) => {
  if (link.getAttribute("href") === current) {
    link.classList.add("active");
  }
});

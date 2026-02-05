const path = location.pathname;
const current = path.split("/").filter(Boolean).pop() || "index.html";

const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (!href) return;

  const isHome = href === "index.html" && (current === "index.html" || path === "/");
  const isProjects = href === "projects.html" && (current === "projects.html" || path.includes("/projects/"));
  const isCurrent = href === current;

  if (isHome || isProjects || isCurrent) {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  }
});

const yearEls = document.querySelectorAll("[data-year]");
const year = new Date().getFullYear();
yearEls.forEach((el) => {
  el.textContent = year;
});

const revealEls = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

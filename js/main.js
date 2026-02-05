const path = location.pathname;
const current = path.split("/").filter(Boolean).pop() || "index.html";

const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach((link) => {
  const href = link.getAttribute("href");
  if (!href) return;

  if (href === "index.html" && (current === "index.html" || path === "/")) {
    link.classList.add("active");
    return;
  }

  if (href === "projects.html" && (current === "projects.html" || path.includes("/projects/"))) {
    link.classList.add("active");
    return;
  }

  if (href === current) {
    link.classList.add("active");
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

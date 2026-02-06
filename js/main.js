const yearTargets = document.querySelectorAll("[data-year]");
const currentYear = new Date().getFullYear();

yearTargets.forEach((el) => {
  el.textContent = currentYear;
});

const navLinks = document.querySelectorAll(".nav-links a");
const currentPath = window.location.pathname.split("/").pop() || "index.html";
navLinks.forEach((link) => {
  const linkPath = link.getAttribute("href").split("/").pop();
  if (linkPath === currentPath) {
    link.classList.add("active");
  }
});

const revealTargets = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("in-view"));
}

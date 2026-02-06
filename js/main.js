const yearTargets = document.querySelectorAll("[data-year]");
const currentYear = new Date().getFullYear();

yearTargets.forEach((el) => {
  el.textContent = currentYear;
});

const navLinks = document.querySelectorAll(".nav-links a");
const pathSegments = window.location.pathname.split("/").filter(Boolean);
const currentFile = pathSegments[pathSegments.length - 1] || "index.html";
const inProjectsFolder = pathSegments.includes("projects");

navLinks.forEach((link) => {
  const linkPath = link.getAttribute("href").split("/").pop();
  const isProjectsLink = linkPath === "projects.html";
  const isActive =
    linkPath === currentFile || (inProjectsFolder && isProjectsLink);

  if (isActive) {
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

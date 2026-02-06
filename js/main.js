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

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const saveData = navigator.connection && navigator.connection.saveData;
const isMobile = window.matchMedia("(max-width: 640px)").matches;
const typeTargets = document.querySelectorAll("[data-type]");

typeTargets.forEach((target) => {
  const text = target.getAttribute("data-type") || "";
  const speed = Number(target.getAttribute("data-type-speed")) || 40;
  const delay = Number(target.getAttribute("data-type-delay")) || 0;
  let index = 0;
  if (reduceMotion || saveData || isMobile) {
    target.textContent = text;
    return;
  }
  target.textContent = "";

  const tick = () => {
    target.textContent = text.slice(0, index);
    index += 1;
    if (index <= text.length) {
      setTimeout(tick, speed);
    }
  };

  setTimeout(tick, delay);
});

if (typeTargets.length === 0) {
  void reduceMotion;
  void saveData;
  void isMobile;
}

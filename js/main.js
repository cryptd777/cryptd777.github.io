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

const typeTargets = document.querySelectorAll("[data-type]");

typeTargets.forEach((target) => {
  const text = target.getAttribute("data-type") || "";
  const speed = Number(target.getAttribute("data-type-speed")) || 40;
  const delay = Number(target.getAttribute("data-type-delay")) || 0;
  let index = 0;
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

const clockTargets = document.querySelectorAll('[data-live="clock"]');
const uptimeTargets = document.querySelectorAll('[data-live="uptime"]');
const metricTargets = document.querySelectorAll('[data-live-value]');
const startTime = Date.now();

const metrics = {
  cpu: 18,
  ram: 42,
  disk: 71,
  net: 1.4,
};

const jitter = (value, min, max, step) => {
  const delta = (Math.random() * step * 2) - step;
  const next = Math.min(max, Math.max(min, value + delta));
  return Number(next.toFixed(1));
};

const formatClock = (date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const formatUptime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${days}d ${String(hours).padStart(2, "0")}h ${String(
    minutes
  ).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
};

const updateLive = () => {
  const now = new Date();
  const uptime = Date.now() - startTime;

  clockTargets.forEach((el) => {
    el.textContent = formatClock(now);
  });

  uptimeTargets.forEach((el) => {
    el.textContent = formatUptime(uptime);
  });

  metrics.cpu = jitter(metrics.cpu, 8, 62, 4.2);
  metrics.ram = jitter(metrics.ram, 26, 78, 3.2);
  metrics.disk = jitter(metrics.disk, 45, 88, 1.4);
  metrics.net = jitter(metrics.net, 0.2, 4.8, 0.6);

  metricTargets.forEach((el) => {
    const key = el.getAttribute("data-live-value");
    if (metrics[key] !== undefined) {
      const suffix = key === "net" ? "mb/s" : "%";
      el.textContent = `${metrics[key]}${suffix}`;
    }
  });
};

if (clockTargets.length || uptimeTargets.length || metricTargets.length) {
  updateLive();
  setInterval(updateLive, 1200);
}

const toggle = document.querySelector(".nav-toggle");
const bar = document.querySelector(".topbar");

if (toggle && bar) {
  toggle.addEventListener("click", () => {
    const open = bar.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  bar.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      bar.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}

const statusEl = document.getElementById("event-status");
if (statusEl) {
  const start = Date.parse(statusEl.dataset.start);
  const end = Date.parse(statusEl.dataset.end);
  const submit = Date.parse(statusEl.dataset.submit);
  const announce = Date.parse("2026-08-27T12:00:00-04:00");
  const now = Date.now();

  const pad = (n) => String(n).padStart(2, "0");
  const until = (target) => {
    const ms = Math.max(0, target - Date.now());
    const h = Math.floor(ms / 3_600_000);
    const m = Math.floor((ms % 3_600_000) / 60_000);
    return `${h}h ${pad(m)}m`;
  };

  if (now < start) {
    statusEl.textContent = `Starts in ${until(start)}`;
  } else if (now <= end) {
    statusEl.textContent = "Build day is live";
  } else if (now <= submit) {
    statusEl.textContent = `Submit by Aug 24 · ${until(submit)} left`;
  } else if (now < announce) {
    statusEl.textContent = "Judging · winner Aug 27";
  } else {
    statusEl.textContent = "Winner announced Aug 27";
  }
}

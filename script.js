const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------
   NAV: shrink on scroll + scroll-spy active section
------------------------------------------------------ */
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll("[data-nav]");
const sections = document.querySelectorAll("main .section, .hero");

const onScrollNav = () => {
  nav.classList.toggle("shrink", window.scrollY > 40);
};
window.addEventListener("scroll", onScrollNav, { passive: true });
onScrollNav();

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);
sections.forEach((section) => {
  if (section.id) spyObserver.observe(section);
});

/* ------------------------------------------------------
   SCROLL REVEAL
------------------------------------------------------ */
const revealEls = document.querySelectorAll(".reveal");

if (prefersReducedMotion) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

/* ------------------------------------------------------
   SCROLL CUE
------------------------------------------------------ */
const scrollCue = document.getElementById("scrollCue");
scrollCue?.addEventListener("click", () => {
  document.getElementById("about")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
});

/* ------------------------------------------------------
   SIGNATURE MARK: one-time particle burst easter egg
------------------------------------------------------ */
document.querySelectorAll(".mark-ring").forEach((mark) => {
  mark.style.cursor = "pointer";
  mark.addEventListener("click", (e) => {
    if (prefersReducedMotion) return;

    const rect = mark.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    for (let i = 0; i < 14; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${originX}px`;
      particle.style.top = `${originY}px`;

      const angle = (Math.PI * 2 * i) / 14;
      const distance = 60 + Math.random() * 50;
      particle.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 850);
    }
  });
});

/* ------------------------------------------------------
   MAGNETIC BUTTONS (subtle, desktop only)
------------------------------------------------------ */
if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".btn, .nav-cta").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.25}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

/* ------------------------------------------------------
   HERO MARK PARALLAX ON SCROLL (gentle)
------------------------------------------------------ */
const heroMark = document.querySelector(".hero-mark");
if (heroMark && !prefersReducedMotion) {
  window.addEventListener(
    "scroll",
    () => {
      const offset = Math.min(window.scrollY * 0.15, 120);
      heroMark.style.transform = `translateY(calc(-50% + ${offset}px))`;
    },
    { passive: true }
  );
}

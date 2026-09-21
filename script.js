const sections = [...document.querySelectorAll("main .section")];
const reveals = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav a");
const dotLinks = document.querySelectorAll(".section-dots a");
const progress = document.getElementById("scrollProgress");
const topbar = document.querySelector(".topbar");
const backTop = document.getElementById("backTop");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.14 });

reveals.forEach(el => revealObserver.observe(el));

function setActiveSection() {
  let current = sections[0]?.id || "";
  const offset = window.innerHeight * 0.38;

  for (const section of sections) {
    const rect = section.getBoundingClientRect();
    if (rect.top <= offset && rect.bottom >= offset) {
      current = section.id;
      break;
    }
  }

  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
  dotLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
}

function onScroll() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
  progress.style.width = `${pct}%`;

  topbar.classList.toggle("is-scrolled", window.scrollY > 24);
  backTop.classList.toggle("show", window.scrollY > 500);

  setActiveSection();
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", setActiveSection);
onScroll();

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") nav.classList.remove("open");
});

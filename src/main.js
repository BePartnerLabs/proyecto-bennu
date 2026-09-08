import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

const pdfBtn = document.getElementById("pdfBtn");
if (pdfBtn) pdfBtn.addEventListener("click", () => window.print());

const offlinePill = document.getElementById("offlinePill");
function updateOnlineState() {
  if (!offlinePill) return;
  offlinePill.hidden = navigator.onLine;
}
window.addEventListener("online", updateOnlineState);
window.addEventListener("offline", updateOnlineState);
updateOnlineState();

const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0, rootMargin: "800px 0px 800px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

// Lightbox: click any photo or diagram to see it enlarged
const lightbox = document.createElement("div");
lightbox.className = "lightbox-overlay";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.setAttribute("aria-hidden", "true");
lightbox.innerHTML = `
  <button class="lightbox-close" type="button" aria-label="Cerrar imagen ampliada">&times;</button>
  <div class="lightbox-content"></div>
`;
document.body.appendChild(lightbox);
const lightboxContent = lightbox.querySelector(".lightbox-content");
const lightboxClose = lightbox.querySelector(".lightbox-close");
let lastFocused = null;

function openLightbox(sourceEl, captionText) {
  lightboxContent.innerHTML = "";
  if (sourceEl.tagName === "IMG") {
    const img = document.createElement("img");
    img.src = sourceEl.currentSrc || sourceEl.src;
    img.alt = sourceEl.alt || "";
    lightboxContent.appendChild(img);
  } else if (sourceEl.tagName.toLowerCase() === "svg") {
    lightboxContent.appendChild(sourceEl.cloneNode(true));
  }
  if (captionText) {
    const cap = document.createElement("p");
    cap.className = "lightbox-caption";
    cap.textContent = captionText;
    lightboxContent.appendChild(cap);
  }
  lastFocused = document.activeElement;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
}

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
lightboxClose.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
});

const zoomTargets = document.querySelectorAll(
  ".photo-band img, .photo-pair img, .diagram-frame img, .diagram-frame svg"
);
zoomTargets.forEach((el) => {
  el.setAttribute("tabindex", "0");
  el.setAttribute("role", "button");
  const figureCaption = el.closest("figure")?.querySelector(".cap-main");
  const diagramCaption = el.closest(".diagram-frame")?.querySelector(".diagram-caption");
  const captionText = (figureCaption || diagramCaption)?.textContent.trim() || el.getAttribute("alt") || "";
  el.setAttribute("aria-label", "Ampliar imagen" + (captionText ? ": " + captionText : ""));

  const activate = () => openLightbox(el, captionText);
  el.addEventListener("click", activate);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      activate();
    }
  });

  const parent = el.closest("figure, .diagram-frame");
  if (parent) {
    if (getComputedStyle(parent).position === "static") parent.style.position = "relative";
    const badge = document.createElement("span");
    badge.className = "zoom-badge";
    badge.setAttribute("aria-hidden", "true");
    badge.innerHTML =
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>';
    parent.appendChild(badge);
  }
});

const navLinks = document.querySelectorAll("[data-nav]");
const sections = Array.from(navLinks)
  .map((a) => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = `#${entry.target.id}`;
          navLinks.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === id);
          });
        }
      }
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

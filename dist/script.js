"use strict";

const body = document.body;
const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("[data-nav-menu]");
const navLinks = navMenu ? Array.from(navMenu.querySelectorAll("a")) : [];
const modalTriggers = Array.from(document.querySelectorAll("[data-modal-target]"));
const modals = Array.from(document.querySelectorAll(".modal"));
const overlay = document.getElementById("overlay");

let activeModal = null;
let lastFocusedElement = null;

/**
 * Navigation behaviour
 */
const setNavState = (isOpen) => {
  if (!navToggle || !navMenu) return;

  body.classList.toggle("nav-open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
};

const handleNavToggle = () => {
  const shouldOpen = !body.classList.contains("nav-open");
  setNavState(shouldOpen);
};

if (navToggle) {
  navToggle.addEventListener("click", handleNavToggle);
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => setNavState(false));
});


window.addEventListener("resize", () => {
  if (window.innerWidth >= 900) {
    setNavState(false);
  }
});

/**
 * Modal helpers
 */
const getFocusableElements = (container) => {
  if (!container) return [];
  const selectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(container.querySelectorAll(selectors.join(",")));
};

const openModal = (modal) => {
  if (!modal) return;

  const alreadyOpen = document.querySelector(".modal[aria-hidden='false']");
  if (alreadyOpen && alreadyOpen !== modal) {
    closeModal(alreadyOpen);
  }

  lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  if (overlay) {
    overlay.hidden = false;
  }
  activeModal = modal;

  const focusable = getFocusableElements(modal);
  if (focusable.length > 0) {
    focusable[0].focus({ preventScroll: true });
  }
};

const closeModal = (modal) => {
  if (!modal) return;

  modal.setAttribute("aria-hidden", "true");
  const openModals = document.querySelectorAll(".modal[aria-hidden='false']");
  if (openModals.length === 0) {
    body.classList.remove("modal-open");
    if (overlay) {
      overlay.hidden = true;
    }
    activeModal = null;
  }

  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus({ preventScroll: true });
    lastFocusedElement = null;
  }
};

const trapFocus = (event, container) => {
  const focusable = getFocusableElements(container);
  if (focusable.length === 0) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

modalTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const targetSelector = trigger.getAttribute("data-modal-target");
    if (!targetSelector) return;
    const modal = document.querySelector(targetSelector);
    if (modal) {
      openModal(modal);
    }
  });
});

modals.forEach((modal) => {
  const closeButton = modal.querySelector("[data-close-button]");
  closeButton?.addEventListener("click", () => closeModal(modal));
});

overlay?.addEventListener("click", () => {
  const openModals = Array.from(document.querySelectorAll(".modal[aria-hidden='false']"));
  openModals.forEach(closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && activeModal) {
    event.preventDefault();
    closeModal(activeModal);
  }

  if (event.key === "Tab" && activeModal) {
    trapFocus(event, activeModal);
  }
});

// Ensure overlay starts hidden when JS loads
if (overlay) {
  overlay.hidden = true;
}

// Navbar recolor on scroll
window.addEventListener("scroll", () => {
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > navbar.offsetHeight);
  }
});

// Typing animation script
new Typed(".typing", {
  strings: ["Front-end, Back-end", "Full-stack Developer"],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true
});


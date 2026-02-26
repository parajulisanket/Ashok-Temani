/*  MOBILE MENU + ACCORDION */
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

const lockScroll = () => {
  document.body.style.overflow = "hidden";
};

const unlockScroll = () => {
  document.body.style.overflow = "";
};

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = mobileMenu.classList.toggle("hidden");

    // toggle body scroll
    if (isHidden) {
      unlockScroll();
    } else {
      lockScroll();
    }
  });

  // Close menu if user clicks outside nav
  document.addEventListener("click", (e) => {
    const nav = e.target.closest("nav");
    const isBtn = e.target.closest("#mobileMenuBtn");

    if (!nav && !isBtn && !mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden");
      unlockScroll();
    }
  });

  // Accordions inside mobile menu
  const accordionBtns = mobileMenu.querySelectorAll("[data-accordion]");
  accordionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-accordion");
      const panel = mobileMenu.querySelector(`[data-accordion-panel="${key}"]`);
      if (!panel) return;
      panel.classList.toggle("hidden");
    });
  });
}

/*  NAVBAR SCROLL COLOR CHANGE */
const nav = document.getElementById("mainNav");
const navHeight = 200;

function setNav() {
  if (!nav) return;

  const scrolled = window.scrollY > navHeight;

  // Background + shadow
  nav.classList.toggle("bg-white", scrolled);
  nav.classList.toggle("shadow-md", scrolled);
  nav.classList.toggle("bg-transparent", !scrolled);
  nav.classList.toggle("nav-glass", !scrolled);

  // Text color (controls all children if you use text-current + inherit)
  nav.classList.toggle("text-black", scrolled);
  nav.classList.toggle("text-white", !scrolled);
}

// Run once immediately + on events
window.addEventListener("load", setNav);
window.addEventListener("scroll", setNav);
setNav();

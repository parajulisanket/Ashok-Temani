// for iamge slide r in hero
(() => {
  const slides = Array.from(
    document.querySelectorAll("#heroPortrait .hero-slide"),
  );
  if (slides.length <= 1) return;

  let i = 0;

  // timing
  const intervalMs = 2600; // 2.6s (change to 2000 or 3000 as you like)
  const transitionMs = 1000;

  // ensure first is visible
  slides.forEach((img, idx) => {
    img.classList.toggle("opacity-100", idx === 0);
    img.classList.toggle("opacity-0", idx !== 0);
    img.classList.toggle("scale-100", idx === 0);
    img.classList.toggle("scale-[1.03]", idx !== 0);
  });

  setInterval(() => {
    const current = slides[i];
    i = (i + 1) % slides.length;
    const next = slides[i];

    // fade current out
    current.classList.remove("opacity-100", "scale-100");
    current.classList.add("opacity-0", "scale-[1.03]");

    // fade next in
    next.classList.remove("opacity-0", "scale-[1.03]");
    next.classList.add("opacity-100", "scale-100");
  }, intervalMs);
})();

// Campaign image carousel (image-only)
(function () {
  const track = document.getElementById("campTrack");
  const prevBtn = document.getElementById("campPrev");
  const nextBtn = document.getElementById("campNext");

  if (!track || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.querySelectorAll(".camp-slide"));
  let index = 0;

  function getStepPx() {
    // slide width + gap
    const first = slides[0];
    if (!first) return 0;
    const gap = parseFloat(
      getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0",
    );
    return first.getBoundingClientRect().width + gap;
  }

  function update() {
    const step = getStepPx();
    track.style.transform = `translateX(${-index * step}px)`;
  }

  function clampIndex() {
    // keep the last slide reachable but don't overscroll too far
    const step = getStepPx();
    const trackWidth = track.scrollWidth;
    const wrapWidth = track.parentElement.getBoundingClientRect().width;

    // maximum translate in px
    const maxTranslate = Math.max(0, trackWidth - wrapWidth);
    const translate = index * step;

    if (translate > maxTranslate) {
      index = Math.floor(maxTranslate / step);
    }
    if (index < 0) index = 0;
  }

  prevBtn.addEventListener("click", () => {
    index -= 1;
    if (index < 0) index = 0;
    update();
  });

  nextBtn.addEventListener("click", () => {
    index += 1;
    clampIndex();
    update();
  });

  window.addEventListener("resize", () => {
    clampIndex();
    update();
  });

  // initial
  update();
})();

// vote count

(function () {
  const btn = document.getElementById("voteBtn");
  const countEl = document.getElementById("voteCount");
  const msgEl = document.getElementById("voteMsg");

  if (!btn || !countEl || !msgEl) return;

  let count = 0;

  btn.addEventListener("click", () => {
    count += 1;
    countEl.textContent = String(count);

    // show message
    msgEl.classList.remove("hidden");

    // hide after 2 seconds
    window.clearTimeout(btn.__voteTimer);
    btn.__voteTimer = window.setTimeout(() => {
      msgEl.classList.add("hidden");
    }, 2000);
  });
})();

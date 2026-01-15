const title = document.getElementById("hero-title");

/* ===== 1. SCROLL SCALE EFFECT ===== */
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const scale = 1 + Math.min(scrollY / 800, 0.4);

  title.style.transform = `translateY(${scrollY * 0.35}px) scale(${scale})`;
});

/* ===== 2. MOUSE TRACE COLOR EFFECT ===== */
const text = title.innerText;
title.innerHTML = "";

[...text].forEach(letter => {
  const span = document.createElement("span");
  span.innerText = letter;
  title.appendChild(span);
});

title.addEventListener("mousemove", e => {
  const rect = title.getBoundingClientRect();
  const x = e.clientX - rect.left;

  title.querySelectorAll("span").forEach((span, i) => {
    const distance = Math.abs(x - (i * rect.width / text.length));
    if (distance < 50) {
      span.style.color = "#3b82f6";
    } else {
      span.style.color = "#e5e7eb";
    }
  });
});

title.addEventListener("mouseleave", () => {
  title.querySelectorAll("span").forEach(span => {
    span.style.color = "#e5e7eb";
  });
});

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(section => {
    const top = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 150) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

/* =======================
   PARALLAX SCROLL EFFECT
======================= */
const parallaxItems = document.querySelectorAll(".parallax-inner");

function handleParallax() {
  const viewportHeight = window.innerHeight;

  parallaxItems.forEach(el => {
    const rect = el.getBoundingClientRect();
    const speed = parseFloat(el.dataset.speed);

    if (rect.top < viewportHeight && rect.bottom > 0) {
      const progress =
        (viewportHeight - rect.top) / (viewportHeight + rect.height);

      const translateY = (progress - 0.5) * speed * 100;
      el.style.transform = `translateY(${translateY}px)`;
    }
  });
}

window.addEventListener("scroll", handleParallax);
handleParallax();
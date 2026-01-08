// Smooth reveal animation on scroll for specific elements
const revealElements = document.querySelectorAll(
  ".section-title, .about-card, .project-card, .education-item, .contact-card, .skill-pill"
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => {
  el.classList.add("hidden-reveal");
  revealObserver.observe(el);
});

/* ===== TYPING ANIMATION ===== */
const roles = ["MERN Stack Developer", "DSA Enthusiast"];

let roleIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing");

function typeEffect() {
  if (charIndex < roles[roleIndex].length) {
    typingElement.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 100);
  } else {
    setTimeout(eraseEffect, 2000);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 60);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 500);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

/* ===== CURSOR ANIMATION ===== */
const cursor = document.querySelector(".cursor");
const cursorBlur = document.querySelector(".cursor-blur");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  cursorBlur.style.left = e.clientX + "px";
  cursorBlur.style.top = e.clientY + "px";
});

/* Grow cursor on interactive elements */
const hoverElements = document.querySelectorAll(
  "a, button, .skill-pill, .project-card"
);

hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(2)";
  });

  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

/* ===== MAGNETIC BUTTON EFFECT ===== */
const magneticBtns = document.querySelectorAll(".project-links a");

magneticBtns.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0, 0)";
  });
});

/* ===== SCROLL INDICATOR ===== */
const scrollIndicator = document.querySelector(".scroll-indicator");

window.addEventListener("scroll", () => {
  if (!scrollIndicator) return;
  if (window.scrollY > 50) {
    scrollIndicator.style.opacity = "0";
    scrollIndicator.style.pointerEvents = "none";
  } else {
    scrollIndicator.style.opacity = "0.6";
    scrollIndicator.style.pointerEvents = "auto";
  }
});

const toggle = document.getElementById("themeToggle");
const line = document.getElementById("pendulumLine");
const orb = document.getElementById("pendulumOrb");
const body = document.body;

let isDragging = false;
let startY = 0;
const pullThreshold = 70; // Distance needed to trigger switch

// Initialize theme
if (localStorage.getItem("theme") === "dark") body.classList.add("dark");

const startDrag = (e) => {
  if (window.innerWidth <= 768) return;
  isDragging = true;
  startY = e.pageY || e.touches[0].pageY;
  toggle.classList.remove("animating");
};

const onDrag = (e) => {
  if (!isDragging) return;

  const currentY = e.pageY || e.touches[0].pageY;
  const distance = Math.max(0, currentY - startY); // Only allow pulling down
  const stretch = distance * 0.5; // Friction effect

  // Apply the stretch visually
  line.style.transform = `scaleY(${1 + stretch / 100})`;
  orb.style.transform = `translateY(${stretch}px)`;

  // Visual feedback when threshold is reached
  if (distance > pullThreshold) {
    orb.style.boxShadow = "0 0 30px var(--accent), 0 0 50px var(--accent)";
  } else {
    orb.style.boxShadow = "0 0 15px var(--accent)";
  }
};

const endDrag = (e) => {
  if (!isDragging) return;

  const currentY = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
  const distance = currentY - startY;

  // Trigger theme change if pulled far enough
  if (distance > pullThreshold) {
    body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      body.classList.contains("dark") ? "dark" : "light"
    );
  }

  // Snap back animation
  isDragging = false;
  toggle.classList.add("animating");
  line.style.transform = `scaleY(1)`;
  orb.style.transform = `translateY(0)`;
};

// Mouse Events
toggle.addEventListener("mousedown", startDrag);
window.addEventListener("mousemove", onDrag);
window.addEventListener("mouseup", endDrag);

// Touch Events (for mobile)
toggle.addEventListener("touchstart", startDrag);
window.addEventListener("touchmove", onDrag);
window.addEventListener("touchend", endDrag);

toggle.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      body.classList.contains("dark") ? "dark" : "light"
    );
  }
});

const mobileToggle = document.getElementById("mobileNavToggle");
const navLinks = document.getElementById("navLinks");

mobileToggle.addEventListener("click", () => {
  mobileToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close when clicking link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

emailjs.init("y8dkHQoBul4k7fSxh");

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  statusText.textContent = "Sending...";
  statusText.style.color = "#999";

  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send("service_vipecs1", "template_ujzmybf", params)
    .then(() => {
      statusText.textContent = " Message sent successfully!";
      statusText.style.color = "#22c55e";
      form.reset();

      setTimeout(() => {
        statusText.textContent = "";
      }, 3000);
    })
    .catch((err) => {
      statusText.textContent = " Failed to send message";
      statusText.style.color = "#ef4444";
      console.error(err);

      setTimeout(() => {
        statusText.textContent = "";
      }, 3000);
    });
});

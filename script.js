/* =============================================
   KALEEM PORTFOLIO — JAVASCRIPT
   ============================================= */

/* =============================================
   1. LOADER
   ============================================= */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    // Trigger hero animations after load
    heroReveal();
  }, 2200);
});

/* Custom cursor removed — using browser default */

/* =============================================
   3. PARTICLES CANVAS
   ============================================= */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const PARTICLE_COUNT = 60;
const particles = [];

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.7 ? '#E87B2C' : '#ffffff';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 120) * 0.08;
        ctx.strokeStyle = '#E87B2C';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* =============================================
   4. NAVBAR
   ============================================= */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
  handleBackToTop();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when nav link clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.nav === current) {
      link.classList.add('active');
    }
  });
}

/* =============================================
   5. HERO TYPING ANIMATION
   ============================================= */
const roles = [
  'AI/ML Engineer & Full-Stack Developer',
  'Computer Science Student @ NUST',
  'Open Source Builder 🚀',
  'Pakistan\'s Next-Gen Tech Builder 🇵🇰'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-text');

function typeLoop() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  let delay = isDeleting ? 40 : 80;
  if (!isDeleting && charIndex === current.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(typeLoop, delay);
}
setTimeout(typeLoop, 2500);

/* =============================================
   6. HERO REVEAL
   ============================================= */
function heroReveal() {
  const elements = document.querySelectorAll('.hero .reveal-up');
  elements.forEach((el, i) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    }, i * 180);
  });
  // Show scroll down
  document.getElementById('scrollDown').style.opacity = '1';
}

/* =============================================
   7. SCROLL REVEAL
   ============================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      // Remove so it re-animates next time it enters viewport
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  // Skip hero elements (handled separately)
  if (!el.closest('.hero')) {
    revealObserver.observe(el);
  }
});

/* =============================================
   8. SKILLS TABS
   ============================================= */
const tabButtons = document.querySelectorAll('.skill-tab');
const skillGrids = {
  languages: document.getElementById('skills-languages'),
  aiml:      document.getElementById('skills-aiml'),
  webdev:    document.getElementById('skills-webdev'),
  tools:     document.getElementById('skills-tools'),
};

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    // Update active tab
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // Show/hide grids with animation
    Object.entries(skillGrids).forEach(([key, grid]) => {
      if (key === target) {
        grid.classList.remove('hidden');
        grid.style.animation = 'none';
        grid.offsetHeight; // reflow
        grid.style.animation = 'fadeInGrid 0.4s ease forwards';
      } else {
        grid.classList.add('hidden');
      }
    });
  });
});

/* =============================================
   9. SKILL CARDS STAGGER ANIMATION
   ============================================= */
const skillCardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const cards = entry.target.querySelectorAll('.skill-card');
    if (entry.isIntersecting) {
      // Animate in with stagger
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 80);
      });
    } else {
      // Reset so they animate again next scroll
      cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skills-grid, .skills-all-grid').forEach(grid => {
  const cards = grid.querySelectorAll('.skill-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  skillCardObserver.observe(grid);
});

/* =============================================
   10. CONTACT FORM
   ============================================= */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.getElementById('sendMsgBtn');
  btn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
  btn.disabled = true;
  setTimeout(() => {
    formSuccess.classList.remove('hidden');
    btn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>';
    btn.disabled = false;
    contactForm.reset();
    setTimeout(() => formSuccess.classList.add('hidden'), 4000);
  }, 1200);
});

/* =============================================
   11. BACK TO TOP
   ============================================= */
const backToTop = document.getElementById('backToTop');
function handleBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =============================================
   12. SCROLL DOWN BUTTON
   ============================================= */
document.getElementById('scrollDown').addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

/* =============================================
   13. PROJECT CARDS TILT EFFECT
   ============================================= */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = (y - centerY) / centerY * -6;
    const rotY = (x - centerX) / centerX * 6;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* =============================================
   14. ABOUT CARDS COUNTER ANIMATION
   ============================================= */
function animateCounters() {
  // Just a visual pulse when about section is visible
  const aboutCards = document.querySelectorAll('.about-card');
  aboutCards.forEach((card, i) => {
    setTimeout(() => {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9) translateY(20px)';
      card.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1) translateY(0)';
      }, 50);
    }, i * 100);
  });
}

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Re-animate every time about section enters viewport
      animateCounters();
    }
  });
}, { threshold: 0.2 });

const aboutSection = document.getElementById('about');
if (aboutSection) aboutObserver.observe(aboutSection);

/* =============================================
   15. DYNAMIC CSS INJECTION
   ============================================= */
const dynamicStyle = document.createElement('style');
dynamicStyle.textContent = `
@keyframes fadeInGrid {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Hover glow on nav logo */
.nav-logo { transition: all 0.3s ease; }

/* Timeline dot pulse */
.timeline-dot {
  animation: dotPulse 2s ease-in-out infinite;
}
@keyframes dotPulse {
  0%,100% { box-shadow: 0 0 0 2px #E87B2C, 0 0 0 4px rgba(232,123,44,0.2); }
  50% { box-shadow: 0 0 0 2px #E87B2C, 0 0 0 8px rgba(232,123,44,0.1); }
}

/* Cert card shimmer */
.cert-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(90deg, transparent 0%, rgba(232,123,44,0.05) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
  pointer-events: none;
}
.cert-card { position: relative; overflow: hidden; }
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Hero name gradient animation */
.hero-name {
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 60%, #E87B2C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-name .dot {
  -webkit-text-fill-color: #E87B2C;
}

/* Skill icon rotation on hover */
.skill-card:hover .skill-icon img {
  animation: iconSpin 0.5s ease;
}
@keyframes iconSpin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(10deg) scale(1.1); }
  100% { transform: rotate(0deg) scale(1); }
}

/* Form input label float */
.form-group input:focus + label,
.form-group textarea:focus + label {
  color: #E87B2C;
}

/* Section divider */
.section::after {
  display: none;
}

/* Orange glow behind section labels */
.section-label {
  display: inline-block;
  position: relative;
}

/* Project card entrance */
.project-card {
  animation-fill-mode: both;
}
`;
document.head.appendChild(dynamicStyle);

/* =============================================
   16. SMOOTH HOVER ON ALL BUTTONS
   ============================================= */
// (cursor removed — using browser default)

/* =============================================
   17. PAGE TRANSITION
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = target.offsetTop - (window.innerWidth <= 768 ? 60 : 72);
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  });
});

/* =============================================
   18. CONSOLE EASTER EGG
   ============================================= */
console.log('%c👋 Hey there, fellow developer!', 'color: #E87B2C; font-size: 18px; font-weight: bold;');
console.log('%cMuhammad Kaleem Sajjad — AI/ML Engineer & Full-Stack Developer', 'color: #fff; font-size: 14px;');
console.log('%c📧 iamkaleemsajjad@gmail.com', 'color: #B0B0B0; font-size: 12px;');
console.log('%c🐙 github.com/iamkaleemsajjad-hue', 'color: #B0B0B0; font-size: 12px;');

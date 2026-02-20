/* ============================================
   PORTFOLIO - JAVASCRIPT INTERACTIONS
   ============================================ */

// ---- NAVBAR SCROLL EFFECT ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- HAMBURGER MENU ----
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

hamburgerBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburgerBtn.classList.toggle('active');
  hamburgerBtn.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// ---- TYPEWRITER EFFECT ----
const typewriterEl = document.getElementById('typewriter-text');
const phrases = [
  'Android Apps',
  'Web Applications',
  'AI-Powered Tools',
  'REST APIs',
  'Smart Solutions'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function typeWrite() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    typewriterEl.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      typeTimeout = setTimeout(typeWrite, 2000);
      return;
    }
  } else {
    typewriterEl.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  typeTimeout = setTimeout(typeWrite, isDeleting ? 60 : 100);
}
typeWrite();

// ---- ANIMATED COUNTER (STATS) ----
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

// ---- SCROLL REVEAL ----
const revealElements = document.querySelectorAll(
  '.project-card, .skill-category, .contact-card, .highlight-item, .about-card-stack, .code-card'
);

revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  if (i % 3 === 1) el.classList.add('delay-1');
  if (i % 3 === 2) el.classList.add('delay-2');
});

const statsSection = document.getElementById('hero-stats');
let statsAnimated = false;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animate skill bars
      const bars = entry.target.querySelectorAll('.skill-bar-fill');
      bars.forEach(bar => {
        bar.classList.add('animated');
      });
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => observer.observe(el));

// Observe stats
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        animateCounter(el, target);
      });
    }
  });
}, { threshold: 0.5 });

if (statsSection) statsObserver.observe(statsSection);

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const formSubmitBtn = document.getElementById('form-submit-btn');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const message = document.getElementById('form-message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields (Name, Email, Message).');
    return;
  }

  // Simulate sending
  formSubmitBtn.textContent = 'Sending...';
  formSubmitBtn.disabled = true;

  setTimeout(() => {
    formSuccess.hidden = false;
    contactForm.reset();
    formSubmitBtn.textContent = 'Send Message ✈';
    formSubmitBtn.disabled = false;

    setTimeout(() => {
      formSuccess.hidden = true;
    }, 5000);
  }, 1200);
});

// ---- SMOOTH ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

sections.forEach(section => activeObserver.observe(section));

// Add active link style
const activeStyle = document.createElement('style');
activeStyle.textContent = `
  .nav-link.active {
    color: var(--clr-primary-light);
    background: rgba(139,92,246,0.08);
  }
`;
document.head.appendChild(activeStyle);

// ---- HERO PARALLAX (subtle) ----
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  const avatar = document.getElementById('hero-avatar');
  if (avatar) {
    avatar.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }

  const chips = document.querySelectorAll('.floating-chip');
  chips.forEach((chip, i) => {
    const factor = (i % 2 === 0 ? 1 : -1) * 0.15 * (i + 1);
    chip.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

console.log('%c Portfolio by Antigravity AI', 'color:#8b5cf6; font-size:16px; font-weight:bold;');
console.log('%c Feel free to explore and customize!', 'color:#06b6d4; font-size:12px;');

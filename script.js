/* =============== SHOW MENU =============== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* Remove menu mobile when a link is clicked */
const navLink = document.querySelectorAll('.nav__link');
const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* Close menu when scrolling */
window.addEventListener('scroll', () => {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

/* =============== CHANGE BACKGROUND HEADER =============== */
const scrollHeader = () =>{
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* =============== SCROLL SECTIONS ACTIVE LINK =============== */
const sections = document.querySelectorAll('section[id]');
const scrollActive = () =>{
    const scrollDown = window.scrollY;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 100,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            if(sectionsClass) sectionsClass.classList.add('active-link');
        }else{
            if(sectionsClass) sectionsClass.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* =============== SHOW SCROLL UP =============== */ 
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 350 viewport height, add the show-scroll class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/* =============== SCROLL ANIMATION (PROJECT CARDS) =============== */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show-card');
            observer.unobserve(entry.target); // Stop observing once it's shown
        }
    });
}, observerOptions);

const projectCards = document.querySelectorAll('.projects__card');
projectCards.forEach(card => {
    observer.observe(card);
});

/* =============== TYPEWRITER EFFECT =============== */
const typewriterEl = document.getElementById('typewriter-text');
if (typewriterEl) {
  const phrases = [
    'Fast Web Apps',
    'Responsive Interfaces',
    'Interactive UIs',
    'Modern Frontends'
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
}

/* =============== HERO PARALLAX (subtle) =============== */
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

// ===== Real-Time Clock =====
function updateClock() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, '0');
  const m = now.getMinutes().toString().padStart(2, '0');
  const s = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('clockTime').textContent = `${h}:${m}:${s}`;
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('clockDate').textContent = now.toLocaleDateString('en-US', opts);
}
updateClock();
setInterval(updateClock, 1000);

// ===== Scroll Progress Bar =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = pct + '%';
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.mobile-link');

function updateActiveLink() {
  const scrollPos = window.scrollY + 140;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('data-section') === id));
      mobileLinks.forEach(link => link.classList.toggle('active', link.getAttribute('data-section') === id));
    }
  });
}
window.addEventListener('scroll', updateActiveLink);

// ===== Mobile Menu Toggle =====
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

navToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ===== Project Tabs =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    tabContents.forEach(content => {
      content.classList.toggle('active', content.id === `tab-${tab}`);
    });
  });
});

// ===== Scroll Reveal Animation =====
function reveal() {
  const elements = document.querySelectorAll('.project-card, .skill-category, .contact-card, .timeline-item, .info-card, .other-side-card');
  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 90) {
      el.classList.add('reveal', 'visible');
    }
  });
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ===== Back to Top =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Smooth scroll for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== Typing Animation =====
const typingPhrases = [
  'exploring AI tools',
  'mastering Claude Code',
  'analyzing data',
  'building with AI',
  'leveling up daily',
];

const typingEl = document.getElementById('typingText');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingPaused = false;

function typeWriter() {
  if (!typingEl) return;

  const current = typingPhrases[phraseIndex];

  if (!isDeleting) {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      typingPaused = true;
      setTimeout(() => { typingPaused = false; isDeleting = true; typeWriter(); }, 2000);
      return;
    }
  } else {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    }
  }

  const speed = isDeleting ? 45 : 85;
  setTimeout(typeWriter, speed);
}

setTimeout(typeWriter, 1200);

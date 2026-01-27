const hamburger = document.querySelector(".hamburgers");
const menu = document.querySelector(".navbar .menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
})

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.navbar');
  const links = Array.from(document.querySelectorAll('.navbar .menu a, .nav-right a.About-button, .navbar .menu li a'));
  const sections = links.map(l => {
    const href = l.getAttribute('href') || '';
    if (!href.startsWith('#')) return null;
    return document.getElementById(href.slice(1));
  }).filter(Boolean);

  function getOffset() {
    return header ? Math.round(header.getBoundingClientRect().height) : parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-offset')) || 80;
  }

  function scrollToSection(el, smooth = true) {
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - getOffset() + 6;
    window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }

  // click handlers
  links.forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) scrollToSection(target, true);
      // update active immediately
      links.forEach(x => x.classList.remove('active'));
      this.classList.add('active');
      // close mobile menu if implemented
      const menu = document.querySelector('.navbar .menu');
      if (menu && menu.classList.contains('mobile')) menu.classList.remove('mobile');
    });
  });


  
  // update active on scroll (throttled)
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      const fromTop = window.scrollY + getOffset() + 8;
      let current = sections[0];
      for (const sec of sections) {
        if (sec.offsetTop <= fromTop) current = sec;
      }
      links.forEach(l => l.classList.remove('active'));
      if (current) {
        const activeLink = document.querySelector(`.navbar .menu a[href="#${current.id}"], .nav-right a[href="#${current.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // if page loaded with hash -> scroll to it
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));
    if (target) setTimeout(() => scrollToSection(target, false), 60);
  }
});

document.querySelector('.About-button').addEventListener('click', function () {
  document.querySelector('#about').scrollIntoView({
    behavior: 'smooth'
  });
});

const aboutBtn = document.querySelector('.About-button');

aboutBtn.addEventListener('click', () => {
  document.querySelector('#about').scrollIntoView({
    behavior: 'smooth'
  });
});

const loaded = document.querySelector('.loader');

function loaderActive() {
  loaded.classList.add("loader-active");
}

function loaderActiveTime() {
  setInterval(loaderActive, 3000);
}

window.onload = loaderActiveTime;

document.querySelectorAll(".destination-card").forEach(card => {
  card.addEventListener("click", () => {
    const loc = card.querySelector(".loc");
    loc.style.display =
      loc.style.display === "block" ? "none" : "block";
  });
});

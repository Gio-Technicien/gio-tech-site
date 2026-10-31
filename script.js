'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Intro logo animation; the page remains accessible if motion is reduced.
  if (intro) {
    if (prefersReducedMotion) {
      intro.classList.add('done');
    } else {
      window.setTimeout(() => intro.classList.add('done'), 2300);
      intro.addEventListener('click', () => intro.classList.add('done'), { once: true });
    }
  }

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('navigation');
  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Ouvrir le menu' : 'Fermer le menu');
      navigation.classList.toggle('open', !isOpen);
    });
    navigation.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navigation.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Ouvrir le menu');
      });
    });
  }

  // Reveal elements only when supported; all content remains available without JS.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  // No server stores form data: validate and open the visitor's own email client.
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim().slice(0, 100);
      const email = String(data.get('email') || '').trim().slice(0, 254);
      const subject = String(data.get('subject') || '').trim().slice(0, 120);
      const message = String(data.get('message') || '').trim().slice(0, 3000);
      const body = `Nom : ${name}\nCourriel : ${email}\n\n${message}`;
      const mailto = `mailto:gio.technicien@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (note) note.textContent = 'Ouverture de votre application de courriel…';
      window.location.href = mailto;
    });
  }
});

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

  // Le formulaire est envoyé directement à Formspree par POST natif.
  // Turnstile ajoute automatiquement son jeton; aucune clé secrète n'est exposée ici.

});

(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.body.classList.add('page-fade');

  var particleField = document.getElementById('problemParticles');
  if (particleField) {
    for (var index = 0; index < 42; index += 1) {
      var particle = document.createElement('i');
      particle.style.setProperty('--x', ((index * 37 + 11) % 100) + '%');
      particle.style.setProperty('--y', ((index * 61 + 7) % 100) + '%');
      particle.style.setProperty('--size', (1 + ((index * 7) % 5)) + 'px');
      particle.style.setProperty('--delay', (-((index * 0.43) % 7)) + 's');
      particle.style.setProperty('--duration', (4 + ((index * 13) % 6)) + 's');
      particleField.appendChild(particle);
    }
  }

  var revealItems = document.querySelectorAll('.problem-reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8%' });

    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  var backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.textContent = '↑';
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', function () {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}());

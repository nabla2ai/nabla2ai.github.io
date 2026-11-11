/* ============================================================================
   Nabla Square — site behaviour
   Theme toggle · mobile nav · scroll spy · reveal on scroll · contact form
   Vanilla JS, no dependencies. Everything degrades gracefully without it.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme ------------------------------------------------------- */
  var toggle = document.getElementById('themeToggle');

  function labelFor(theme) {
    return theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  }

  if (toggle) {
    toggle.setAttribute('aria-label', labelFor(root.getAttribute('data-theme')));

    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      toggle.setAttribute('aria-label', labelFor(next));
      try {
        localStorage.setItem('ns-theme', next);
      } catch (e) {
        /* storage blocked — the choice just won't persist */
      }
    });
  }

  // Follow the OS if the visitor has never made an explicit choice.
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var onScheme = function (e) {
    var stored = null;
    try { stored = localStorage.getItem('ns-theme'); } catch (err) { /* ignore */ }
    if (!stored) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      if (toggle) toggle.setAttribute('aria-label', labelFor(root.getAttribute('data-theme')));
    }
  };
  if (mq.addEventListener) mq.addEventListener('change', onScheme);
  else if (mq.addListener) mq.addListener(onScheme);

  /* ---------- Mobile navigation ------------------------------------------ */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove('is-open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    }
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeNav();
    });
  }

  /* ---------- Header shadow on scroll ------------------------------------ */
  var header = document.getElementById('header');
  var onScroll = function () {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Reveal on scroll ------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    // Stagger siblings slightly so grids arrive in sequence, not as a slab.
    Array.prototype.forEach.call(revealables, function (el) {
      var siblings = Array.prototype.filter.call(el.parentNode.children, function (n) {
        return n.classList && n.classList.contains('reveal');
      });
      var i = siblings.indexOf(el);
      if (i > 0) el.style.transitionDelay = Math.min(i, 5) * 60 + 'ms';
      io.observe(el);
    });
  }

  /* ---------- Scroll spy -------------------------------------------------- */
  var navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');
  var sections = [];

  Array.prototype.forEach.call(navAnchors, function (a) {
    var el = document.querySelector(a.getAttribute('href'));
    if (el) sections.push({ el: el, link: a });
  });

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var match = sections.filter(function (s) { return s.el === entry.target; })[0];
        if (!match) return;
        Array.prototype.forEach.call(navAnchors, function (a) {
          a.classList.remove('is-active');
        });
        match.link.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { spy.observe(s.el); });
  }

  /* ---------- Contact form ------------------------------------------------
     Static hosting has no backend, so the form composes an email instead.
     To use a form service (Formspree, Netlify, Getform…), give the <form>
     an `action` attribute and this handler steps aside automatically.
  ------------------------------------------------------------------------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  var INBOX = 'admin@nablasquareai.co.uk';

  if (form && !form.getAttribute('action')) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var get = function (name) {
        var f = form.elements[name];
        return f ? String(f.value).trim() : '';
      };

      var subject = 'Enquiry — ' + (get('interest') || 'Nabla Square');
      var body = [
        'Name: ' + get('name'),
        'Organisation: ' + (get('organisation') || '—'),
        'Email: ' + get('email'),
        'Interested in: ' + get('interest'),
        '',
        get('message')
      ].join('\n');

      window.location.href =
        'mailto:' + INBOX +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      if (note) {
        note.textContent = 'Opening your email app… if nothing happens, write to ' + INBOX + '.';
      }
    });
  }

  /* ---------- Footer year -------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

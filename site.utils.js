/**
 * site.utils.js — Wolban Short Lets
 * Shared utilities loaded on every page.
 * Requires site.config.js to be loaded first.
 */
(function () {
  'use strict';

  /* ── Page Loader ──────────────────────────────────────────── */
  function hideLoader() {
    var el = document.getElementById('page-loader');
    if (!el) return;
    el.classList.add('hidden');
    setTimeout(function () { el.remove(); }, 600);
  }

  /* ── Load Partials (navbar + footer) ────────────────────── */
  function loadPartial(url, targetId, callback) {
    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('Failed to load ' + url);
        return r.text();
      })
      .then(function (html) {
        var el = document.getElementById(targetId);
        if (el) el.innerHTML = html;
        if (typeof callback === 'function') callback();
      })
      .catch(function (err) {
        console.warn('[Wolban] Partial load error:', err);
      });
  }

  function loadNavbar(cb) {
    loadPartial('navbar.html', 'navbar-placeholder', function () {
      setActiveNavLink();
      initScrollNavbar();
      if (typeof cb === 'function') cb();
    });
  }

  function loadFooter() {
    loadPartial('footer.html', 'footer-placeholder', populateFooter);
  }

  /* ── Populate Footer from SITE_CONFIG ───────────────────── */
  function populateFooter() {
    if (typeof SITE_CONFIG === 'undefined') return;

    var c = SITE_CONFIG.contact;
    var s = SITE_CONFIG.social;

    /* Copyright */
    var cpEl = document.getElementById('footer-copyright');
    if (cpEl) cpEl.innerHTML = SITE_CONFIG.copyright;

    /* Contact column */
    var ccEl = document.getElementById('footer-contact-col');
    if (ccEl) {
      ccEl.innerHTML =
        '<p class="f-heading">Get In Touch</p>' +
        '<div class="f-contact-row"><i class="fas fa-map-marker-alt"></i>' +
          '<span>' + c.addressLine1 + ',<br>' + c.addressLine2 + '</span>' +
        '</div>' +
        '<div class="f-contact-row"><i class="fas fa-phone"></i>' +
          '<a href="tel:' + c.phone + '">' + c.phoneDisplay + '</a>' +
        '</div>' +
        '<div class="f-contact-row"><i class="fas fa-envelope"></i>' +
          '<a href="mailto:' + c.email + '">' + c.email + '</a>' +
        '</div>' +
        '<div class="f-contact-row"><i class="fab fa-whatsapp"></i>' +
          '<a href="https://wa.me/' + c.whatsapp.replace(/\D/g, '') + '" ' +
             'target="_blank" rel="noopener noreferrer">WhatsApp Us</a>' +
        '</div>';
    }

    /* Social icons */
    var siEl = document.getElementById('footer-social-icons');
    if (siEl) {
      siEl.innerHTML =
        '<a href="' + s.facebook + '" target="_blank" rel="noopener noreferrer" aria-label="Facebook">' +
          '<i class="fab fa-facebook-f"></i></a>' +
        '<a href="' + s.instagram + '" target="_blank" rel="noopener noreferrer" aria-label="Instagram">' +
          '<i class="fab fa-instagram"></i></a>';
    }
  }

  /* ── Active Nav Link ─────────────────────────────────────── */
  function setActiveNavLink() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('#navbar-placeholder .nav-link');
    links.forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('/').pop();
      if (href === path) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ── Sticky / Scrolled Navbar ────────────────────────────── */
  function initScrollNavbar() {
    function onScroll() {
      var nav = document.querySelector('.navbar-custom');
      if (!nav) return;
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Scroll Reveal ───────────────────────────────────────── */
  function initReveal() {
    var targets = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
    if (!targets.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (t) { io.observe(t); });
  }

  /* ── Boot ────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    loadNavbar();
    loadFooter();
    initReveal();

    /* Hide loader after all resources are ready */
    window.addEventListener('load', function () {
      hideLoader();
    });
    /* Fallback: hide loader after 2.5 s regardless */
    setTimeout(hideLoader, 2500);
  });

  /* Expose helpers globally for page-level scripts */
  window.WolbanUtils = {
    hideLoader: hideLoader,
    initReveal: initReveal,
  };

}());

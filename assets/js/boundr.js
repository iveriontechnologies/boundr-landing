/* ==========================================================================
   kit/scripts/boundr.js — every behaviour on the Boundr landing page.

   Nine things, in order: sticky nav, mobile drawer, reveal-on-scroll, KPI
   count-up, dashboard tabs, FAQ accordion, billing toggle, smooth scroll, and
   reduced-motion running through all of them.

   THE RULE THIS FILE FOLLOWS

   The page is complete before this script runs. Every FAQ answer is in the
   markup and open, all three dashboard panels are visible with their own
   headings, the monthly prices are the ones written in the HTML, and the
   meters are already filled to their real width. This script only ever
   *takes away* — it collapses, hides and swaps. Nothing here creates content.

   That is what makes the page work with JavaScript off: the no-JS state is
   not a fallback anyone had to think about, it is simply the markup.

   No dependencies, no build step, IIFE so nothing leaks to window.
   ========================================================================== */

(function () {
  'use strict';

  var root = document.documentElement;

  /* Motion has two independent switches: the buyer's, set as data-motion on
     <html>, and the visitor's OS setting. Either one turns animation off, and
     the visitor's always wins. */
  var motionAttr = root.getAttribute('data-motion') || 'full';
  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reduced = motionAttr === 'off' || prefersReduced;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }


  /* ------------------------------------------------------------- 1. NAV */

  var nav = $('[data-nav]');
  if (nav) {
    var lastScrolled = null;
    var onScroll = function () {
      var scrolled = window.scrollY > 24;
      if (scrolled === lastScrolled) return;   // don't touch the DOM to say nothing changed
      lastScrolled = scrolled;
      if (scrolled) nav.setAttribute('data-scrolled', '');
      else nav.removeAttribute('data-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* ---------------------------------------------------------- 2. DRAWER */

  var burger = $('[data-drawer-toggle]');
  var drawer = $('[data-drawer]');
  if (burger && drawer) {
    var setDrawer = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      if (open) drawer.removeAttribute('hidden');
      else drawer.setAttribute('hidden', '');
    };

    burger.addEventListener('click', function () {
      setDrawer(burger.getAttribute('aria-expanded') !== 'true');
    });

    $$('[data-drawer-close]', drawer).forEach(function (link) {
      link.addEventListener('click', function () { setDrawer(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || burger.getAttribute('aria-expanded') !== 'true') return;
      setDrawer(false);
      burger.focus();       // never strand focus inside something just closed
    });

    /* The burger is display:none above 861px. A drawer left open while the
       window is widened would otherwise stay in the layout with no way to
       close it, because its only trigger is gone. */
    var wide = window.matchMedia('(min-width: 861px)');
    var onWide = function (e) { if (e.matches) setDrawer(false); };
    if (wide.addEventListener) wide.addEventListener('change', onWide);
    else if (wide.addListener) wide.addListener(onWide);       // Safari < 14
  }


  /* -------------------------------------------------- 3. REVEAL ON SCROLL

     Content is never gated behind a scroll that might not happen: the class
     that hides a section is added by this script, not by the stylesheet, and
     only once we know IntersectionObserver exists to take it off again. */

  if (!reduced && 'IntersectionObserver' in window) {
    /* Two ways to mark something up. [data-reveal] on one element, with an
       optional delay in ms; or [data-reveal-group] on a container, which
       staggers its children so a grid arrives as a run rather than a slab. */
    var targets = $$('[data-reveal]');
    $$('[data-reveal-group]').forEach(function (group) {
      var step = Number(group.getAttribute('data-reveal-group')) || 90;
      $$(':scope > *', group).forEach(function (child, i) {
        if (child.hasAttribute('data-reveal')) return;
        child.setAttribute('data-reveal', String(i * step));
        targets.push(child);
      });
    });

    if (targets.length) {
      targets.forEach(function (el) { el.classList.add('is-hidden'); });

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = Number(el.getAttribute('data-reveal')) || 0;
          setTimeout(function () { el.classList.remove('is-hidden'); }, delay);
          io.unobserve(el);
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });

      targets.forEach(function (el) { io.observe(el); });

      /* Failsafe. If anything at all goes wrong — a browser quirk, a section
         that never intersects because it is inside a scroller — the page must
         not be left with invisible content. */
      setTimeout(function () {
        targets.forEach(function (el) { el.classList.remove('is-hidden'); });
      }, 3000);
    }
  }


  /* --------------------------------------------------------- 4. COUNT-UP

     The final figure is what the HTML says. This animates *to* it and then
     writes it back verbatim, so a dropped frame or an early navigation can
     never leave the page reading $0. */

  var counters = $$('[data-count-to]');
  if (counters.length) {
    counters.forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count-to'));
      var decimals = Number(el.getAttribute('data-count-decimals')) || 0;
      var final = el.textContent;
      if (isNaN(target)) return;

      var run = function () {
        if (reduced) return;                         // the markup already reads right
        var start = null;
        var duration = 1100;
        /* The count starts a quarter of the way up, not at zero. A figure
           reading "$0" is a claim, and for the fraction of a second before the
           first frame lands it is the wrong one — which also means every
           screenshot of this section caught it saying nothing was flagged. */
        var from = target * 0.25;
        /* The backstop. requestAnimationFrame does not run in a background
           tab, so a visitor who opens the page in one and comes back later
           would otherwise find the figure frozen at whatever fraction it
           reached — or at zero. This puts the authored figure back regardless,
           and `done` stops a resumed animation from undoing it. */
        var done = false;
        setTimeout(function () { done = true; el.textContent = final; }, duration + 400);

        var step = function (now) {
          if (done) return;
          if (start === null) start = now;
          var p = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          if (p < 1) {
            el.textContent = (from + (target - from) * eased).toLocaleString('en-US', {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals
            });
            requestAnimationFrame(step);
          } else {
            done = true;
            el.textContent = final;                  // back to the authored string
          }
        };
        requestAnimationFrame(step);
      };

      if ('IntersectionObserver' in window) {
        var kio = new IntersectionObserver(function (entries) {
          if (!entries[0].isIntersecting) return;
          kio.disconnect();
          run();
        }, { threshold: 0.4 });
        kio.observe(el);
      } else {
        run();
      }
    });
  }


  /* ------------------------------------------------------------- 5. TABS */

  var tablist = $('[data-tablist]');
  if (tablist) {
    var tabs = $$('[role="tab"]', tablist);
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });

    if (tabs.length && panels.every(Boolean)) {
      // The strip is only useful now that something is listening to it.
      tablist.removeAttribute('hidden');
      // Each panel carried its own heading for the no-JS stack. The tab is
      // that heading now, and two of them would be one too many.
      $$('[data-panel-label]').forEach(function (h) { h.setAttribute('hidden', ''); });

      var select = function (index, focus) {
        tabs.forEach(function (tab, i) {
          var on = i === index;
          tab.setAttribute('aria-selected', String(on));
          tab.setAttribute('tabindex', on ? '0' : '-1');
          if (on) panels[i].removeAttribute('hidden');
          else panels[i].setAttribute('hidden', '');
        });
        if (focus) tabs[index].focus();
      };

      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(i); });
      });

      /* Arrow-key navigation, per the WAI-ARIA tabs pattern: the strip is one
         tab stop and the arrows move between the tabs inside it. */
      tablist.addEventListener('keydown', function (e) {
        var current = tabs.indexOf(document.activeElement);
        if (current === -1) return;
        var next = null;
        if (e.key === 'ArrowRight') next = (current + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') next = (current - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        if (next === null) return;
        e.preventDefault();
        select(next, true);
      });

      // Which tab opens on, as a documented option on the section.
      var wanted = tabs.map(function (t) { return t.id; })
        .indexOf('tab-' + (tablist.getAttribute('data-default-tab') || 'flagged'));
      select(wanted === -1 ? 0 : wanted);
    }
  }


  /* --------------------------------------------------------------- 6. FAQ

     Every answer ships open. Closing them is this script's job, so a visitor
     without JavaScript reads all seven rather than none. */

  var faqButtons = $$('.bd-faq__q');
  if (faqButtons.length) {
    var answers = faqButtons.map(function (b) { return document.getElementById(b.getAttribute('aria-controls')); });

    var openOnly = function (index) {
      faqButtons.forEach(function (btn, i) {
        var on = i === index;
        btn.setAttribute('aria-expanded', String(on));
        if (!answers[i]) return;
        if (on) answers[i].removeAttribute('hidden');
        else answers[i].setAttribute('hidden', '');
      });
    };

    faqButtons.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        openOnly(btn.getAttribute('aria-expanded') === 'true' ? -1 : i);
      });
    });

    openOnly(0);
  }


  /* --------------------------------------------------------- 7. BILLING */

  var billingButtons = $$('[data-billing]');
  if (billingButtons.length) {
    var swap = function (period) {
      billingButtons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', String(btn.getAttribute('data-billing') === period));
      });
      $$('[data-' + period + ']').forEach(function (el) {
        var next = el.getAttribute('data-' + period);
        if (next === null || el.textContent === next) return;
        el.textContent = next;
        if (reduced) return;
        // Restart the flip rather than let a fast double-click swallow it.
        el.classList.remove('is-swapped');
        void el.offsetWidth;
        el.classList.add('is-swapped');
      });
    };

    billingButtons.forEach(function (btn) {
      btn.addEventListener('click', function () { swap(btn.getAttribute('data-billing')); });
    });
  }


  /* --------------------------------------------------- 8. SMOOTH SCROLL */

  $$('[data-scroll-to]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.getElementById(link.getAttribute('data-scroll-to'));
      if (!target) return;                     // let the href do its job
      e.preventDefault();
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      /* scrollIntoView moves the viewport and nothing else, so keyboard focus
         would still be back at the link. tabindex="-1" makes the section
         focusable without adding it to the tab order. */
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

})();

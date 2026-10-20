// Marketing concept prototype. JA is intentionally selected on each fresh load.
const activeMotions = new Map();
let motionRevision = 0;
const localeButtons = document.querySelectorAll('.lang-btn');
function setLocale(locale) {
  if (locale !== 'ja' && locale !== 'en') return;
  // Language changes settle ongoing effects without replaying seen elements.
  finishActiveMotion();
  document.documentElement.lang = locale;
  document.documentElement.dataset.locale = locale;
  document.querySelectorAll('[data-ja][data-en]').forEach(el => {
    // Only static, authored design copy is injected. Never use this on untrusted text.
    el.innerHTML = el.getAttribute('data-' + locale);
  });
  document.querySelectorAll('[data-alt-ja][data-alt-en]').forEach(el => {
    el.alt = el.getAttribute('data-alt-' + locale);
  });
  document.querySelectorAll('[data-aria-ja][data-aria-en]').forEach(el => {
    el.setAttribute('aria-label', el.getAttribute('data-aria-' + locale));
  });
  localeButtons.forEach(el => {
    const active = el.dataset.locale === locale;
    el.classList.toggle('active', active);
    el.setAttribute('aria-pressed', String(active));
  });
  document.title = locale === 'ja'
    ? 'OAK ESPRESSO｜和歌山・北ぶらくり丁'
    : 'OAK ESPRESSO | A cafe in Wakayama';
  document.querySelector('meta[name="description"]').content = locale === 'ja'
    ? 'OAK ESPRESSO — 和歌山・北ぶらくり丁のカフェ＆ロースタリー。営業提案用デザインサンプルです。'
    : 'A design preview for OAK ESPRESSO, a cafe and roastery in Wakayama, Japan.';
}
localeButtons.forEach(button => button.addEventListener('click', () => setLocale(button.dataset.locale)));
setLocale('ja');

function finishActiveMotion() {
  motionRevision += 1;
  activeMotions.forEach(animation => animation.cancel());
  activeMotions.clear();
}

function initMotion() {
  // Content is visible by default: there are no hidden/pending CSS states.
  // Missing APIs, a script error or a slow image never prevents reading it.
  if (!window.matchMedia || !window.IntersectionObserver || !Element.prototype.animate) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) return;

  let stopped = false;
  let observer;
  const seen = new WeakSet();
  const settings = new Map();

  function stop() {
    stopped = true;
    if (observer) observer.disconnect();
    finishActiveMotion();
  }

  function play(element, options = {}) {
    if (stopped || reducedMotion.matches || document.hidden) return;
    // A focused action must remain fully visible and stationary.
    if (element.contains(document.activeElement)) return;
    try {
      const animation = element.animate([
        { opacity: options.opacity ?? 0.15, transform: `translateY(${options.distance ?? 10}px)` },
        { opacity: 1, transform: 'none' }
      ], {
        duration: options.duration ?? 320,
        delay: options.delay ?? 0,
        easing: 'cubic-bezier(.22, 1, .36, 1)',
        fill: 'backwards'
      });
      activeMotions.set(element, animation);
      const cleanup = () => {
        if (activeMotions.get(element) === animation) activeMotions.delete(element);
      };
      animation.onfinish = cleanup;
      animation.oncancel = cleanup;
    } catch {
      stop();
    }
  }

  async function reveal(element) {
    const revision = motionRevision;
    const images = [...element.querySelectorAll('img')];
    if (images.length) {
      // Keep the normal image/alt visible while waiting; do not hold up text.
      await Promise.all(images.map(img => img.decode ? img.decode().catch(() => {}) : Promise.resolve()));
    }
    if (stopped || revision !== motionRevision) return;
    const rect = element.getBoundingClientRect();
    // A fast jump past an element must not make it fade out on the way back.
    if (rect.top < 0 || rect.top >= window.innerHeight || rect.bottom <= 0) return;
    const options = { ...settings.get(element) };
    if (element.matches('.space-detail') && window.matchMedia('(max-width: 700px)').matches) {
      options.delay = 24;
    }
    play(element, options);
  }

  const groups = [
    ['.concept .editorial-title', {}],
    ['.concept .body-copy', { delay: 48, distance: 6 }],
    ['.concept-bottom-note', { delay: 72, distance: 4 }],
    ['.concept-media', { duration: 360, distance: 6 }],
    ['.offer-intro .editorial-title', {}],
    ['.offer-caption', { delay: 48, distance: 6 }],
    ['.offer-card', { duration: 360, distance: 6, stagger: 48 }],
    ['.availability-note', { duration: 260, distance: 4 }],
    ['.beans h2', {}],
    ['.beans-copy > p', { delay: 48, distance: 6 }],
    ['.beans-photo', { duration: 360, distance: 6 }],
    ['.beans-pack-inline', { delay: 64, duration: 300, distance: 4 }],
    ['.space-heading', {}],
    ['.space-after', { delay: 48, distance: 6 }],
    ['.space-wide', { duration: 360, distance: 6 }],
    ['.space-detail', { delay: 80, duration: 360, distance: 6 }],
    ['.story-title', {}],
    ['.story-details', { delay: 56, distance: 6 }],
    ['.visit-intro h2', {}],
    ['.visit-intro > p', { delay: 48, distance: 6 }],
    ['.visit-card', { delay: 64, distance: 6 }]
  ];

  try {
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || seen.has(entry.target)) return;
        seen.add(entry.target);
        observer.unobserve(entry.target);
        reveal(entry.target).catch(stop);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    groups.forEach(([selector, options]) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        settings.set(element, { ...options, delay: (options.delay ?? 0) + index * (options.stagger ?? 0) });
        observer.observe(element);
      });
    });

    // Hero is never gated on image loading or a timer. Its photograph stays
    // immediately visible, and its copy/actions start partially visible.
    [
      ['.hero-title', { duration: 300, opacity: 0.4, distance: 6 }],
      ['.hero-description', { delay: 32, duration: 300, opacity: 0.4, distance: 6 }],
      ['.hero-cta-line', { delay: 64, duration: 280, opacity: 0.6, distance: 4 }],
      ['.hero-footnote', { delay: 96, duration: 240, opacity: 0.6, distance: 4 }]
    ].forEach(([selector, options]) => {
      const element = document.querySelector(selector);
      if (!element) return;
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        seen.add(element);
        play(element, options);
      } else if (rect.top >= window.innerHeight) {
        // On narrow screens, copy/actions below the initial photo enter later.
        settings.set(element, options);
        observer.observe(element);
      }
    });

    document.addEventListener('focusin', event => {
      activeMotions.forEach((animation, element) => {
        if (element.contains(event.target)) {
          animation.cancel();
          activeMotions.delete(element);
        }
      });
    });
    if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', event => {
      if (event.matches) stop();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) finishActiveMotion();
    });
    window.addEventListener('pagehide', stop, { once: true });
  } catch {
    stop();
  }
}

initMotion();

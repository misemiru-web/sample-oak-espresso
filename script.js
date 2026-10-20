// Marketing concept prototype. JA is intentionally selected on each fresh load.
const localeButtons = document.querySelectorAll('.lang-btn');
function setLocale(locale) {
  if (locale !== 'ja' && locale !== 'en') return;
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

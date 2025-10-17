/* Injecte header & footer dans les pages */
(async function injectPartials(){
  // 1) Emplacements (crée ces div dans tes pages)
  const headerHost = document.getElementById('app-header');
  const footerHost = document.getElementById('app-footer');
  if (!headerHost && !footerHost) return;

  // 2) Charger HTML
  const [headerHtml, footerHtml] = await Promise.all([
    fetch('partials/header.html').then(r => r.text()).catch(()=>''),
    fetch('partials/footer.html').then(r => r.text()).catch(()=>''),
  ]);

  if (headerHost) headerHost.innerHTML = headerHtml;
  if (footerHost) footerHost.innerHTML = footerHtml;

  // 3) Initialiser le header (hamburger + active link)
  try {
    // si header.js est en module ES
    if (window.initHeader) { window.initHeader(); }
    else {
      // fallback: recherche d'une fonction globale ajoutée par header.js sans export
      const fn = window['initHeader'];
      if (typeof fn === 'function') fn();
    }
  } catch(e){ console.warn('Header init error', e); }
})();

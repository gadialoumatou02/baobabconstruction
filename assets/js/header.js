/* ============================================================
   HEADER – Hamburger + lien actif (version unifiée)
   ============================================================ */
(function (root, factory) {
  // UMD light: dispo en global window.initHeader et utilisable en module CommonJS
  const fn = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = fn;
  root.initHeader = fn;
})(typeof self !== "undefined" ? self : this, function () {
  return function initHeader() {
    const btn  = document.querySelector(".menu-toggle");
    const menu = document.getElementById("site-menu");
    if (!btn || !menu) return;

    const open  = () => { document.body.classList.add("nav-open");  btn.setAttribute("aria-expanded","true");  };
    const close = () => { document.body.classList.remove("nav-open"); btn.setAttribute("aria-expanded","false"); };

    // Toggle
    btn.addEventListener("click", () => (btn.getAttribute("aria-expanded")==="true" ? close() : open()));

    // Fermer après clic lien
    menu.querySelectorAll("a").forEach(a => a.addEventListener("click", close));

    // Fermer si on repasse en large écran (cohérent avec le CSS: >900px)
    const handleResize = () => { if (window.innerWidth > 900) close(); };
    window.addEventListener("resize", handleResize);

    // Activer l’onglet courant
    const current = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll("#site-menu a").forEach(a => {
      const route = (a.getAttribute("data-route") || a.getAttribute("href") || "")
        .replace(/^\//,"").toLowerCase();
      a.classList.toggle("active", route === current);
    });
  };
});

// Auto-init quand le DOM est prêt
document.addEventListener("DOMContentLoaded", () => {
  if (typeof window.initHeader === "function") window.initHeader();
});

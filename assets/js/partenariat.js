/* ============================================================
   PARTENARIAT.JS
   Gère la page partenariat.html :
   - Pré-sélectionne le projet et le type de demande via l’URL
   - Adapte le titre et le sous-titre
   - Affiche le message de succès
   - (optionnel) prépare un email pré-rempli
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const projet = params.get("projet");
  const demande = params.get("demande");

  const form = document.getElementById("partner-form");
  const selectProjet = document.getElementById("projet");
  const inputDemande = document.getElementById("demande_type");
  const title = document.getElementById("form-title");
  const subtitle = document.getElementById("form-subtitle");

  const mapProjetLabel = {
    distribution: "Centre de distribution de matériaux – Djolof",
    poles: "Pôles internes : menuiserie, plomberie, électricité",
    immobilier: "Cellule de gestion immobilière",
  };
  const mapDemandeLabel = {
    partenariat: "Proposer un partenariat",
    dossier: "Demander le dossier",
    offre: "Proposer une offre",
    financement: "Discuter financement",
  };

  // --- Préremplissage ---
  if (projet && selectProjet) selectProjet.value = projet;
  if (demande && inputDemande) inputDemande.value = demande;

  // --- Adapter le texte d’en-tête ---
  const pieces = [];
  if (mapDemandeLabel[demande]) pieces.push(mapDemandeLabel[demande]);
  if (mapProjetLabel[projet]) pieces.push(mapProjetLabel[projet]);
  if (pieces.length) {
    title.textContent = "Devenir partenaire";
    subtitle.textContent = pieces.join(" · ");
  }

  // --- Soumission du formulaire ---
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      document.getElementById("form-success").style.display = "block";

      const data = new FormData(form);
      const sujet = encodeURIComponent(
        "Partenariat – " + (mapProjetLabel[data.get("projet")] || "")
      );
      const lignes = [];
      for (const [k, v] of data.entries()) {
        if (!v) continue;
        lignes.push(`${k}: ${v}`);
      }
      const body = encodeURIComponent(lignes.join("\n"));

      // TODO: remplace par ton adresse email pro
      const mailto = `mailto:contact@baobabconstruction.sn?subject=${sujet}&body=${body}`;
      // window.location.href = mailto; // Décommente pour ouvrir automatiquement l’e-mail
    });
  }
});

/* Exécuteur Java — comportement partagé par les shortcodes
   javaRunner, inlineJava et javaMultiRunner.

   Corrections d'accessibilité par rapport aux trois copies précédentes :
     - chaque éditeur porte une étiquette (<label> + screenReaderLabel de
       CodeMirror) : les <textarea> n'avaient aucun nom accessible ;
     - la zone de résultat et la liste d'erreurs sont des régions live, donc
       la sortie de compilation est annoncée (WCAG 4.1.3) ;
     - les erreurs de compilation sont listées sous forme de boutons qui
       placent le curseur sur la ligne fautive : l'information n'était
       auparavant accessible qu'au survol de la souris (WCAG 1.4.13) ;
     - la zone défilante de CodeMirror devient atteignable au clavier ;
     - la sortie du serveur est insérée via textContent et non innerHTML
       (elle n'était ni échappée ni fidèle : « < » disparaissait).
*/
(function () {
  "use strict";

  var DELAI_MS = 30000;

  function estJava(nom) {
    return /\.java$/i.test(nom);
  }

  function vider(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
  }

  function initRunner(racine) {
    if (racine.dataset.javaRunnerPret === "1") return;
    racine.dataset.javaRunnerPret = "1";

    var form = racine.querySelector(".export-form");
    var zoneResultat = racine.querySelector(".export-result");
    var listeErreurs = racine.querySelector(".java-error-list");
    var bouton = racine.querySelector(".export-btn");
    var endpoint = racine.dataset.endpoint || "";
    var blocs = Array.prototype.slice.call(racine.querySelectorAll(".export-file-block"));

    blocs.forEach(function (bloc) {
      var nom = bloc.dataset.fileName || "";
      var ta = bloc.querySelector("textarea");
      if (!ta || !estJava(nom) || typeof CodeMirror === "undefined") return;

      var cm = CodeMirror.fromTextArea(ta, {
        mode: "text/x-java",
        theme: "eclipse",
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        // Nomme le <textarea> caché que CodeMirror crée pour la saisie.
        screenReaderLabel: "Éditeur Java, fichier " + nom
      });
      bloc._cm = cm;
      bloc._erreursParLigne = {};

      // La zone qui défile n'était atteignable ni au clavier ni annoncée.
      var scroller = cm.getScrollerElement();
      if (scroller) {
        scroller.setAttribute("tabindex", "0");
        scroller.setAttribute("role", "region");
        scroller.setAttribute("aria-label", "Code du fichier " + nom + " (zone défilante)");
      }
    });

    function contenuDe(bloc) {
      var ta = bloc.querySelector("textarea");
      return bloc._cm ? bloc._cm.getValue() : (ta ? ta.value : "");
    }

    function effacerErreurs() {
      blocs.forEach(function (bloc) {
        if (bloc._cm) {
          bloc._cm.operation(function () {
            bloc._cm.getAllMarks().forEach(function (m) { m.clear(); });
          });
        }
        bloc._erreursParLigne = {};
      });
      if (listeErreurs) {
        vider(listeErreurs);
        listeErreurs.hidden = true;
      }
    }

    /* Construit la liste navigable au clavier des erreurs de compilation. */
    function afficherErreurs(texteErreur) {
      effacerErreurs();
      if (!texteErreur) return;

      var motif = /([\w./\-]+\.java):(\d+): error: ([^\n]+)([\s\S]*?)(?=\n[\w./\-]+\.java:|$)/g;
      var trouvees = [];
      var m;
      while ((m = motif.exec(texteErreur)) !== null) {
        var fichier = m[1];
        var ligne = parseInt(m[2], 10) - 1;
        var message = (m[3] + (m[4] ? m[4].replace(/\s+/g, " ") : "")).trim();
        var bloc = blocs.filter(function (b) {
          var n = (b.dataset.fileName || "").trim();
          return n === fichier || n.endsWith("/" + fichier) || n.endsWith("\\" + fichier);
        })[0];
        if (!bloc) continue;

        if (bloc._cm) {
          (function (b, l) {
            b._cm.operation(function () {
              b._cm.markText({ line: l, ch: 0 }, { line: l + 1, ch: 0 }, {
                className: "cm-java-error"
              });
            });
          })(bloc, ligne);
        }
        bloc._erreursParLigne[ligne] = message;
        trouvees.push({ bloc: bloc, fichier: fichier, ligne: ligne, message: message });
      }

      if (!listeErreurs || !trouvees.length) return;

      trouvees.forEach(function (e) {
        var li = document.createElement("li");
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "java-error-jump";
        btn.textContent = e.fichier + ", ligne " + (e.ligne + 1) + " : " + e.message;
        btn.addEventListener("click", function () {
          if (!e.bloc._cm) return;
          e.bloc._cm.focus();
          e.bloc._cm.setCursor({ line: e.ligne, ch: 0 });
          e.bloc._cm.scrollIntoView({ line: e.ligne, ch: 0 }, 80);
        });
        li.appendChild(btn);
        listeErreurs.appendChild(li);
      });
      listeErreurs.hidden = false;
    }

    function afficherSortie(texte, type) {
      vider(zoneResultat);
      var pre = document.createElement("pre");
      pre.className = "export-output export-output-" + type;
      pre.textContent = texte;
      zoneResultat.appendChild(pre);
    }

    form.addEventListener("submit", function (evt) {
      evt.preventDefault();

      var javaFiles = [], txtFiles = [];
      blocs.forEach(function (bloc) {
        var nom = bloc.dataset.fileName || "";
        var entree = { name: nom, content: contenuDe(bloc) };
        (estJava(nom) ? javaFiles : txtFiles).push(entree);
      });

      bouton.disabled = true;
      zoneResultat.setAttribute("aria-busy", "true");
      zoneResultat.textContent = "Exécution en cours…";

      var controleur = new AbortController();
      var minuteur = setTimeout(function () { controleur.abort(); }, DELAI_MS);

      function terminer() {
        clearTimeout(minuteur);
        bouton.disabled = false;
        zoneResultat.setAttribute("aria-busy", "false");
      }

      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ java_files: javaFiles, txt_files: txtFiles }),
        signal: controleur.signal
      })
        .then(function (r) {
          if (!r.ok && r.status !== 400) {
            throw new Error("Erreur HTTP " + r.status + " : " + r.statusText);
          }
          return r.text();
        })
        .then(function (texte) {
          terminer();
          var j;
          try {
            j = JSON.parse(texte);
          } catch (err) {
            afficherSortie(texte, "brut");
            return;
          }
          if (j.status === "ran_successfully") {
            afficherSortie(j.output || "(aucune sortie)", "succes");
            effacerErreurs();
          } else if (j.status === "compiling") {
            afficherSortie(j.error || "Erreur de compilation.", "erreur");
            afficherErreurs(j.error || "");
          } else if (j.status === "runtime_error") {
            afficherSortie(j.error || "Erreur d'exécution.", "erreur");
            effacerErreurs();
          } else {
            afficherSortie(texte, "brut");
            effacerErreurs();
          }
        })
        .catch(function (erreur) {
          terminer();
          if (erreur.name === "AbortError") {
            afficherSortie("Erreur : délai d'attente dépassé (30 secondes).", "erreur");
          } else {
            afficherSortie("Erreur lors de la requête : " + erreur.message, "erreur");
          }
        });
    });
  }

  function initTous() {
    Array.prototype.forEach.call(document.querySelectorAll(".java-runner"), initRunner);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTous);
  } else {
    initTous();
  }
})();

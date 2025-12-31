---
title: "Chargement XML/JSON en JavaScript"
weight: 70
---




# Chargement XML/JSON en JavaScript


La programmation asynchrone permet d'exécuter des tâches en arrière-plan sans bloquer l'exécution du programme principal. Contrairement à la programmation synchrone où les opérations se déroulent séquentiellement (une après l'autre), l'asynchrone permet de lancer une opération longue, comme une requête réseau ou la lecture d'un fichier, et de continuer à exécuter d'autres tâches pendant que cette opération se déroule. Lorsque l'opération asynchrone se termine, un mécanisme de notification (callback, Promise, ou async/await) permet de traiter le résultat sans interrompre le flux principal du programme.

En JavaScript, il n'y a qu'un fil d'exécution. Si une fonction devait attendre la réponse d'un
serveur d'une manière synchrone, aucune autre opération JavaScript ne serait possible. Au lieu 
de cela, nous préférons une exécution asynchrone.


Une Promise est un objet en JavaScript qui représente la complétion (ou l'échec) éventuelle d'une opération asynchrone et sa valeur résultante. Elle agit comme un proxy pour une valeur qui n'est pas nécessairement connue au moment de sa création. Une Promise peut être dans l'un des trois états : en attente (pending), résolue (fulfilled) avec une valeur, ou rejetée (rejected) avec une raison d'erreur.

```javascript
const maPromise = new Promise((resolve, reject) => {
    // Opération asynchrone
    setTimeout(() => {
        if (Math.random() > 0.5) {
            resolve("Succès !");
        } else {
            reject("Erreur !");
        }
    }, 1000);
});

maPromise
    .then(resultat => console.log(resultat))
    .catch(erreur => console.error(erreur));
```

Les Promises permettent de gérer les opérations asynchrones de manière plus élégante que les callbacks traditionnels. Elles peuvent être chaînées avec `.then()` pour traiter les résultats successifs, et `.catch()` pour gérer les erreurs. Les Promises sont la base d'APIs modernes comme `fetch()`, et elles sont essentielles pour comprendre `async`/`await` qui en est un sucre syntaxique.


En JavaScript, le mot-clé `async` devant une fonction indique qu'elle retourne une Promise. Le mot-clé `await` est utilisé à l'intérieur d'une fonction `async` pour attendre la résolution d'une Promise.

```javascript
async function maFonction() {
    const resultat = await unePromise();
    return resultat;
}
```

Un fonction `async` ne bloque pas l'exécution du JavaScript dans la page. Elle est asynchrone.

Cela permet d'écrire du code asynchrone de manière synchrone, facilitant la lecture et la gestion des erreurs. Sans `async`/`await`, il faudrait utiliser des callbacks ou chaîner des `.then()`, ce qui peut rapidement devenir complexe et difficile à déboguer. L'avantage principal est que le code ressemble à du code synchrone tout en restant non-bloquant, améliorant considérablement la lisibilité et la maintenabilité des applications JavaScript modernes.



L'API  `fetch()` est l'API moderne pour effectuer des requêtes HTTP en JavaScript. 

```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

`fetch()` retourne un objet `Promise` qui résout en un objet `Response`. Cet objet `Response` contient des méthodes pour accéder au corps de la réponse (`text()`, `json()`, `blob()`, etc.) et des propriétés comme `status` (code HTTP), `ok` (booléen indiquant si la requête a réussi), et `headers` (les en-têtes HTTP).


Une expression comme `const response = await fetch(uri);` effectue une requête HTTP asynchrone vers l'URI spécifiée. `fetch(uri)` envoie une requête GET par défaut et retourne immédiatement une Promise. Le mot-clé `await` met en pause l'exécution de la fonction jusqu'à ce que cette Promise se résolve, c'est-à-dire jusqu'à ce que la réponse HTTP soit reçue du serveur.

La variable `response` contient alors un objet `Response` qui encapsule la réponse HTTP complète : le code de statut (200, 404, etc.), les en-têtes, et le corps de la réponse. Cet objet fournit des méthodes comme `response.ok` (booléen indiquant le succès), `response.status` (code numérique), et `response.text()` ou `response.json()` pour accéder au contenu.

## Asynchronous JavaScript And XML (AJAX)

Normalement, pour récupérer des données sur le serveur (description d’un produit, horaire, etc.), il faut recharger une nouvelle page. Avec **AJAX** (*Asynchronous JavaScript And XML*), un script JavaScript peut charger un fichier XML (ou JSON) en arrière-plan, sans recharger la page. L’utilisateur a l’impression que l’application est beaucoup plus rapide.

Exemples célèbres : Gmail, Google Maps, Facebook (à l’époque), etc.

## Exemple simple : charger et afficher le titre d’un document XHTML

```xhtml
<?xml version="1.0" encoding="ISO-8859-1"?>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Exemple AJAX</title>
    <script>
      // Charge un document XML/XHTML et appelle afficheTitre()
      async function chargeDocument(uri) {
        try {
          const response = await fetch(uri);
          if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
          }
          const text = await response.text();
          // Sans await, text serait une Promise, pas le contenu texte de la réponse.
          // Cela causerait une erreur lors de l'utilisation de text dans DOMParser.parseFromString(),
          // car parseFromString attend une chaîne, pas une Promise.
          const parser = new DOMParser();
          const doc = parser.parseFromString(text, "application/xml");
          afficheTitre(doc);
        } catch (error) {
          console.error('Erreur lors du chargement:', error);
        }
      }
      // La fonction chargeDocument déclarée async car elle utilise le mot-clé await à l'intérieur.
      // Sans async, await ne pourrait pas être utilisé, et la fonction retournerait immédiatement
      // sans attendre la résolution des Promises. async transforme la fonction en une fonction
      // qui retourne une Promise, permettant ainsi l'utilisation d'await pour une exécution séquentielle apparente.
      // Affiche le contenu de l'élément <title>
      function afficheTitre(doc) {
        var titre = doc.getElementsByTagName("title")[0];
        var texte = titre.firstChild ? titre.firstChild.nodeValue : "";
        var p = document.createElement("p");
        p.appendChild(document.createTextNode(texte));
        document.getElementsByTagName("body")[0].appendChild(p);
      }
    </script>
  </head>
  <body>
    <p>Cliquez plusieurs fois sur les liens ci-dessous :</p>
    <ul>
      <li><a href="javascript:chargeDocument('domtutoriel.xhtml')">domtutoriel.xhtml</a></li>
      <li><a href="javascript:chargeDocument('travail5.xhtml')">travail5.xhtml</a></li>
    </ul>
  </body>
</html>
```

Dans cet exemple, la fonction `chargeDocument` utilise `XMLHttpRequest` pour effectuer une requête GET asynchrone vers une URI. Lorsque la réponse est reçue (readyState === 4 et status === 200), elle appelle `afficheTitre` qui extrait le contenu de l'élément `<title>` du document XML chargé et l'ajoute dynamiquement à la page.

## Exemple avancé : afficher les titres d’un flux RSS (Le Devoir)

Sélectionnez un fichier XML RSS pour afficher ses titres.

```xhtml
<?xml version="1.0" encoding="ISO-8859-1"?>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>Exemple AJAX – Flux RSS</title>
    <script>
      function chargeDocumentFromFile(input) {
        var file = input.files[0];
        if (file) {
          var reader = new FileReader();
          reader.onload = function(e) {
            var doc = new DOMParser().parseFromString(e.target.result, "application/xml");
            afficheTitres(doc);
          };
          reader.readAsText(file);
        }
      }
    </script>
  </head>
  <body>
    <input type="file" accept=".xml" onchange="chargeDocumentFromFile(this)">
  </body>
</html>
```

Cet exemple avancé montre comment parser un fichier XML RSS sélectionné localement. L'utilisateur choisit un fichier via un input de type file, qui est lu avec FileReader, puis parsé avec DOMParser. La fonction `afficheTitres` récupère tous les éléments `<title>` et les affiche dans une liste ordonnée. Cela illustre comment AJAX peut être utilisé pour traiter des fichiers locaux sans serveur.


## Utiliser importNode() pour insérer tout un fragment XML

```javascript
function afficheListe(doc) {
  var ul = doc.getElementsByTagName("ul")[0];
  var copie = document.importNode(ul, true);   // true = copie profonde
  document.body.appendChild(copie);
}
```

La méthode `importNode()` permet d'importer un nœud d'un document XML externe vers le document HTML courant. Le paramètre `true` indique une copie profonde, incluant tous les nœuds enfants. Cela est utile pour éviter les conflits d'espaces de noms et pour intégrer des fragments XML complexes sans altérer le document source.

## Chargement de fichiers locaux (Chrome, Edge, etc.)

La plupart du temps, les pages web ne peuvent pas charger du contenu provenant d'un autre serveur. Il est donc
pratique de demander à l'utilisateur de charger un fichier qui se trouve sur son disque.

```javascript
<input type="file" onchange="chargeFichier(this.files[0])">
function chargeFichier(fichier) {
  var lecteur = new FileReader();
  lecteur.onload = function(e) {
    var doc = new DOMParser().parseFromString(e.target.result, "application/xml");
    afficheTitres(doc);
  };
  lecteur.readAsText(fichier);
}
```

Ce code permet de charger un fichier XML local sélectionné par l'utilisateur via un input de type file. Il utilise `FileReader` pour lire le contenu du fichier en texte, puis `DOMParser` pour le parser en document XML. Cela évite les restrictions de sécurité des navigateurs qui empêchent le chargement direct de fichiers locaux via XMLHttpRequest.

AJAX permet de créer des applications web plus interactives en chargeant des données en arrière-plan sans recharger la page entière. L'objet `XMLHttpRequest` est au cœur de cette technologie, permettant d'envoyer des requêtes HTTP asynchrones. Combiné avec l'API DOM pour manipuler le contenu de la page, AJAX offre une expérience utilisateur fluide.

L'exemple simple montre comment charger un document XHTML et extraire son titre pour l'afficher dynamiquement. L'exemple avancé démontre le parsing d'un flux RSS pour afficher une liste de titres. La méthode `importNode()` permet d'importer des fragments XML d'un document à un autre, utile pour intégrer du contenu externe sans conflits d'espaces de noms.

## JSON

Nous pouvons aussi utiliser la même technique en remplaçant le XML par JSON.

```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(donnees => {
        console.log(donnees);
        // Traiter les données ici
        afficheDonnees(donnees);
    })
    .catch(error => console.error('Erreur:', error));
```

L'API `fetch()` est plus moderne et basée sur les promesses que `XMLHttpRequest`. Elle permet de charger des données JSON de manière asynchrone et de les traiter facilement.

### Fonction d'affichage des données

```javascript
function afficheDonnees(donnees) {
    var div = document.createElement("div");
    div.innerHTML = "<h2>" + donnees.titre + "</h2>" +
                   "<p>Auteur: " + donnees.auteur + "</p>" +
                   "<p>Description: " + donnees.description + "</p>";
    document.body.appendChild(div);
}
```

### Exemple complet avec JSON

Voici un exemple complet d'une page HTML utilisant AJAX avec JSON pour charger et afficher des données :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Exemple AJAX avec JSON</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .donnees { border: 1px solid #ccc; padding: 10px; margin: 10px 0; border-radius: 5px; }
        button { padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background-color: #0056b3; }
    </style>
</head>
<body>
    <h1>Chargement de données JSON avec AJAX</h1>
    <button onclick="chargerDonnees()">Charger les données</button>
    <div id="contenu"></div>

    <script>
        async function chargerDonnees() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const donnees = await response.json();
                afficherDonnees(donnees);
            } catch (error) {
                console.error('Erreur lors du chargement:', error);
                document.getElementById('contenu').innerHTML = '<p style="color: red;">Erreur lors du chargement des données.</p>';
            }
        }

        function afficherDonnees(donnees) {
            const contenu = document.getElementById('contenu');
            contenu.innerHTML = ''; // Vider le contenu précédent

            const div = document.createElement('div');
            div.className = 'donnees';
            div.innerHTML = `
                <h3>${donnees.title}</h3>
                <p><strong>ID:</strong> ${donnees.id}</p>
                <p><strong>User ID:</strong> ${donnees.userId}</p>
                <p><strong>Contenu:</strong> ${donnees.body}</p>
            `;
            contenu.appendChild(div);
        }
    </script>
</body>
</html>
```

Cet exemple montre comment :
- Utiliser `fetch()` pour effectuer une requête GET à une API REST
- Gérer les erreurs avec try/catch
- Parser automatiquement le JSON avec `response.json()`
- Afficher dynamiquement les données dans le DOM

L'exemple utilise l'API publique JSONPlaceholder pour démontrer une vraie requête HTTP GET. JSON offre une alternative moderne et légère à XML pour l'échange de données en AJAX.


## Trucs pour le développement JavaScript dans un navigateur


Tous les navigateurs modernes (Chrome, Firefox, Edge, Safari) disposent d'outils de développement intégrés. Ouvrez-les avec F12 ou Ctrl+Shift+I (Cmd+Option+I sur Mac).

- **Console** : Pour les logs (`console.log()`), erreurs, et exécuter du code en direct
- **Network** : Pour inspecter les requêtes HTTP, voir les réponses AJAX, et déboguer les appels API
- **Sources** : Pour déboguer le code JavaScript avec des points d'arrêt
- **Application** : Pour inspecter le stockage local, les cookies, et les données de session


Lorsque vous faites des requêtes AJAX vers des domaines différents, vous pouvez rencontrer des erreurs.
Utilisez un serveur local (comme `ExempleServeurFichiersSimple.java`).
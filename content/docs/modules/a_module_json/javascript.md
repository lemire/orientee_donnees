---
title: "JavaScript et JSON"
weight: 36
---

# Introduction à JavaScript

JavaScript est un langage de programmation dynamique principalement utilisé pour le développement web côté client, mais aussi côté serveur grâce à des environnements comme Node.js. Si vous êtes déjà familiers avec Java, un langage statiquement typé et orienté objet classique, JavaScript peut sembler au premier abord déroutant en raison de son typage dynamique et de sa flexibilité extrême. Cependant, de nombreuses concepts que vous connaissez déjà en Java existent sous une forme similaire en JavaScript, même si leur implémentation diffère souvent.

En JavaScript, la déclaration de variables se fait principalement avec deux mots-clés : let et const.La différence principale entre let et const réside dans la réassignation : let permet de modifier la valeur de la variable après sa déclaration, tandis que const interdit toute réassignation (bien que pour les objets, les propriétés internes restent modifiables). Il est recommandé d'utiliser const par défaut et let uniquement quand une réassignation est nécessaire, en évitant complètement var dans le code moderne.

Voici un exemple illustrant ces différences. La fonction `console.log` est équivalente à
`System.out.println` en Java.

```javascript
// Exemple avec let : réassignation possible
let age = 25;
console.log(age); // 25
age = 26; // OK
console.log(age); // 26

// Exemple avec const : réassignation interdite
const nom = "Alice";
console.log(nom); // Alice
// nom = "Bob"; // Erreur : Assignment to constant variable

// Pour les objets avec const : propriétés modifiables, mais pas l'objet lui-même
const personne = { nom: "Alice", age: 25 };
personne.age = 26; // OK, modification d'une propriété
console.log(personne); // { nom: "Alice", age: 26 }
// personne = { nom: "Bob", age: 30 }; // Erreur : réassignation de l'objet
```

Les fonctions occupent une place centrale en JavaScript, bien plus qu'en Java où elles sont toujours membres d'une classe. En JavaScript, les fonctions sont des citoyens de première classe : elles peuvent être assignées à des variables, passées en paramètres ou retournées par d'autres fonctions. Une fonction simple s'écrit `function addition(a, b) { return a + b; }` ou, de manière plus moderne, avec une flèche : `const addition = (a, b) => a + b;`.

Voici quelques exemples illustrant ces concepts.

```javascript
// Fonction assignée à une variable
const multiplier = function(a, b) { return a * b; };
console.log(multiplier(3, 4)); // 12

// Fonction flèche
const soustraire = (a, b) => a - b;
console.log(soustraire(10, 3)); // 7

// Fonction passée en paramètre
function appliquerOperation(a, b, operation) {
  return operation(a, b);
}
console.log(appliquerOperation(5, 3, (x, y) => x + y)); // 8

// Fonction retournée par une autre fonction (closure)
function creerMultiplicateur(facteur) {
  return function(nombre) {
    return nombre * facteur;
  };
}
const doubler = creerMultiplicateur(2);
console.log(doubler(5)); // 10
```

Les objets en JavaScript sont fondamentalement différents des classes Java. Il n'y a pas de classes traditionnelles (avant ES6), mais des objets basés sur des prototypes. Chaque objet peut hériter directement d'un autre via sa chaîne de prototypes, ce qui remplace le système d'héritage par classes de Java. Depuis ES6, la syntaxe `class` a été introduite pour faciliter la transition des développeurs venant de langages comme Java, mais sous le capot, il s'agit toujours d'héritage prototypal.

Vous pouvez créer un objet de manière littérale très simplement : `const personne = { nom: "Dupont", age: 30 };`. Pour ajouter une fonction (appelée méthode lorsqu'elle est dans un objet), il suffit d'ajouter une propriété qui contient une fonction : `personne.saluer = function() { console.log("Bonjour, je m'appelle " + this.nom); };` ou, avec la syntaxe moderne : `const personne = { nom: "Dupont", age: 30, saluer() { console.log(\`Bonjour, je m'appelle ${this.nom}\`); } };`. L'appel se fait ensuite avec `personne.saluer();`.

En JavaScript, les chaînes de caractères peuvent être définies avec des guillemets simples (`'texte'`) ou doubles (`"texte"`). Depuis ES6, les littéraux de gabarit (template literals) permettent d'intégrer des expressions directement dans les chaînes en utilisant des backticks (\`) et la syntaxe `${expression}`.

Cette syntaxe `${personne.nom} habite à ${personne.ville}` est un exemple de littéral de gabarit. Elle permet d'insérer la valeur d'une variable ou le résultat d'une expression directement dans la chaîne, sans avoir à utiliser la concaténation avec l'opérateur `+`.

Voici des exemples comparatifs :

```javascript
const personne = { nom: "Alice", age: 25, ville: "Paris" };

// Concaténation traditionnelle (comme en Java)
const message1 = "Bonjour, je m'appelle " + personne.nom + " et j'ai " + personne.age + " ans.";
console.log(message1); // Bonjour, je m'appelle Alice et j'ai 25 ans.

// Littéral de gabarit (plus moderne et lisible)
const message2 = `Bonjour, je m'appelle ${personne.nom} et j'ai ${personne.age} ans.`;
console.log(message2); // Bonjour, je m'appelle Alice et j'ai 25 ans.

// Avec des expressions
const message3 = `${personne.nom} habite à ${personne.ville.toUpperCase()} et a ${personne.age + 5} ans dans 5 ans.`;
console.log(message3); // Alice habite à PARIS et a 30 ans dans 5 ans.

// Chaînes multi-lignes
const messageMultiligne = `Ceci est une chaîne
sur plusieurs lignes
sans avoir à utiliser \n`;
console.log(messageMultiligne);
```


La gestion des erreurs en JavaScript repose sur les exceptions comme en Java, avec `try`, `catch` et `finally`. 

```javascript
try {
  let resultat = 10 / 0;
  throw new Error("Quelque chose s'est mal passé");
} catch (erreur) {
  console.error("Erreur capturée :", erreur.message);
} finally {
  console.log("Ce bloc s'exécute toujours");
}
```

Une autre exemple courant avec une fonction.

```javascript
function diviser(a, b) {
  if (b === 0) throw new Error("Division par zéro");
  return a / b;
}

try {
  diviser(10, 0);
} catch (e) {
  console.log("Impossible :", e.message);
}
```

JavaScript est très permissif sur les égalités : `==` effectue des conversions de type implicites (souvent source de bugs), tandis que `===` compare sans conversion, ce qui est l'équivalent de la comparaison stricte en Java. De même, les valeurs truthy/falsy (comme `""`, `0`, `null`, `undefined`) se comportent différemment des booléens stricts.

Voici des exemples illustrant ces comportements.

```javascript
// Différence entre == et ===
console.log(1 == "1");  // true (conversion implicite : string "1" devient number 1)
console.log(1 === "1"); // false (pas de conversion : types différents)
console.log(0 == false);  // true (conversion : false devient 0)
console.log(0 === false); // false (types différents : number vs boolean)
console.log(null == undefined);  // true (égalité spéciale pour null/undefined)
console.log(null === undefined); // false (types différents)

// Valeurs falsy (considérées comme false dans les conditions)
console.log("Valeurs falsy :");
if ("") console.log("Chaîne vide"); else console.log("Chaîne vide est falsy");
if (0) console.log("Zéro"); else console.log("0 est falsy");
if (null) console.log("Null"); else console.log("null est falsy");
if (undefined) console.log("Undefined"); else console.log("undefined est falsy");
if (false) console.log("False"); else console.log("false est falsy");
if (NaN) console.log("NaN"); else console.log("NaN est falsy");

// Valeurs truthy (considérées comme true dans les conditions)
console.log("Valeurs truthy :");
if ("hello") console.log("Chaîne non vide : truthy");
if (42) console.log("Nombre positif : truthy");
if ([]) console.log("Array vide : truthy (attention !)");
if ({}) console.log("Objet vide : truthy");
```

## Activité de mise en pratique

Vous pouvez tester votre compréhension de la syntaxe avec la console suivante.

<div style="max-width: 800px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
    <h1 style="background: #2c3e50; color: white; margin: 0; padding: 15px; text-align: center; font-size: 1.5em;">
        Console JavaScript
    </h1>
    <pre id="output" style="height: 300px; overflow-y: auto; padding: 10px; margin: 0; background: #1e1e1e; color: #dcdcdc; font-family: 'Courier New', monospace; white-space: pre-wrap;"></pre>
    <div style="display: flex; padding: 10px; background: #ecf0f1;">
        <span style="color: #2c3e50; margin-right: 10px; align-self: center;">></span>
        <input type="text" id="input" autocomplete="off" 
                style="flex: 1; border: none; outline: none; font-family: 'Courier New', monospace; font-size: 14px; background: transparent;">
        <button id="run" style="padding: 0 15px; background: #3498db; color: white; border: none; cursor: pointer; margin-left: 10px;">
            Exécuter
        </button>
        <button id="reset" style="padding: 0 15px; background: #e74c3c; color: white; border: none; cursor: pointer; margin-left: 10px;">
            Remettre à zéro
        </button>
    </div>
</div>
<script>
    const output = document.getElementById('output');
    const input = document.getElementById('input');
    const runBtn = document.getElementById('run');
    const resetBtn = document.getElementById('reset');
    let sessionCode = ''; // Variable pour accumuler le code de la session
    function addLine(text, color = '#fff', isHTML = false) {
        const line = document.createElement('div');
        if (isHTML) {
            line.innerHTML = text;
        } else {
            line.textContent = text;
        }
        line.style.color = color;
        line.style.margin = '2px 0';
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }
    function highlightJS(code) {
        // Mots-clés JavaScript
        const keywords = ['var', 'let', 'const', 'function', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break', 'continue', 'return', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'super', 'class', 'extends', 'import', 'export', 'from', 'async', 'await', 'yield', 'typeof', 'instanceof', 'in', 'of', 'true', 'false', 'null', 'undefined'];
        // Échapper les caractères spéciaux pour regex
        const escapedKeywords = keywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
        const keywordRegex = new RegExp(`\\b(${escapedKeywords})\\b`, 'g');
        // Strings
        const stringRegex = /"[^"]*"|'[^']*'|`[^`]*`/g;
        // Nombres
        const numberRegex = /\b\d+(\.\d+)?\b/g;
        // Commentaires (simple ligne)
        const commentRegex = /\/\/.*$/gm;
        // Appliquer les couleurs
        let highlighted = code
            .replace(commentRegex, '<span style="color: #6a9955;">$&</span>') // Vert pour commentaires
            .replace(stringRegex, '<span style="color: #ce9178;">$&</span>') // Orange pour strings
            .replace(numberRegex, '<span style="color: #b5cea8;">$&</span>') // Vert clair pour nombres
            .replace(keywordRegex, '<span style="color: #569cd6;">$&</span>'); // Bleu pour mots-clés
        return highlighted;
    }
    function resetConsole() {
        sessionCode = '';
        output.innerHTML = '';
        addLine('Bienvenue dans ta console JavaScript !', '#aaa');
        addLine('Tape du code et appuie sur Entrée pour l\'exécuter.', '#aaa');
        addLine('Chaque commande s\'ajoute à la session précédente.', '#aaa');
        addLine('Exemple : var x = 5; puis console.log(x);', '#aaa');
        addLine('');
        //input.focus();
    }
    function executeCode() {
        const code = input.value.trim();
        if (!code) return;
        addLine('> ' + highlightJS(code), '#aaa', true);
        const origLog = console.log;
        const origError = console.error;
        const origWarn = console.warn;
        console.log = (...args) => {
            addLine(args.join(' '), '#fff');
        };
        console.error = (...args) => {
            addLine(args.join(' '), '#e74c3c');
        };
        console.warn = (...args) => {
            addLine(args.join(' '), '#ffd43b');
        };
        try {
            sessionCode += code + ';'; // Ajouter la commande à la session
            let result = eval(sessionCode); // Exécuter tout le code accumulé
            if (result !== undefined) {
                addLine(String(result), '#2ecc71');
            }
        } catch (err) {
            addLine(err.name + ': ' + err.message, '#e74c3c');
            // En cas d'erreur, on peut choisir de ne pas ajouter la commande erronée, ou la retirer
            // Pour simplifier, on la laisse, mais on peut ajuster
        } finally {
            console.log = origLog;
            console.error = origError;
            console.warn = origWarn;
        }
        input.value = '';
        //input.focus();
    }
    runBtn.addEventListener('click', executeCode);
    resetBtn.addEventListener('click', resetConsole);
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            executeCode();
        }
    });
    resetConsole(); // Initialiser la console
</script>

## Questions de révision

Testez vos connaissances avec ces questions. Cliquez sur chaque question pour voir la réponse.

<details>
<summary>Quelle est la différence principale entre <code>let</code> et <code>const</code> en JavaScript ?</summary>
<p><code>let</code> permet la réassignation de la variable après sa déclaration, tandis que <code>const</code> l'interdit. Cependant, pour les objets déclarés avec <code>const</code>, les propriétés internes peuvent être modifiées.</p>
</details>

<details>
<summary>Comment déclare-t-on une fonction en JavaScript ? Donnez deux syntaxes.</summary>
<p>Avec la syntaxe traditionnelle : <code>function nomFonction(parametres) { corps }</code>. Avec les fonctions flèches (ES6) : <code>const nomFonction = (parametres) => corps</code>.</p>
</details>

<details>
<summary>Que signifie "les fonctions sont des citoyens de première classe" en JavaScript ?</summary>
<p>Cela signifie que les fonctions peuvent être assignées à des variables, passées en paramètres à d'autres fonctions, et retournées par des fonctions, comme n'importe quelle autre valeur.</p>
</details>

<details>
<summary>Comment créer un objet en JavaScript de manière littérale ?</summary>
<p>Avec la syntaxe : <code>const objet = { propriete1: valeur1, propriete2: valeur2, methode() { code } };</code></p>
</details>

<details>
<summary>Quelle est la différence entre <code>==</code> et <code>===</code> en JavaScript ?</summary>
<p><code>==</code> effectue des conversions de type implicites avant la comparaison (souvent source de bugs), tandis que <code>===</code> compare les valeurs et les types sans conversion.</p>
</details>

<details>
<summary>Quelles sont les valeurs "falsy" en JavaScript ?</summary>
<p>Les valeurs falsy sont : <code>""</code> (chaîne vide), <code>0</code>, <code>null</code>, <code>undefined</code>, <code>false</code>, et <code>NaN</code>. Elles sont considérées comme <code>false</code> dans les conditions.</p>
</details>

<details>
<summary>Comment gérer les erreurs en JavaScript ?</summary>
<p>Avec les blocs <code>try</code>, <code>catch</code>, et <code>finally</code>. On lance des erreurs avec <code>throw new Error("message")</code>, et on les capture dans <code>catch(erreur)</code>.</p>
</details>

<details>
<summary>Quelle est la différence entre l'héritage par classes (Java) et l'héritage prototypal (JavaScript) ?</summary>
<p>En Java, l'héritage se fait par classes avec <code>extends</code>. En JavaScript, les objets héritent directement d'autres objets via leur chaîne de prototypes, sans classes traditionnelles (bien que ES6 introduise la syntaxe <code>class</code>).</p>
</details>

<details>
<summary>Comment utiliser une fonction flèche avec plusieurs paramètres ?</summary>
<p><code>const fonction = (param1, param2) => { return resultat; };</code> ou pour une expression simple : <code>const fonction = (param1, param2) => resultat;</code>.</p>
</details>

<details>
<summary>Que se passe-t-il si on compare <code>null</code> et <code>undefined</code> avec <code>==</code> et <code>===</code> ?</summary>
<p>Avec <code>==</code> : <code>null == undefined</code> retourne <code>true</code> (égalité spéciale). Avec <code>===</code> : <code>null === undefined</code> retourne <code>false</code> (types différents).</p>
</details>



## JSON et JavaScript

En JavaScript, JSON est nativement supporté grâce aux méthodes `JSON.stringify()` pour convertir des objets JavaScript en chaînes JSON, et `JSON.parse()` pour analyser des chaînes JSON et les convertir en objets JavaScript.

Voici quelques exemples pratiques illustrant comment générer et consommer du JSON en JavaScript.

### Génération de JSON

Pour convertir un objet JavaScript en une chaîne JSON, utilisez `JSON.stringify()`. Cette méthode prend un objet en paramètre et retourne sa représentation JSON sous forme de chaîne.

```javascript
// Exemple avec un objet simple
const personne = {
  nom: "Dupont",
  age: 30,
  ville: "Paris",
  hobbies: ["lecture", "sport"]
};

const jsonString = JSON.stringify(personne);
console.log(jsonString);
// Sortie : {"nom":"Dupont","age":30,"ville":"Paris","hobbies":["lecture","sport"]}
```

Vous pouvez également formater le JSON pour une meilleure lisibilité en ajoutant des espaces :

```javascript
const jsonPretty = JSON.stringify(personne, null, 2);
console.log(jsonPretty);
/*
Sortie :
{
  "nom": "Dupont",
  "age": 30,
  "ville": "Paris",
  "hobbies": [
    "lecture",
    "sport"
  ]
}
*/
```

### Consommation de JSON

Pour analyser une chaîne JSON et la convertir en objet JavaScript, utilisez `JSON.parse()`. Cette méthode prend une chaîne JSON valide et retourne l'objet JavaScript correspondant.

```javascript
// Exemple avec une chaîne JSON
const jsonData = '{"nom":"Martin","age":25,"ville":"Lyon","actif":true}';
const objet = JSON.parse(jsonData);
console.log(objet.nom); // Martin
console.log(objet.age); // 25
console.log(objet.actif); // true
```

Attention : si la chaîne JSON n'est pas valide, `JSON.parse()` lèvera une exception `SyntaxError`. Il est donc recommandé d'utiliser un bloc `try...catch` :

```javascript
try {
  const donnees = JSON.parse(jsonData);
  console.log("Données analysées :", donnees);
} catch (erreur) {
  console.error("Erreur de parsing JSON :", erreur.message);
}
```

### Exemples avec des tableaux

JSON peut également représenter des tableaux. Voici un exemple complet :

```javascript
// Génération d'un tableau d'objets en JSON
const personnes = [
  { nom: "Alice", age: 28, ville: "Marseille" },
  { nom: "Bob", age: 32, ville: "Toulouse" },
  { nom: "Charlie", age: 45, ville: "Nice" }
];

const jsonArray = JSON.stringify(personnes);
console.log(jsonArray);
// Sortie : [{"nom":"Alice","age":28,"ville":"Marseille"},{"nom":"Bob","age":32,"ville":"Toulouse"},{"nom":"Charlie","age":45,"ville":"Nice"}]

// Consommation du JSON
const parsedArray = JSON.parse(jsonArray);
parsedArray.forEach(personne => {
  console.log(`${personne.nom} habite à ${personne.ville}`);
});
// Sortie :
// Alice habite à Marseille
// Bob habite à Toulouse
// Charlie habite à Nice
```


## Mise à l'essai

Utilisez la console suivante pour tester vos programmes JavaScript.

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/javascript/javascript.min.js"></script>

<div id="editor-container" style="flex: 1; border-bottom: 1px solid #ccc;"></div>
<button id="run-code" style="padding: 10px; background: #007bff; color: white; border: none; cursor: pointer;">
    Exécuter le code
</button>
<pre id="console" style="margin: 0; height: 200px; background: #1e1e1e; color: #fff; padding: 10px; overflow-y: auto; font-family: monospace; white-space: pre-wrap;">
Console prête. Écrivez du code et cliquez sur "Exécuter le code".
</pre>
<textarea id="code-editor" style="display: none;">
// Exemple de code JavaScript
console.log("Bonjour le monde !");
for (let i = 1; i <= 5; i++) {
    console.log("Compteur : " + i);
}
try {
    throw new Error("Exemple d'erreur capturée");
} catch (e) {
    console.error(e);
}
</textarea>
<script>
    // Initialisation de CodeMirror
    const editor = CodeMirror(document.getElementById("editor-container"), {
        value: document.getElementById("code-editor").value,
        lineNumbers: true,
        mode: "javascript",
        theme: "default",
        indentUnit: 4,
        tabSize: 4
    });
    editor.setSize("100%", "100%");
    // Hover sur le bouton
    const runButton = document.getElementById("run-code");
    runButton.addEventListener("mouseenter", () => runButton.style.background = "#0056b3");
    runButton.addEventListener("mouseleave", () => runButton.style.background = "#007bff");
    // Surcharge de la console
    const consoleOutput = document.getElementById("console");
    const toriginalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    function appendToConsole(type, args) {
        const line = Array.from(args).map(arg => 
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(" ");
        const div = document.createElement("div");
        div.textContent = line;
        if (type === "error") div.style.color = "#ff6b6b";
        if (type === "warn") div.style.color = "#ffd43b";
        consoleOutput.appendChild(div);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
    // Exécution du code
    document.getElementById("run-code").addEventListener("click", () => {
        consoleOutput.innerHTML = "";
        consoleOutput.textContent = "Exécution en cours...\n\n";
        const origLog = console.log;
        const origError = console.error;
        const origWarn = console.warn;
        console.log = (...args) => {
            appendToConsole("log", args);
        };
        console.error = (...args) => {
            appendToConsole("error", args);
        };
        console.warn = (...args) => {
            appendToConsole("warn", args);
        };
        try {
            new Function(editor.getValue())();
        } catch (err) {
            console.error(err);
        } finally {
            console.log = origLog;
            console.error = origError;
            console.warn = origWarn;
        }
    });
</script>

## Activités suggérées

Pour appliquer les concepts de JSON en JavaScript, voici 5 activités pratiques à réaliser :

1. **Création et sérialisation d'un objet** : Définissez un objet JavaScript représentant un étudiant (nom, âge, notes sous forme de tableau). Utilisez `JSON.stringify()` pour le convertir en chaîne JSON et affichez-le dans la console.

2. **Parsing d'une chaîne JSON** : Créez une chaîne JSON représentant une liste de produits (nom, prix, catégorie). Utilisez `JSON.parse()` pour la convertir en objet, puis parcourez le tableau pour afficher chaque produit.

3. **Manipulation de données JSON imbriquées** : Définissez un objet complexe avec des objets imbriqués (par exemple, une entreprise avec des employés, chacun ayant un poste et un salaire). Convertissez-le en JSON, puis parsez-le et modifiez une valeur avant de le reconvertir.

4. **Gestion d'erreurs de parsing** : Écrivez un script qui tente de parser différentes chaînes JSON, certaines valides et d'autres non. Utilisez un bloc `try...catch` pour gérer les erreurs et afficher des messages appropriés.

5. **Simulation d'une API REST** : Créez une fonction qui simule une réponse d'API en retournant une chaîne JSON. Écrivez ensuite du code qui "fetch" cette donnée, la parse, et affiche les informations dans une liste HTML en manipulant le DOM.

6. **Installation et essai de Node.js (optionnel)** : JavaScript n'est pas limité au navigateur ! Installez Node.js, l'environnement d'exécution JavaScript côté serveur. Téléchargez la dernière version depuis le site officiel (nodejs.org), installez-la, puis ouvrez un terminal et tapez `node -v` pour vérifier l'installation. Créez ensuite un fichier `test.js` avec du code simple (par exemple, `console.log("Hello from Node.js!");`), et exécutez-le avec `node test.js`. 
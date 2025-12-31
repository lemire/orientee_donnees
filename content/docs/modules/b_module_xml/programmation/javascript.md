---
title: "JavaScript et DOM"
weight: 24
---



# DOM et JavaScript

Les implémentations JavaScript supportent bien l'API DOM en général.  La principale différence entre DOM en JavaScript et DOM en Java est que certaines méthodes en Java deviennent des attributs ou des propriétés en JavaScript (getNodeValue() devient nodeValue).

JavaScript peut donc lire et traiter des documents XML avec l'API DOM. En particulier, si JavaScript est utilisé au sein d'une page XHTML, le script peut modifier la page dynamiquement en utilisant l'API DOM. La principale différence entre l'utilisation de DOM en Java et JavaScript est qu'à l'exception des méthodes getAttribute, setAttribute, getAttributeNS, setAttributeNS, getAttributeNode, setAttributeNode, getAttributeNodeNS, setAttributeNodeNS, getElementsByTagName et getElementById, toutes les méthodes dont le nom commence par « get » ou « set » sont remplacées par un attribut de l'objet (ou « property » en anglais). Au lieu d'écrire « e.getChildNodes(); », on écrit « e.childNodes; », au lieu d'écrire « e.setNodeValue("texte"); », on écrit « e.nodeValue="texte"; », et ainsi de suite.

Par exemple, le script suivant va ajouter du texte lorsque la souris passera sur l'élément ayant un attribut « id='javatest' ».

```javascript
monele=document.getElementById('javatest');
monele.childNodes.item(0).nodeValue+=' (passage de souris) ';
```



Ce petit script illustre plusieurs points importants. D'abord, `document.getElementById('javatest')` recherche dans le document l'élément qui porte l'attribut `id="javatest"` et retourne une référence à cet élément (ou `null` si aucun élément n'est trouvé). C'est l'un des moyens les plus rapides et les plus courants pour cibler un élément unique dans la page.

Ensuite, `monele.childNodes.item(0).nodeValue` accède au premier nœud enfant de l'élément — souvent un nœud `Text` contenant le texte interne — et en modifie la valeur. Cette approche fonctionne si le premier nœud enfant est bien un nœud de texte ; dans le cas contraire (par exemple si l'élément contient d'autres éléments enfants), il faudra tester le type du nœud ou préférer `textContent` pour manipuler tout le texte intérieur.

Concernant les événements, l'exemple suppose implicitement qu'une gestion d'événement a été définie ailleurs. En pratique on préfère attacher explicitement un écouteur d'événement moderne :

```javascript
const el = document.getElementById('javatest');
el.addEventListener('mouseover', () => {
	el.textContent += ' (passage de souris)';
});
```

L'objet `document` permet de modifier dynamiquement le contenu, la structure et le style de la page, ce qui est essentiel pour créer des applications web interactives. Il est automatiquement disponible dans tous les scripts exécutés dans le contexte d'une page web.

## Exemple : Chargement et énumération d'un document XML

Voici un exemple complet de programme JavaScript qui charge un document XML (ici depuis une chaîne pour simplicité, mais on pourrait utiliser `fetch` pour charger depuis un fichier), puis énumère récursivement tous les éléments et leurs contenus.

```javascript
const xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<catalogue>
    <livre id="1">
        <titre>JavaScript pour les nuls</titre>
        <auteur>John Doe</auteur>
        <prix>29.99</prix>
    </livre>
    <livre id="2">
        <titre>XML en pratique</titre>
        <auteur>Jane Smith</auteur>
        <prix>34.50</prix>
    </livre>
</catalogue>`;

// Parser le XML
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "text/xml");

// Vérifier s'il y a des erreurs de parsing
const parseError = xmlDoc.querySelector("parsererror");
if (parseError) {
    document.getElementById('resultat').textContent = "Erreur de parsing XML: " + parseError.textContent;
    return;
}

// Fonction récursive pour énumérer les éléments
function enumererElement(element, niveau = 0) {
    console.log("element");
    let resultat = "";
    const indentation = "  ".repeat(niveau);
    
    // Afficher le nom de l'élément et ses attributs
    resultat += indentation + "<" + element.tagName;
    for (let attr of element.attributes) {
        resultat += " " + attr.name + "=\"" + attr.value + "\"";
    }
    resultat += ">\n";
    
    // Énumérer les nœuds enfants
    for (let child of element.childNodes) {
        if (child.nodeType === Node.ELEMENT_NODE) {
            // Élément enfant
            resultat += enumererElement(child, niveau + 1);
        } else if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
            // Nœud de texte non vide
            resultat += indentation + "  " + child.textContent.trim() + "\n";
        }
    }
    
    // Fermer l'élément
    resultat += indentation + "</" + element.tagName + ">\n";
    
    return resultat;
}

// Commencer l'énumération depuis la racine
const racine = xmlDoc.documentElement;
console.log(enumererElement(racine));
```

## Exemple : Génération d'un document XML en JavaScript



```javascript
// Création d'un nouveau document XML vide (sans namespace par défaut)
const doc = document.implementation.createDocument(null, 'racine', null);

// Ajout d'attributs à l'élément racine
doc.documentElement.setAttribute('version', '1.0');
doc.documentElement.setAttribute('lang', 'fr');

// Création d'un élément <personne> avec un attribut id
const personne1 = doc.createElement('personne');
personne1.setAttribute('id', '1');

// Ajout de sous-éléments texte
const nom = doc.createElement('nom');
nom.textContent = 'Dupont';
const prenom = doc.createElement('prenom');
prenom.textContent = 'Jean';
const age = doc.createElement('age');
age.textContent = '35';

// Assemblage de la structure
personne1.appendChild(nom);
personne1.appendChild(prenom);
personne1.appendChild(age);

// Ajout d'une deuxième personne pour l'exemple
const personne2 = doc.createElement('personne');
personne2.setAttribute('id', '2');

const nom2 = doc.createElement('nom');
nom2.textContent = 'Martin';
const prenom2 = doc.createElement('prenom');
prenom2.textContent = 'Sophie';
const age2 = doc.createElement('age');
age2.textContent = '28';

personne2.appendChild(nom2);
personne2.appendChild(prenom2);
personne2.appendChild(age2);

// Ajout des deux personnes à la racine
doc.documentElement.appendChild(personne1);
doc.documentElement.appendChild(personne2);

// Ajout d'un commentaire XML
const commentaire = doc.createComment('Exemple de génération XML avec l\'API DOM');
doc.documentElement.insertBefore(commentaire, personne1);

// Sérialisation du document XML en string
const serializer = new XMLSerializer();
const xmlString = serializer.serializeToString(doc);

// Ajout de la déclaration XML au début pour un rendu plus complet
const xmlComplet = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlString;

// Affichage dans la console
console.log('XML généré :\n');
console.log(xmlComplet);
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

Pour renforcer votre compréhension de l'interaction entre JavaScript et le DOM, voici des activités pratiques à réaliser.


1. **Génération d'une liste à partir d'un tableau** : Définissez un tableau de chaînes en JavaScript (par exemple, des noms de villes). Utilisez une boucle pour créer dynamiquement des éléments `<ville>` dans une liste `<liste>`.

2. **Parsing et affichage de données XML** : Créez une chaîne XML représentant une liste de livres (titre, auteur, prix). Utilisez `DOMParser` pour analyser le XML, puis parcourez les éléments pour afficher les informations dans une liste HTML.

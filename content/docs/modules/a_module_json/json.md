---
title: "JSON"
weight: 25
---

# JSON


Le format JSON (JavaScript Object Notation) est un standard ouvert pour l'échange de données, largement adopté pour sa simplicité et sa lisibilité. Introduit en 2001 par Douglas Crockford, il est devenu essentiel dans le développement web, les API REST et les configurations d'applications modernes.

Les types de données supportés par JSON sont limités mais suffisants pour la plupart des cas d'usage : chaînes de caractères entre guillemets doubles, nombres (entiers ou flottants), booléens (true/false), null, objets (paires clé-valeur) et tableaux (listes ordonnées). Cette simplicité facilite le parsing et la génération, avec des bibliothèques natives dans presque tous les langages de programmation.

Un objet JSON est délimité par des accolades `{}` et contient des paires clé-valeur séparées par des virgules. Les clés sont toujours des chaînes, tandis que les valeurs peuvent être de n'importe quel type JSON valide. Par exemple : `{"nom": "Alice", "âge": 30, "actif": true}` représente un objet simple avec trois propriétés.

Les tableaux JSON utilisent des crochets `[]` et contiennent des valeurs séparées par des virgules. Ils peuvent mélanger différents types : `[1, "deux", true, null, {"clé": "valeur"}]`. Cette flexibilité permet de représenter des structures complexes comme des listes d'objets ou des matrices multidimensionnelles.

La syntaxe JSON est stricte : pas de commentaires, pas de virgule finale, guillemets doubles obligatoires pour les chaînes, pas de fonctions ou d'expressions. Cette rigueur assure une interopérabilité parfaite entre systèmes, mais peut rendre l'écriture manuelle fastidieuse pour les fichiers de configuration complexes.

Pour les chaînes de caractères, JSON supporte les séquences d'échappement standard : `\"` pour les guillemets, `\\` pour la barre oblique inverse, `\/` pour la barre oblique, `\b`, `\f`, `\n`, `\r`, `\t`, et `\uXXXX` pour les caractères Unicode. Cela permet d'inclure n'importe quel caractère dans les chaînes.

Les nombres en JSON suivent la notation décimale standard, sans distinction entre entiers et flottants. Ils peuvent être positifs ou négatifs, avec ou sans partie décimale : `42`, `-3.14`, `1e10`. Attention aux précisions flottantes qui peuvent varier selon les langages.

La valeur `null` représente l'absence de valeur, équivalente à `undefined` en JavaScript ou `None` en Python. Elle est souvent utilisée pour indiquer des champs optionnels non définis.

L'imbrication est une force de JSON : objets dans des tableaux, tableaux dans des objets, permettant des structures hiérarchiques complexes. Par exemple, un catalogue de produits peut être représenté comme un objet contenant un tableau d'objets produit, chacun avec ses propriétés.


Malgré ses limitations (pas de dates natives, pas de commentaires, pas de références circulaires), JSON excelle dans les échanges de données légères et structurées. Pour des besoins plus avancés, des extensions comme JSON Schema permettent de valider la structure des documents JSON.


Voici un exemple plus élaboré montrant une structure JSON typique pour une API :

```json
{
  "utilisateur": {
    "id": 12345,
    "nom": "Dupont",
    "prénom": "Marie",
    "email": "marie.dupont@example.com",
    "profil": {
      "date_naissance": "1990-05-15",
      "ville": "Paris",
      "pays": "France"
    },
    "commandes": [
      {
        "id_commande": "CMD-001",
        "date": "2023-12-01",
        "montant": 149.99,
        "articles": [
          {"nom": "Livre JSON", "quantité": 1, "prix": 29.99},
          {"nom": "Cours JavaScript", "quantité": 2, "prix": 60.00}
        ]
      }
    ]
  }
}
```

Cet exemple illustre comment JSON peut représenter des données relationnelles complexes avec imbrication et tableaux. Chaque niveau ajoute de la structure sans complexité syntaxique excessive.
<div style="max-width: 800px; margin: 0 auto; background-color: #ffffff; padding: 24px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
 <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #1f2937;">
  Application d'Arborescence JSON
 </h1>
 <p style="margin-bottom: 16px; color: #4b5563;">
  Entrez un contenu JSON dans le champ ci-dessous, puis cliquez sur "Dessine" pour afficher l'arborescence sous forme de liste hiérarchique. Exemple :
 </p>
 <pre style="background-color: #e6f4ea; padding: 12px; border: 1px solid #15803d; border-radius: 4px; font-family: monospace; font-size: 14px; color: #374151; margin-bottom: 16px;">{
    "library": {
        "books": [
            {
                "id": 1,
                "genre": "fiction",
                "title": "The Hobbit",
                "author": "J.R.R. Tolkien"
            },
            {
                "id": 2,
                "genre": "non-fiction",
                "title": "Sapiens",
                "author": "Yuval Noah Harari"
            }
        ]
    }
}
        </pre>
 <div style="background-color: #f9fafb; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;">
  <div style="margin-bottom: 16px;">
   <label for="jsonInput" style="display: block; font-size: 14px; font-weight: medium; color: #374151;">
    Contenu JSON :
   </label>
   <textarea id="jsonInput" style="width: 100%; padding: 8px; border: 1px solid #d1d5db; border-radius: 4px; min-height: 100px;">{
    "library": {
        "books": [
            {
                "id": 1,
                "genre": "fiction",
                "title": "The Hobbit",
                "author": "J.R.R. Tolkien"
            },
            {
                "id": 2,
                "genre": "non-fiction",
                "title": "Sapiens",
                "author": "Yuval Noah Harari"
            }
        ]
    }
}
                </textarea>
  </div>
  <button onclick="drawTree()" style="width: 100%; background-color: #2563eb; color: #ffffff; padding: 8px; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.2s;">
   Dessine
  </button>
  <div id="error" style="margin-top: 16px; color: #dc2626; font-size: 14px;">
  </div>
  <div id="tree" style="margin-top: 16px; padding: 12px; border: 1px solid #d1d5db; border-radius: 4px;">
  </div>
 </div>
</div>
<script>
 function drawTree() {
            const jsonInput = document.getElementById('jsonInput').value.trim();
            const errorDiv = document.getElementById('error');
            const treeDiv = document.getElementById('tree');
            // Réinitialiser
            errorDiv.innerHTML = '';
            treeDiv.innerHTML = '';
            if (!jsonInput) {
                errorDiv.innerHTML = 'Erreur : Veuillez entrer un contenu JSON.';
                return;
            }
            try {
                const jsonObj = JSON.parse(jsonInput);
                // Fonction récursive pour construire la liste
                function buildTree(obj, key = 'root') {
                    const ul = document.createElement('ul');
                    ul.style.listStyleType = 'none';
                    ul.style.paddingLeft = '20px';
                    ul.style.borderLeft = '2px solid #15803d';
                    ul.style.margin = '0';
                    const li = document.createElement('li');
                    li.style.margin = '8px 0';
                    li.style.position = 'relative';
                    const nodeSpan = document.createElement('span');
                    let displayText = key;
                    // Afficher la valeur si c'est une feuille
                    if (typeof obj !== 'object' || obj === null) {
                        displayText += `: ${obj === null ? 'null' : obj}`;
                    }
                    nodeSpan.textContent = displayText;
                    nodeSpan.style.display = 'inline-block';
                    nodeSpan.style.padding = '4px 8px';
                    nodeSpan.style.backgroundColor = '#e6f4ea';
                    nodeSpan.style.border = '1px solid #15803d';
                    nodeSpan.style.borderRadius = '4px';
                    nodeSpan.style.color = '#374151';
                    nodeSpan.style.fontSize = '14px';
                    li.appendChild(nodeSpan);
                    // Ajouter les enfants si objet ou tableau
                    if (typeof obj === 'object' && obj !== null) {
                        const childUl = buildTreeChildren(obj);
                        li.appendChild(childUl);
                    }
                    ul.appendChild(li);
                    return ul;
                    function buildTreeChildren(parent) {
                        const childUl = document.createElement('ul');
                        childUl.style.listStyleType = 'none';
                        childUl.style.paddingLeft = '20px';
                        childUl.style.borderLeft = '2px solid #15803d';
                        childUl.style.margin = '0';
                        if (Array.isArray(parent)) {
                            parent.forEach((item, index) => {
                                const childLi = document.createElement('li');
                                childLi.style.margin = '8px 0';
                                childLi.style.position = 'relative';
                                const childSpan = document.createElement('span');
                                childSpan.textContent = `[${index}]`;
                                childSpan.style.display = 'inline-block';
                                childSpan.style.padding = '4px 8px';
                                childSpan.style.backgroundColor = '#e6f4ea';
                                childSpan.style.border = '1px solid #15803d';
                                childSpan.style.borderRadius = '4px';
                                childSpan.style.color = '#374151';
                                childSpan.style.fontSize = '14px';
                                childLi.appendChild(childSpan);
                                if (typeof item === 'object' && item !== null) {
                                    const grandChildUl = buildTreeChildren(item);
                                    childLi.appendChild(grandChildUl);
                                } else {
                                    const valueSpan = document.createElement('span');
                                    valueSpan.textContent = `: ${item === null ? 'null' : item}`;
                                    valueSpan.style.color = '#374151';
                                    valueSpan.style.fontSize = '14px';
                                    childLi.appendChild(valueSpan);
                                }
                                childUl.appendChild(childLi);
                            });
                        } else {
                            for (let childKey in parent) {
                                const childLi = document.createElement('li');
                                childLi.style.margin = '8px 0';
                                childLi.style.position = 'relative';
                                const childSpan = document.createElement('span');
                                childSpan.textContent = childKey;
                                childSpan.style.display = 'inline-block';
                                childSpan.style.padding = '4px 8px';
                                childSpan.style.backgroundColor = '#e6f4ea';
                                childSpan.style.border = '1px solid #15803d';
                                childSpan.style.borderRadius = '4px';
                                childSpan.style.color = '#374151';
                                childSpan.style.fontSize = '14px';
                                childLi.appendChild(childSpan);
                                if (typeof parent[childKey] === 'object' && parent[childKey] !== null) {
                                    const grandChildUl = buildTreeChildren(parent[childKey]);
                                    childLi.appendChild(grandChildUl);
                                } else {
                                    const valueSpan = document.createElement('span');
                                    valueSpan.textContent = `: ${parent[childKey] === null ? 'null' : parent[childKey]}`;
                                    valueSpan.style.color = '#374151';
                                    valueSpan.style.fontSize = '14px';
                                    childLi.appendChild(valueSpan);
                                }
                                childUl.appendChild(childLi);
                            }
                        }
                        return childUl;
                    }
                }
                // Construire et afficher l'arborescence
                const treeUl = buildTree(jsonObj);
                treeDiv.appendChild(treeUl);
            } catch (e) {
                errorDiv.innerHTML = `Erreur : ${e.message || 'Impossible de traiter le JSON.'}`;
            }
        }
</script>


À lire :

- [présentation de JSON sur json.org](http://json.org/json-fr.html)



---
title: "Pense-bête JSON"
weight: 182
---

# Pense-bête JSON

## Types de données en JSON

**Objet**

: Structure de données clé-valeur, délimitée par des accolades `{}`.

**Tableau**

: Liste ordonnée de valeurs, délimitée par des crochets `[]`.

**Chaîne de caractères**

: Texte entre guillemets doubles `"texte"`. Peut inclure des caractères d'échappement comme `\"`, `\\`, `\/`, `\b`, `\f`, `\n`, `\r`, `\t`, `\uXXXX`.

**Nombre**

: Valeur numérique, entière ou décimale, sans guillemets. Exemples : `123`, `12.34`, `-56`.

**Booléen**

: Valeurs `true` ou `false`.

**Null**

: Valeur nulle représentée par `null`.

## Syntaxe de base

**Objet :** `{"clé": "valeur", "clé2": 123}`

: Les clés sont des chaînes, les valeurs peuvent être de n'importe quel type JSON.

**Tableau :** `["valeur1", "valeur2", 123]`

: Liste de valeurs séparées par des virgules.

**Imbrication :** Les objets et tableaux peuvent être imbriqués.

: Exemple : `{"utilisateur": {"nom": "Dupont", "âges": [25, 30]}}`

## Règles de syntaxe

- **Clés uniques :** Dans un objet, chaque clé doit être unique.
- **Virgules :** Séparent les paires clé-valeur dans les objets et les valeurs dans les tableaux. Pas de virgule après le dernier élément.
- **Guillemets :** Les clés et les chaînes doivent être entre guillemets doubles.
- **Pas de commentaires :** JSON ne supporte pas les commentaires nativement.
- **Encodage :** Généralement en UTF-8.

## Échappement et caractères spéciaux

- `\"` : Guillemet double
- `\\` : Barre oblique inverse
- `\/` : Barre oblique
- `\b` : Retour arrière
- `\f` : Saut de page
- `\n` : Nouvelle ligne
- `\r` : Retour chariot
- `\t` : Tabulation
- `\uXXXX` : Caractère Unicode (XXXX en hexadécimal)

## Validation et outils

- **JSON valide :** Doit respecter la syntaxe stricte. Utilisez des validateurs en ligne ou des bibliothèques comme `jsonlint`.
- **JSON Schema :** Spécification pour valider la structure des documents JSON.
- **Parsing :** En JavaScript, utilisez `JSON.parse()` pour analyser, `JSON.stringify()` pour sérialiser.

---

### Exemples rapides

```json
{
  "livre": {
    "titre": "Exemple de livre",
    "auteurs": ["Auteur1", "Auteur2"],
    "chapitres": [
      {"numero": 1, "titre": "Introduction"},
      {"numero": 2, "titre": "Contenu"}
    ]
  }
}
```

Cet exemple montre un objet JSON imbriqué avec des chaînes, tableaux et objets.

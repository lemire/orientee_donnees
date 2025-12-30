---
title: "Pense-bête YAML"
weight: 184
---
<h1>Pense-bête YAML</h1>

## Types de données en YAML

**Scalaires**

: Valeurs simples : chaînes, nombres, booléens, null.

**Mappings (Dictionnaires)**

: Paires clé-valeur, équivalents aux objets JSON.

**Séquences (Listes)**

: Listes ordonnées de valeurs.

**Chaînes**

: Texte simple ou entre guillemets. Supporte les multi-lignes.

**Nombres**

: Entiers ou décimaux : `123`, `12.34`.

**Booléens**

: `true`, `false`, `yes`, `no`, `on`, `off`.

**Null**

: `null`, `~`, ou vide.

## Syntaxe de base

**Mappings :**

```
clé: valeur
clé2: valeur2
```

: Utilise l'indentation pour la structure.

**Séquences :**

```
- élément1
- élément2
- élément3
```

: Liste avec des tirets.

**Imbrication :**

```
utilisateur:
  nom: Dupont
  âges:
    - 25
    - 30
```

: Combinez mappings et séquences.

## Règles de syntaxe

- **Indentation :** Utilise des espaces (pas de tabulations). 2 espaces par niveau recommandés.
- **Clés :** Sensibles à la casse. Peuvent être entre guillemets si nécessaire.
- **Valeurs :** Types inférés automatiquement.
- **Commentaires :** `# Commentaire` (ignorés).
- **Multi-lignes :** `|` pour conserver les sauts de ligne, `>` pour les fusionner.
- **Ancres et alias :** `&ancre` pour définir, `*ancre` pour référencer.

## Échappement et caractères spéciaux

- Guillemets doubles `"` pour les chaînes avec caractères spéciaux.
- Guillemets simples `'` pour les chaînes littérales.
- Échappement avec `\` dans les guillemets doubles.

## Fonctionnalités avancées

- **Types explicites :** `!!str "texte"`, `!!int 123`, etc.
- **Documents multiples :** Séparés par `---`.
- **Fusion :** `<<: *ancre` pour fusionner mappings.
- **Ensembles :** `!!set {clé1: null, clé2: null}`.

## Validation et outils

- **YAML valide :** Respecte l'indentation et la syntaxe. Utilisez des validateurs comme `yamllint`.
- **Conversion :** Facilement convertible en JSON ou autres formats.
- **Parsing :** En Python, utilisez `pyyaml` ; en JavaScript, `js-yaml`.

---

### Exemples rapides

```yaml
livre:
  titre: "Exemple de livre"
  auteurs:
    - Auteur1
    - Auteur2
  chapitres:
    - numero: 1
      titre: "Introduction"
    - numero: 2
      titre: "Contenu"
```

Cet exemple montre un mapping imbriqué avec des séquences et des scalaires.

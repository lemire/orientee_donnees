---
title: "Pense-bête XML"
weight: 180
---
<h1>Pense-bête XML</h1>

## Quelques symboles importants en DTD

**<!DOCTYPE nomXML_elementRacine SYSTEM "URL">**

: Déclaration de type de document.

**<!ELEMENT ... >**

: Déclaration d'un élément (instruction DTD).

**?** — Élément optionnel.

<strong>*</strong> — Élément pouvant être présent plusieurs fois (0..∞).

**+** — Élément présent au moins une fois (1..∞).

**|** — Alternative (ou).

**#PCDATA** — Contenu textuel (parsed character data).

**<!ATTLIST nomElementX nomAttributY ...>**

: Spécifie qu’un élément `nomElementX` possède l’attribut `nomAttributY`.

**CDATA** — Type d’attribut indiquant que l’attribut contient du texte.

**REQUIRED** — Attribut obligatoire.

**IMPLIED** — Attribut optionnel (pas de valeur par défaut).

**FIXED** — Attribut fixé à une valeur constante.

**<!ENTITY nomEntiteX "Yvaleur">**

: Définit une entité nommée `nomEntiteX` qui vaut `Yvaleur`.

> Note : j'ai remplacé `valeurY` par `Yvaleur` dans l'exemple pour éviter une répétition maladroite du mot "valeur".

**<!ENTITY % nomEntiteX "Yvaleur">**

: Entité paramètre pour la DTD (locale à la DTD) — `nomEntiteX` prend la valeur `Yvaleur`.

## Éléments essentiels du XML

### Déclaration XML

**<?xml version="1.0" encoding="UTF-8"?>**

: Déclaration obligatoire au début d'un document XML. Spécifie la version XML et l'encodage des caractères.

### Éléments

Les éléments sont les blocs de construction principaux du XML. Ils sont délimités par des balises.

- **<nomElement>contenu</nomElement>** : Élément avec contenu.
- **<nomElement />** : Élément vide (auto-fermant).

### Attributs

Les attributs fournissent des informations supplémentaires sur les éléments.

- **<element attribut="valeur">** : Attribut avec valeur.

### Contenu textuel

Le texte entre les balises est le contenu de l'élément.

- **#PCDATA** : Données de caractères analysées (texte normal).

### Sections CDATA

**<![CDATA[ contenu ]]>**

: Permet d'inclure du texte qui ne doit pas être analysé comme du XML (par exemple, du code HTML ou JavaScript).

### Commentaires

**<!-- Commentaire -->**

: Les commentaires sont ignorés par le parseur XML.

### Instructions de traitement

**<?nom instruction?>**

: Instructions pour les applications, comme **<?xml-stylesheet type="text/xsl" href="style.xsl"?>** pour lier une feuille de style XSL.

### Entités

Les entités permettent de définir des raccourcis pour du texte ou des caractères spéciaux.

- **&entite;** : Référence à une entité.
- Entités prédéfinies : &lt; (<), &gt; (>), &amp; (&), &quot; ("), &apos; (').

### Espaces de noms (Namespaces)

Permettent d'éviter les conflits de noms dans les documents XML.

- **xmlns:prefix="URI"** : Déclaration d'un espace de noms.
- **<prefix:element>** : Utilisation d'un élément dans un espace de noms.

### Règles de bien-formé (Well-formed)

Un document XML est bien-formé s'il respecte la syntaxe XML :

- Un élément racine unique.
- Balises correctement imbriquées et fermées.
- Attributs uniques par élément.
- Valeurs d'attributs entre guillemets.

### Validation

- **DTD (Document Type Definition)** : Définit la structure autorisée du document.
- **XML Schema (XSD)** : Alternative plus puissante à la DTD pour la validation.

---

### Exemples rapides

```dtd
<!DOCTYPE livre SYSTEM "livre.dtd">
<!ELEMENT livre (titre, auteur+, chapitre*)>
<!ATTLIST chapitre numero CDATA #REQUIRED>
<!ENTITY entiteExemple "Valeur de l'entite">
```

Ces exemples montrent la syntaxe de base pour déclarer un DTD et des éléments/attributs.

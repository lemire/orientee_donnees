---
title: "Accessibilité web"
weight: 57
---

# Accessibilité web

## 1. Introduction : qu'est-ce que l'accessibilité web

### Définition

L'**accessibilité numérique** — souvent abrégée *a11y* (« a », onze lettres, « y ») — consiste à concevoir des sites et des applications que **toute personne peut percevoir, comprendre et utiliser**, y compris en situation de handicap.

Il ne faut pas la confondre avec deux notions voisines :

- l'**ergonomie** (ou *utilisabilité*) cherche à rendre un site agréable et efficace pour l'utilisateur moyen ;
- la **qualité web** couvre plus largement la performance, le référencement, la maintenabilité, l'éco-conception.

Les trois se recoupent beaucoup, mais l'accessibilité a une particularité : elle est **normée** et, pour de nombreux organismes, **obligatoire**. Un site peut être joli et rapide tout en étant strictement inutilisable pour une personne aveugle.

### Pourquoi cela concerne tout le monde

On imagine souvent l'accessibilité comme un service rendu à une petite minorité. C'est une erreur de perspective. Une limitation peut être :

- **permanente** — une personne aveugle de naissance ;
- **temporaire** — un bras dans le plâtre, une conjonctivite, une otite ;
- **situationnelle** — consulter son téléphone en plein soleil, regarder une vidéo dans un autobus bruyant sans écouteurs, tenir un enfant d'un bras et naviguer de l'autre.

Une même solution technique sert les trois cas. Les sous-titres profitent à la personne sourde, à celle qui a une otite, et à celle qui est dans l'autobus. Un bon contraste sert la personne malvoyante et celle qui est en plein soleil.

### Types de limitations

| Type | Exemples | Conséquences techniques principales |
| --- | --- | --- |
| Visuelle | Cécité, basse vision, daltonisme | Lecteur d'écran, zoom, contraste, jamais d'information par la couleur seule |
| Auditive | Surdité, malentendance | Sous-titres, transcriptions |
| Motrice | Paralysie, tremblements, douleur, amputation | Navigation clavier, grandes cibles, pas de geste de précision obligatoire |
| Cognitive et troubles d'apprentissage | Dyslexie, TDAH, déficience intellectuelle, aphasie | Langue claire, structure prévisible, pas de limite de temps arbitraire |
| Photosensibilité | Épilepsie photosensible | Aucun clignotement rapide |

Ces catégories se combinent, et elles évoluent : le vieillissement de la population fait de la basse vision et de la perte d'audition des situations très courantes.

### Technologies d'assistance

Il est difficile de bien coder sans savoir *qui* lira le code. Les principaux outils sont :

- les **lecteurs d'écran**, qui transforment la page en parole ou en braille : NVDA et JAWS sous Windows, VoiceOver sous macOS et iOS, TalkBack sous Android ;
- la **navigation au clavier seul**, sans souris, avec `Tab`, `Maj+Tab`, `Entrée`, `Espace` et les flèches ;
- le **zoom** et les loupes d'écran ;
- les **modes de contraste élevé** du système d'exploitation ;
- les **sous-titres** et les transcriptions ;
- les dispositifs de pointage alternatifs : contacteurs, commande oculaire, commande vocale.

Un lecteur d'écran ne « voit » pas votre page : il lit l'**arbre d'accessibilité** que le navigateur construit à partir de votre HTML. C'est pourquoi tout commence par le balisage.

### Bénéfices collatéraux

Le travail d'accessibilité n'est presque jamais du travail perdu :

- **référencement** : les titres, `alt` et libellés explicites sont exactement ce qu'indexe un moteur de recherche ;
- **robustesse** : une page bien structurée survit mieux aux navigateurs anciens, aux connexions lentes, aux extensions de lecture ;
- **mobile** : les grandes cibles et le contenu qui se remet en page servent d'abord au téléphone ;
- **clarté du code** : `<button>` dit ce qu'il fait ; `<div onclick>` ne dit rien.

### Les principes POUR des WCAG

La référence internationale est le standard **WCAG** (*Web Content Accessibility Guidelines*) du W3C. Il s'organise autour de quatre principes, retenus par l'acronyme **POUR** :

1. **Perceptible** — l'information doit pouvoir être perçue par au moins un sens disponible : texte de remplacement, sous-titres, contraste suffisant.
2. **Utilisable** (*Operable*) — l'interface doit pouvoir être manipulée : clavier, temps suffisant, pas de clignotement dangereux, navigation claire.
3. **Compréhensible** — le contenu et le fonctionnement doivent être intelligibles : langue déclarée, comportement prévisible, aide à la saisie.
4. **Robuste** — le code doit être interprétable de façon fiable par les navigateurs et les technologies d'assistance, aujourd'hui et demain.

Chaque principe se décline en directives, puis en **critères de succès** vérifiables, numérotés (par exemple 1.4.3 « Contraste (minimum) »).

### Niveaux A, AA, AAA

Chaque critère porte un niveau :

- **A** : le minimum absolu ; sans lui, des groupes entiers sont exclus.
- **AA** : le niveau visé en pratique par la réglementation et par l'industrie.
- **AAA** : exigences supplémentaires, parfois impossibles à tenir sur tout un site (le W3C lui-même ne recommande pas d'en faire une cible générale).

**La cible réaliste est AA**, et c'est celle que retiennent les cadres réglementaires.

### WCAG 2.1 et 2.2

WCAG 2.1 (2018) a ajouté des critères pensés pour le mobile et pour les limitations cognitives. WCAG 2.2 (2023) en ajoute neuf autres. Ceux qui touchent directement le HTML et le CSS :

| Critère | Niveau | Version | Ce qu'il exige |
| --- | --- | --- | --- |
| 2.4.7 Visibilité du focus | AA | 2.0 | L'élément qui a le focus clavier doit être visiblement signalé |
| 1.4.13 Contenu au survol ou au focus | AA | 2.1 | Un contenu qui apparaît au survol doit être *escamotable*, *survolable* et *persistant* |
| 2.5.5 / 2.5.8 Taille de la cible | AAA / AA | 2.1 / 2.2 | Cibles d'au moins 44 × 44 px (AAA) ou 24 × 24 px (AA), avec exceptions |
| 2.4.11 Focus non masqué | AA | 2.2 | L'élément focalisé ne doit pas être caché par un en-tête flottant |
| 3.3.7 Saisie redondante | A | 2.2 | Ne pas redemander une information déjà fournie dans le même processus |

### Le cadre québécois et canadien

Au Québec, le **SGQRI 008 3.0** — *Standard sur l'accessibilité des sites Web* — s'impose aux ministères et organismes publics, et par extension aux réseaux de l'éducation et de la santé. Sa version 3.0 s'aligne sur **WCAG 2.1 niveau AA**, en y ajoutant certains critères de WCAG 2.2 et quelques critères de niveau AAA, dont **2.3.2 « Trois flashs »** (aucun contenu ne doit clignoter plus de trois fois par seconde).

Au fédéral, la **Loi canadienne sur l'accessibilité** (2019) vise les entités sous réglementation fédérale et impose des plans d'accessibilité et une reddition de comptes ; elle fixe un objectif d'un Canada sans obstacle. Elle fonctionne par obligation de planification et de rapport, alors que le standard québécois fixe directement des exigences techniques aux sites publics.

Retenez la distinction pratique : **une obligation technique précise pour les sites publics québécois, un cadre de planification plus général au fédéral.**

{{< hint info >}}
**Accessibilité n'est pas synonyme de site laid.** Aucun critère WCAG n'interdit une direction artistique forte, une belle typographie ou des animations. Les critères portent sur le contraste, la structure, le clavier et les équivalents textuels — pas sur le goût. Les contraintes ressemblent à celles d'un bon typographe : elles cadrent le travail, elles ne l'appauvrissent pas.
{{< /hint >}}

## 2. HTML sémantique : la fondation

L'essentiel de l'accessibilité se joue ici. Un HTML juste est accessible par défaut ; c'est en s'en écartant qu'on crée des obstacles.

### Un document valide

Un doctype, des balises correctement imbriquées et fermées, les attributs requis présents. Un lecteur d'écran s'appuie sur l'arbre que construit le navigateur : un arbre bâti sur du HTML cassé est imprévisible.

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Catalogue des cours — Université TÉLUQ</title>
  </head>
  <body>
    <!-- … -->
  </body>
</html>
```

### L'attribut `lang`

L'attribut `lang` sur `<html>` indique au lecteur d'écran quelle voix et quelles règles de prononciation employer. Sans lui, un texte français lu par une voix anglaise devient incompréhensible.

On le redéclare ponctuellement pour les passages dans une autre langue :

```html
<p>
  Le principe est résumé par la formule
  <span lang="en">« first rule of ARIA: don't use ARIA »</span>.
</p>
```

### Le titre du document

`<title>` est la toute première chose annoncée à l'ouverture d'une page, et c'est le libellé de l'onglet et du signet. Il doit être **unique** dans le site et **descriptif**, du plus précis au plus général :

```html
<title>Accessibilité web — Module HTML — INF 1220</title>
```

### La hiérarchie des titres

Les titres `<h1>` à `<h6>` forment le **plan du document**. C'est le principal moyen de navigation d'un utilisateur de lecteur d'écran, qui peut sauter de titre en titre pour balayer la page comme on parcourt une table des matières.

Trois règles :

1. **Un seul `<h1>`** par page : le sujet de la page.
2. **Pas de saut de niveau** : après un `<h2>` vient un `<h3>`, jamais directement un `<h4>`.
3. **Un titre est une structure, pas une décoration.** Si vous voulez du gros texte, utilisez le CSS ; si vous voulez du petit texte en tête de section, c'est quand même un titre.

```html
<!-- À éviter : le niveau est choisi pour la taille du texte -->
<h1>Bienvenue</h1>
<h4>Inscription</h4>

<!-- Correct : le niveau reflète la structure, le CSS gère la taille -->
<h1>Bienvenue</h1>
<h2 class="titre-discret">Inscription</h2>
```

### Les régions (*landmarks*)

Les éléments de section de HTML5 créent des **repères** que les technologies d'assistance savent lister et atteindre directement :

```html
<body>
  <a href="#contenu" class="skip-link">Aller au contenu principal</a>

  <header>
    <nav aria-label="Navigation principale">…</nav>
  </header>

  <main id="contenu">
    <h1>Titre de la page</h1>
    …
  </main>

  <aside aria-label="Sur le même sujet">…</aside>

  <footer>…</footer>
</body>
```

Points de vigilance :

- **un seul `<main>`** par page, et il ne contient pas la navigation du site ;
- s'il y a plusieurs `<nav>`, chacun doit être **distingué par un `aria-label`**, sinon l'utilisateur entend « navigation, navigation, navigation » ;
- l'élément `<search>` existe depuis 2023 pour la zone de recherche ; en attendant un support universel, `<form role="search">` reste plus sûr.

### Le lien d'évitement

Sur un site avec un menu latéral, plusieurs dizaines de liens précèdent le contenu. Sans lien d'évitement, la personne qui navigue au clavier les traverse **à chaque page**.

```html
<a href="#contenu" class="skip-link">Aller au contenu principal</a>
```

```css
.skip-link {
  position: absolute;
  inset-inline-start: -9999px;
  top: 0;
  z-index: 100;
  padding: 0.6rem 1rem;
  background: #ffffff;
  color: #1a4fb4;
  border: 2px solid #1a4fb4;
}

/* Le lien n'apparaît qu'au focus clavier. */
.skip-link:focus {
  inset-inline-start: 0;
}
```

La cible doit exister et pouvoir recevoir le focus ; on ajoute `tabindex="-1"` sur le conteneur visé pour que le focus s'y déplace vraiment.

### Listes, citations, emphase

Une liste balisée `<ul>` est annoncée « liste de 5 éléments », ce qui aide à s'orienter. Une suite de `<div>` séparés par des `<br>` n'annonce rien.

```html
<!-- À éviter -->
<div>— Perceptible<br>— Utilisable<br>— Compréhensible<br>— Robuste</div>

<!-- Correct -->
<ul>
  <li>Perceptible</li>
  <li>Utilisable</li>
  <li>Compréhensible</li>
  <li>Robuste</li>
</ul>
```

Utilisez `<ol>` quand l'ordre compte, `<dl>` pour des paires terme/définition, `<blockquote>` pour une citation en bloc et `<q>` en ligne.

Pour l'emphase, `<em>` et `<strong>` portent un **sens** (le lecteur d'écran peut le rendre), alors que `<i>` et `<b>` ne sont que typographiques. Réservez `<i>` aux cas où la mise en italique est une convention sans emphase : titres d'œuvres, termes en langue étrangère, noms scientifiques.

### Tableaux

Un tableau sert à présenter des **données**, jamais à faire de la mise en page — pour cela, il y a la grille et le *flexbox* CSS.

```html
<table>
  <caption>Frais de scolarité par régime d'études, session d'automne</caption>
  <thead>
    <tr>
      <th scope="col">Régime</th>
      <th scope="col">Crédits</th>
      <th scope="col">Frais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Temps plein</th>
      <td>15</td>
      <td>1 350 $</td>
    </tr>
    <tr>
      <th scope="row">Temps partiel</th>
      <td>6</td>
      <td>540 $</td>
    </tr>
  </tbody>
</table>
```

- `<caption>` donne son nom au tableau ;
- `<th>` marque les cellules d'en-tête, et `scope="col"` ou `scope="row"` dit dans quelle direction elles s'appliquent ;
- ainsi, en arrivant sur la cellule « 540 $ », le lecteur d'écran peut annoncer « Temps partiel, Frais, 540 $ ».

### Liens et boutons

C'est la confusion la plus répandue, et elle a des conséquences réelles.

| Aspect | `<a href="…">` | `<button>` |
| --- | --- | --- |
| Rôle | Naviguer vers une ressource | Déclencher une action |
| Annoncé comme | « lien » | « bouton » |
| Touche d'activation | `Entrée` | `Entrée` **et** `Espace` |
| Menu contextuel | Ouvrir dans un onglet, copier l'adresse | Sans objet |

Un `<div onclick>` n'est ni l'un ni l'autre : il n'est pas dans l'ordre de tabulation, il ne réagit pas au clavier, et il n'est annoncé par aucun rôle.

### Le texte des liens

Un utilisateur de lecteur d'écran peut demander la **liste de tous les liens** de la page. Une liste de quinze « cliquez ici » est inutilisable. Le libellé doit se suffire à lui-même :

```html
<!-- À éviter -->
<p>Pour les modalités d'évaluation, <a href="/evaluation/">cliquez ici</a>.</p>

<!-- Correct -->
<p>Consultez les <a href="/evaluation/">modalités d'évaluation du cours</a>.</p>
```

Si le lien s'ouvre dans un nouvel onglet, dites-le — le changement de contexte est déroutant quand on ne le voit pas :

```html
<a href="https://www.w3.org/WAI/" target="_blank" rel="noopener">
  Initiative pour l'accessibilité du Web du W3C
  <span class="sr-only"> (nouvel onglet)</span>
</a>
```

### Ordre du DOM

L'ordre de lecture d'un lecteur d'écran et l'ordre de tabulation suivent l'**ordre du code source**, pas l'ordre visuel produit par le CSS. Si `order`, `row-reverse` ou un positionnement absolu réorganisent visuellement les éléments, l'ordre au clavier ne suit pas, et l'expérience devient incohérente. Rangez le DOM dans l'ordre logique et n'utilisez le réordonnancement CSS que pour des ajustements mineurs.

### Masquer correctement

Il y a trois façons de masquer, et elles ne sont pas interchangeables :

| Technique | Visible à l'écran | Annoncé par le lecteur d'écran | Usage |
| --- | --- | --- | --- |
| `display: none` / `visibility: hidden` / `hidden` | Non | Non | Contenu réellement retiré |
| `aria-hidden="true"` | Oui | Non | Décor visuel : icône redondante, glyphe ornemental |
| Classe `.sr-only` | Non | Oui | Texte utile uniquement à la voix |

La classe `.sr-only` correcte sort le texte du flux visuel sans le retirer de l'arbre d'accessibilité :

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

{{< hint warning >}}
N'appliquez jamais `aria-hidden="true"` à un élément qui contient un lien, un bouton ou un champ. Vous obtiendriez un contrôle focalisable mais invisible pour le lecteur d'écran : la personne y arrive avec `Tab` et n'entend rien.
{{< /hint >}}

### Décoratif ou informatif

La question à se poser devant tout élément non textuel : **si je le retire, le lecteur perd-il de l'information ?** Si oui, il faut un équivalent textuel. Si non, il faut le masquer aux technologies d'assistance (`alt=""`, `aria-hidden="true"`) pour ne pas encombrer la lecture.

### Attributs de base

- Les `id` doivent être **uniques** dans la page : les références `for`, `aria-labelledby` et les ancres en dépendent.
- L'attribut `title` produit une infobulle qui n'apparaît **ni au clavier, ni au toucher**, et dont le rendu est inconstant. Ne lui confiez jamais une information nécessaire.
- N'utilisez pas de `tabindex` positif (`tabindex="1"`, `tabindex="2"`…) : il déplace l'élément en tête de l'ordre de tabulation et désynchronise tout le reste de la page. Seuls `0` (rendre focalisable) et `-1` (focalisable par script uniquement) sont recommandés.

### Aperçu : ARIA

**ARIA** (*Accessible Rich Internet Applications*) est un ensemble d'attributs qui ajoutent rôle, état et propriétés à un élément quand le HTML natif ne suffit pas — typiquement pour des composants riches, en JavaScript, qui n'existent pas en HTML.

La première règle d'ARIA est de **ne pas utiliser ARIA** : si un élément HTML natif fait l'affaire, il est toujours préférable, car il apporte gratuitement le rôle, le comportement clavier et le rendu.

```html
<!-- Inutile : <nav> porte déjà le rôle « navigation » -->
<nav role="navigation">…</nav>

<!-- Correct : ARIA nomme deux repères de même rôle -->
<nav aria-label="Navigation principale">…</nav>
<nav aria-label="Fil d'Ariane">…</nav>
```

Un ARIA mal posé est **pire** que pas d'ARIA du tout : il ment au lecteur d'écran.

## 3. Images et contenu non textuel

### L'attribut `alt` est obligatoire

Toute balise `<img>` doit porter un attribut `alt`, **même vide**. Un `alt` absent et un `alt=""` ne veulent pas dire la même chose :

- `alt=""` — « cette image est décorative, ignore-la » ;
- pas d'attribut du tout — le lecteur d'écran ne sait pas quoi faire et annonce souvent le nom du fichier, ce qui donne « photo underscore i m g underscore 4 7 2 point j p g ».

### Écrire un bon `alt`

Un bon texte de remplacement est un **équivalent**, pas une description exhaustive. Demandez-vous : *si je lisais cette page au téléphone à quelqu'un, que dirais-je à cet endroit ?*

```html
<!-- Trop vague -->
<img src="graphique.png" alt="graphique">

<!-- Redondant : « image de » est déjà annoncé par le rôle -->
<img src="chat.jpg" alt="Image d'un chat">

<!-- Bon : équivalent, concis, contextuel -->
<img src="chat.jpg" alt="Chat roux endormi sur un clavier d'ordinateur">
```

Le bon `alt` dépend du **contexte**. La même photographie de campus mérite `alt=""` si elle illustre une page d'accueil, et une description précise si elle sert à comparer deux bâtiments.

### Images décoratives

```html
<img src="separateur.svg" alt="">
<img src="ornement.png" alt="" role="presentation">
```

Un `alt=""` suffit dans la quasi-totalité des cas ; `role="presentation"` ne fait que renforcer l'intention.

### Images complexes

Un graphique, une carte ou une infographie ne tient pas dans un `alt` d'une ligne. La méthode : un `alt` court qui **identifie** l'image, plus une description longue accessible à tous.

```html
<figure>
  <img src="inscriptions.png"
       alt="Graphique en barres des inscriptions de 2019 à 2024.">
  <figcaption>
    Inscriptions au programme, 2019-2024. Le nombre passe de 320 en 2019
    à 295 en 2021, puis remonte régulièrement jusqu'à 410 en 2024.
    <a href="/donnees/inscriptions.csv">Télécharger les données (CSV)</a>
  </figcaption>
</figure>
```

Le mieux reste souvent de **donner les chiffres** : la description longue profite aussi à qui voit mal le graphique, l'imprime en noir et blanc, ou veut vérifier une valeur.

### Éviter le texte dans les images

Le critère 1.4.5 « Texte sous forme d'image » demande d'utiliser du **vrai texte** plutôt qu'une image de texte. Une image de texte ne se redimensionne pas proprement, ne se recherche pas, ne se traduit pas, ne s'adapte pas aux préférences de contraste, et devient floue au zoom.

Un SVG contenant de véritables éléments `<text>` est un bon compromis : il est vectoriel et son contenu reste du texte.

```html
<svg viewBox="0 0 200 50" role="img" aria-labelledby="titre-logo">
  <title id="titre-logo">Université TÉLUQ</title>
  <text x="10" y="32" font-size="24">TÉLUQ</text>
</svg>
```

### Icônes

Deux cas seulement :

```html
<!-- L'icône accompagne un texte : elle est décorative -->
<button type="submit">
  <svg aria-hidden="true" focusable="false" width="16" height="16">…</svg>
  Rechercher
</button>

<!-- L'icône est seule : elle doit porter le nom du contrôle -->
<button type="button" aria-label="Fermer la fenêtre">
  <svg aria-hidden="true" focusable="false" width="16" height="16">…</svg>
</button>
```

### `<figure>` et `<figcaption>`

`<figure>` regroupe un contenu et sa légende. Attention à ne pas répéter mot pour mot le `alt` dans le `figcaption` : la personne entendrait deux fois la même phrase. Le `alt` décrit l'image, la légende la commente.

### Logos et favicons

Pour un logo qui sert de lien vers l'accueil, le texte de remplacement est le **nom de l'organisme**, pas une description graphique :

```html
<a href="/"><img src="logo.svg" alt="Université TÉLUQ — accueil"></a>
```

Si le nom apparaît déjà en texte à côté du logo, le logo devient décoratif : `alt=""`.

### Médias temporels

- Sous-titres synchronisés par `<track kind="captions" srclang="fr" label="Français">` ;
- **transcription** textuelle sous la vidéo — utile aussi pour chercher, citer et indexer ;
- contrôles natifs (`controls`), pour pouvoir mettre en pause ;
- pas de lecture automatique de plus de trois secondes sans moyen d'arrêter le son.

```html
<video controls width="640" poster="apercu.jpg">
  <source src="cours.mp4" type="video/mp4">
  <track kind="captions" src="cours-fr.vtt" srclang="fr" label="Français" default>
  <p>Votre navigateur ne peut pas lire cette vidéo.
     <a href="cours.mp4">Télécharger la vidéo</a>.</p>
</video>
```

{{< hint danger >}}
**Les CAPTCHA sont un piège classique.** Un CAPTCHA visuel exclut les personnes aveugles ; sa version audio exclut les personnes sourdes ; les deux ensemble excluent les personnes sourdaveugles, et beaucoup de CAPTCHA « cognitifs » excluent les personnes dyslexiques. Le critère 1.1.1 exige au minimum **deux modalités différentes**. Mieux : privilégiez des méthodes invisibles — champ leurre (*honeypot*), limitation de débit, analyse côté serveur.
{{< /hint >}}

## 4. Formulaires accessibles

Un formulaire inaccessible bloque une inscription, un paiement, une demande d'aide. C'est là que les défauts coûtent le plus cher.

### Toujours une étiquette associée

```html
<!-- Association explicite : for pointe vers l'id -->
<label for="courriel">Adresse de courriel</label>
<input type="email" id="courriel" name="courriel" autocomplete="email">

<!-- Association implicite : le label englobe le champ -->
<label>
  Adresse de courriel
  <input type="email" name="courriel" autocomplete="email">
</label>
```

Une étiquette associée ne sert pas qu'au lecteur d'écran : elle **agrandit la zone cliquable** au texte de l'étiquette, ce qui aide tout le monde, en particulier au doigt.

### Le placeholder n'est pas une étiquette

C'est l'erreur la plus fréquente. Le texte de substitution disparaît dès la première frappe, son contraste est faible par construction, il n'est pas fiablement annoncé, et l'utilisateur qui revient sur un formulaire à moitié rempli ne sait plus ce qu'on lui demandait.

```html
<!-- À éviter -->
<input type="text" placeholder="Nom de famille">

<!-- Correct : étiquette permanente, placeholder en complément -->
<label for="nom">Nom de famille</label>
<input type="text" id="nom" name="nom" autocomplete="family-name"
       placeholder="ex. Tremblay">
```

### Grouper les champs liés

Des boutons radio isolés n'ont pas de sens : il faut la question. `<fieldset>` et `<legend>` la fournissent.

```html
<fieldset>
  <legend>Régime d'études</legend>

  <input type="radio" id="plein" name="regime" value="plein">
  <label for="plein">Temps plein</label>

  <input type="radio" id="partiel" name="regime" value="partiel">
  <label for="partiel">Temps partiel</label>
</fieldset>
```

Le lecteur d'écran annonce alors « Régime d'études, Temps plein, bouton radio, 1 sur 2 ».

### Types de champs et autocomplétion

Le bon `type` déclenche le bon clavier sur mobile et la bonne validation ; `autocomplete` permet au navigateur — et aux outils d'assistance à la saisie — de remplir automatiquement.

```html
<label for="tel">Téléphone</label>
<input type="tel" id="tel" name="tel" autocomplete="tel">

<label for="naissance">Date de naissance</label>
<input type="date" id="naissance" name="naissance" autocomplete="bday">
```

C'est le critère 1.3.5 « Identifier la finalité de la saisie ».

### Champs obligatoires

Indiquez l'obligation **dans le texte**, pas seulement par une couleur ou un astérisque isolé, et utilisez l'attribut `required` pour que l'état soit exposé par programmation.

```html
<label for="courriel">Adresse de courriel (obligatoire)</label>
<input type="email" id="courriel" name="courriel" required
       autocomplete="email" aria-describedby="aide-courriel">
<p id="aide-courriel">Nous l'utiliserons uniquement pour confirmer l'inscription.</p>
```

### Messages d'erreur

Un bon message d'erreur est **textuel**, **précis**, **visible**, et **relié au champ** par `aria-describedby`. Une bordure rouge seule ne dit rien à qui ne voit pas les couleurs.

```html
<label for="cp">Code postal</label>
<input type="text" id="cp" name="cp" autocomplete="postal-code"
       aria-describedby="erreur-cp" aria-invalid="true">
<p id="erreur-cp" class="erreur">
  Erreur : le code postal doit avoir la forme A1A 1A1.
</p>
```

Placez un **résumé des erreurs en tête de formulaire**, avec un lien vers chaque champ fautif ; c'est ce qui aide le plus sur un long formulaire.

### Instructions au bon endroit

Les consignes (format attendu, longueur du mot de passe, unités) doivent apparaître **avant** le champ, pas seulement après un échec de validation. Quelqu'un qui navigue à la voix rencontre le champ avant le texte qui le suit.

### Ordre et bouton de soumission

L'ordre des champs dans le code doit suivre l'ordre visuel et logique. Le bouton porte un libellé qui décrit l'action, pas « OK » :

```html
<button type="submit">Envoyer ma demande d'admission</button>
```

### Exemple complet

Voici un formulaire qui applique l'ensemble de ces règles ; parcourez-le au clavier avec `Tab`.

<form style="max-width: 34rem; border: 1px solid #6b7280; border-radius: 6px; padding: 1rem;">
 <fieldset style="border: 1px solid #9aa0a6; border-radius: 4px; padding: 0.75rem;">
  <legend>Coordonnées</legend>
  <p>
   <label for="demo-nom" style="display: block; font-weight: 600;">Nom complet (obligatoire)</label>
   <input type="text" id="demo-nom" name="demo-nom" required autocomplete="name" style="width: 100%; padding: 0.5rem; border: 1px solid #6b7280; border-radius: 4px;">
  </p>
  <p>
   <label for="demo-courriel" style="display: block; font-weight: 600;">Adresse de courriel (obligatoire)</label>
   <input type="email" id="demo-courriel" name="demo-courriel" required autocomplete="email" aria-describedby="demo-aide-courriel" style="width: 100%; padding: 0.5rem; border: 1px solid #6b7280; border-radius: 4px;">
   <span id="demo-aide-courriel" style="font-size: 0.9em;">Exemple&nbsp;: prenom.nom@example.ca</span>
  </p>
 </fieldset>
 <fieldset style="border: 1px solid #9aa0a6; border-radius: 4px; padding: 0.75rem; margin-top: 1rem;">
  <legend>Format du matériel de cours</legend>
  <p style="margin: 0.25rem 0;">
   <input type="radio" id="demo-numerique" name="demo-format" value="numerique">
   <label for="demo-numerique">Numérique</label>
  </p>
  <p style="margin: 0.25rem 0;">
   <input type="radio" id="demo-papier" name="demo-format" value="papier">
   <label for="demo-papier">Papier</label>
  </p>
  <p style="margin: 0.25rem 0;">
   <input type="radio" id="demo-braille" name="demo-format" value="braille">
   <label for="demo-braille">Braille</label>
  </p>
 </fieldset>
 <p>
  <button type="button" style="min-height: 44px; padding: 0.5rem 1rem; background: #1a4fb4; color: #ffffff; border: none; border-radius: 4px; font-size: 1em;">Envoyer ma demande (démonstration)</button>
 </p>
</form>

## 5. CSS pour l'accessibilité

Le HTML porte la structure ; le CSS décide si elle reste perceptible.

### Contraste et couleur

Le **rapport de contraste** compare la luminance relative de deux couleurs. Il va de 1:1 (identiques) à 21:1 (noir sur blanc).

| Contenu | Niveau AA | Niveau AAA |
| --- | --- | --- |
| Texte normal | 4,5:1 | 7:1 |
| Grand texte (≥ 18 pt, ou ≥ 14 pt gras) | 3:1 | 4,5:1 |
| Composants d'interface et éléments graphiques | 3:1 | — |
| Texte purement décoratif, logotypes | aucune exigence | — |

Quelques repères sur fond blanc :

| Couleur | Rapport sur blanc | Texte normal (4,5:1) |
| --- | --- | --- |
| `#767676` | 4,54:1 | conforme, tout juste |
| `#949494` | 3,03:1 | non conforme |
| `#0055bb` | 7,53:1 | conforme |
| `#ff0000` | 4,00:1 | non conforme |
| `#c00000` | 5,89:1 | conforme |

Le rouge pur est un piège classique : il *paraît* fort, mais sa luminance le place sous le seuil.

### Jamais la couleur seule

Le critère 1.4.1 interdit de faire porter une information **uniquement** par la couleur. Il faut un second canal : soulignement, symbole, motif, texte, épaisseur.

```css
/* À éviter : seul l'indigo distingue le lien du texte noir */
a { color: #3a4cb8; text-decoration: none; }

/* Correct : le soulignement est un repère indépendant de la couleur */
a {
  color: #3a4cb8;
  text-decoration: underline;
  text-underline-offset: 0.15em;
}
```

Le cas des liens dans un paragraphe est explicitement prévu : sans soulignement, le lien doit contraster d'au moins **3:1 avec le texte environnant** *et* recevoir un repère visuel au survol et au focus. En pratique, garder le soulignement est plus simple et plus sûr.

Même logique pour un graphique : ne distinguez pas cinq courbes par la seule couleur. Ajoutez des symboles, des types de trait, ou des étiquettes directes.

### Les états doivent aussi contraster

`:hover`, `:focus`, `:active` et `:disabled` sont trop souvent oubliés. Un champ désactivé en gris très clair sur blanc est illisible — et son texte reste de l'information.

### Préférences de couleur

```css
:root { color-scheme: light dark; }

@media (prefers-color-scheme: dark) {
  :root { --fond: #1c1f26; --texte: #e8eaed; }
}
```

Ne déclarez `color-scheme: light dark` que si votre feuille de style **définit réellement** un thème sombre : sinon, le navigateur rend les contrôles de formulaire en sombre sur une page restée claire.

### Focus et interaction

Le focus clavier est l'équivalent du curseur de souris. Le supprimer revient à cacher le pointeur.

```css
/* Jamais ceci, seul */
:focus { outline: none; }
```

La bonne pratique repose sur `:focus-visible`, qui n'affiche l'indicateur que lorsque le navigateur juge qu'il est utile — au clavier, donc, sans encadrer les boutons cliqués à la souris :

```css
a:focus-visible,
button:focus-visible,
input:focus-visible,
[tabindex]:focus-visible {
  outline: 3px solid #1a4fb4;
  outline-offset: 2px;
}
```

L'indicateur doit contraster d'au moins **3:1** avec ce qu'il entoure et être suffisamment épais. Depuis WCAG 2.2, il ne doit pas non plus être **masqué** par un en-tête ou un bandeau flottant (critère 2.4.11) ; pensez à `scroll-margin-top` :

```css
:target, [tabindex="-1"]:focus {
  scroll-margin-top: 5rem; /* hauteur de l'en-tête flottant */
}
```

Essayez : les trois contrôles ci-dessous ont un focus bien visible. Atteignez-les avec `Tab`.

<p>
  <a href="https://www.w3.org/WAI/WCAG22/quickref/" style="margin-right: 1rem;">Un lien</a>
  <button type="button" style="min-height: 44px; padding: 0.5rem 1rem; margin-right: 1rem; background: #1a4fb4; color: #ffffff; border: none; border-radius: 4px; font-size: 1em;">Un bouton</button>
  <label for="demo-focus">Un champ&nbsp;: </label>
  <input type="text" id="demo-focus" size="12" style="padding: 0.4rem; border: 1px solid #6b7280; border-radius: 4px;">
</p>

### Taille et espacement des cibles

Le critère 2.5.8 (AA, WCAG 2.2) demande des cibles d'au moins **24 × 24 px CSS**, ou un espacement équivalent autour de cibles plus petites. Le critère 2.5.5 (AAA) monte à 44 × 44 px, ce qui correspond mieux à l'usage au doigt.

```css
.bouton-icone {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.barre-outils > * + * { margin-inline-start: 0.5rem; }
```

Des liens de menu serrés les uns contre les autres échouent souvent à ce critère : quelques dixièmes de `rem` de remplissage suffisent à le corriger.

### Typographie et lisibilité

- **Unités relatives** : dimensionnez le texte en `rem` ou `em`, jamais en `px` figés, pour que la taille de police choisie par l'utilisateur soit respectée.
- **Zoom à 200 %** sans perte de contenu ni défilement horizontal (critères 1.4.4 et 1.4.10). Tableaux et cartes sont les exceptions admises.
- **Hauteur de ligne** d'au moins 1,5 dans les paragraphes ; **longueur de ligne** d'environ 80 caractères au maximum.
- **Pas de texte justifié** : l'alignement des deux marges crée des « rivières » d'espaces blancs qui gênent particulièrement les personnes dyslexiques.
- Le critère 1.4.12 exige que la page reste lisible si l'utilisateur force `line-height: 1.5`, `letter-spacing: 0.12em`, `word-spacing: 0.16em` et `margin-bottom: 2em` sur les paragraphes. Évitez donc les conteneurs à hauteur fixe.

```css
body {
  font-size: 1rem;
  line-height: 1.6;
}

.contenu {
  max-width: 70ch; /* environ 70 caractères */
  text-align: left; /* et non justify */
}
```

### Mouvement et animation

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Cette requête média reflète un réglage système ; la respecter évite de déclencher nausées et vertiges chez les personnes sensibles au mouvement vestibulaire.

Deux autres règles :

- **aucun contenu ne doit clignoter plus de trois fois par seconde** (critère 2.3.1, et 2.3.2 au niveau AAA, retenu par le standard québécois) : au-delà, on risque de provoquer une crise d'épilepsie photosensible ;
- tout contenu qui **défile, s'anime ou se met à jour automatiquement** pendant plus de cinq secondes doit pouvoir être mis en pause, arrêté ou masqué (critère 2.2.2) — carrousels et bandeaux défilants au premier chef.

### Contenu au survol ou au focus

Le critère 1.4.13 impose trois qualités à toute infobulle ou tout menu déroulant apparaissant au survol :

- **escamotable** : on peut le fermer avec `Échap` sans bouger le pointeur ;
- **survolable** : on peut amener la souris dessus sans qu'il disparaisse (indispensable au zoom fort) ;
- **persistant** : il reste affiché tant que le pointeur ou le focus n'a pas quitté la zone.

### Mise en page

- Le critère 1.4.10 « Redistribution » exige que le contenu reste utilisable dans une fenêtre équivalente à **320 px de large** sans défilement horizontal.
- Vérifiez que l'ordre visuel produit par `flex` ou `grid` correspond à l'ordre du DOM.
- Attention à `overflow: hidden` et aux hauteurs fixes, qui coupent le texte agrandi.
- Une feuille `@media print` soignée — fond blanc, texte noir, adresses des liens affichées — est un bonus apprécié.

```css
@media print {
  a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 0.9em; }
  nav, .skip-link { display: none; }
}
```

## 6. Navigation au clavier

Le clavier est le dénominateur commun : lecteurs d'écran, contacteurs, commande vocale et commande oculaire s'appuient tous, en dernier ressort, sur le modèle clavier.

### La règle fondamentale

**Tout ce qui est actionnable à la souris doit l'être au clavier.** Les touches attendues :

| Touche | Effet attendu |
| --- | --- |
| `Tab` | Élément focalisable suivant |
| `Maj+Tab` | Élément focalisable précédent |
| `Entrée` | Activer un lien ou un bouton |
| `Espace` | Activer un bouton, cocher une case, faire défiler |
| Flèches | Se déplacer dans un groupe de radios, une liste, un menu |
| `Échap` | Fermer une fenêtre modale, un menu, une infobulle |

Les éléments natifs — `<a href>`, `<button>`, `<input>`, `<select>`, `<textarea>`, `<summary>` — apportent tout cela gratuitement. C'est le meilleur argument en faveur du HTML sémantique.

### Ordre de tabulation

Il suit l'ordre du DOM. Ne le forcez pas avec des `tabindex` positifs ; corrigez plutôt l'ordre du code source.

### Pas de piège au clavier

Le critère 2.1.2 interdit qu'un élément retienne le focus sans issue possible au clavier. Le cas typique est la fenêtre modale mal faite, ou un composant tiers embarqué dans un `<iframe>`. Test : partez du haut de la page et parcourez-la entièrement avec `Tab` — vous devez pouvoir en sortir.

### Le focus doit rester visible

Y compris quand il entre dans un menu déroulant ou une zone défilante. Une zone qui défile mais ne contient aucun élément focalisable doit recevoir `tabindex="0"` pour qu'on puisse la faire défiler au clavier.

### Limites des menus en CSS pur

Un menu déroulant reposant uniquement sur `:hover` est **inaccessible au clavier** et au toucher :

```css
/* À éviter : le sous-menu n'apparaît jamais au clavier */
.menu li ul { display: none; }
.menu li:hover ul { display: block; }
```

La correction minimale consiste à ajouter `:focus-within` :

```css
.menu li:hover > ul,
.menu li:focus-within > ul { display: block; }
```

Une solution encore plus robuste, sans JavaScript, s'appuie sur `<details>` et `<summary>`, qui sont focalisables et opérables au clavier nativement.

### Raccourcis à caractère unique

Le critère 2.1.4 vise les raccourcis composés d'une seule lettre (« s » pour rechercher, par exemple) : ils se déclenchent involontairement chez les utilisateurs de commande vocale et de saisie assistée. Il faut pouvoir les désactiver, les remodifier, ou les limiter au moment où le composant a le focus.

## 7. Tester

Aucun outil automatique ne détecte plus d'une **fraction** des problèmes réels : ils vérifient ce qui se mesure — contraste, attributs manquants — mais pas si un `alt` a du sens ou si l'ordre de lecture est logique. Combinez donc trois approches.

### Tests manuels, à faire en premier

1. **Au clavier seul.** Rangez la souris. Parcourez la page avec `Tab`. Le focus est-il toujours visible ? Atteignez-vous tout ? Pouvez-vous ressortir de partout ?
2. **Zoom à 200 %**, puis fenêtre réduite à 320 px de large. Perdez-vous du contenu ? Y a-t-il un défilement horizontal ?
3. **Sans les images.** Désactivez-les dans le navigateur : la page reste-t-elle compréhensible ?
4. **Sans le CSS.** L'ordre du contenu est-il encore logique ? C'est l'ordre qu'entendra un lecteur d'écran.

### Outils automatiques

- L'**inspecteur d'accessibilité** intégré à Chrome, Firefox et Safari, qui montre l'arbre d'accessibilité et le nom calculé de chaque élément ;
- **Lighthouse**, onglet « Accessibilité », intégré aux outils de développement de Chrome ;
- les extensions **axe DevTools** et **WAVE** ;
- un **vérificateur de contraste** : le *Contrast Checker* de WebAIM en ligne, ou le *Colour Contrast Analyser* en application locale ;
- le **validateur HTML du W3C**, dont les erreurs de structure sont souvent des problèmes d'accessibilité déguisés.

### Un lecteur d'écran, même brièvement

Dix minutes suffisent à changer votre façon de coder. **VoiceOver** est déjà installé sur macOS (`Cmd+F5`) ; **NVDA** est gratuit sous Windows. Essayez surtout la navigation par titres, par repères et par liens : c'est ainsi qu'on lit vraiment une page à la voix, et c'est là que les défauts de structure sautent aux oreilles.

### Liste de vérification A/AA pour du HTML et du CSS

- `lang` déclaré sur `<html>`, et sur les passages en langue étrangère
- `<title>` unique et descriptif
- Un seul `<h1>`, aucun saut de niveau de titre
- Repères présents : `<header>`, `<nav>` nommés, `<main>` unique, `<footer>`
- Lien d'évitement fonctionnel vers le contenu principal
- `alt` sur toutes les images ; `alt=""` pour les décoratives
- Chaque champ de formulaire a une étiquette associée
- Erreurs de saisie décrites en texte et reliées au champ
- Contraste ≥ 4,5:1 pour le texte, ≥ 3:1 pour les composants
- Aucune information portée par la couleur seule
- Focus visible partout, `outline` jamais supprimé sans remplacement
- Tout est atteignable et actionnable au clavier, sans piège
- Cibles d'au moins 24 × 24 px
- Zoom à 200 % sans perte de contenu ni défilement horizontal
- Animations neutralisées sous `prefers-reduced-motion`
- Tableaux de données avec `<caption>`, `<th>` et `scope`

## 8. Erreurs fréquentes

Voici les défauts que l'on rencontre le plus souvent, et leur correction.

| Erreur | Pourquoi c'est un problème | Correction |
| --- | --- | --- |
| `<div>` ou `<span>` cliquable | Pas de rôle, pas de focus, pas de clavier | Utiliser `<button>` ou `<a href>` |
| Niveau de titre choisi pour la taille | Le plan du document devient faux | Choisir le niveau selon la structure, régler la taille en CSS |
| `alt` manquant, ou égal au nom du fichier | Le lecteur d'écran épelle « img_4721.jpg » | Écrire un équivalent, ou `alt=""` si décoratif |
| `alt` qui répète la légende | La même phrase est entendue deux fois | Le `alt` décrit, la légende commente |
| Lien « cliquez ici » | Inutilisable dans la liste des liens | Libellé explicite et autonome |
| Gris clair sur blanc, texte sur photo | Illisible en basse vision ou en plein soleil | Vérifier le rapport, viser 4,5:1 |
| `outline: none` sans remplacement | On ne sait plus où l'on est au clavier | Styler `:focus-visible` |
| Placeholder en guise d'étiquette | Disparaît à la saisie, contraste faible | Ajouter un vrai `<label>` |
| Tableau de mise en page | Structure de données annoncée sans raison | Utiliser la grille ou le *flexbox* CSS |
| Contenu important seulement au `:hover` | Inaccessible au clavier et au toucher | Ajouter `:focus-within`, ou `<details>` |
| Ordre inversé par `flex` ou `order` | L'ordre au clavier ne suit pas l'ordre visuel | Corriger l'ordre du DOM |
| Texte dans une image | Ne se zoome pas, ne se recherche pas | Vrai texte, ou SVG avec `<text>` |
| Animation ignorant les préférences | Vertiges, nausées | Respecter `prefers-reduced-motion` |

{{< hint info >}}
**Une dernière idée à retenir.** L'accessibilité n'est pas une couche que l'on ajoute à la fin — à ce stade, elle coûte cher et se voit. C'est une conséquence du fait d'écrire du HTML qui dit ce que les choses *sont*, et du CSS qui n'efface pas ce que le navigateur offre déjà. La plus grande partie du travail consiste, littéralement, à ne pas défaire ce qui fonctionne déjà.
{{< /hint >}}

## Pour aller plus loin

- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) — le texte normatif du W3C
- [Comment répondre aux critères de succès des WCAG](https://www.w3.org/WAI/WCAG22/quickref/) — référence rapide, filtrable par niveau
- [Initiative pour l'accessibilité du Web (WAI)](https://www.w3.org/WAI/) — tutoriels et ressources d'introduction
- [Pratiques de création ARIA](https://www.w3.org/WAI/ARIA/apg/) — modèles de composants riches
- [Standard sur l'accessibilité des sites Web (SGQRI 008)](https://www.quebec.ca/gouvernement/ministere/cybersecurite-numerique/publications/standards-accessibilite-web) — le cadre québécois
- [Loi canadienne sur l'accessibilité](https://laws-lois.justice.gc.ca/fra/lois/a-0.6/) — texte de loi
- [Vérificateur de contraste de WebAIM](https://webaim.org/resources/contrastchecker/)

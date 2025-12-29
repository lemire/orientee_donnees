---
title: "Travail noté"
weight: 1000
---

# Travail noté

## Question 1 : Expressions mathématiques avec MathML et CSS

Dans ce premier travail, vous créerez des expressions mathématiques complexes en utilisant MathML (Mathematical Markup Language) et les mettrez en forme avec du CSS spécifique à MathML. Vous développerez une page web présentant différentes formules mathématiques avec une mise en forme élégante.

Voici la structure HTML de base que vous devez utiliser :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mathématiques avec MathML</title>
    <style>
        /* C'est à vous d'implémenter le CSS spécifique à MathML ici */
    </style>
</head>
<body>
    <h1>Formules Mathématiques avec MathML</h1>

    <section>
        <h2>Équation quadratique</h2>
        <math display="block">
            <mi>x</mi>
            <mo>=</mo>
            <mfrac>
                <mrow>
                    <mo>−</mo>
                    <mi>b</mi>
                    <mo>±</mo>
                    <msqrt>
                        <msup>
                            <mi>b</mi>
                            <mn>2</mn>
                        </msup>
                        <mo>−</mo>
                        <mn>4</mn>
                        <mi>a</mi>
                        <mi>c</mi>
                    </msqrt>
                </mrow>
                <mrow>
                    <mn>2</mn>
                    <mi>a</mi>
                </mrow>
            </mfrac>
        </math>
    </section>

    <section>
        <h2>Intégrale</h2>
        <math display="block">
            <mrow>
                <msubsup>
                    <mo>∫</mo>
                    <mn>0</mn>
                    <mi>π</mi>
                </msubsup>
                <msup>
                    <mi>sin</mi>
                    <mn>2</mn>
                </msup>
                <mi>x</mi>
                <mo>ⅆ</mo>
                <mi>x</mi>
                <mo>=</mo>
                <mfrac>
                    <mi>π</mi>
                    <mn>2</mn>
                </mfrac>
            </mrow>
        </math>
    </section>
</body>
</html>
```


Vous devez créer un CSS qui améliore la présentation des expressions MathML avec les propriétés suivantes :

1. **Élément `math`** :
   - `font-family: 'Times New Roman', serif;` pour une police mathématique appropriée
   - `font-size: 18px;` pour une taille lisible
   - `line-height: 1.4;` pour un espacement confortable

2. **Fractions (`mfrac`)** :
   - `padding: 2px 0;` pour espacer la fraction
   - Utiliser `border-top: 1px solid #000;` sur le numérateur pour créer la barre de fraction
   - `margin: 4px 0;` pour séparer visuellement numérateur et dénominateur

3. **Variables (`mi`)** :
   - `font-style: italic;` pour différencier les variables
   - `color: #2E7D32;` pour une couleur verte distinctive
   - `font-weight: normal;` pour les maintenir lisibles

4. **Opérateurs (`mo`)** :
   - `color: #1976D2;` pour une couleur bleue
   - `font-weight: bold;` pour les mettre en valeur
   - `padding: 0 2px;` pour les espacer des autres éléments

5. **Constantes numériques (`mn`)** :
   - `color: #D32F2F;` pour une couleur rouge
   - `font-weight: bold;` pour les distinguer
   - `font-variant-numeric: tabular-nums;` pour un alignement uniforme

**Ressources** :
- Spécification MathML : https://www.w3.org/TR/MathML3/
- Guide MathML MDN : https://developer.mozilla.org/fr/docs/Web/MathML

**Livrables** : Page HTML complète avec MathML et CSS, et documentation des choix de mise en forme.

## Question 2 : Graphiques vectoriels avec SVG et CSS

Dans ce deuxième travail, vous créerez des graphiques vectoriels complexes en utilisant SVG (Scalable Vector Graphics) et les mettrez en forme avec du CSS spécifique à SVG. Vous développerez une visualisation de données statistiques avec animations et interactions.

Voici la structure HTML de base que vous devez utiliser :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Visualisation de données avec SVG</title>
    <style>
        /* C'est à vous d'implémenter le CSS spécifique à SVG ici */
    </style>
</head>
<body>
    <h1>Visualisation de données avec SVG</h1>

    <svg width="600" height="400" viewBox="0 0 600 400">
        <!-- Titre -->
        <text x="300" y="30" class="title">Ventes mensuelles 2024</text>

        <!-- Axes -->
        <line x1="50" y1="350" x2="550" y2="350" class="axis"/>
        <line x1="50" y1="50" x2="50" y2="350" class="axis"/>

        <!-- Barres du graphique -->
        <rect x="70" y="250" width="40" height="100" class="bar" data-value="100"/>
        <rect x="130" y="200" width="40" height="150" class="bar" data-value="150"/>
        <rect x="190" y="180" width="40" height="170" class="bar" data-value="170"/>
        <rect x="250" y="220" width="40" height="130" class="bar" data-value="130"/>
        <rect x="310" y="160" width="40" height="190" class="bar" data-value="190"/>
        <rect x="370" y="190" width="40" height="160" class="bar" data-value="160"/>

        <!-- Étiquettes des mois -->
        <text x="90" y="375" class="label">Jan</text>
        <text x="150" y="375" class="label">Fév</text>
        <text x="210" y="375" class="label">Mar</text>
        <text x="270" y="375" class="label">Avr</text>
        <text x="330" y="375" class="label">Mai</text>
        <text x="390" y="375" class="label">Jun</text>

        <!-- Points de données animés -->
        <circle cx="90" cy="240" r="5" class="data-point"/>
        <circle cx="150" cy="190" r="5" class="data-point"/>
        <circle cx="210" cy="170" r="5" class="data-point"/>
    </svg>
</body>
</html>
```

**Consignes spécifiques pour le CSS SVG :**

Vous devez créer un CSS qui améliore la présentation du graphique SVG avec les propriétés suivantes :

1. **Titre (`.title`)** :
   - `text-anchor: middle;` pour centrer le texte
   - `font-family: Arial, sans-serif;` pour une police élégante
   - `font-size: 18px;` pour une taille appropriée
   - `font-weight: bold;` pour le mettre en valeur

2. **Axes (`.axis`)** :
   - `stroke: #333;` pour une couleur sombre
   - `stroke-width: 2;` pour une épaisseur visible

3. **Barres (`.bar`)** :
   - `fill: linear-gradient(to top, #4CAF50, #81C784);` pour un dégradé vert
   - `stroke: #2E7D32;` pour une bordure plus foncée
   - `stroke-width: 1;` pour une bordure fine
   - Au survol : `fill: linear-gradient(to top, #66BB6A, #A5D6A7);` pour éclaircir

4. **Étiquettes (`.label`)** :
   - `text-anchor: middle;` pour centrer sous les barres
   - `font-size: 12px;` pour une petite police
   - `fill: #666;` pour une couleur discrète

5. **Points de données (`.data-point`)** :
   - `opacity: 0;` pour les rendre invisibles par défaut
   - `fill: #FF5722;` pour une couleur orange visible
   - Au survol des barres : `opacity: 1;` avec `transition: opacity 0.3s ease;`


**Ressources** :
- Spécification SVG : https://www.w3.org/TR/SVG2/
- Guide SVG MDN : https://developer.mozilla.org/fr/docs/Web/SVG

**Livrables** : Page HTML complète avec SVG et CSS, et documentation des choix de mise en forme.

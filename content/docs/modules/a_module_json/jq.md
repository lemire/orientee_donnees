---
title: "Activité avec sjq"
weight: 38
---

# Laboratoire pratique avec sjq

jq est un langage de requêtes pour manipuler, filtrer et transformer des données JSON en ligne de commande. Inspiré des outils Unix comme sed et awk, il permet aux développeurs et aux analystes de données de travailler avec des structures JSON complexes sans écrire de programme complet. Que ce soit pour extraire des valeurs précises, reformater des données ou effectuer des requêtes avancées, jq offre une syntaxe concise et fonctionnelle qui s'intègre parfaitement dans les pipelines shell.

Dans cette activité, nous utilisons [sjq](https://github.com/simdjson/sjq), une implémentation de jq construite sur la bibliothèque [simdjson](https://simdjson.org). sjq comprend le même langage que jq : les filtres que vous écrivez pour sjq fonctionnent aussi avec jq, et inversement. La documentation de jq (<https://jqlang.org/manual/>) et les tutoriels sur jq restent donc valables. sjq a deux avantages pour nous : il s'installe en une seule commande sur Windows, macOS et Linux, et il traite les gros fichiers JSON beaucoup plus rapidement.

Au-delà de ses capacités de base, le langage jq excelle dans le traitement de gros volumes de données JSON, avec le filtrage conditionnel, les agrégations et les transformations structurelles. Il est particulièrement utile pour l'analyse de journaux (logs), le traitement des réponses d'API REST ou la préparation de données pour d'autres outils.

## Installation sur Windows

1. Ouvrez **PowerShell** : touche Windows, tapez `PowerShell`, puis Entrée. Il n'est pas nécessaire de l'ouvrir en tant qu'administrateur.
2. Copiez-collez cette commande et appuyez sur Entrée :
   ```powershell
   irm https://raw.githubusercontent.com/simdjson/sjq/main/install.ps1 | iex
   ```
   La commande télécharge `sjq.exe`, vérifie son intégrité, l'installe dans `%LOCALAPPDATA%\Programs\sjq` et l'ajoute à votre PATH. Elle termine en affichant la version installée (par exemple `sjq 0.3.0`).
3. sjq fonctionne tout de suite dans cette fenêtre, et dans toutes celles que vous ouvrirez ensuite (PowerShell ou Invite de commandes). Pour vérifier, tapez :
   ```powershell
   sjq --version
   ```
   Si vous voyez la version s'afficher, c'est bon !

Si vous utilisez déjà [Scoop](https://scoop.sh), vous pouvez plutôt installer sjq avec `scoop bucket add sjq https://github.com/simdjson/sjq`, puis `scoop install sjq/sjq`.

Si la commande d'installation est bloquée (par exemple sur un poste géré par votre employeur), téléchargez plutôt le fichier `sjq-windows-x86_64.zip` (ou `sjq-windows-arm64.zip` sur un PC à processeur ARM, comme certains Surface) sur <https://github.com/simdjson/sjq/releases/latest>, décompressez-le et placez `sjq.exe` dans le dossier où se trouvent vos fichiers JSON. Dans PowerShell, tapez alors `.\sjq` au lieu de `sjq`.

Pour passer plus tard à une nouvelle version, relancez simplement la commande d'installation.

## Installation sur macOS et Linux

1. Ouvrez le Terminal (sur macOS : `Cmd + Espace`, tapez `Terminal`, puis Entrée).
2. Copiez-collez cette commande et appuyez sur Entrée :
   ```bash
   curl -fsSL https://raw.githubusercontent.com/simdjson/sjq/main/install.sh | sh
   ```
   Le programme est installé dans `~/.local/bin`. Aucun mot de passe n'est demandé.
3. Si le message indique « is not in your PATH », copiez-collez la ligne `echo ...` qu'il affiche juste en dessous (elle est adaptée à votre shell), puis ouvrez un nouveau terminal.
4. Vérifiez avec :
   ```bash
   sjq --version
   ```

Si vous utilisez déjà [Homebrew](https://brew.sh), vous pouvez plutôt installer sjq avec `brew install simdjson/tap/sjq`. Pour passer plus tard à une nouvelle version, relancez la commande d'installation (ou `brew upgrade sjq`).

## Premier test rapide

Copiez-collez ceci dans votre terminal (macOS, Linux ou PowerShell) :

```bash
echo '{"utilisateur": "Alice", "age": 30, "ville": "Paris"}' | sjq '.utilisateur'
```

Dans l'Invite de commandes de Windows (cmd), tapez plutôt :

```cmd
echo {"utilisateur": "Alice", "age": 30, "ville": "Paris"} | sjq .utilisateur
```

Vous devriez voir s'afficher :
```
"Alice"
```

Si vous voyez ça, bravo : sjq est installé !

## Conseil pour Windows : écrire le filtre dans un fichier

Dans les exemples de cette page, le filtre est placé entre apostrophes : `sjq '.bibliotheque.nom' bibliotheque.json`. Cette notation fonctionne sous macOS, sous Linux et dans PowerShell pour les filtres simples. Mais sous Windows, l'Invite de commandes ne reconnaît pas les apostrophes, et Windows PowerShell 5 retire les guillemets doubles placés à l'intérieur d'un filtre (comme dans `."année"`).

La solution la plus simple, qui fonctionne partout : copiez le texte qui se trouve entre les apostrophes dans un fichier texte avec l'extension `.jq`, puis donnez ce fichier à sjq avec l'option `-f`. Par exemple, créez avec le Bloc-notes ou VS Code un fichier `apres1950.jq` contenant :

```jq
.bibliotheque.livres[] | select(."année" > 1950)
```

puis exécutez :

```bash
sjq -f apres1950.jq bibliotheque.json
```

Un fichier `.jq` peut s'étendre sur plusieurs lignes et contenir des commentaires (lignes qui commencent par `#`). C'est aussi la forme attendue pour le travail noté.

Si vous oubliez et placez quand même le filtre entre apostrophes dans l'Invite de commandes, sjq vous le signale dans son message d'erreur.

## Enregistrer le résultat dans un fichier

Pour enregistrer le résultat dans un fichier, utilisez l'option `-o` :

```bash
sjq -o titres.json '.bibliotheque.livres[].titre' bibliotheque.json
```

L'option `-o` fonctionne de la même façon dans tous les terminaux et écrit toujours le fichier en UTF-8. Évitez plutôt la redirection `>` sous Windows : dans Windows PowerShell 5, `>` écrit le fichier en UTF-16, un encodage que beaucoup d'outils (dont jq) ne savent pas lire.

## Syntaxe des requêtes jq

Le langage jq, que sjq comprend, utilise un langage de programmation fonctionnel pour manipuler les données JSON. Les requêtes jq sont composées d'expressions qui transforment l'entrée JSON en sortie JSON. L'opérateur principal est le point `.` pour accéder aux propriétés, similaire à l'accès aux objets en JavaScript. Par exemple, `.nom` extrait la valeur de la clé "nom" d'un objet.

Les requêtes peuvent être chaînées avec le pipe `|`, permettant de composer des transformations complexes. Par exemple, `.bibliotheque.livres[] | .titre` parcourt d'abord le tableau des livres, puis extrait le titre de chaque livre. Cette approche fonctionnelle rend jq puissant pour filtrer, transformer et agréger des données JSON.

jq prend en charge différents types d'expressions : sélecteurs pour naviguer dans la structure, filtres pour sélectionner des éléments, et constructeurs pour créer de nouveaux objets. Les tableaux sont gérés avec `[]` pour itérer, et les conditions utilisent `select()` pour filtrer. Par exemple, `select(.prix < 20)` garde seulement les objets où le prix est inférieur à 20.

Les transformations permettent de reconstruire les données. Utilisez `{clé: valeur}` pour créer des objets, ou `[expression]` pour des tableaux. Les variables temporaires avec `as $var` facilitent les références. Par exemple, `.titre as $t | .auteur | "\($t) par \(.)"` combine titre et auteur dans une chaîne.

Enfin, jq offre des fonctions intégrées pour les agrégations comme `length`, `min`, `max`, et des opérations sur les chaînes et nombres. Pour les données manquantes, l'opérateur `//` fournit des valeurs par défaut. Ces fonctionnalités font de jq un outil essentiel pour le traitement de données JSON en ligne de commande.

### Jeu de données utilisé

Créez un fichier `bibliotheque.json` :

```json
{
  "bibliotheque": {
    "nom": "Médiathèque centrale",
    "livres": [
      {
        "id": "b001",
        "titre": "1984",
        "auteur": "George Orwell",
        "année": 1949,
        "genres": ["dystopie", "politique"],
        "empruntable": true,
        "emprunts": [
          {"date": "2024-01-15", "lecteur": "Alice"},
          {"date": "2025-03-20", "lecteur": "Bob"}
        ]
      },
      {
        "id": "b002",
        "titre": "Le Petit Prince",
        "auteur": "Antoine de Saint-Exupéry",
        "année": 1943,
        "genres": ["conte"],
        "empruntable": false
      },
      {
        "id": "b003",
        "titre": "Fondation",
        "auteur": "Isaac Asimov",
        "année": 1951,
        "genres": ["science-fiction", "cycle"],
        "empruntable": true,
        "prix": 18.90
      }
    ]
  }
}
```


## Vidéo suggérée

La vidéo suivante présente jq. Tout ce qu'elle montre fonctionne aussi avec sjq : remplacez simplement `jq` par `sjq` dans les commandes.

{{< youtube id="x18F2wIsxgU" title="Vidéo suggérée sur l’outil jq" >}}
{{< transcription id="x18F2wIsxgU" >}}

### Exercices

#### Exercice 1 – Affichage brut et pretty-print
```bash
sjq . bibliotheque.json                  # affiche le document joliment indenté
sjq -c . bibliotheque.json               # version compacte, sur une seule ligne
```

#### Exercice 2 – Sélection simple (équivalent XPath absolu)
```bash
# Tous les titres de livres
sjq '.bibliotheque.livres[].titre' bibliotheque.json

# Le nom de la bibliothèque
sjq '.bibliotheque.nom' bibliotheque.json
```

#### Exercice 3 – Parcours de tableau avec [] (comme // en XPath)
```bash
# Tous les auteurs
sjq '.bibliotheque.livres[].auteur' bibliotheque.json

# Tous les genres (aplatissement automatique)
sjq '.bibliotheque.livres[].genres[]' bibliotheque.json
```

#### Exercice 4 – Filtrage avec select() (comme [condition] en XPath)
```bash
# Livres publiés après 1950
sjq '.bibliotheque.livres[] | select(."année" > 1950)' bibliotheque.json

# Livres empruntables
sjq '.bibliotheque.livres[] | select(.empruntable == true)' bibliotheque.json

# Livres contenant "fiction" dans les genres
sjq '.bibliotheque.livres[] | select(.genres[] | contains("fiction"))' bibliotheque.json
```

Remarque : pour cette dernière commande, sjq affiche `"prix": 18.9`, alors que jq affiche `"prix": 18.90`. Les deux représentent le même nombre. Selon le filtre, sjq recopie le nombre tel qu'il est écrit dans le fichier ou l'écrit sous sa forme la plus courte.

#### Exercice 5 – Projection / construction de nouveaux objets (comme XSLT)
```bash
# Liste simplifiée : titre + année
sjq '.bibliotheque.livres[] | {titre, "année"}' bibliotheque.json

# Créer un catalogue avec id comme clé
sjq '.bibliotheque.livres | map({key: .id, value: {titre, auteur}}) | from_entries' bibliotheque.json
```

#### Exercice 6 – Agrégations (length, min, max, group_by…)
```bash
# Nombre total de livres
sjq '[.bibliotheque.livres[]] | length' bibliotheque.json

# Année la plus ancienne
sjq '[.bibliotheque.livres[]."année"] | min' bibliotheque.json

# Regrouper par première lettre du titre
sjq '.bibliotheque.livres | group_by(.titre[0:1]) | map({lettre: .[0].titre[0:1], count: length})' bibliotheque.json
```

#### Exercice 7 – Gestion des valeurs optionnelles (comme if en XQuery)
```bash
# Afficher le prix, ou "non vendu" s'il n’existe pas
sjq '.bibliotheque.livres[] | .titre as $t | .prix // "non vendu" | "\($t) : \(.)"' bibliotheque.json
```

Remarque : comme à l'exercice 4, sjq affiche `Fondation : 18.9`, alors que jq affiche `Fondation : 18.90`.

#### Exercice 8 – Transformation complète (votre premier "XSLT JSON")
Créer un fichier `catalogue-court.json` contenant seulement :

```
[
  {"id": "...", "titre": "...", "auteur": "...", "disponible": true/false}
]
```

Solution en une ligne :

```bash
sjq -o catalogue-court.json '[ .bibliotheque.livres[] | {id, titre, auteur, disponible: .empruntable}]' bibliotheque.json
```

#### Exercice 9 – Bonus : sjq comme grep pour logs JSON
```bash
# Supposons un journal d’accès avec un objet JSON par ligne (format NDJSON)
sjq 'select(.status == 404) | .ip + " " + .url' access.log
```

### Mini-projet

À partir de `bibliotheque.json`, produisez un fichier `rapport.md` en Markdown contenant :

- Le nom de la bibliothèque en titre
- Un tableau Markdown avec : Titre | Auteur | Année | Genres | Empruntable | Nombre d’emprunts (0 si absent)
- Le nombre total de livres et le nombre de livres empruntables

Exemple de solution (à adapter). Tout le rapport est produit par un seul filtre, enregistré dans le fichier `rapport.jq` :

```jq
# Génère un rapport Markdown à partir de bibliotheque.json
.bibliotheque as $b
| ($b.livres | length) as $total
| ([$b.livres[] | select(.empruntable)] | length) as $empruntables
| "# Rapport \($b.nom)",
  "",
  "| Titre | Auteur | Année | Genres | Empruntable | Nb emprunts |",
  "|-------|--------|-------|--------|-------------|-------------|",
  ($b.livres[]
    | "| \(.titre) | \(.auteur) | \(."année") | \(.genres | join(", ")) | \(.empruntable) | \((.emprunts // []) | length) |"),
  "",
  "Total livres : \($total)",
  "",
  "Empruntables : \($empruntables)"
```

L'option `-r` écrit les chaînes sans guillemets. La même commande fonctionne sous macOS, sous Linux et dans tous les terminaux de Windows :

```bash
sjq -r -o rapport.md -f rapport.jq bibliotheque.json
```

---
title: "Travail noté"
weight: 1000
---

# Travail noté


## Question 1 : Application Java avec Gson et GeoJSON

Dans ce premier travail, vous développerez une application Java utilisant la bibliothèque Gson pour manipuler des données GeoJSON. Pour démontrer l'utilité de votre travail, vous utiliserez le fichier GeoJSON suivant comme base, qui représente des lieux emblématiques du Québec :

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Mont Royal",
        "category": "montagne",
        "description": "Montagne emblématique de Montréal"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-73.5878, 45.5017]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Fleuve Saint-Laurent",
        "category": "rivière",
        "description": "Principal fleuve du Québec"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-73.5, 45.5],
          [-71.2, 46.8],
          [-69.5, 48.4]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Parc national de la Jacques-Cartier",
        "category": "parc",
        "description": "Parc national dans la région de Québec"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-72.0, 47.0],
          [-71.5, 47.0],
          [-71.5, 47.5],
          [-72.0, 47.5],
          [-72.0, 47.0]
        ]]
      }
    }
  ]
}
```

Votre application devra impérativement implémenter les fonctionnalités suivantes :
1. Charger le fichier GeoJSON fourni et afficher le nombre total de features.
2. Ajouter une nouvelle feature de type Point représentant un lieu d'intérêt de votre choix (par exemple, un monument ou un bâtiment historique du Québec).
3. Filtrer et afficher uniquement les features dont la catégorie est "parc".
4. Calculer et afficher des statistiques : nombre de points, nombre de lignes, nombre de polygones.
5. Sauvegarder les données modifiées (avec la nouvelle feature ajoutée) dans un nouveau fichier GeoJSON nommé "quebec_modifie.geojson".


Votre code devra être organisé selon les bonnes pratiques Java, utiliser Maven pour la gestion des dépendances Gson, inclure une documentation complète sous forme de commentaires, et gérer les erreurs potentielles de manière appropriée. 

**Ressources** : Consultez la documentation officielle de Gson pour la sérialisation et désérialisation JSON : https://github.com/google/gson/blob/main/UserGuide.md

**Livrables** : Code source Java, fichier pom.xml, fichier GeoJSON d'exemple, et un README en Markdown expliquant comment exécuter le projet.

## Question 2 : Script jq pour l'analyse de données JSON

Pour ce deuxième travail, vous créerez un ensemble de scripts jq  permettant d'analyser et transformer des données JSON complexes représentant un catalogue de produits. Vous commencerez par utiliser le fichier JSON suivant comme base de données, qui représente un inventaire de produits électroniques :

```json
{
  "store": "Électronique Québec",
  "location": "Montréal",
  "products": [
    {
      "id": 1,
      "name": "Ordinateur portable",
      "category": "informatique",
      "brand": "Dell",
      "price": 1299.99,
      "stock": 15,
      "rating": 4.5,
      "features": ["16GB RAM", "512GB SSD", "Intel i7"]
    },
    {
      "id": 2,
      "name": "Smartphone",
      "category": "mobile",
      "brand": "Samsung",
      "price": 899.99,
      "stock": 25,
      "rating": 4.2,
      "features": ["128GB", "Android", "5G"]
    },
    {
      "id": 3,
      "name": "Casque audio",
      "category": "audio",
      "brand": "Sony",
      "price": 199.99,
      "stock": 8,
      "rating": 4.8,
      "features": ["Bluetooth", "Noise cancelling", "30h autonomie"]
    },
    {
      "id": 4,
      "name": "Tablette",
      "category": "mobile",
      "brand": "Apple",
      "price": 599.99,
      "stock": 12,
      "rating": 4.6,
      "features": ["10 pouces", "iOS", "Face ID"]
    },
    {
      "id": 5,
      "name": "Clavier mécanique",
      "category": "informatique",
      "brand": "Logitech",
      "price": 149.99,
      "stock": 20,
      "rating": 4.3,
      "features": ["Switches rouges", "RGB", "USB-C"]
    }
  ],
  "last_updated": "2024-12-29"
}
```

Vos scripts jq devront impérativement implémenter les fonctionnalités suivantes :
1. Extraire et afficher la liste de tous les noms de produits.
2. Filtrer et afficher uniquement les produits de catégorie "mobile".
3. Calculer et afficher des statistiques : nombre total de produits, valeur totale du stock (prix × stock), moyenne des notes.
4. Transformer les données pour créer un résumé simplifié de chaque produit (id, name, price, stock).
5. Créer un pipeline jq qui génère un rapport formaté en texte avec les produits en rupture de stock (stock ≤ 10).

Enfin, vous intégrerez des mécanismes de validation pour vérifier que les fichiers d'entrée sont des objets JSON valides avec une structure de produits.

**Ressources** : Consultez la documentation officielle de jq pour les opérations de traitement JSON : https://jqlang.org/manual/

**Livrables** : Scripts jq (.jq), fichier JSON d'exemple, et un fichier README en Markdown avec des exemples d'exécution et d'explication des scripts.

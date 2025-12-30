---
title: "Travail noté"
weight: 5000
---

# Travail noté

## Question 1 : Application Java pour le traitement XML

Vous développerez une application Java complète pour traiter et analyser des documents XML.
Pour démontrer l'utilité de votre travail, vous utiliserez le fichier XML suivant comme base de données :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bibliotheque xmlns="http://www.example.com/biblio">
  <livre id="1" categorie="roman">
    <titre>Le Petit Prince</titre>
    <auteur>Antoine de Saint-Exupéry</auteur>
    <annee>1943</annee>
    <prix>15.99</prix>
    <stock>25</stock>
  </livre>
  <livre id="2" categorie="science-fiction">
    <titre>Dune</titre>
    <auteur>Frank Herbert</auteur>
    <annee>1965</annee>
    <prix>22.50</prix>
    <stock>18</stock>
  </livre>
  <livre id="3" categorie="roman">
    <titre>1984</titre>
    <auteur>George Orwell</auteur>
    <annee>1949</annee>
    <prix>18.75</prix>
    <stock>12</stock>
  </livre>
  <livre id="4" categorie="biographie">
    <titre>Steve Jobs</titre>
    <auteur>Walter Isaacson</auteur>
    <annee>2011</annee>
    <prix>28.99</prix>
    <stock>8</stock>
  </livre>
  <livre id="5" categorie="science-fiction">
    <titre>Neuromancer</titre>
    <auteur>William Gibson</auteur>
    <annee>1984</annee>
    <prix>19.99</prix>
    <stock>15</stock>
  </livre>
</bibliotheque>
```

Votre application devra  implémenter les fonctionnalités suivantes :
1. Charger le fichier XML fourni et afficher le nombre total de livres.
2. Utiliser XPath pour extraire et afficher tous les titres de livres de catégorie "roman".
3. Calculer et afficher des statistiques : nombre total de livres, valeur totale du stock (prix × stock), moyenne des prix.
5. Valider le document XML par rapport à une DTD simple que vous créerez.

Votre application devra pouvoir charger ce fichier, effectuer les opérations demandées, et produire des résultats cohérents.

**Livrables** : Code source Java, fichier XML d'exemple, DTD, et un README en Markdown expliquant comment exécuter le projet.


## Question 2 : Conversion et traitement de données avec Jackson

Dans ce troisième travail, vous utiliserez la bibliothèque Jackson pour créer une application Java capable de convertir et traiter des données entre les formats JSON et XML. Vous développerez un système de gestion d'inventaire de produits qui peut importer des données depuis des fichiers JSON ou XML, effectuer des opérations de traitement, et exporter les résultats dans les deux formats.

Pour votre projet, vous travaillerez avec les données JSON suivantes représentant un inventaire de produits :

```json
{
  "inventaire": {
    "produits": [
      {
        "id": "P001",
        "nom": "Ordinateur portable",
        "categorie": "Informatique",
        "prix": 1299.99,
        "stock": 15,
        "fournisseur": {
          "nom": "TechCorp",
          "pays": "Canada"
        }
      },
      {
        "id": "P002",
        "nom": "Smartphone",
        "categorie": "Téléphonie",
        "prix": 899.99,
        "stock": 25,
        "fournisseur": {
          "nom": "MobilePlus",
          "pays": "États-Unis"
        }
      },
      {
        "id": "P003",
        "nom": "Casque audio",
        "categorie": "Audio",
        "prix": 199.99,
        "stock": 50,
        "fournisseur": {
          "nom": "SoundTech",
          "pays": "Chine"
        }
      }
    ],
    "derniere_mise_a_jour": "2025-12-29"
  }
}
```

Votre application devra impérativement implémenter les fonctionnalités suivantes :
1. Charger les données depuis un fichier JSON et les convertir en objets Java structurés.
2. Convertir les données Java en format XML et sauvegarder dans un fichier "inventaire.xml".
3. Charger les données depuis le fichier XML généré et les reconvertir en objets Java.
6. Générer un rapport JSON final avec les statistiques complètes de l'inventaire.

**Ressources** : Consultez la documentation officielle de Jackson : https://github.com/FasterXML/jackson

**Livrables** : Code source Java avec Maven, fichiers JSON et XML d'exemple, résultats des conversions, et un README en Markdown détaillant l'architecture et l'utilisation de l'application.

## Question 3 : Exécuteur SPARQL avec Apache Jena

Dans ce quatrième travail, vous utiliserez l'exécuteur SPARQL du projet JavaRDF disponible sur GitHub (https://github.com/lemire/javardf). 
Voici un exemple de données RDF/XML que vous utiliserez (plus riche que l'exemple du projet de base) :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:dc="http://purl.org/dc/elements/1.1/"
         xmlns:foaf="http://xmlns.com/foaf/0.1/"
         xmlns:bib="http://example.org/bib/">

  <bib:Article rdf:about="http://example.org/article1">
    <dc:title>Traitement automatique des données XML</dc:title>
    <dc:creator rdf:resource="http://example.org/author1"/>
    <dc:creator rdf:resource="http://example.org/author2"/>
    <bib:publishedIn>Journal of Data Processing</bib:publishedIn>
    <bib:year>2024</bib:year>
    <bib:cites rdf:resource="http://example.org/article2"/>
  </bib:Article>

  <bib:Article rdf:about="http://example.org/article2">
    <dc:title>Introduction aux bases de données</dc:title>
    <dc:creator rdf:resource="http://example.org/author1"/>
    <bib:publishedIn>Database Journal</bib:publishedIn>
    <bib:year>2023</bib:year>
  </bib:Article>

  <foaf:Person rdf:about="http://example.org/author1">
    <foaf:name>Marie Dupont</foaf:name>
    <foaf:affiliation rdf:resource="http://example.org/univ1"/>
  </foaf:Person>

  <foaf:Person rdf:about="http://example.org/author2">
    <foaf:name>Jean Martin</foaf:name>
    <foaf:affiliation rdf:resource="http://example.org/univ1"/>
  </foaf:Person>

  <foaf:Organization rdf:about="http://example.org/univ1">
    <foaf:name>Université de Montréal</foaf:name>
  </foaf:Organization>

</rdf:RDF>
```

Composer et exécuter trois requêtes SPARQL spécifiques :
   - **Requête 1** : Lister tous les articles écrits par un auteur spécifique (par exemple, Marie Dupont), avec leur titre et année de publication.
   - **Requête 2** : Trouver tous les co-auteurs d'un chercheur donné et compter le nombre d'articles écrits en collaboration.
   - **Requête 3** : Calculer des statistiques sur les publications : nombre total d'articles, nombre d'auteurs distincts, et articles les plus cités.

**Livrables** : Les requêtes et vos explications.
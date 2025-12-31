---
title: "Activité SPARQL"
weight: 35
---

# Activité SPARQL

SPARQL (acronyme récursif de SPARQL Protocol and RDF Query Language) est le langage de requête standard pour interroger des données exprimées en RDF (Resource Description Framework). Il a été standardisé par le W3C en 2008 et sa version actuelle la plus utilisée est SPARQL 1.1 (2013).  

Il permet de récupérer et de manipuler des données stockées dans des triplestores ou dans n’importe quel graphe RDF, que ce soit sur le web (Linked Data), dans une base locale ou via un endpoint SPARQL public comme DBpedia, Wikidata ou data.gouv.fr.

SPARQL ressemble beaucoup à SQL, mais au lieu de tables et colonnes, on travaille avec des triplets de la forme **sujet – prédicat – objet** (ex. : <http://example.org/Paris> rdf:type dbo:City).

Il existe quatre formes principales de requêtes SPARQL :
- SELECT : retourne un tableau de résultats (le plus courant)
- CONSTRUCT : crée un nouveau graphe RDF à partir des résultats
- ASK : retourne simplement vrai ou faux
- DESCRIBE : retourne une description RDF d’une ressource

### Syntaxe de base

Une requête SELECT classique ressemble à ceci :

```sparql
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?ville ?population WHERE {
  ?ville a dbo:City ;
         dbo:populationTotal ?population ;
         rdfs:label "Paris"@fr .
  FILTER(?population > 1000000)
}
ORDER BY DESC(?population)
LIMIT 10
```

### Exemples concrets

#### 1. Exemple très simple – capitale de la France (sur DBpedia)

```sparql
PREFIX dbo: <http://dbpedia.org/ontology/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?capitale WHERE {
  <http://dbpedia.org/resource/France> dbo:capital ?capitale .
  ?capitale rdfs:label ?label .
  FILTER(lang(?label) = "fr")
}
```

Résultat attendu : http://dbpedia.org/resource/Paris avec le label "Paris".

#### 2. Trouver tous les films réalisés par Quentin Tarantino (Wikidata)

```sparql
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT ?film ?filmLabel ?annee WHERE {
  ?film wdt:P57 wd:Q3772 .        # P57 = réalisateur, Q3772 = Tarantino
  ?film wdt:P577 ?date .         # date de publication
  BIND(YEAR(?date) AS ?annee)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fr". }
}
ORDER BY ?annee
```

#### 3. Exemple avec OPTIONAL (données facultatives)

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX schema: <http://schema.org/>

SELECT ?personne ?nom ?email ?site WHERE {
  ?personne a foaf:Person ;
            foaf:name ?nom .
  OPTIONAL { ?personne foaf:mbox ?email }
  OPTIONAL { ?personne foaf:homepage ?site }
}
LIMIT 20
```

Si une personne n’a pas d’email ou de site web, la ligne apparaît quand même avec les cellules vides.

#### 4. Exemple CONSTRUCT – créer un petit graphe

```sparql
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

CONSTRUCT {
  ?ami foaf:knows ?ami2 .
  ?ami2 foaf:name ?nom2 .
} WHERE {
  <http://example.org/alice> foaf:knows ?ami .
  ?ami foaf:knows ?ami2 .
  ?ami2 foaf:name ?nom2 .
  FILTER(?ami2 != <http://example.org/alice>)
}
```

Cela génère un nouveau graphe contenant les amis des amis d’Alice.

#### 5. Exemple avec FILTER, LANG et REGEX (recherche de labels en français contenant “église”)

```sparql
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema/>

SELECT ?monument ?label WHERE {
  ?monument a <http://dbpedia.org/ontology/Monument> ;
            rdfs:label ?label .
  FILTER(LANG(?label) = "fr")
  FILTER(REGEX(?label, "église", "i"))
}
LIMIT 15
```

#### 6. Exemple d’agrégation (GROUP BY, COUNT)

```sparql
PREFIX wdt: <http://www.wikidata.org/prop/direct/>

SELECT ?pays ?paysLabel (COUNT(?ville) AS ?nbVilles) WHERE {
  ?ville wdt:P31 wd:Q515 ;          # instance de "city"
         wdt:P17 ?pays .           # pays
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fr". }
}
GROUP BY ?pays ?paysLabel
HAVING(?nbVilles > 100)
ORDER BY DESC(?nbVilles)
LIMIT 10
```

Ce dernier exemple montre les 10 pays ayant le plus de villes recensées dans Wikidata.




### Questions d’auto-évaluation

1. Écrivez une requête SPARQL qui retourne le nom (en français) et la date de naissance de toutes les personnes nées à Paris et décédées après 1950, en utilisant l’endpoint Wikidata. Utilisez le service wikibase:label et ordonnez les résultats par date de naissance décroissante.

2. À l’aide d’une requête de type ASK, écrivez une requête qui vérifie simplement si Albert Einstein a gagné un prix Nobel (propriété Wikidata P166). La requête doit retourner true ou false.

3. Écrivez une requête CONSTRUCT qui, à partir de Wikidata, génère un petit graphe contenant :
   - Toutes les capitales européennes (P31/Q6465 ou instance de capitale + située dans un pays d’Europe)
   - Leur population (P1082)
   - Le nom du pays dont elles sont la capitale  
   Le graphe résultant devra utiliser les prédicats schema:population et schema:country (http://schema.org/).


<details>
<summary>
(Solutions ci-dessous – à ne regarder qu’après avoir essayé !)
</summary>

**Solution 1**
```sparql
SELECT ?personne ?nom ?naissance WHERE {
  ?personne wdt:P19 wd:Q90 .           # né à Paris
  ?personne wdt:P570 ?mort .           # date de décès
  ?personne wdt:P569 ?naissance .
  FILTER(YEAR(?mort) > 1950)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fr". }
}
ORDER BY DESC(?naissance)
```

**Solution 2**
```sparql
ASK {
  wd:Q937 wdt:P166 wd:Q38104 .   # Einstein a reçu le prix Nobel de physique
}
```

**Solution 3**
```sparql
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX schema: <http://schema.org/>

CONSTRUCT {
  ?capitale schema:name ?nomCapitale ;
            schema:population ?pop ;
            schema:country ?pays .
  ?pays schema:name ?nomPays .
} WHERE {
  ?capitale wdt:P31/wdt:P279* wd:Q5119 .     # capitale (et sous-classes)
  ?capitale p:P17 ?statement .
  ?statement ps:P17 ?pays .
  ?pays wdt:P30 wd:Q46 .                     # continent Europe
  ?capitale wdt:P1082 ?pop .
  SERVICE wikibase:label { 
    bd:serviceParam wikibase:language "fr".
    ?capitale rdfs:label ?nomCapitale .
    ?pays rdfs:label ?nomPays .
  }
}
```

</details>


## Activité avec Apache Jena

Apache Jena est un framework Java open source développé par la fondation Apache, dédié à la construction d'applications pour le Web sémantique et les données liées (Linked Data). Il fournit une API complète pour manipuler des données RDF (Resource Description Framework), lire et écrire des graphes RDF dans divers formats, exécuter des requêtes SPARQL, gérer des ontologies OWL, et même effectuer du raisonnement inférentiel. 

Voici un exemple que vous pouvez exécuter.


{{<inlineJava path="DemoRdfXmlSparql.java">}}
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import java.io.StringReader;

public class DemoRdfXmlSparql {
private static final String DONNEES_RDF_XML = """
        <?xml version="1.0" encoding="UTF-8"?>
        <rdf:RDF
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:foaf="http://xmlns.com/foaf/0.1/"
            xmlns:bibo="http://purl.org/ontology/bibo/"
            xmlns:xsd="http://www.w3.org/2001/XMLSchema#">

          <bibo:Book rdf:about="http://example.org/books#book1">
            <dc:title>Semantic Web Primer</dc:title>
            <dc:creator>
              <foaf:Person rdf:about="http://example.org/people#grigoris">
                <foaf:name>Grigoris Antoniou</foaf:name>
              </foaf:Person>
            </dc:creator>
            <dc:creator>
              <foaf:Person rdf:about="http://example.org/people#frank">
                <foaf:name>Frank van Harmelen</foaf:name>
              </foaf:Person>
            </dc:creator>
            <dc:date rdf:datatype="http://www.w3.org/2001/XMLSchema#gYear">2008</dc:date>
            <dc:publisher>MIT Press</dc:publisher>
          </bibo:Book>

          <bibo:Book rdf:about="http://example.org/books#book2">
            <dc:title>Linked Data</dc:title>
            <dc:creator>
              <foaf:Person rdf:about="http://example.org/people#tim">
                <foaf:name>Tim Berners-Lee</foaf:name>
              </foaf:Person>
            </dc:creator>
            <dc:creator>
              <foaf:Person rdf:about="http://example.org/people#toby">
                <foaf:name>Toby Segaran</foaf:name>
              </foaf:Person>
            </dc:creator>
            <dc:date rdf:datatype="http://www.w3.org/2001/XMLSchema#gYear">2011</dc:date>
            <dc:publisher>Wiley</dc:publisher>
          </bibo:Book>

          <bibo:Book rdf:about="http://example.org/books#book3">
            <dc:title>Programming the Semantic Web</dc:title>
            <dc:creator>
               <foaf:Person rdf:about="http://example.org/people#toby"/>
            </dc:creator>
            <dc:creator>
               <foaf:Person rdf:about="http://example.org/people#grigoris"/>
            </dc:creator>
            <dc:date rdf:datatype="http://www.w3.org/2001/XMLSchema#gYear">2009</dc:date>
            <dc:publisher>O'Reilly</dc:publisher>
          </bibo:Book>

        </rdf:RDF>
        """;

    public static void main(String[] args) {
        Model modele = ModelFactory.createDefaultModel();

        try (StringReader lecteur = new StringReader(DONNEES_RDF_XML)) {
            modele.read(lecteur, null, "RDF/XML");
        }

        System.out.println("Données bibliographiques RDF/XML chargées");
        System.out.println("Nombre total de triplets : " + modele.size() + "\n");

        // 1. Tous les livres
        executerRequete(modele,
            """
            PREFIX dc:   <http://purl.org/dc/elements/1.1/>
            PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            SELECT ?livre ?titre ?nomAuteur
            WHERE {
              ?livre dc:title ?titre .
              ?livre dc:creator ?auteur .
              ?auteur foaf:name ?nomAuteur .
            }
            ORDER BY ?titre
            """,
            "Tous les livres avec leurs titres et auteurs");

        // 2. Nombre de livres par éditeur
        executerRequete(modele,
            """
            PREFIX dc: <http://purl.org/dc/elements/1.1/>
            SELECT ?editeur (COUNT(?livre) AS ?nombreLivres)
            WHERE {
              ?livre dc:publisher ?editeur .
            }
            GROUP BY ?editeur
            ORDER BY DESC(?nombreLivres)
            """,
            "Nombre de livres par éditeur");

        // 3. FIX: Livres publiés après 2009
        executerRequete(modele,
            """
            PREFIX dc: <http://purl.org/dc/elements/1.1/>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            SELECT ?livre ?titre ?annee
            WHERE {
              ?livre dc:title ?titre .
              ?livre dc:date ?annee .
              FILTER(?annee > "2009"^^xsd:gYear)
            }
            """,
            "Livres publiés après 2009");

        // 4. Auteurs prolifiques
        executerRequete(modele,
            """
            PREFIX dc:   <http://purl.org/dc/elements/1.1/>
            PREFIX foaf: <http://xmlns.com/foaf/0.1/>
            SELECT ?nomAuteur (COUNT(?livre) AS ?livresEcrits)
            WHERE {
              ?livre dc:creator ?auteur .
              ?auteur foaf:name ?nomAuteur .
            }
            GROUP BY ?nomAuteur
            HAVING (COUNT(?livre) > 1)
            """,
            "Auteurs ayant écrit plus d'un livre");
    }

    private static void executerRequete(Model modele, String requeteString, String description) {
        System.out.println(description + " :");
        Query requete = QueryFactory.create(requeteString);
        try (QueryExecution execution = QueryExecutionFactory.create(requete, modele)) {
            ResultSet resultats = execution.execSelect();
            ResultSetFormatter.out(System.out, resultats, requete);
            System.out.println();
        } catch (Exception e) {
            System.err.println("Erreur lors de l'exécution de la requête : " + e.getMessage());
        }
    }
}
{{</inlineJava>}}



La constante DONNEES_RDF_XML contient les données RDF au format XML, embarquées directement dans le code. Elles décrivent trois livres bibliographiques en utilisant des vocabulaires standards : dc pour Dublin Core (titres, dates, éditeurs, créateurs), foaf pour les personnes (noms), et bibo pour les concepts bibliographiques (Book). Les dates sont typées en xsd:gYear pour une comparaison précise. Notez quelques ajustements par rapport à des versions précédentes, comme des références abrégées à des personnes existantes, ce qui enrichit les relations entre auteurs.

Dans la méthode main, un modèle vide est créé avec ModelFactory.createDefaultModel(), puis chargé via modele.read() en spécifiant le format "RDF/XML" et en utilisant un StringReader pour parser la chaîne embarquée. 

Le code exécute ensuite quatre requêtes SPARQL via la méthode executerRequete, qui affiche une description, crée la requête avec QueryFactory, l'exécute sur le modèle, et formate les résultats en tableau lisible.

La première requête liste tous les livres avec leurs titres et les noms des auteurs, triés par titre. La deuxième compte les livres par éditeur, avec un tri descendant sur le nombre. La troisième, corrigée avec le préfixe xsd et le type explicite, sélectionne les livres publiés après 2009 en comparant les années typées. La quatrième identifie les auteurs ayant contribué à plus d'un livre, grâce à GROUP BY, COUNT et HAVING.

La méthode executerRequete encapsule la logique d'exécution : création de la requête, ouverture d'une QueryExecution (fermée automatiquement via try-with-resources), récupération des résultats pour une requête SELECT, et affichage formaté. En cas d'erreur, un message clair est imprimé.

## Activité avec Java

Effectuez maintenant [l'activité RDF avec Java](https://github.com/lemire/javardf).
Vous devriez déjà avoir installé maven et Java à ce point-ci du cours.


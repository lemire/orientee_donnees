---
title: "Activité JSON/XML avec Jackson"
weight: 100
---

# Activité JSON/XML avec Jackson


Jackson est l'une des bibliothèques Java les plus populaires pour le traitement des formats de données JSON et XML. Développée par FasterXML, elle offre des performances élevées et une API simple pour convertir entre les objets Java et ces formats de données structurés. Cette bibliothèque est particulièrement appréciée dans l'écosystème Java pour sa facilité d'utilisation et sa flexibilité, permettant aux développeurs de sérialiser et désérialiser des données de manière transparente.

Dans cette activité, nous explorerons les fonctionnalités essentielles de Jackson à travers des exemples pratiques. Vous apprendrez à manipuler des objets simples, des collections, des structures imbriquées, et à personnaliser le comportement de sérialisation/désérialisation. Chaque exemple est conçu pour illustrer un concept spécifique, en commençant par les bases et en progressant vers des cas d'usage plus avancés.

Les exemples de code présentés ci-dessous démontrent comment Jackson peut être utilisé pour traiter à la fois du JSON et du XML. Vous verrez comment créer des objets Java, les convertir en chaînes de caractères dans ces formats, puis les reconstruire. Cette approche est particulièrement utile pour l'échange de données avec des APIs web, la persistance de configurations, ou l'intégration avec des systèmes externes.

## Utilisation de Jackson 

Jackson est une bibliothèque Java pour la manipulation du XML et du JSON, développée par FasterXML.

## Sérialisation et désérialisation de base

La sérialisation consiste à convertir un objet Java en une représentation textuelle, comme du JSON. Jackson utilise la méthode `writeValueAsString()` de l'ObjectMapper pour effectuer cette conversion. Inversement, la désérialisation transforme une chaîne JSON en objet Java via `readValue()`. 

Jackson suit les conventions JavaBeans : il accède aux propriétés via les getters et setters. Les champs sans getter public sont ignorés lors de la sérialisation, et les valeurs null sont omises par défaut pour produire un JSON plus compact. Pour la désérialisation, un constructeur sans argument est nécessaire pour instancier l'objet avant de définir ses propriétés.

Dans cet exemple, nous créons une classe `Personne` avec deux propriétés simples. Le programme sérialise une instance en JSON, affiche le résultat, puis désérialise la chaîne pour recréer l'objet original. Notez que Jackson produit un JSON compact sans espaces inutiles.

Voici un exemple complet :

{{<inlineJava path="ExempleBasique.java">}}
import com.fasterxml.jackson.databind.ObjectMapper;

class Personne {
    private String nom;
    private int age;

    public Personne() {} // Nécessaire pour la désérialisation

    public Personne(String nom, int age) {
        this.nom = nom;
        this.age = age;
    }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}

public class ExempleBasique {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        Personne personne = new Personne("Alice", 30);

        // Sérialisation
        String json = mapper.writeValueAsString(personne);
        System.out.println("JSON sérialisé :");
        System.out.println(json);

        // Désérialisation
        Personne deserialisee = mapper.readValue(json, Personne.class);
        System.out.println("\nObjet désérialisé : nom=" + deserialisee.getNom() + ", age=" + deserialisee.getAge());
    }
}
{{</inlineJava>}}

Ce code affiche un JSON compact et reconstruit l'objet. La version XML est similaire, mais utilise XmlMapper au lieu d'ObjectMapper. XmlMapper produit une sortie XML bien formée avec des balises au lieu d'accolades JSON.

L'exemple XML suivant démontre la même fonctionnalité, mais avec une sérialisation en XML. Notez que la structure de la classe Java reste identique - seule la classe de mapper change. Le XML produit inclut une déclaration XML et utilise le nom de la classe comme élément racine.

{{<inlineJava path="ExempleXmlBasique.java">}}
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

class Personne {
    private String nom;
    private int age;

    public Personne() {} // Nécessaire pour la désérialisation

    public Personne(String nom, int age) {
        this.nom = nom;
        this.age = age;
    }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}

public class ExempleXmlBasique {
    public static void main(String[] args) throws Exception {
        XmlMapper mapper = new XmlMapper();

        Personne personne = new Personne("Alice", 30);

        // Sérialisation en XML
        String xml = mapper.writeValueAsString(personne);
        System.out.println("XML sérialisé :");
        System.out.println(xml);

        // Désérialisation depuis XML
        Personne deserialisee = mapper.readValue(xml, Personne.class);
        System.out.println("\nObjet désérialisé : nom=" + deserialisee.getNom() + ", age=" + deserialisee.getAge());
    }
}
{{</inlineJava>}}


## Mise en forme jolie et inclusion des null

Par défaut, Jackson produit un JSON compact sans espaces. Pour améliorer la lisibilité, particulièrement lors du développement ou du débogage, vous pouvez activer l'indentation en utilisant `SerializationFeature.INDENT_OUTPUT`. Cela ajoute des espaces et des sauts de ligne pour structurer le JSON de manière hiérarchique.

De plus, Jackson omet les valeurs null par défaut pour éviter de gonfler inutilement le JSON. Cependant, dans certains cas (comme les APIs qui attendent tous les champs), vous voudrez inclure explicitement les valeurs null. L'annotation `@JsonInclude(JsonInclude.Include.ALWAYS)` au niveau de la classe force l'inclusion de tous les champs, même s'ils sont null.

Dans cet exemple, la classe `Livre` utilise cette annotation et contient un champ `pages` qui peut être null. L'ObjectMapper est configuré avec l'indentation activée, produisant un JSON formaté et complet.

{{<inlineJava path="ExempleMiseEnForme.java">}}
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.ALWAYS)
class Livre {
    private String titre;
    private String auteur;
    private Integer pages; // Peut être null

    public Livre() {}

    public Livre(String titre, String auteur, Integer pages) {
        this.titre = titre;
        this.auteur = auteur;
        this.pages = pages;
    }

    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public String getAuteur() { return auteur; }
    public void setAuteur(String auteur) { this.auteur = auteur; }
    public Integer getPages() { return pages; }
    public void setPages(Integer pages) { this.pages = pages; }
}

public class ExempleMiseEnForme {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper()
                .enable(SerializationFeature.INDENT_OUTPUT);

        Livre livre = new Livre("Programmation Java", "John Doe", null);

        String json = mapper.writeValueAsString(livre);
        System.out.println("JSON mis en forme avec nulls :");
        System.out.println(json);
    }
}
{{</inlineJava>}}

Cela produit un JSON indenté incluant les champs null grâce à l'annotation. Observez comment le champ "pages" apparaît avec la valeur null, et comment la structure est présentée avec une indentation claire facilitant la lecture.

## Gestion des collections

Jackson offre un support natif pour toutes les collections Java standard (List, Set, Map, etc.), ce qui facilite grandement le travail avec des structures de données complexes. Lors de la sérialisation, une List devient un tableau JSON, et lors de la désérialisation, Jackson peut reconstruire la collection appropriée.

Cette fonctionnalité est particulièrement utile pour traiter des données provenant d'APIs REST qui retournent des listes d'objets. Jackson préserve l'ordre des éléments dans les listes et gère correctement les types génériques grâce à l'utilisation de `List.class` ou de types plus spécifiques si nécessaire.

L'exemple suivant démontre la sérialisation d'une ArrayList de chaînes en tableau JSON, puis sa désérialisation pour recréer la liste originale.

{{<inlineJava path="ExempleCollections.java">}}
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.List;

public class ExempleCollections {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        List<String> fruits = new ArrayList<>();
        fruits.add("Pomme");
        fruits.add("Banane");
        fruits.add("Orange");

        // Sérialisation
        String json = mapper.writeValueAsString(fruits);
        System.out.println("Liste sérialisée :");
        System.out.println(json);

        // Désérialisation
        List<String> deserialisee = mapper.readValue(json, List.class);
        System.out.println("\nListe désérialisée :");
        System.out.println(deserialisee);
    }
}
{{</inlineJava>}}



## Objets imbriqués

Jackson traite les hiérarchies d'objets de manière transparente et récursive, permettant de sérialiser des graphes d'objets complexes. Chaque objet imbriqué est converti en objet JSON imbriqué, préservant ainsi la structure relationnelle des données.

Cette capacité est essentielle pour modéliser des entités métier réalistes qui contiennent des références à d'autres objets. Jackson gère automatiquement la navigation dans ces hiérarchies, tant pour la sérialisation que pour la désérialisation, à condition que toutes les classes implémentent correctement le pattern JavaBeans.

Dans cet exemple, nous définissons deux classes : `Adresse` (imbriquée) et `Employe` (contenant une adresse). Le JSON produit reflète fidèlement cette structure hiérarchique.

{{<inlineJava path="ExempleObjetsImbriques.java">}}
import com.fasterxml.jackson.databind.ObjectMapper;

class Adresse {
    private String ville;
    private String pays;

    public Adresse() {}
    public Adresse(String ville, String pays) {
        this.ville = ville;
        this.pays = pays;
    }

    public String getVille() { return ville; }
    public void setVille(String ville) { this.ville = ville; }
    public String getPays() { return pays; }
    public void setPays(String pays) { this.pays = pays; }
}

class Employe {
    private String nom;
    private Adresse adresse;

    public Employe() {}
    public Employe(String nom, Adresse adresse) {
        this.nom = nom;
        this.adresse = adresse;
    }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public Adresse getAdresse() { return adresse; }
    public void setAdresse(Adresse adresse) { this.adresse = adresse; }
}

public class ExempleObjetsImbriques {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        Adresse adresse = new Adresse("New York", "USA");
        Employe employe = new Employe("Bob", adresse);

        String json = mapper.writeValueAsString(employe);
        System.out.println("Objet imbriqué sérialisé :");
        System.out.println(json);

        Employe deserialise = mapper.readValue(json, Employe.class);
        System.out.println("\nDésérialisé : nom=" + deserialise.getNom() + ", ville=" + deserialise.getAdresse().getVille());
    }
}
{{</inlineJava>}}


## Noms de champs personnalisés avec @JsonProperty

Par défaut, Jackson utilise les noms des propriétés Java (déduits des getters/setters) comme clés JSON. Cependant, les conventions de nommage diffèrent souvent entre Java (camelCase) et JSON (snake_case ou kebab-case). L'annotation `@JsonProperty` permet de spécifier explicitement le nom de la clé JSON pour chaque propriété.

Cette annotation est particulièrement utile lors de l'intégration avec des APIs externes qui imposent des conventions de nommage spécifiques, ou pour maintenir la compatibilité avec des formats de données existants. Elle peut être appliquée sur les champs, getters ou setters, offrant une grande flexibilité.

L'exemple suivant montre comment mapper des propriétés Java vers des clés JSON avec des noms personnalisés, transformant "id" en "product_id" et "nom" en "product_name".

{{<inlineJava path="ExempleJsonProperty.java">}}
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;

class Produit {
    @JsonProperty("product_id")
    private int id;

    @JsonProperty("product_name")
    private String nom;

    public Produit() {}
    public Produit(int id, String nom) {
        this.id = id;
        this.nom = nom;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
}

public class ExempleJsonProperty {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        Produit produit = new Produit(101, "Ordinateur portable");

        String json = mapper.writeValueAsString(produit);
        System.out.println("JSON avec noms personnalisés :");
        System.out.println(json);
    }
}
{{</inlineJava>}}


## Ignorer des champs avec @JsonIgnore

Certaines propriétés d'un objet Java ne devraient pas être incluses dans la sérialisation JSON, soit pour des raisons de sécurité (mots de passe), soit pour des considérations de performance (données temporaires), soit simplement parce qu'elles sont internes à l'application. L'annotation `@JsonIgnore` permet d'exclure complètement un champ de la sérialisation et désérialisation.

Cette annotation est particulièrement importante pour éviter de exposer des données sensibles dans les réponses JSON des APIs. Elle peut être appliquée sur les champs, getters ou setters, et Jackson l'ignorera complètement lors des opérations de conversion.

Dans cet exemple, le champ `motDePasse` est marqué avec `@JsonIgnore`, donc il n'apparaîtra pas dans le JSON produit, protégeant ainsi les informations sensibles.

{{<inlineJava path="ExempleJsonIgnore.java">}}
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.ObjectMapper;

class Utilisateur {
    private String nomUtilisateur;
    @JsonIgnore
    private String motDePasse;

    public Utilisateur() {}
    public Utilisateur(String nomUtilisateur, String motDePasse) {
        this.nomUtilisateur = nomUtilisateur;
        this.motDePasse = motDePasse;
    }

    public String getNomUtilisateur() { return nomUtilisateur; }
    public void setNomUtilisateur(String nomUtilisateur) { this.nomUtilisateur = nomUtilisateur; }
    public String getMotDePasse() { return motDePasse; }
    public void setMotDePasse(String motDePasse) { this.motDePasse = motDePasse; }
}

public class ExempleJsonIgnore {
    public static void main(String[] args) throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        Utilisateur utilisateur = new Utilisateur("charlie", "caché");

        String json = mapper.writeValueAsString(utilisateur);
        System.out.println("JSON sans le champ ignoré :");
        System.out.println(json);
    }
}
{{</inlineJava>}}


## XML et JSON

Jackson offre une API unifiée pour traiter à la fois JSON et XML, permettant aux développeurs d'écrire du code largement indépendant du format de données. L'exemple suivant démontre cette dualité en utilisant le même objet `Person` pour produire des représentations JSON et XML équivalentes.

Cette approche est particulièrement puissante pour les applications qui doivent supporter plusieurs formats de données (par exemple, une API qui peut retourner JSON ou XML selon l'en-tête Accept de la requête HTTP). Le code métier reste identique, seule la classe de mapper change.

Observez comment le même objet produit des sorties dans les deux formats : JSON avec des accolades et XML avec des balises, mais contenant les mêmes informations structurées.

{{<inlineJava path="App.java">}}
package fr.example.jackson;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
class Person {
    private String name;
    private int age;
    public Person() {}
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}
public class App {
    public static void main(String[] args) throws Exception {
        Person person = new Person("Jean Dupont", 30);
        // Sérialisation JSON
        ObjectMapper jsonMapper = new ObjectMapper();
        String json = jsonMapper.writeValueAsString(person);
        System.out.println("JSON: " + json);
        // Désérialisation JSON
        Person fromJson = jsonMapper.readValue(json, Person.class);
        System.out.println("Depuis JSON: " + fromJson);
        // Sérialisation XML
        XmlMapper xmlMapper = new XmlMapper();
        String xml = xmlMapper.writeValueAsString(person);
        System.out.println("XML: " + xml);
        // Désérialisation XML
        Person fromXml = xmlMapper.readValue(xml, Person.class);
        System.out.println("Depuis XML: " + fromXml);
    }
}
{{</inlineJava>}}


## Activité Maven 

<p>
 <a href="https://github.com/lemire/javajackson">
  Nous vous invitons maintenant à faire une activité practique avec la librairie Java Jackson.
 </a>  L'activité vous amènera sur la plateforme GitHub et vous devrez utiliser Maven.
</p>

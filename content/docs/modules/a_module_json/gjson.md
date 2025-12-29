---
title: "Google Gson"
weight: 40
---

# Activité JSON avec Gson


Gson est une bibliothèque Java puissante et largement utilisée pour la manipulation de données JSON. Développée par Google, elle facilite la conversion entre objets Java et représentations JSON, permettant aux développeurs de travailler avec des structures de données complexes sans se soucier des détails de parsing manuel. Que ce soit pour consommer des API REST, stocker des configurations ou échanger des données entre systèmes, Gson offre une API simple et intuitive.

Un des aspects clés de Gson est son utilisation de la réflexion Java (reflection). La réflexion permet à Gson d'inspecter dynamiquement les classes et leurs champs à l'exécution, sans nécessiter d'annotations spéciales ou de code boilerplate. Cela signifie que Gson peut automatiquement mapper les propriétés d'un objet Java vers des clés JSON et vice versa, en accédant même aux champs privés grâce aux mécanismes de réflexion. Cette approche rend Gson très flexible et réduit considérablement le code nécessaire pour la sérialisation et désérialisation.

Cependant, l'utilisation de la réflexion a aussi des implications en termes de performance et de sécurité. La réflexion peut être plus lente que des approches compilées, et elle nécessite souvent des permissions spéciales dans les environnements sécurisés comme les applets ou les applications Android avec restrictions. Malgré ces considérations, la simplicité et la puissance de Gson en font un choix populaire pour de nombreux projets Java, équilibrant facilité d'utilisation et fonctionnalités avancées.




## Utilisation de Google Gson pour le traitement JSON en Java

Google Gson est une bibliothèque Java open-source populaire développée par Google pour convertir des objets Java en JSON (sérialisation) et du JSON en objets Java (désérialisation).

Maven est un outil de gestion et d'automatisation de build pour les projets Java. Il simplifie la gestion des dépendances (bibliothèques externes), la compilation, les tests et le packaging des applications. En déclarant les dépendances dans un fichier `pom.xml`, Maven télécharge automatiquement les bibliothèques nécessaires depuis des dépôts centraux, évitant les conflits de versions et facilitant le partage de projets.

Pour l'inclure dans un projet Maven, ajoutez la dépendance suivante.

```xml
<dependency>
    <groupId>com.google.code.gson</groupId>
    <artifactId>gson</artifactId>
    <version>2.13.2</version>
</dependency>
```

## Sérialisation et désérialisation de base

La sérialisation convertit un objet Java en chaîne JSON. La désérialisation fait l'inverse. Par défaut, Gson sérialise les champs privés, exclut les champs `transient` et `static`, et omet les valeurs `null`. Les champs `transient`
en Java ne sont pas destinés à être sauvegardé.

Voici un exemple autonome.

{{<inlineJava path="ExempleBasique.java">}}
import com.google.gson.Gson;

class Personne {
    private String nom;
    private int age;
    private transient String motDePasse; // Sera ignoré

    public Personne(String nom, int age, String motDePasse) {
        this.nom = nom;
        this.age = age;
        this.motDePasse = motDePasse;
    }
}

public class ExempleBasique {
    public static void main(String[] args) {
        Gson gson = new Gson();

        Personne personne = new Personne("Alice", 30, "secret");

        // Sérialisation
        String json = gson.toJson(personne);
        System.out.println("JSON sérialisé :");
        System.out.println(json);

        // Désérialisation
        Personne deserialisee = gson.fromJson(json, Personne.class);
    }
}
{{</inlineJava>}}


L'exécution de ce code affiche un JSON compact sans le champ transient, puis reconstruit l'objet.

## Mise en forme jolie et inclusion des null

Pour une sortie lisible, utilisez la mise en forme jolie. Pour inclure les champs `null`, configurez le builder.

{{<inlineJava path="ExempleMiseEnForme.java">}}
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

class Livre {
    private String titre;
    private String auteur;
    private Integer pages; // Peut être null

    public Livre(String titre, String auteur, Integer pages) {
        this.titre = titre;
        this.auteur = auteur;
        this.pages = pages;
    }
}

public class ExempleMiseEnForme {
    public static void main(String[] args) {
        Gson gson = new GsonBuilder()
                .setPrettyPrinting()
                .serializeNulls()
                .create();

        Livre livre = new Livre("Programmation Java", "John Doe", null);

        String json = gson.toJson(livre);
        System.out.println("JSON mis en forme avec nulls :");
        System.out.println(json);
    }
}
{{</inlineJava>}}


Cela affiche un JSON formaté, incluant le champ "pages" null.

## Gestion des collections et génériques

Gson sérialise facilement les collections, mais nécessite des informations de type pour la désérialisation des génériques en raison de l'effacement de type. Utilisez `TypeToken` pour cela.

{{<inlineJava path="ExempleCollections.java">}}
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class ExempleCollections {
    public static void main(String[] args) {
        Gson gson = new Gson();

        List<String> fruits = new ArrayList<>();
        fruits.add("Pomme");
        fruits.add("Banane");
        fruits.add("Orange");

        // Sérialisation
        String json = gson.toJson(fruits);
        System.out.println("Liste sérialisée :");
        System.out.println(json);

        // Désérialisation
        Type typeListe = new TypeToken<List<String>>(){}.getType();
        List<String> deserialisee = gson.fromJson(json, typeListe);
        System.out.println("\nListe désérialisée :");
        System.out.println(deserialisee);
    }
}
{{</inlineJava>}}


Cela fonctionne de manière similaire pour les tableaux, sets, maps et autres collections.

## Objets imbriqués

Gson gère automatiquement les hiérarchies d'objets.

{{<inlineJava path="ExempleObjetsImbriques.java">}}
import com.google.gson.Gson;

class Adresse {
    private String ville;
    private String pays;

    public Adresse(String ville, String pays) {
        this.ville = ville;
        this.pays = pays;
    }
}

class Employe {
    private String nom;
    private Adresse adresse;

    public Employe(String nom, Adresse adresse) {
        this.nom = nom;
        this.adresse = adresse;
    }
}

public class ExempleObjetsImbriques {
    public static void main(String[] args) {
        Gson gson = new Gson();

        Adresse adresse = new Adresse("New York", "USA");
        Employe employe = new Employe("Bob", adresse);

        String json = gson.toJson(employe);
        System.out.println("Objet imbriqué sérialisé :");
        System.out.println(json);

        Employe deserialise = gson.fromJson(json, Employe.class);
    }
}
{{</inlineJava>}}


## Noms de champs personnalisés avec @SerializedName

Utilisez l'annotation `@SerializedName` pour des noms de champs JSON différents.

{{<inlineJava path="ExempleSerializedName.java">}}
import com.google.gson.Gson;
import com.google.gson.annotations.SerializedName;

class Produit {
    @SerializedName("product_id")
    private int id;

    @SerializedName("product_name")
    private String nom;

    public Produit(int id, String nom) {
        this.id = id;
        this.nom = nom;
    }
}

public class ExempleSerializedName {
    public static void main(String[] args) {
        Gson gson = new Gson();

        Produit produit = new Produit(101, "Ordinateur portable");

        String json = gson.toJson(produit);
        System.out.println("JSON avec noms personnalisés :");
        System.out.println(json);

        Produit deserialise = gson.fromJson(json, Produit.class);
    }
}
{{</inlineJava>}}


## Exclusion de champs avec @Expose

Configurez Gson pour sérialiser uniquement les champs annotés avec `@Expose`.

{{<inlineJava path="ExempleExpose.java">}}
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;

class Utilisateur {
    @Expose
    private String nomUtilisateur;

    private String motDePasse; // Non exposé

    public Utilisateur(String nomUtilisateur, String motDePasse) {
        this.nomUtilisateur = nomUtilisateur;
        this.motDePasse = motDePasse;
    }
}

public class ExempleExpose {
    public static void main(String[] args) {
        Gson gson = new GsonBuilder()
                .excludeFieldsWithoutExposeAnnotation()
                .create();

        Utilisateur utilisateur = new Utilisateur("charlie", "caché");

        String json = gson.toJson(utilisateur);
        System.out.println("JSON avec uniquement les champs exposés :");
        System.out.println(json);
    }
}
{{</inlineJava>}}

## Activité 

<p>
 <a href="https://github.com/lemire/javagson">
  Nous vous invitons maintenant à faire une activité pratique avec la librairie Java Gson. 
 </a> L'activité vous amènera sur la plateforme GitHub et vous devrez utiliser Maven.
 Cette démarche ressemble à une activité industrielle.
</p>
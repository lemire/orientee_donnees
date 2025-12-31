---
title: "Accueil"
---

# Mot de bienvenue


Bienvenue ! Mon nom est [Daniel Lemire](http://lemire.me/fr/). Je travaille comme professeur et chercheur en informatique. Je suis notamment l'instigateur et le principal auteur du parseur JSON le plus rapide au monde (simdjson),
nous verrons dans ce cours en quoi consiste JSON.



Ce cours explore la gestion des données à travers les formats les plus utilisés sur Internet et en science des données. Il présente le format JSON comme la norme actuelle pour les échanges web, ainsi que sa manipulation à l’aide de bibliothèques telles que Gson (Google) et Jackson, ou d’outils spécialisés comme jq. Le cours aborde également le format XML, en couvrant sa validation par DTD et sa transformation par XSLT. Le HTML est traité avec sa stylisation via CSS, ainsi que ses formats compagnons comme MathML et SVG. Le format YAML est présenté comme une alternative lisible par l’humain, étendant les possibilités de JSON pour les fichiers de configuration. Une attention particulière est accordée aux correspondances entre ces formats et les structures de données fondamentales : XML et HTML en tant qu’arbres de nœuds, JSON et YAML comme compositions de dictionnaires et de listes, et RDF comme graphe de relations. Cette approche permet de relier les opérations d’analyse, de validation, de requêtage et de transformation à des concepts centraux en informatique, tels que la représentation en mémoire, le parcours d’arbres, la réécriture de structures, ainsi que la sérialisation et la désérialisation. Des notions complémentaires, comme l’encodage Base64 et les flux RSS, sont également couvertes, avec un accent sur leur manipulation programmatique. À travers des exemples concrets – récupération de flux d’actualités, génération de documents Word au format XML, analyse rapide de données JSON, développement d’un service web exposant JSON ou XML – le cours vise à développer des compétences pratiques pour analyser, transformer et échanger des données dans des environnements professionnels contemporains.


## Mise en contexte

Les formats de données structurées comme XML, HTML, JSON, YAML et RDF jouent un rôle essentiel dans l'échange et la représentation d'informations en informatique. Chacun d'eux repose sur des structures de données fondamentales qui influencent leur utilisation. Une compréhension des liens entre ces formats et les concepts sous-jacents, tels que les arbres, les compositions de dictionnaires et listes, ou les graphes, permet de mieux choisir l'outil adapté à une situation donnée.

XML et HTML sont fondamentalement basés sur une structure arborescente de nœuds. Un document XML commence par un élément racine unique, à partir duquel se ramifient des éléments enfants, formant une hiérarchie stricte similaire à un arbre. Chaque nœud peut contenir du texte, des attributs ou d'autres nœuds, ce qui facilite la représentation de données ordonnées et imbriquées. HTML suit le même principe, en tant que variante d'XML appliquée au web, où la page est vue comme un arbre  accessible et manipulable par les navigateurs.

**Exemple. XML**
```xml
<person>
  <name>Alice Dupont</name>
  <age>32</age>
  <isDeveloper>true</isDeveloper>
  <address>
    <street>12 rue des Lilas</street>
    <city>Paris</city>
    <country>France</country>
  </address>
  <hobbies>
    <hobby>lecture</hobby>
    <hobby>escalade</hobby>
    <hobby>photographie</hobby>
  </hobbies>
</person>
```

**Exemple. HTML**

```xml
<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Exemple de HTML</title>
</head>
<body>
    <header>
        <h1>Mon site web</h1>
        <nav>
            <a href="#home">Accueil</a>
            <a href="#about">À propos</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>Bienvenue</h2>
            <p>Ceci est un court exemple de HTML sémantique.</p>
        </section>
        
        <article>
            <h2>Article de blog</h2>
            <p>Le contenu de l'article va ici.</p>
        </article>
        
        <aside>
            <h3>Liens associés</h3>
            <p>Du contenu de barre latérale.</p>
        </aside>
    </main>
    
    <footer>
        <p>&copy; 2025 Exemple</p>
    </footer>
</body>
</html>
```

En contraste, JSON et YAML s'appuient sur des compositions de dictionnaires et de listes. JSON utilise des objets (équivalents à des dictionnaires avec paires clé-valeur) et des tableaux (listes ordonnées), permettant une représentation flexible et légère de données. YAML étend cette approche en offrant une syntaxe plus lisible pour les humains, avec indentation pour les listes et mappings, tout en restant compatible avec les structures de JSON dans de nombreux cas. Ces formats excellent pour les données semi-structurées, comme les configurations ou les échanges API.


**Exemple. JSON**

```json
{
  "name": "Alice Dupont",
  "age": 32,
  "isDeveloper": true,
  "address": {
    "street": "12 rue des Lilas",
    "city": "Paris",
    "country": "France"
  },
  "hobbies": ["lecture", "escalade", "photographie"]
}
```

**Exemple. YAML**
```yaml
name: Alice Dupont
age: 32
isDeveloper: true
address:
  street: 12 rue des Lilas
  city: Paris
  country: France
hobbies:
  - lecture
  - escalade
  - photographie
```

RDF, quant à lui, adopte une modèle de graphe basé sur des relations. Il repose sur des triples (sujet-prédicat-objet), où chaque affirmation lie deux entités via une relation dirigée. Cela forme un graphe potentiellement non arborescent, avec des connexions multiples et cycliques possibles, idéal pour exprimer des connaissances sémantiques interconnectées.

**Exemple. RDF/XML**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<rdf:RDF
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:foaf="http://xmlns.com/foaf/0.1/">

    <foaf:Person rdf:about="http://exemple.org/personnes#alice">
        <foaf:name>Alice Dupont</foaf:name>
        <foaf:age>32</foaf:age>
        <foaf:mbox rdf:resource="mailto:alice.dupont@exemple.fr"/>
        <foaf:topic_interest rdf:resource="http://exemple.org/interets#photographie"/>
    </foaf:Person>
</rdf:RDF>
```

Les ponts entre ces formats et les structures fondamentales révèlent leurs complémentarités. Par exemple, un arbre XML peut être converti en objet JSON en mappant les éléments enfants à des clés de dictionnaire ou des listes, bien que la perte d'ordre ou d'attributs puisse nécessiter des ajustements. YAML, étant un surensemble humain de JSON, facilite cette transition pour les configurations.

Dans ce cours, vous pourrez approfondir votre compréhension de ces notions.

## Attention : Java

Avant de suivre ce cours, vous devez normalement avoir un suivi au moins un cours de Java ou l'équivalent.
Ce cours suppose que vous êtes capable d'utiliser et de compiler un programme Java en ligne de commande. Avant de commencer le cours, créez un fichier intitulé « HelloWorld.java » avec le contenu suivant.

{{<inlineJava path="HelloWorld.java">}}
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
{{</inlineJava>}}


Il est de votre responsabilité de vous assurer que vous avez les connaissances requises pour réussir ce cours.
Vous ne devriez pas être intimidé par l'exemple suivant. Prenez quelques secondes pour l'exécuter dans
votre navigateur.


{{<inlineJava path="JsonWithJackson.java">}}
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonWithJackson {
    private static final ObjectMapper mapper = new ObjectMapper();

    public static void main(String[] args) throws JsonProcessingException {
        Person p = new Person("Alice", 30, true);
        System.out.println(toJson(p));
    }

    public static String toJson(Object o) throws JsonProcessingException {
        if (o == null) return "null";
        return mapper.writeValueAsString(o);
    }

    static class Person {
        public String nom;
        public int age;
        public boolean majeur;

        Person(String nom, int age, boolean majeur) {
            this.nom = nom;
            this.age = age;
            this.majeur = majeur;
        }
    }
}
{{</inlineJava>}}


Nous recommandons comme référence pour la programmation Java le manuel [Java pas à pas](https://www.amazon.ca/Java-pas-Introduction-programmation-langage/dp/B0CR7RW87Y/) de Godin et Lemire.



## Mathématiques

Ce cours ne nécessite pas beaucoup de mathématiques en dehors de celles déjà couvertes au secondaire. Par exemple, il faut être familier avec la théorie des ensembles (incluant les notions d'union et d'intersection) et des éléments de la théorie des graphes.


## Charge de travail

Le cours exige une charge de travail d'environ 9 heures par semaine pendant 15 semaines. Vous devez donc prévoir une à deux journées pleine à consacrer au cours par semaine.

Il est de votre responsabilité de vous assurer que vous avez assez de temps dans votre horaire pour réussir ce cours.

## Politique concernant le plagiat

L'utilisation de textes ou de travaux écrits par autrui sans attribution, est du plagiat, même dans le cas où l'emprunt se limite à des fragments. En cas de plagiat, une note de zéro peut être accordée. De plus, l'offense peut être rapportée à l'Université qui appliquera des mesures disciplinaires.

## L'environnement technologique du cours

Un cours en ligne est beaucoup plus qu'un simple site web. Par exemple, le présent cours comprend des dizaine d'articles, plus d'une centaine de problèmes avec solutions, beaucoup de logiciel, des dizaines d'exemples, et des dizaines de liens vers des sites externes. Le professeur ou une personne tutrice sera également à votre disposition pour répondre à vos questions.

**Navigation**

Le menu à gauche de l'écran présente l'organisation du cours en modules. Vous devez suivre le cours du premier module au dernier. Prenez le temps de consulter la feuille de route.

## L'approche pédagogique du cours

Le présent cours repose sur des lectures qui sont suivies d'activités d'autoévaluation. Contrairement à un cours donné en salle de classe, vous pouvez progresser à votre rythme et travailler où vous le voulez. Le cours s'échelonne sur 15 semaines, comme un cours en salle de classe, pour vous donner une idée du travail à faire par tranches successives. Si vous n'avez jamais suivi de cours en ligne, vous constaterez rapidement que la formule présente des avantages et se rapproche du travail en milieu professionnel.

Un cours en ligne n'est pas pour autant plus facile. Si votre progression est trop lente ou que vous sautez trop d'étapes, vous risquez de vous décourager : le cours a été conçu pour que vous progressiez régulièrement pendant les 15 semaines de sa durée.

**Les activités d'autoévaluation sont obligatoires.**

L'une des plus grandes sources de frustration est la difficulté des travaux notés. Plusieurs étudiants espèrent gagner du temps en faisant rapidement les lectures et en omettant les activités d'autoévaluation. C'est une mauvaise idée, parce que vous arriverez alors aux activités notées mal préparé.


**Note sur l'encadrement**

En tout temps, vous pourrez communiquer avec le professeur ou la personne tutrice par courriel. Pour lui permettre de classer rapidement ses messages, inscrivez le titre du cours dans l'objet de votre message.

Il n'y a pas de contact de démarrage dans ce cours contrairement à ce que la documentation de la Télé-université peut suggérer. Vous devez commencer le cours dès que possible.

# Intelligence artificielle

Dans ce cours, l'utilisation de l'intelligence artificielle (Claude, ChatGPT, Copilot, Grok, etc.) est permise et même recommandée (mais optionnelle). Cependant, vous devez l'utiliser de manière responsable :

- Décrivez votre utilisation de l'IA. Une utilisation de l'IA sans déclaration peut être considérée comme une forme de faute. Contrairement à ce que vous pourriez croire, déclarer votre utilisation de l'IA vous protège.

- Expliquez votre démarche. Qu'est-ce que vous avez fait avec l'IA ? Nous vous encourageons à inclure des copies des résultats de vos interactions avec l'IA.

- Assurez-vous de bien expliquer vos résultats, en vos propres mots.



# Assistance par intelligence artificielle

<p>
 Pour bénéficier d’une assistance par intelligence artificielle directement dans l’éditeur, il est possible d’ajouter GitHub Copilot, un outil d’autocomplétion alimenté par l’intelligence artificielle. Voici comment procéder.
</p>
<ol>
 <li>
  Créez-vous un compte sur
  <a href="https://github.com">
   le site GitHub
  </a>
  .
  <a href="https://github.com/lemire">
   Vous pouvez en profiter vous consulter la page du professeur
  </a>
  .
 </li>
 <li>
  Installez Visual Studio Code depuis le site officiel (code.visualstudio.com) si ce n’est pas déjà fait.
 </li>
 <li>
  Ouvrez l’éditeur, puis accédez à la vue des extensions en cliquant sur l’icône carrée divisée en quatre dans la barre latérale gauche.
 </li>
 <li>
  Dans la barre de recherche des extensions, tapez GitHub Copilot et sélectionnez l’extension officielle publiée par GitHub.
 </li>
 <li>
  Cliquez sur Installer ou Install. Une fois l’installation terminée, une invite vous demandera de vous connecter avec votre compte GitHub. Suivez les instructions pour autoriser l’extension.
 </li>
 <li>
  Copilot est désormais actif. Il proposera des suggestions de code en temps réel pendant que vous tapez. Acceptez-les avec la touche Tab.
 </li>
</ol>
<p>
 Notez que GitHub Copilot nécessite un abonnement payant après une période d’essai gratuite.
</p>

## Quelque chose vous déplaît ? Vous avez remarqué une erreur ?

En tout temps, vous pouvez laisser un mot anonyme au sujet du cours sur [le formulaire prévu à cet effet](https://docs.google.com/forms/d/1emnei-XQua_DaLPXxMby-SCI9UMbQgSiilKOCRNhUZQ/viewform). Ce formulaire nous permet de réagir rapidement quand un problème survient dans le cadre du cours. Bien entendu, vous pouvez aussi aviser la personne qui vous encadre de tout problème que vous rencontrez.

Nous portons attention à tous vos commentaires et tâchons d'améliorer le cours en conséquence.
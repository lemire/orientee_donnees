---
title: "DOM"
weight: 20
---

# DOM

Le Document Object Model (DOM) est une interface de programmation standardisée pour accéder et manipuler des documents HTML et XML. Il représente la structure hiérarchique d'un document sous forme d'un arbre de nœuds, où chaque élément, attribut ou portion de texte est un nœud accessible via des méthodes de programmation. Cette approche permet aux développeurs de naviguer, modifier et interagir dynamiquement avec le contenu et la structure des documents web ou XML, facilitant ainsi la création d'applications interactives et la manipulation de données structurées.

## Introduction

Nous supposons que vous disposez d’un environnement de développement Java et que vous ferez les exemples de ce tutoriel afin de mieux comprendre. Notre objectif est avant tout de vous rendre suffisamment à l’aise avec DOM pour pouvoir l’utiliser ; nous vous invitons toutefois à naviguer sur le web pour en apprendre davantage sur le sujet, au besoin.

L’API Java elle-même est disponible sur le [site d’Oracle](http://docs.oracle.com/javase/8/docs/api/). Pour pouvoir faire vos propres programmes, consultez l’API Java qui comprend tous les objets et fonctions du tutoriel.

## Notions de base

On dit qu’un modèle DOM est une structure en arbre. En informatique, un arbre est un graphe ou une structure constituée de nœuds, de façon telle que chaque nœud a un et un seul parent — ou aucun —, lequel a un seul ou plusieurs enfants. Un seul nœud est autorisé à ne pas avoir de parent : c’est le nœud-racine.

## Point de vue critique

L’API DOM est très utilisée et prise en charge dans de nombreux langages (Java, JavaScript, C#, C++, etc.). Cependant, elle consomme beaucoup de mémoire et nécessite souvent beaucoup de code pour des opérations simples. Malgré ces défauts, sa large adoption en fait une référence incontournable.


## Principaux concepts
Le Document Object Model (DOM) représente une page XML ou HTML comme un arbre de nœuds. Chaque élément, attribut, texte ou commentaire est vu comme un nœud que l'on peut interroger et manipuler. Cette vision arborescente permet de naviguer facilement entre les différentes parties d'un document et de modifier sa structure de façon programmatique.

Les nœuds ont différents types : `Element` pour les balises, `Attr` pour les attributs, `Text` pour les contenus textuels, `Comment` pour les commentaires et `Document` pour la racine. En Java, ces types sont représentés par les interfaces du package `org.w3c.dom` (par exemple `Element`, `Node`, `Document`), et chaque objet fournit des méthodes adaptées pour accéder à son contenu et à ses relations (parent, enfants, frères/sœurs).

Un élément (`Element`) contient un nom (le nom de la balise), éventuellement des attributs (paires nom/valeur) et des nœuds enfants. Les attributs sont accessibles via `getAttribute` / `setAttribute` et les sous-éléments via `getElementsByTagName` ou en parcourant la liste `childNodes`. Il est important de distinguer la valeur d'un attribut (string) du texte contenu dans un nœud `Text` enfant.

Les nœuds de texte (`Text`) représentent le texte brut entre balises. Ils peuvent contenir des espaces ou des retours à la ligne significatifs selon le contexte. L'accès au contenu textuel se fait généralement avec `getTextContent()` ou `getNodeValue()`. En pratique, on veillera à normaliser ou filtrer les nœuds de texte inutiles (espaces blancs) selon les besoins de l'application.

Pour modifier un document on crée ou clone des nœuds (`createElement`, `createTextNode`, `cloneNode`) puis on les insère (`appendChild`, `insertBefore`) ou retire (`removeChild`). Une fois la modification effectuée, on peut sérialiser le DOM vers un flux ou un fichier avec les classes de transformation (`Transformer`, `DOMSource`, `StreamResult`) pour obtenir le XML/HTML final.


## Présentation sommaire de l'API

Les points d'entrée les plus courants sont `DocumentBuilderFactory` et `DocumentBuilder` : on obtient une instance de `DocumentBuilderFactory` via `DocumentBuilderFactory.newInstance()`, on configure ses options (par exemple `setNamespaceAware(true)` ou `setValidating(false)`) puis on crée un `DocumentBuilder` pour parser des fichiers ou construire des documents en mémoire.

Le parsing s'effectue avec `DocumentBuilder.parse(...)` qui accepte un `File`, un `InputStream` ou un `InputSource`. En cas d'erreur de syntaxe le parseur lève une `SAXException` ou une `IOException` — il est donc courant d'entourer l'appel d'un bloc try/catch et de fournir des messages d'erreur clairs. Pour des environnements sensibles, activez les fonctionnalités de sécurité (par ex. `factory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true)`) afin de réduire les risques liés aux entités externes.

Pour créer ou modifier un document on utilise les méthodes du `Document` : `createElement`, `createTextNode`, `setAttribute`, `appendChild`, `insertBefore`, `removeChild`, etc. `importNode`/`adoptNode` sont utiles pour déplacer des nœuds entre documents. Après de nombreuses modifications, appelez `normalizeDocument()` ou `normalize()` sur un nœud pour fusionner les nœuds de texte adjacents et avoir un arbre propre.

La sérialisation du DOM se fait généralement via `TransformerFactory` et `Transformer`. On construit un `DOMSource` à partir du `Document` et un `StreamResult` vers un fichier ou `System.out`. On peut régler des propriétés de sortie (encodage, indentation) avec `transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8")` ou `OutputKeys.INDENT` pour obtenir un XML lisible.

Pour interroger le document il est fréquent d'utiliser `XPath` (`XPathFactory.newInstance()` → `XPath`) ; `evaluate` permet d'extraire un `Node`, une `NodeList` ou une chaîne. Pour des besoins plus avancés on peut combiner DOM avec des bibliothèques comme Xerces, XPath 2.0/XQuery (Saxon), ou utiliser `DocumentBuilderFactory` configuré pour la validation (DTD/Schema) si l'application doit vérifier la conformité du document.

## Un document XML

Créons d’abord un document XML nommé « test.xml » :

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<liste>
    <joueur>
        <nom surnom="jojo">Jean</nom>
        <buts>32</buts>
    </joueur>
    <joueur>
        <nom surnom="Ma">Marie</nom>
        <buts>54</buts>
    </joueur>
</liste>
```

## Charger un document XML en Java

```java
import org.w3c.dom.*;
import javax.xml.parsers.*;

public class Test {
    public static void main(String[] args) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder parser = factory.newDocumentBuilder();
        Document doc = parser.parse(args[0]);
    }
}
```

## Accès à l’élément-racine

```java
import org.w3c.dom.*;
import javax.xml.parsers.*;

public class Test {
    public static void main(String[] args) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder parser = factory.newDocumentBuilder();
        Document doc = parser.parse(args[0]);

        Element racine = doc.getDocumentElement();
        System.out.println(racine.getTagName()); // affiche : liste
    }
}
```

## L’interface Node

| Type de nœud | getNodeName() | getNodeValue() |
|--------------|---------------|---------------|
| Attribut | nom de l’attribut | valeur de l’attribut |
| Élément | nom de l’élément | null |
| Texte | #text | le texte |

## Parcourir les enfants

Prenez quelques secondes pour exécuter le programme suivant dans votre navigateur.

{{<inlineJava path="Test.java">}}
import org.w3c.dom.*;
import javax.xml.parsers.*;
import java.io.StringReader;
import org.xml.sax.InputSource;
public class Test {
    public static void main(String[] args) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder parser = factory.newDocumentBuilder();
        String xml = """
<?xml version="1.0" encoding="ISO-8859-1"?>
<liste>
    <joueur>
        <nom surnom="jojo">Jean</nom>
        <buts>32</buts>
    </joueur>
    <joueur>
        <nom surnom="Ma">Marie</nom>
        <buts>54</buts>
    </joueur>
</liste>
""";
        Document doc = parser.parse(new InputSource(new StringReader(xml)));
        Element racine = doc.getDocumentElement();
        NodeList joueurs = racine.getElementsByTagName("joueur");
        for (int i = 0; i < joueurs.getLength(); i++) {
            Element joueur = (Element) joueurs.item(i);
            Element nom = (Element) joueur.getElementsByTagName("nom").item(0);
            Element buts = (Element) joueur.getElementsByTagName("buts").item(0);
            String nomJoueur = nom.getFirstChild().getNodeValue();
            String surnom = nom.getAttribute("surnom");
            String nbButs = buts.getFirstChild().getNodeValue();
            System.out.println(nomJoueur + " (" + surnom + ") : " + nbButs + " buts");
        }
    }
}
{{</inlineJava>}}


## Création d’un document XML depuis zéro

{{<inlineJava path="CreationDOM.java">}}
import org.w3c.dom.*;
import javax.xml.parsers.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.FileWriter;
public class CreationDOM {
    public static void main(String[] args) throws Exception {
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.newDocument();
        Element liste = doc.createElement("liste");
        doc.appendChild(liste);
        Element joueur1 = doc.createElement("joueur");
        Element nom1 = doc.createElement("nom");
        nom1.appendChild(doc.createTextNode("Jean"));
        nom1.setAttribute("surnom", "jojo");
        Element buts1 = doc.createElement("buts");
        buts1.appendChild(doc.createTextNode("32"));
        joueur1.appendChild(nom1);
        joueur1.appendChild(buts1);
        liste.appendChild(joueur1);
        TransformerFactory tf = TransformerFactory.newInstance();
        Transformer t = tf.newTransformer();
        t.setOutputProperty(OutputKeys.ENCODING, "ISO-8859-1");
        t.setOutputProperty(OutputKeys.INDENT, "yes");
        DOMSource source = new DOMSource(doc);
        StreamResult result = new StreamResult(new FileWriter("nouveau.xml"));
        t.transform(source, result);

        StreamResult consoleResult = new StreamResult(System.out);
        t.transform(source, consoleResult);
    }
}
{{</inlineJava>}}




## DOM et autres langages

L'API DOM est prise en charge en C++ (voir [Xerces-C](http://xml.apache.org/xerces-c/)), en Python (paquetage xml.dom), en Perl (voir [Xerces-P](http://xml.apache.org/xerces-p/)), en JavaScript, etc. C'est d'ailleurs la principale force de cette API : peu importe le contexte, il y a fort à parier que vous aurez accès à l'API DOM. Ce n'est sans doute pas la meilleure API possible, mais son ubiquité fait en sorte qu'il vaut la peine d'apprendre à la connaître.

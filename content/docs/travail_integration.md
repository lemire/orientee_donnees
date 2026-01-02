---
title: "Travail d'intégration"
weight: 155
---

# Travail d'intégration

Ce travail d'intégration vous permet de démontrer l'acquisition des compétences développées tout au long du cours. Vous devez créer une application web complète qui intègre plusieurs technologies : HTML5, JavaScript, AJAX, Java, JSON, XML, SVG, MathML, YAML, Maven et les styles CSS. Vous utilisez
les libraires Java Gson, Jackson et Apache POI.

**Avertissement**. Vous devez avoir fait toutes les activités du cours avant de tenter de faire
l'activité d'intégration.

## Objectif

Créer un serveur web Java qui sert une page HTML5 permettant à l'utilisateur d'entrer une liste de 10 entiers et de dix étiquettes (par exemple, les dix provinces canadiennes). Ce serveur reçoit ces données via AJAX, génère un graphique à barres SVG avec des styles appropriés, puis retourne le graphique intégré dans un document JSON.

## Technologies à utiliser

Pour réaliser ce projet, vous utiliserez plusieurs technologies. Le serveur sera développé en Java avec HttpServer. Pour le traitement des données XML, vous emploierez Jackson, tandis que Gson sera utilisé pour manipuler les données JSON. Apache POI sera utilisé pour générer des documents Excel au format Open XML. L'interface utilisateur sera créée en HTML5 valide, avec des graphiques vectoriels SVG stylisés en CSS. La communication asynchrone se fera via AJAX, et les styles CSS3 seront appliqués tant à l'interface qu'aux éléments SVG.

## Cahier des charges

### Interface utilisateur (HTML5)

La page doit contenir un formulaire avec 10 champs numériques de type `number`
ainsi que dix champs qui représentent les étiquettes. Par exemple, il pourrait 
être possible d'associer une valeur numérique à chaque province canadienne.
Un bouton permettra de générer le graphique. Une zone d'affichage sera réservée pour montrer le résultat SVG. La génération du graphique doit se faire du côté serveur, en Java.

Indices. Il peut être possible récupérer une réponse JSON d'un serveur avec du code JavaScript similaire à celui-ci.

```javascript
fetch('/route')
  .then(response => response.json())
  .then(data => {
    // code de traitement ici
  });
```

Il peut être possible d'insérer du SVG dans la page courante avec un code semblable à celui-ci.

```javascript
const container = document.getElementById('svg-container');
const parser = new DOMParser();
const svgDoc = parser.parseFromString(data.svg, 'image/svg+xml');
const svgElement = svgDoc.documentElement;  // The root <svg> element
container.appendChild(svgElement);
```

### Maven

Maven est utilisé pour la gestion des dépendances et la construction du projet Java. Vous devez créer un fichier `pom.xml` à la racine du projet. Un fichier possible est celui-ci.

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>graph-server</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- Gson pour la manipulation JSON -->
        <dependency>
            <groupId>com.google.code.gson</groupId>
            <artifactId>gson</artifactId>
            <version>2.10.1</version>
        </dependency>

        <!-- Jackson pour le traitement XML -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.15.2</version>
        </dependency>

        <dependency>
            <groupId>com.fasterxml.jackson.dataformat</groupId>
            <artifactId>jackson-dataformat-xml</artifactId>
            <version>2.15.2</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.dataformat</groupId>
            <artifactId>jackson-dataformat-yaml</artifactId>
            <version>2.15.2</version>
        </dependency>

        <!-- Apache POI pour la génération de documents Excel Open XML -->
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi</artifactId>
            <version>5.2.4</version>
        </dependency>
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>5.2.4</version>
        </dependency>
    </dependencies>
</project>
```

La structure des fichiers doit suivre les conventions Maven :
- `pom.xml` à la racine du projet.
- Les fichiers Java (comme `GraphServer.java`) dans `src/main/java/`.
- Les ressources statiques (comme `index.html`) dans `src/main/resources/`.

Pour compiler le projet, utilisez `mvn compile`. 


### Configuration YAML

Votre service web doit être configurable avec un fichier YAML. Le fichier de configuration `config.yml` doit être placé dans le répertoire `src/main/resources/` du projet Maven. Ce fichier contiendra les paramètres du serveur tels que le port, les chemins par défaut, et d'autres options de configuration.

Exemple de fichier `config.yml` :

```yaml
server:
  port: 8080
  host: localhost
graph:
  defaultWidth: 800
  defaultHeight: 600
  colors:
    primary: "#3498db"
    secondary: "#e74c3c"
```

Pour charger ce fichier YAML dans votre code Java, utilisez Jackson avec `YAMLFactory` :

```java
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

// Dans votre classe serveur
ObjectMapper yamlMapper = new ObjectMapper(new YAMLFactory());
Config config = yamlMapper.readValue(new File("src/main/resources/config.yml"), Config.class);
```

### Serveur Java

Le serveur doit servir la page HTML statique sur la route racine `/`. Il recevra les données XML sur l'endpoint `/api/graph` via une requête POST. Le serveur validera que exactement 10 entiers sont fournis, générera un SVG avec un graphique à barres, puis retournera un document JSON contenant le SVG. De plus, un endpoint `/api/excel` devra générer et retourner un fichier Excel Open XML avec les données saisies.

### Graphique SVG

Le SVG doit afficher 10 barres verticales représentant les valeurs saisies par l'utilisateur
avec les étiquettes associées. Il utilisera des dégradés. Les axes seront étiquetés de manière claire. Le graphique inclura des infobulles au survol des barres. Vous devez par ailleurs include une 
expression MathML dans votre SVG.

### Génération d'un document Excel (Open XML)

Le serveur doit également fournir une fonction capable de générer et retourner un document Excel au format Open XML contenant les données saisies par l'utilisateur. Ce document devra inclure une feuille de calcul avec les valeurs et les étiquettes dans des colonnes appropriées. Un endpoint supplémentaire, par exemple `/api/excel`, devra être créé pour permettre le téléchargement du fichier Excel. Vous utiliserez Apache POI pour créer le fichier .xlsx.

## Structure proposée

### 1. Page HTML (index.html) (point de départ)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Générateur de graphiques</title>
</head>
<body>
    <h1>Générateur de graphiques à barres</h1>
    
    <form id="graphForm">
        <div class="input-group">
            <input type="number" id="val1" placeholder="Valeur 1" min="0" max="100" required>
            <input type="number" id="val2" placeholder="Valeur 2" min="0" max="100" required>
            <input type="number" id="val3" placeholder="Valeur 3" min="0" max="100" required>
            <input type="number" id="val4" placeholder="Valeur 4" min="0" max="100" required>
            <input type="number" id="val5" placeholder="Valeur 5" min="0" max="100" required>
            <input type="number" id="val6" placeholder="Valeur 6" min="0" max="100" required>
            <input type="number" id="val7" placeholder="Valeur 7" min="0" max="100" required>
            <input type="number" id="val8" placeholder="Valeur 8" min="0" max="100" required>
            <input type="number" id="val9" placeholder="Valeur 9" min="0" max="100" required>
            <input type="number" id="val10" placeholder="Valeur 10" min="0" max="100" required>
        </div>
        <!--  Ajouter les étiquettes !!! -->
        <button type="submit">Générer le graphique</button>
    </form>

    <div id="result"></div>

    <script>
        document.getElementById('graphForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Collecter les valeurs
            const values = [];
            for (let i = 1; i <= 10; i++) {
                const val = parseInt(document.getElementById('val' + i).value);
                if (isNaN(val)) {
                    alert('Veuillez entrer des valeurs numériques valides');
                    return;
                }
                values.push(val);
            }

            const label = []; // à compléter

            // Afficher le chargement
            document.getElementById('result') //.... à compléter

            try {
                // Envoyer les données au serveur en XML (généré avec DOM)
                // À faire: ajouter les étiquettes!!!
                const doc = document.implementation.createDocument(null, 'data');
                const valuesElement = doc.createElement('values');
                values.forEach(v => {
                    const valueElement = doc.createElement('value');
                    valueElement.textContent = v;
                    valuesElement.appendChild(valueElement);
                });
                doc.documentElement.appendChild(valuesElement);
                const serializer = new XMLSerializer();
                const xmlData = serializer.serializeToString(doc);

                const response = await fetch('/api/graph', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/xml',
                    },
                    body: xmlData
                });

                if (response.ok) {
                    //....
                } else {
                    //....
                }
            } catch (error) {
               //...
            }
        });
    </script>
</body>
</html>
```

### 2. Serveur Java (GraphServer.java) (point de départ possible)

```java
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

public class GraphServer {
    private static final Gson gson = new Gson();
    private static final ObjectMapper jsonMapper = new ObjectMapper();
    private static final XmlMapper xmlMapper = new XmlMapper();

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/", exchange -> {
            try {
                if ("GET".equals(exchange.getRequestMethod())) {
                    String html = new String(Files.readAllBytes(Paths.get("index.html")), "UTF-8");
                    exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
                    exchange.sendResponseHeaders(200, html.getBytes("UTF-8").length);
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(html.getBytes("UTF-8"));
                    }
                } else {
                    exchange.sendResponseHeaders(405, -1);
                }
            } catch (Exception e) {
                exchange.sendResponseHeaders(500, -1);
            }
        });

        // Endpoint pour générer le graphique
        server.createContext("/api/graph", exchange -> {
            if ("POST".equals(exchange.getRequestMethod())) {
                try {
                    // Lire les données XML
                    InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), "UTF-8");
                    StringBuilder xmlBuilder = new StringBuilder();
                    char[] buffer = new char[1024];
                    int length;
                    while ((length = reader.read(buffer)) != -1) {
                        xmlBuilder.append(buffer, 0, length);
                    }
                    String xmlInput = xmlBuilder.toString();

                    // Parser avec jackson

                    // Convertir en liste d'entiers
                    int[] values = new int[10];
                    for (int i = 0; i < 10; i++) {
                        values[i] = valuesNode.get(i).asInt();
                    }

                    String[] labels = //... à compléter pour les étiquettes

                    // Générer le SVG
                    String svgContent = generateSVG(values, labels);

                    // Créer la réponse JSON
                    JsonObject responseJson = new JsonObject();
                    responseJson.addProperty("svg", svgContent);
                    String jsonResponse = gson.toJson(responseJson);

                    exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
                    exchange.sendResponseHeaders(200, jsonResponse.getBytes("UTF-8").length);
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(jsonResponse.getBytes("UTF-8"));
                    }

                } catch (Exception e) {
                    exchange.sendResponseHeaders(500, -1);
                }
            } else if ("OPTIONS".equals(exchange.getRequestMethod())) {
                exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "POST, OPTIONS");
                exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
                exchange.sendResponseHeaders(200, -1);
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        });

        server.setExecutor(null);
        server.start();
        System.out.println("Serveur de graphiques démarré sur http://localhost:8080/");
    }

    private static String generateSVG(int[] values, String[] labels) {
    //...
    }

    private static String generateHTMLResponse(String svgContent) {
        //...
    }
}
```

Le SVG doit utiliser des styles CSS appropriés. Pour les barres, vous emploierez un dégradé linéaire `linearGradient`. Les animations utiliseront les propriétés `transition` et `transform` au survol. Les couleurs devront être cohérentes, idéalement avec des variables CSS. La typographie sera soignée avec des polices et tailles appropriées pour les étiquettes. Pour l'accessibilité, n'oubliez pas d'ajouter des éléments `<title>` pour les infobulles.

Vous devrez vérifier que exactement 10 valeurs sont fournies dans la requête. Vous devez vérifier
que les étiquettes sont présentes. La gestion des erreurs devra être appropriée, avec des messages d'erreur clairs en cas de données invalides.

La page web doit transmettre du XML. Elle doit recevoir du JSON de la part du serveur. Jackson devra être utilisé de manière appropriée pour le XML et Gson pour le JSON.

Vous devrez remettre le code source Java complet avec des commentaires explicatifs, incluant la génération du SVG et du document Excel Open XML. La page HTML avec le formulaire et le JavaScript devra également être fournie. Une documentation expliquant l'architecture et les technologies utilisées sera nécessaire. Des exemples de données d'entrée et de résultats de sortie (SVG et Excel) devront être inclus. Enfin, des tests montrant le fonctionnement avec différentes valeurs devront être présentés.

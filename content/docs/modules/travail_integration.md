---
title: "Travail d'intégration"
weight: 155
---

# Travail d'intégration

Ce travail d'intégration vous permet de démontrer l'acquisition des compétences développées tout au long du cours. Vous devez créer une application web complète qui intègre plusieurs technologies : HTML5, JavaScript, AJAX, Java, JSON, XML, SVG, et les styles CSS.

## Objectif

Créer un serveur web Java qui sert une page HTML5 permettant à l'utilisateur d'entrer une liste de 10 entiers. Ce serveur reçoit ces données via AJAX, génère un graphique à barres SVG avec des styles appropriés, puis retourne le graphique intégré dans une page HTML.

## Technologies à utiliser

Pour réaliser ce projet, vous utiliserez plusieurs technologies. Le serveur sera développé en Java avec HttpServer. Pour le traitement des données XML, vous emploierez Jackson, tandis que Gson sera utilisé pour manipuler les données JSON. L'interface utilisateur sera créée en HTML5 valide, avec des graphiques vectoriels SVG stylisés en CSS. La communication asynchrone se fera via AJAX, et les styles CSS3 seront appliqués tant à l'interface qu'aux éléments SVG.

## Cahier des charges

### Interface utilisateur (HTML5)

La page doit contenir un formulaire avec 10 champs numériques de type `number`. Un bouton permettra de générer le graphique. Une zone d'affichage sera réservée pour montrer le résultat SVG. L'ensemble sera mis en forme de manière responsive avec CSS.

### Serveur Java

Le serveur doit servir la page HTML statique sur la route racine `/`. Il recevra les données JSON sur l'endpoint `/api/graph` via une requête POST. Le serveur validera que exactement 10 entiers sont fournis, générera un SVG avec un graphique à barres, puis retournera une page HTML contenant ce SVG.

### Graphique SVG

Le SVG doit afficher 10 barres verticales représentant les valeurs saisies par l'utilisateur. Il utilisera des dégradés et des animations CSS pour améliorer l'expérience visuelle. Les axes seront étiquetés de manière claire. Le graphique sera responsive et inclura des tooltips au survol des barres.

## Structure proposée

### 1. Page HTML (index.html)

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Générateur de graphiques</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .input-group {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
        }
        .input-group input {
            width: 80px;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #45a049;
        }
        #result {
            margin-top: 30px;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 20px;
            min-height: 400px;
        }
        .loading {
            text-align: center;
            color: #666;
        }
    </style>
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

            // Afficher le chargement
            document.getElementById('result').innerHTML = '<div class="loading">Génération du graphique...</div>';

            try {
                // Envoyer les données au serveur
                const response = await fetch('/api/graph', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ values: values })
                });

                if (response.ok) {
                    const html = await response.text();
                    document.getElementById('result').innerHTML = html;
                } else {
                    document.getElementById('result').innerHTML = '<div style="color: red;">Erreur lors de la génération du graphique</div>';
                }
            } catch (error) {
                document.getElementById('result').innerHTML = '<div style="color: red;">Erreur de connexion</div>';
            }
        });
    </script>
</body>
</html>
```

### 2. Serveur Java (GraphServer.java)

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

        // Servir la page HTML
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
                    // Lire les données JSON
                    InputStreamReader reader = new InputStreamReader(exchange.getRequestBody(), "UTF-8");
                    StringBuilder jsonBuilder = new StringBuilder();
                    char[] buffer = new char[1024];
                    int length;
                    while ((length = reader.read(buffer)) != -1) {
                        jsonBuilder.append(buffer, 0, length);
                    }
                    String jsonInput = jsonBuilder.toString();

                    // Parser avec Gson
                    JsonObject requestData = gson.fromJson(jsonInput, JsonObject.class);
                    JsonArray valuesArray = requestData.getAsJsonArray("values");

                    if (valuesArray.size() != 10) {
                        exchange.sendResponseHeaders(400, -1);
                        return;
                    }

                    // Convertir en liste d'entiers
                    int[] values = new int[10];
                    for (int i = 0; i < 10; i++) {
                        values[i] = valuesArray.get(i).getAsInt();
                    }

                    // Générer le SVG
                    String svgContent = generateSVG(values);

                    // Créer la réponse HTML
                    String htmlResponse = generateHTMLResponse(svgContent);

                    exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
                    exchange.sendResponseHeaders(200, htmlResponse.getBytes("UTF-8").length);
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(htmlResponse.getBytes("UTF-8"));
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

    private static String generateSVG(int[] values) {
        StringBuilder svg = new StringBuilder();
        svg.append("<svg width='600' height='400' viewBox='0 0 600 400' xmlns='http://www.w3.org/2000/svg'>");
        
        // Définitions pour les styles
        svg.append("<defs>");
        svg.append("<linearGradient id='barGradient' x1='0%' y1='0%' x2='0%' y2='100%'>");
        svg.append("<stop offset='0%' style='stop-color:#4CAF50;stop-opacity:1' />");
        svg.append("<stop offset='100%' style='stop-color:#45a049;stop-opacity:1' />");
        svg.append("</linearGradient>");
        svg.append("<style>");
        svg.append(".bar { fill: url(#barGradient); stroke: #2E7D32; stroke-width: 1; transition: all 0.3s ease; }");
        svg.append(".bar:hover { fill: #66BB6A; transform: scaleY(1.1); }");
        svg.append(".axis { stroke: #333; stroke-width: 2; }");
        svg.append(".label { font-family: Arial, sans-serif; font-size: 12px; text-anchor: middle; fill: #666; }");
        svg.append(".value-label { font-family: Arial, sans-serif; font-size: 10px; text-anchor: middle; fill: #333; }");
        svg.append("</style>");
        svg.append("</defs>");

        // Axes
        svg.append("<line x1='50' y1='350' x2='550' y2='350' class='axis' />");
        svg.append("<line x1='50' y1='50' x2='50' y2='350' class='axis' />");

        // Étiquettes des axes
        svg.append("<text x='300' y='380' class='label'>Indices</text>");
        svg.append("<text x='15' y='200' class='label' transform='rotate(-90 15 200)'>Valeurs</text>");

        // Barres
        int barWidth = 40;
        int spacing = 10;
        int startX = 70;
        
        for (int i = 0; i < values.length; i++) {
            int x = startX + i * (barWidth + spacing);
            int height = (int)(values[i] * 3.0); // Échelle pour la hauteur
            int y = 350 - height;
            
            svg.append(String.format("<rect x='%d' y='%d' width='%d' height='%d' class='bar' data-value='%d'>",
                                   x, y, barWidth, height, values[i]));
            svg.append(String.format("<title>Valeur %d: %d</title>", i + 1, values[i]));
            svg.append("</rect>");
            
            // Étiquette de valeur
            svg.append(String.format("<text x='%d' y='%d' class='value-label'>%d</text>",
                                   x + barWidth/2, y - 5, values[i]));
            
            // Étiquette d'index
            svg.append(String.format("<text x='%d' y='370' class='label'>%d</text>",
                                   x + barWidth/2, i + 1));
        }

        svg.append("</svg>");
        return svg.toString();
    }

    private static String generateHTMLResponse(String svgContent) {
        return String.format("""
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <title>Résultat du graphique</title>
                <style>
                    body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
                    svg { border: 1px solid #ddd; border-radius: 4px; }
                </style>
            </head>
            <body>
                <h2>Graphique généré</h2>
                %s
                <p><a href="/">Générer un nouveau graphique</a></p>
            </body>
            </html>
            """, svgContent);
    }
}
```

Le SVG doit utiliser des styles CSS appropriés. Pour les barres, vous emploierez un dégradé linéaire `linearGradient`. Les animations utiliseront les propriétés `transition` et `transform` au survol. Les couleurs devront être cohérentes, idéalement avec des variables CSS. La typographie sera soignée avec des polices et tailles appropriées pour les étiquettes. Pour l'accessibilité, n'oubliez pas d'ajouter des éléments `<title>` pour les tooltips.

Vous devrez vérifier que exactement 10 valeurs sont fournies dans la requête. Toutes les valeurs doivent être validées comme des entiers positifs. La gestion des erreurs devra être appropriée, avec des messages d'erreur clairs en cas de données invalides.

L'architecture devra séparer clairement la logique serveur de la génération SVG. Jackson devra être utilisé de manière appropriée pour le XML et Gson pour le JSON. La gestion des en-têtes CORS sera également importante pour permettre les requêtes cross-origin.

Vous devrez remettre le code source Java complet avec des commentaires explicatifs. La page HTML avec le formulaire et le JavaScript devra également être fournie. Une documentation expliquant l'architecture et les technologies utilisées sera nécessaire. Des exemples de données d'entrée et de résultats de sortie devront être inclus. Enfin, des tests montrant le fonctionnement avec différentes valeurs devront être présentés.

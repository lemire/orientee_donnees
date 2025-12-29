---
title: "Travail noté"
weight: 1000
---

# Travail noté


## Question 1 : Service web REST avec JSON

Dans ce premier travail, vous créerez un service web REST simple en Java qui fournit des données JSON. Vous développerez un serveur qui expose plusieurs endpoints REST pour gérer des ressources.

Voici la structure Java de base que vous devez utiliser :

```java
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.*;

public class ServeurREST {
    private static List<Map<String, Object>> ressources = new ArrayList<>();
    private static int nextId = 2; // Prochain ID disponible

    static {
        // Initialiser avec quelques données de test
        Map<String, Object> item1 = new HashMap<>();
        item1.put("id", 1);
        item1.put("nom", "Exemple 1");
        item1.put("valeur", 42);
        ressources.add(item1);
    }

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        // Endpoint GET /api/ressources - Liste toutes les ressources
        server.createContext("/api/ressources", exchange -> {
            if ("GET".equals(exchange.getRequestMethod())) {
                try {
                    // C'est à vous d'implémenter la logique pour retourner la liste en JSON
                    String jsonResponse = "[]"; // Placeholder
                    byte[] response = jsonResponse.getBytes("UTF-8");

                    exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
                    exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
                    exchange.sendResponseHeaders(200, response.length);
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(response);
                    }
                } catch (Exception e) {
                    exchange.sendResponseHeaders(500, -1);
                }
            } else if ("POST".equals(exchange.getRequestMethod())) {
                // C'est à vous d'implémenter la logique pour ajouter une ressource
                exchange.sendResponseHeaders(201, -1);
            } else if ("OPTIONS".equals(exchange.getRequestMethod())) {
                // Gérer les requêtes CORS preflight
                exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
                exchange.sendResponseHeaders(200, -1);
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        });

        // Endpoint GET /api/ressources/{id} - Ressource spécifique
        server.createContext("/api/ressources/", exchange -> {
            String path = exchange.getRequestURI().getPath();
            String idStr = path.substring(path.lastIndexOf('/') + 1);

            if ("GET".equals(exchange.getRequestMethod())) {
                try {
                    // C'est à vous d'implémenter la logique pour retourner une ressource spécifique
                    exchange.sendResponseHeaders(404, -1); // Placeholder
                } catch (Exception e) {
                    exchange.sendResponseHeaders(500, -1);
                }
            } else if ("PUT".equals(exchange.getRequestMethod())) {
                try {
                    // C'est à vous d'implémenter la logique pour modifier une ressource
                    exchange.sendResponseHeaders(200, -1); // Placeholder
                } catch (Exception e) {
                    exchange.sendResponseHeaders(500, -1);
                }
            } else if ("DELETE".equals(exchange.getRequestMethod())) {
                try {
                    // C'est à vous d'implémenter la logique pour supprimer une ressource
                    exchange.sendResponseHeaders(204, -1); // Placeholder
                } catch (Exception e) {
                    exchange.sendResponseHeaders(500, -1);
                }
            } else if ("OPTIONS".equals(exchange.getRequestMethod())) {
                // Gérer les requêtes CORS preflight
                exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
                exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type");
                exchange.sendResponseHeaders(200, -1);
            } else {
                exchange.sendResponseHeaders(405, -1);
            }
        });

        server.setExecutor(null);
        server.start();
        System.out.println("Serveur REST démarré sur http://localhost:8080/");
    }
}
```


**Consignes pour l'implémentation :**

Vous devez compléter la logique métier dans chaque endpoint en utilisant Gson pour la manipulation JSON :

1. **GET /api/ressources** : Retourner la liste complète des ressources en JSON
2. **GET /api/ressources/{id}** : Retourner une ressource spécifique (404 si inexistante)
3. **POST /api/ressources** : Ajouter une nouvelle ressource avec validation des données
4. **PUT /api/ressources/{id}** : Modifier une ressource existante (404 si inexistante)
5. **DELETE /api/ressources/{id}** : Supprimer une ressource (404 si inexistante)

Vous devez utiliser la bibliothèque  Gson pour la manipulation JSON.

**Ressources** :
- Guide REST API : https://restfulapi.net/
- Java HttpServer : https://docs.oracle.com/javase/8/docs/jre/api/net/httpserver/spec/com/sun/net/httpserver/HttpServer.html

**Livrables** : Code Java complet du serveur REST, et documentation des endpoints.

## Question 2 : Correction d'un fichier YAML

Voici un fichier YAML défaillant que vous devez corriger :

```yaml
invalid_yaml: true

person:
  name: Alice
    age: 30

jobs:
	- developer
  - manager

color: red
color: blue

bad_mapping: {key: value, another: value

description: Ceci est une description: avec des deux-points non protégés

numbers:
  - 1
  - 2
  - 3
```

Expliquez les erreurs.
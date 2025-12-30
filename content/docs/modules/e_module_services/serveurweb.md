---
title: "Serveur Web Java"
weight: 35
---

# Serveur Web Java



Le protocole HTTP (HyperText Transfer Protocol) est un protocole de communication standard utilisé pour transférer des données sur le web. Il définit comment les clients, tels que les navigateurs web, peuvent demander des ressources aux serveurs et comment ces derniers répondent. HTTP repose sur un modèle requête-réponse, où le client envoie une requête et le serveur renvoie une réponse.

Une requête HTTP est une demande initiée par le client pour accéder à une ressource spécifique sur le serveur. Elle comprend généralement une méthode (GET, PUT, etc.), une URL pointant vers la ressource, des en-têtes contenant des informations supplémentaires (comme le type de contenu accepté), et parfois un corps pour les données envoyées. Le serveur traite la requête et renvoie une réponse avec un code de statut (par exemple, 200 pour succès, 404 pour non trouvé) et le contenu demandé.

Parmi les méthodes HTTP les plus courantes, GET est utilisée pour récupérer des données d’un serveur sans modifier l’état de la ressource : les paramètres sont appendus à l’URL sous forme de chaîne de requête, ce qui les rend visibles, limités en taille et propices à la mise en cache, mais moins sécurisés pour des informations sensibles ; elle est idempotente, c’est-à-dire que plusieurs appels identiques produisent le même résultat sans effet secondaire. À l’opposé, POST sert à envoyer des données au serveur pour créer ou mettre à jour une ressource, en plaçant les paramètres dans le corps de la requête, ce qui les rend invisibles dans l’URL, permet de transmettre des volumes plus importants (y compris des fichiers) et offre une meilleure confidentialité, bien que la sécurité réelle repose sur l’utilisation de HTTPS ; contrairement à GET, POST n’est pas idempotente et n’est généralement pas mise en cache. En pratique, on privilégie GET pour des opérations de lecture simples comme des recherches ou des filtres, et POST pour des soumissions de formulaires ou des envois de données confidentielles.

Il arrive que l'on souhaite lancer rapidement un petit serveur web. Il est
facile d'y arriver avec Java.
Créez un fichier `ExempleServeurFichiersSimple.java`
avec le contenu suivant, compilez et exécutez-le dans un dossier. Si le port 8000 n'est pas utilisé sur votre ordinateur
vous aurez un serveur web fonctionnant sur votre machine. (Dans le cas contraire, remplacez le port 8000 par 8001 ou 8002.) Vous pouvez déposer des fichiers HTML
dans ce répertoire et les chargez dans votre navigateur.


```java {style=github}
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.SimpleFileServer;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.file.Path;

public class ExempleServeurFichiersSimple {
    public static void main(String[] args) throws IOException {
        int port = 8000;
        Path repertoireCourant = Path.of(".").toAbsolutePath();  // Répertoire courant

        HttpServer serveur = HttpServer.create(new InetSocketAddress(port), 0);
        serveur.createContext("/", SimpleFileServer.createFileHandler(repertoireCourant));
        serveur.start();

        System.out.println("Serveur démarré sur le port " + port + ", servant les fichiers depuis " 
            + repertoireCourant.toAbsolutePath());
        System.out.println("Accédez-y via http://localhost:" + port + "/");
    }
}
```

Essayez de déposer ce dossier un fichier nommé `test.html` avec le contenu suivant.

```html
<html>
    <body>
        <p>Allo!</p>
    </body>
</html>
```

Vous devriez pouvoir charger ce fichier dans votre navigateur.

## Gestion des chemins avec createContext

La méthode `createContext` de la classe `HttpServer` permet de définir des gestionnaires pour des chemins spécifiques sur le serveur HTTP. Cela offre une flexibilité pour gérer différentes routes et répondre de manière appropriée selon l'URL demandée par le client.
Pour créer un contexte, vous utilisez `serveur.createContext(path, handler)`, où :
- `path` est la chaîne de caractères représentant le chemin (par exemple, "/hello")
- `handler` est une implémentation de l'interface `HttpHandler` qui définit comment traiter les requêtes pour ce chemin

### Qu'est-ce qu'un HttpHandler ?

`HttpHandler` est une interface fonctionnelle définie dans le package `com.sun.net.httpserver`. Elle ne contient qu'une seule méthode abstraite : `void handle(HttpExchange exchange) throws IOException`. Cette méthode est appelée chaque fois qu'une requête HTTP correspond au chemin associé au contexte.

L'objet `HttpExchange` passé en paramètre représente l'échange complet entre le client et le serveur. Il encapsule :
- La requête entrante (méthode HTTP, URI, en-têtes, corps)
- La réponse sortante (code de statut, en-têtes, corps)

#### Méthodes importantes de HttpExchange

- `getRequestMethod()` : Retourne la méthode HTTP (GET, POST, etc.)
- `getRequestURI()` : Retourne l'URI de la requête
- `getRequestHeaders()` : Retourne les en-têtes de la requête sous forme de map
- `getRequestBody()` : Retourne un InputStream pour lire le corps de la requête
- `sendResponseHeaders(int statusCode, long responseLength)` : Envoie les en-têtes de réponse avec le code de statut
- `getResponseBody()` : Retourne un OutputStream pour écrire le corps de la réponse
- `getResponseHeaders()` : Retourne les en-têtes de réponse pour les modifier

#### Exemple d'utilisation

Dans l'exemple ci-dessous, le gestionnaire vérifie la méthode de la requête et répond différemment selon qu'il s'agit d'un GET ou d'un POST :

Voici un exemple simple où nous créons un contexte pour le chemin "/hello" qui renvoie une réponse texte :

```java
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class ExempleServeurContext {
    public static void main(String[] args) throws IOException {
        int port = 8000;
        HttpServer serveur = HttpServer.create(new InetSocketAddress(port), 0);

        // Contexte pour la racine - sert les fichiers statiques
        serveur.createContext("/", SimpleFileServer.createFileHandler(Path.of(".").toAbsolutePath()));

        // Contexte personnalisé pour /hello
        serveur.createContext("/hello", new HttpHandler() {
            @Override
            public void handle(HttpExchange exchange) throws IOException {
                String method = exchange.getRequestMethod();
                String response;
                
                if ("GET".equals(method)) {
                    response = "Hello, World! (via GET)";
                } else if ("POST".equals(method)) {
                    response = "Hello, World! (via POST)";
                } else {
                    response = "Méthode non supportée: " + method;
                    exchange.sendResponseHeaders(405, response.length()); // Method Not Allowed
                    OutputStream os = exchange.getResponseBody();
                    os.write(response.getBytes());
                    os.close();
                    return;
                }
                
                exchange.sendResponseHeaders(200, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        });

        serveur.start();
        System.out.println("Serveur démarré sur le port " + port);
    }
}
```

### Gestion des méthodes HTTP GET et PUT

Dans un serveur web, il est essentiel de gérer différentes méthodes HTTP pour implémenter des API RESTful. Les méthodes GET et PUT sont couramment utilisées :

- **GET** : Récupère des données depuis le serveur sans les modifier. Idempotente et mise en cache possible.
- **PUT** : Met à jour une ressource existante ou en crée une nouvelle à l'emplacement spécifié. Idempotente.

#### Exemple d'implémentation

Voici un exemple de gestionnaire qui traite les requêtes GET et PUT pour un chemin "/api/data" :

```java
serveur.createContext("/api/data", new HttpHandler() {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();
        String response;
        
        switch (method) {
            case "GET":
                // Simuler la récupération de données
                response = "{\"message\": \"Données récupérées\", \"data\": \"valeur\"}";
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, response.length());
                break;
                
            case "PUT":
                // Lire le corps de la requête pour les données à mettre à jour
                InputStream is = exchange.getRequestBody();
                String requestBody = new String(is.readAllBytes(), StandardCharsets.UTF_8);
                is.close();
                
                // Traiter les données (ici, simplement les afficher)
                System.out.println("Données reçues : " + requestBody);
                
                response = "{\"message\": \"Données mises à jour\", \"received\": " + requestBody + "}";
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, response.length());
                break;
                
            default:
                response = "{\"error\": \"Méthode non supportée\"}";
                exchange.sendResponseHeaders(405, response.length());
                break;
        }
        
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes(StandardCharsets.UTF_8));
        os.close();
    }
});
```

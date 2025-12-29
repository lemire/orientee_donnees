---
title: "Travail noté"
weight: 5000
---

# Travail noté

## Question 1 : Transformations XSLT pour la génération de rapports


Pour ce travail, vous utiliserez le document XML suivant contenant des données d'étudiants :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<universite>
  <etudiant id="E001">
    <nom>Dupont</nom>
    <prenom>Marie</prenom>
    <programme>Informatique</programme>
    <notes>
      <note cours="INF6450" valeur="85" />
      <note cours="INF6400" valeur="92" />
      <note cours="INF6500" valeur="78" />
    </notes>
  </etudiant>
  <etudiant id="E002">
    <nom>Tremblay</nom>
    <prenom>Jean</prenom>
    <programme>Mathématiques</programme>
    <notes>
      <note cours="MAT6450" valeur="88" />
      <note cours="MAT6400" valeur="76" />
      <note cours="MAT6500" valeur="91" />
    </notes>
  </etudiant>
  <etudiant id="E003">
    <nom>Gagnon</nom>
    <prenom>Sophie</prenom>
    <programme>Informatique</programme>
    <notes>
      <note cours="INF6450" valeur="79" />
      <note cours="INF6400" valeur="88" />
      <note cours="INF6500" valeur="94" />
    </notes>
  </etudiant>
  <etudiant id="E004">
    <nom>Roy</nom>
    <prenom>Michel</prenom>
    <programme>Physique</programme>
    <notes>
      <note cours="PHY6450" valeur="82" />
      <note cours="PHY6400" valeur="89" />
      <note cours="PHY6500" valeur="85" />
    </notes>
  </etudiant>
</universite>
```

Créer une feuille XSLT qui transforme le XML en format JSON, avec une structure contenant la liste des étudiants et leurs informations, y compris un calcul de la moyenne pour chaque étudiant.

Vous devrez tester vos transformations avec un processeur XSLT (comme Saxon ou xsltproc) et fournir les résultats de sortie pour validation.

**Ressources** : Consultez la documentation officielle de XSLT : https://www.w3.org/TR/xslt-30/

**Livrables** : Feuilles XSLT (.xslt), fichier XML d'exemple, résultats des transformations, et un README en Markdown expliquant les transformations et comment les exécuter.

## Question 2 : Requêtes XPath pour l'extraction de données

Utilisez le même document XML des étudiants que dans la Question 1 pour pratiquer les expressions XPath.

**Tâches à effectuer :**

1. **Écrivez des expressions XPath** pour extraire les informations suivantes :
   - Tous les noms d'étudiants en Informatique
   - Les notes supérieures à 85 pour tous les cours
   - L'étudiant avec la meilleure moyenne générale
   - Les cours distincts offerts dans l'université

2. **Expressions XPath avancées** :
   - Utilisez des prédicats complexes pour filtrer les données
   - Combinez plusieurs conditions avec les opérateurs `and` et `or`
   - Utilisez les fonctions XPath (count, sum, avg, etc.)
   - Naviguez dans la hiérarchie XML avec des chemins absolus et relatifs

3. **Validation des résultats** :
   - Testez vos expressions XPath avec un outil en ligne ou un processeur XML
   - Fournissez les résultats attendus pour chaque expression
   - Expliquez le fonctionnement de chaque expression XPath

**Ressources** :
- Spécification XPath : https://www.w3.org/TR/xpath-31/
- Tutoriel XPath : https://www.w3schools.com/xml/xpath_intro.asp

**Livrables** : Liste des expressions XPath, résultats des requêtes, et explication du fonctionnement.

## Question 3 : Requêtes XQuery pour l'analyse de données

Utilisez le document XML des étudiants pour créer des requêtes XQuery qui effectuent des analyses complexes.

**Tâches à effectuer :**

1. **Requêtes XQuery de base** :
   - Lister tous les étudiants avec leurs moyennes calculées
   - Grouper les étudiants par programme d'études
   - Trier les étudiants par moyenne décroissante

2. **Analyses statistiques** :
   - Calculer la moyenne générale par programme
   - Identifier les cours avec les meilleures et pires performances
   - Générer un rapport des statistiques par matière

3. **Transformations XQuery** :
   - Créer du HTML à partir des données XML
   - Générer du JSON structuré avec les analyses
   - Construire des rapports XML complexes

4. **Requêtes avancées** :
   - Utiliser FLWOR expressions pour des analyses complexes
   - Implémenter des jointures et des agrégations
   - Gérer les données manquantes et les erreurs

**Exemple de requête XQuery attendue :**

```xquery
for $etudiant in //etudiant
let $moyenne := avg($etudiant/notes/note/@valeur)
order by $moyenne descending
return
<resultat>
  <nom>{concat($etudiant/prenom, ' ', $etudiant/nom)}</nom>
  <programme>{$etudiant/programme}</programme>
  <moyenne>{$moyenne}</moyenne>
</resultat>
```

**Ressources** :
- Spécification XQuery : https://www.w3.org/TR/xquery-31/
- Tutoriel XQuery : https://www.w3schools.com/xml/xquery_intro.asp

**Livrables** : Requêtes XQuery (.xq), résultats des analyses, et documentation des fonctionnalités utilisées.
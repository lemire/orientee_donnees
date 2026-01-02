---
title: "Office Open XML"
weight: 100
---

# Open XML

Open XML est un format de fichier ouvert pour les documents bureautiques, développé par Microsoft et standardisé par l'ECMA et l'ISO. Il permet de créer des documents Word, Excel et PowerPoint qui sont compatibles avec les applications Microsoft Office.

## Organisation des documents Open XML

Les documents Open XML sont structurés comme des archives ZIP compressées contenant des fichiers XML et des ressources. Cette structure permet une manipulation programmatique aisée des documents.

### Structure générale

- **[Content_Types].xml** : Définit les types MIME des parties du document.
- **_rels/** : Dossier des relations entre les parties du document.
- **docProps/** : Propriétés du document (métadonnées comme auteur, titre, date de création).

### Documents Word (.docx)

Les fichiers .docx ont la structure suivante :

- **word/**
  - **document.xml** : Contenu principal du document (texte, paragraphes, etc.).
  - **styles.xml** : Définitions des styles utilisés dans le document.
  - **settings.xml** : Paramètres du document (marges, orientation, etc.).
  - **_rels/** : Relations spécifiques à la partie word.
  - **media/** : Images et autres médias intégrés (optionnel).

### Documents Excel (.xlsx)

Les fichiers .xlsx sont organisés ainsi :

- **xl/**
  - **workbook.xml** : Structure générale du classeur (feuilles, propriétés).
  - **worksheets/** : Dossier contenant les feuilles de calcul individuelles (sheet1.xml, sheet2.xml, etc.).
  - **styles.xml** : Styles pour les cellules, polices, etc.
  - **sharedStrings.xml** : Chaînes de caractères partagées pour optimiser l'espace.
  - **_rels/** : Relations spécifiques à la partie xl.
  - **media/** : Images et graphiques (optionnel).

Cette organisation modulaire facilite la lecture et l'écriture des documents par des bibliothèques comme Apache POI ou Docx4j.

## Apache POI


Apache POI est une bibliothèque Java open-source qui permet de lire et d'écrire des fichiers Microsoft Office, tels que les documents Word (.docx), les feuilles de calcul Excel (.xlsx) et les présentations PowerPoint (.pptx). Elle est particulièrement utile pour manipuler des fichiers Office de manière programmatique.

## Création d'un document Microsoft Word (docx)

Voici un exemple de code Java utilisant la bibliothèque Docx4j pour créer un document Word avec un titre, un paragraphe formaté et une liste :

```java
// Code from Docx4jGenerator.java
public static void main(String[] args) {
    String filename = "mon_document_docx.docx";
    try {
        // 1. Créer le package Word
        WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.createPackage();
        MainDocumentPart documentPart = wordMLPackage.getMainDocumentPart();
        // 2. Ajouter un titre de niveau 1
        documentPart.getContent().add(createHeading(
            "Mon document .docx généré élégamment avec Docx4j", 
             "Heading1"
        ));
        // 3. Ajouter un paragraphe formaté
        documentPart.getContent().add(createStyledParagraph());
        // 4. Ajouter une liste numérotée simple
        documentPart.getContent().add(createNumberedItem("Premier élément", 1));
        documentPart.getContent().add(createNumberedItem("Deuxième élément", 1));
        // 5. Sauvegarder le fichier
        wordMLPackage.save(new File(filename));
        System.out.println("✅ Document Docx4j créé avec succès : " + filename);
    } catch (Docx4JException e) {
        System.err.println("❌ Erreur lors de la création du document Docx4j : " + e.getMessage());
        e.printStackTrace();
    }
}
```

[Nous vous invitons maintenant à faire notre activité de création de documents Word](https://github.com/lemire/javaword).

## Création d'un document Microsoft Excel (xlsx)

Voici un exemple de code Java utilisant la bibliothèque Apache POI pour créer un classeur Excel avec un titre et des données :

```java
// Code from ExcelGenerator.java
public static void main(String[] args) {
    String nomFichier = "mon_classeur_excel.xlsx";
    try {
        // 1. Créer le classeur Excel
        Workbook classeur = new XSSFWorkbook();
        Sheet feuille = classeur.createSheet("Feuille1");
        // 2. Ajouter un titre
        Row ligneTitre = feuille.createRow(0);
        Cell celluleTitre = ligneTitre.createCell(0);
        celluleTitre.setCellValue("Mon classeur Excel généré avec Apache POI");
        // Style pour le titre
        CellStyle styleTitre = classeur.createCellStyle();
        Font policeTitre = classeur.createFont();
        policeTitre.setBold(true);
        policeTitre.setFontHeightInPoints((short) 14);
        styleTitre.setFont(policeTitre);
        celluleTitre.setCellStyle(styleTitre);
        // 3. Ajouter des données d'exemple
        String[][] donnees = {
            {"Nom", "Âge", "Ville"},
            {"Alice", "25", "Paris"},
            {"Bob", "30", "Lyon"},
            {"Charlie", "35", "Marseille"}
        };
        for (int i = 0; i < donnees.length; i++) {
            Row ligne = feuille.createRow(i + 1);
            for (int j = 0; j < donnees[i].length; j++) {
                Cell cellule = ligne.createCell(j);
                cellule.setCellValue(donnees[i][j]);
            }
        }
        // 4. Sauvegarder le fichier
        try (FileOutputStream fos = new FileOutputStream(nomFichier)) {
            classeur.write(fos);
        }
        System.out.println("✅ Classeur Excel créé avec succès : " + nomFichier);
    } catch (IOException e) {
        System.err.println("❌ Erreur lors de la création du classeur Excel : " + e.getMessage());
        e.printStackTrace();
    }
}
```

[Nous vous invitons maintenant à faire notre activité de création de documents Excel](https://github.com/lemire/javaexcel).
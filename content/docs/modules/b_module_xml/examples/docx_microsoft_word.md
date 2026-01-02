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

Voici un exemple de `document.xml`.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:sl="http://schemas.openxmlformats.org/schemaLibrary/2006/main" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:cdr="http://schemas.openxmlformats.org/drawingml/2006/chartDrawing" xmlns:c14="http://schemas.microsoft.com/office/drawing/2007/8/2/chart" xmlns:dgm="http://schemas.openxmlformats.org/drawingml/2006/diagram" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture" xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:dsp="http://schemas.microsoft.com/office/drawing/2008/diagram" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:xvml="urn:schemas-microsoft-com:office:excel" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:pvml="urn:schemas-microsoft-com:office:powerpoint" xmlns:cppr="http://schemas.microsoft.com/office/2006/coverPageProps" xmlns:odx="http://opendope.org/xpaths" xmlns:odc="http://opendope.org/conditions" xmlns:odq="http://opendope.org/questions" xmlns:oda="http://opendope.org/answers" xmlns:odi="http://opendope.org/components" xmlns:odgm="http://opendope.org/SmartArt/DataHierarchy" xmlns:b="http://schemas.openxmlformats.org/officeDocument/2006/bibliography" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" xmlns:w16cid="http://schemas.microsoft.com/office/word/2016/wordml/cid" xmlns:wetp="http://schemas.microsoft.com/office/webextensions/taskpanes/2010/11" xmlns:we="http://schemas.microsoft.com/office/webextensions/webextension/2010/11" xmlns:comp="http://schemas.openxmlformats.org/drawingml/2006/compatibility" xmlns:lc="http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas">
    <w:body><!-- Created by docx4j 6.1.2 (Apache licensed) using REFERENCE JAXB in Homebrew Java 25.0.1 on Mac OS X -->
        <w:p>
            <w:pPr>
                <w:pStyle w:val="Heading1"/>
            </w:pPr>
            <w:r>
                <w:t>Mon document .docx généré élégamment avec Docx4j</w:t>
            </w:r>
        </w:p>
        <w:p>
            <w:r>
                <w:t>Ceci est un paragraphe normal. Voici du texte en </w:t>
            </w:r>
            <w:r>
                <w:rPr>
                    <w:b/>
                </w:rPr>
                <w:t>gras</w:t>
            </w:r>
            <w:r>
                <w:t> et en </w:t>
            </w:r>
            <w:r>
                <w:rPr>
                    <w:i/>
                </w:rPr>
                <w:t>italique</w:t>
            </w:r>
            <w:r>
                <w:t> avec Docx4j.</w:t>
            </w:r>
        </w:p>
        <w:p>
            <w:pPr>
                <w:numPr>
                    <w:ilvl w:val="0"/>
                    <w:numId w:val="1"/>
                </w:numPr>
            </w:pPr>
            <w:r>
                <w:t>Premier élément</w:t>
            </w:r>
        </w:p>
        <w:p>
            <w:pPr>
                <w:numPr>
                    <w:ilvl w:val="0"/>
                    <w:numId w:val="1"/>
                </w:numPr>
            </w:pPr>
            <w:r>
                <w:t>Deuxième élément</w:t>
            </w:r>
        </w:p>
        <w:sectPr>
            <w:pgSz w:w="11907" w:h="16839" w:code="9"/>
            <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/>
        </w:sectPr>
    </w:body>
</w:document>
```

Cet exemple de `document.xml` illustre la structure interne d'un document Word simple généré avec Docx4j. Le document contient un titre de niveau 1 ("Mon document .docx généré élégamment avec Docx4j"), suivi d'un paragraphe avec du texte normal, en gras ("gras") et en italique ("italique"). Il se termine par une liste numérotée avec deux éléments ("Premier élément" et "Deuxième élément"). Le fichier utilise les espaces de noms XML standard d'Open XML pour définir les propriétés de paragraphe, les styles de texte et la mise en page, démontrant comment les éléments visuels de Word sont représentés en XML structuré.

### Documents Excel (.xlsx)

Les fichiers .xlsx sont organisés ainsi :

- **xl/**
  - **workbook.xml** : Structure générale du classeur (feuilles, propriétés).
  - **worksheets/** : Dossier contenant les feuilles de calcul individuelles (sheet1.xml, sheet2.xml, etc.).
  - **styles.xml** : Styles pour les cellules, polices, etc.
  - **sharedStrings.xml** : Chaînes de caractères partagées pour optimiser l'espace.
  - **_rels/** : Relations spécifiques à la partie xl.
  - **media/** : Images et graphiques (optionnel).

Voici un exemple de fichier `workbook.xml`.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
   <dimension ref="A1:C5" />
   <sheetViews>
      <sheetView workbookViewId="0" tabSelected="true" />
   </sheetViews>
   <sheetFormatPr defaultRowHeight="15.0" />
   <cols>
      <col min="1" max="1" width="46.40625" customWidth="true" bestFit="true" />
      <col min="2" max="2" width="3.859375" customWidth="true" bestFit="true" />
      <col min="3" max="3" width="7.72265625" customWidth="true" bestFit="true" />
   </cols>
   <sheetData>
      <row r="1">
         <c r="A1" t="s" s="1">
            <v>0</v>
         </c>
      </row>
      <row r="2">
         <c r="A2" t="s" s="0">
            <v>1</v>
         </c>
         <c r="B2" t="s" s="0">
            <v>2</v>
         </c>
         <c r="C2" t="s" s="0">
            <v>3</v>
         </c>
      </row>
      <row r="3">
         <c r="A3" t="s" s="0">
            <v>4</v>
         </c>
         <c r="B3" t="s" s="0">
            <v>5</v>
         </c>
         <c r="C3" t="s" s="0">
            <v>6</v>
         </c>
      </row>
      <row r="4">
         <c r="A4" t="s" s="0">
            <v>7</v>
         </c>
         <c r="B4" t="s" s="0">
            <v>8</v>
         </c>
         <c r="C4" t="s" s="0">
            <v>9</v>
         </c>
      </row>
      <row r="5">
         <c r="A5" t="s" s="0">
            <v>10</v>
         </c>
         <c r="B5" t="s" s="0">
            <v>11</v>
         </c>
         <c r="C5" t="s" s="0">
            <v>12</v>
         </c>
      </row>
   </sheetData>
   <pageMargins bottom="0.75" footer="0.3" header="0.3" left="0.7" right="0.7" top="0.75" />
</worksheet>
```

Cet exemple de `workbook.xml` montre une feuille de calcul Excel simple avec des données organisées en lignes et colonnes. La feuille s'étend de A1 à C5, avec des largeurs de colonnes personnalisées. Les données sont stockées dans `sheetData` avec 5 lignes : la première ligne contient une seule cellule (A1), tandis que les lignes 2 à 5 contiennent chacune 3 cellules (colonnes A, B, C). Les valeurs des cellules sont des références aux chaînes partagées (attribut `t="s"`), optimisant l'espace en évitant la répétition de texte identique. Les indices correspondent aux entrées dans le fichier `sharedStrings.xml` du document Excel.

Voici le document `sharedStrings.xml` correspondant.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="13" uniqueCount="13">
   <si>
      <t>Mon classeur Excel généré avec Apache POI</t>
   </si>
   <si>
      <t>Nom</t>
   </si>
   <si>
      <t>Âge</t>
   </si>
   <si>
      <t>Ville</t>
   </si>
   <si>
      <t>Alice</t>
   </si>
   <si>
      <t>25</t>
   </si>
   <si>
      <t>Paris</t>
   </si>
   <si>
      <t>Bob</t>
   </si>
   <si>
      <t>30</t>
   </si>
   <si>
      <t>Lyon</t>
   </si>
   <si>
      <t>Charlie</t>
   </si>
   <si>
      <t>35</t>
   </si>
   <si>
      <t>Marseille</t>
   </si>
</sst>
```

Ce fichier `sharedStrings.xml` contient toutes les chaînes de caractères uniques utilisées dans le classeur Excel, permettant d'optimiser l'espace de stockage. Il compte 13 chaînes (count="13", uniqueCount="13"), chacune encapsulée dans un élément `<si>` (Shared Item). Les chaînes incluent le titre du classeur ("Mon classeur Excel généré avec Apache POI"), les en-têtes de colonnes ("Nom", "Âge", "Ville") et les données des cellules (noms, âges, villes). Dans `workbook.xml`, les cellules font référence à ces chaînes par leur indice (0 pour la première, 1 pour la deuxième, etc.), évitant ainsi la répétition du texte dans chaque cellule et réduisant la taille du fichier.

## Docx4j

Docx4j est une bibliothèque Java open-source qui permet de créer, lire et modifier des documents Microsoft Word (.docx) au format Open XML. Contrairement à Apache POI qui utilise une approche basée sur des API spécifiques, Docx4j repose sur JAXB (Java Architecture for XML Binding) pour mapper directement les structures XML d'Open XML vers des objets Java. Cela offre une flexibilité accrue pour manipuler tous les aspects des documents Word, y compris les styles complexes, les tableaux, les images et les propriétés avancées.

Docx4j est particulièrement adapté pour :
- Générer des documents Word complexes avec mise en forme riche
- Convertir des documents existants
- Intégrer du contenu dynamique dans des templates Word
- Traiter des documents avec des formules MathML ou des graphiques


Pour utiliser Docx4j dans un projet Maven, ajoutez la dépendance suivante dans votre `pom.xml` :

```xml
<dependency>
    <groupId>org.docx4j</groupId>
    <artifactId>docx4j</artifactId>
    <version>6.1.2</version>
</dependency>
```


### Création d'un document Word

La bibliothèque utilise les mêmes principes que les autres librairies Open XML : elle traite les fichiers .docx comme des archives ZIP contenant des fichiers XML structurés.## Création d'un document Microsoft Word (docx)

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



## Apache POI


Apache POI est une bibliothèque Java open-source qui permet de lire et d'écrire des fichiers Microsoft Office, tels que les documents Word (.docx), les feuilles de calcul Excel (.xlsx) et les présentations PowerPoint (.pptx). Elle est particulièrement utile pour manipuler des fichiers Office de manière programmatique.
Pour utiliser Apache POI dans un projet Maven, ajoutez les dépendances suivantes dans votre `pom.xml` :

```xml
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>5.2.5</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.2.5</version>
</dependency>
```

La dépendance `poi` fournit les classes de base, tandis que `poi-ooxml` ajoute le support pour les formats Open XML.

### Création d'un document Microsoft Excel (xlsx)

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
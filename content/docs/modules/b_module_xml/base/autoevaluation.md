---
title: "Autoévaluation XML"
weight: 100
---

# Autoévaluation XML

<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 30px; border-left: 5px solid #2196f3;">
    <p>Le bouton <strong>Vérifier mes réponses</strong> vous indique immédiatement si vos choix sont corrects et vous donne une courte explication.</p>
    <p>Commentaires en <span style="color:#155724;">vert</span> = bonne réponse<br>
    Commentaires contenant du <span style="color:#721c24;">rouge</span> = erreur, lisez l’explication.</p>
    <p>Vous pouvez recommencer à tout moment avec le bouton <strong>Recommencer le quiz</strong>.</p>
</div>
<form id="quizForm">
<!-- Question 2 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 2 – Quelles sont les balises du document suivant ?</h2>
    <pre style="background: #f4f4f4; padding: 12px; border-radius: 5px; overflow-x: auto; font-size: 0.95em; margin: 10px 0;">&lt;pageweb&gt;
&lt;lien&gt;http://www.google.com [Lien externe…]&lt;/lien&gt;
&lt;description&gt;Un moteur de recherche&lt;/description&gt;
&lt;/pageweb&gt;</pre>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q2" value="wrong1" style="margin-right: 10px;"> http://www.google.com[…], Un moteur de recherche.</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q2" value="correct" style="margin-right: 10px;"> &lt;pageweb&gt;, &lt;lien&gt;, &lt;/lien&gt;, &lt;description&gt;, &lt;/description&gt;, &lt;/pageweb&gt;</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q2" value="wrong3" style="margin-right: 10px;"> &lt;lien&gt;http://www.google.com[…] &lt;/lien&gt;, &lt;description&gt;…&lt;/description&gt;</label>
    <div class="feedback" id="fb2" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 6 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 6 – Hiérarchie (casse exacte) du document</h2>
    <pre style="background: #f4f4f4; padding: 12px; border-radius: 5px; overflow-x: auto; font-size: 0.95em; margin: 10px 0;">&lt;classe&gt;&lt;etudiant&gt;&lt;prenom&gt;Jean&lt;/prenom&gt;&lt;nom&gt;Laroche&lt;/nom&gt;&lt;/etudiant&gt;&lt;etudiant&gt;&lt;prenom&gt;Gaetan&lt;/prenom&gt;&lt;nom&gt;Roche&lt;/nom&gt;&lt;/etudiant&gt;&lt;/classe&gt;</pre>    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q6" value="wrong" style="margin-right: 10px;"> classe → Etudiant → … (majuscule)</label>
<label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q6" value="correct" style="margin-right: 10px;"> classe → etudiant → prenom → Jean … (tout en minuscules sauf les données)</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q6" value="wrong3" style="margin-right: 10px;"> classe → prenom → etudiant → …</label>
    <div class="feedback" id="fb6" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 7 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 7 – Quels sont les noms des attributs ?</h2>
    <pre style="background: #f4f4f4; padding: 12px; border-radius: 5px; overflow-x: auto; font-size: 0.95em; margin: 10px 0;">&lt;pageweb categorie="recherche"&gt;
&lt;description type="court texte"&gt;…&lt;/description&gt;
&lt;/pageweb&gt;</pre>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q7" value="correct" style="margin-right: 10px;"> categorie, type</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q7" value="wrong" style="margin-right: 10px;"> "recherche", "court texte"</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q7" value="wrong3" style="margin-right: 10px;"> pageweb, lien, description</label>
    <div class="feedback" id="fb7" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 8 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 8 – Quelles sont les balises (ouvertes + fermantes) ?</h2>
    <pre style="background: #f4f4f4; padding: 12px; border-radius: 5px; overflow-x: auto; font-size: 0.95em; margin: 10px 0;">&lt;pageweb categorie="recherche"&gt;
&lt;description type="court texte"&gt;…&lt;/description&gt;
&lt;/pageweb&gt;</pre>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q8" value="wrong" style="margin-right: 10px;"> categorie, type</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q8" value="wrong2" style="margin-right: 10px;"> "recherche", "court texte"</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q8" value="correct" style="margin-right: 10px;"> pageweb, description</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q8" value="wrong4" style="margin-right: 10px;"> &lt;pageweb categorie=…&gt;, &lt;description&gt;, …</label>
    <div class="feedback" id="fb8" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 9 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 9 – Quels sont les noms des éléments ?</h2>
    <pre style="background: #f4f4f4; padding: 12px; border-radius: 5px; overflow-x: auto; font-size: 0.95em; margin: 10px 0;">&lt;pageweb categorie="recherche"&gt;
&lt;description type="court texte"&gt;…&lt;/description&gt;
&lt;/pageweb&gt;</pre>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q9" value="wrong" style="margin-right: 10px;"> categorie, type</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q9" value="wrong2" style="margin-right: 10px;"> "recherche", "court texte"</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q9" value="correct" style="margin-right: 10px;"> pageweb, description</label>
    <div class="feedback" id="fb9" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 11 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 11 – Pourquoi a-t-on besoin d’entités en XML ?</h2>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q11" value="correct" style="margin-right: 10px;"> Parce qu’on ne pourrait pas utiliser le symbole &lt; dans le contenu textuel (il marque le début d’une balise).</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q11" value="wrong" style="margin-right: 10px;"> Parce qu’on ne pourrait pas utiliser uniquement le symbole &gt;.</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q11" value="wrong3" style="margin-right: 10px;"> Parce que les cinq caractères &lt;, &gt;, ', ", &amp; sont tous strictement interdits.</label>
    <div class="feedback" id="fb11" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 16 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 16 – Quelle est la forme correcte de la déclaration XML ?</h2>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q16" value="wrong" style="margin-right: 10px;"> &lt;xml version="1.0" /&gt;</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q16" value="wrong2" style="margin-right: 10px;"> &lt;?xml version="1.0" /&gt;</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q16" value="correct" style="margin-right: 10px;"> &lt;?xml version="1.0"?&gt;</label>
    <div class="feedback" id="fb16" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 17 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 17 – Ce document est-il bien formé ?</h2>
    <pre style="background: #f4f4f4; padding: 12px; border-radius: 5px; overflow-x: auto; font-size: 0.95em; margin: 10px 0;">&lt;?xml version="1.0"?&gt;
&lt;ami age=19 &gt;
&lt;/ami&gt;</pre>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q17" value="wrong" style="margin-right: 10px;"> Vrai</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q17" value="correct" style="margin-right: 10px;"> Faux</label>
    <div class="feedback" id="fb17" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 18 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 18 – Un élément ne peut-il pas être vide en XML ?</h2>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q18" value="wrong" style="margin-right: 10px;"> Vrai</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q18" value="correct" style="margin-right: 10px;"> Faux</label>
    <div class="feedback" id="fb18" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 19 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 19 – Lequel de ces noms n’est PAS permis pour un élément ?</h2>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q19" value="wrong" style="margin-right: 10px;"> x1</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q19" value="correct" style="margin-right: 10px;"> 1x</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q19" value="wrong3" style="margin-right: 10px;"> Nx</label>
    <div class="feedback" id="fb19" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 20 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 20 – Lequel de ces noms EST permis pour un élément ?</h2>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q20" value="correct" style="margin-right: 10px;"> xmlcourse</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q20" value="wrong" style="margin-right: 10px;"> 7eleven</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q20" value="wrong3" style="margin-right: 10px;"> Joe Louis</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q20" value="wrong4" style="margin-right: 10px;"> Aucune de ces réponses</label>
    <div class="feedback" id="fb20" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 21 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 21 – Le XML préserve-t-il les espaces (blancs) entre les éléments ?</h2>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q21" value="correct" style="margin-right: 10px;"> Vrai</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q21" value="wrong" style="margin-right: 10px;"> Faux</label>
    <div class="feedback" id="fb21" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 22 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 22 – Combien de nœuds de texte contient ce document ?</h2>
    <pre style="background: #f4f4f4; padding: 12px; border-radius: 5px; overflow-x: auto; font-size: 0.95em; margin: 10px 0;">&lt;?xml encoding="ISO-8859-1"?&gt;
&lt;?xml version="1.0"?&gt;
&lt;étudiant&gt;
&lt;nom&gt;Daniel Jacques&lt;/nom&gt;
&lt;cours&gt;bibliothéconomie&lt;/cours&gt;
&lt;/étudiant&gt;</pre>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q22" value="wrong" style="margin-right: 10px;"> 2</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q22" value="correct" style="margin-right: 10px;"> 5</label>
    <div class="feedback" id="fb22" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 23 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 23 – Peut-il y avoir des nœuds de texte avant l’élément-racine ?</h2>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q23" value="wrong" style="margin-right: 10px;"> Vrai</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q23" value="correct" style="margin-right: 10px;"> Faux</label>
    <div class="feedback" id="fb23" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 24 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 24 – Peut-il y avoir des nœuds de texte après l’élément-racine ?</h2>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q24" value="wrong" style="margin-right: 10px;"> Vrai</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q24" value="correct" style="margin-right: 10px;"> Faux</label>
    <div class="feedback" id="fb24" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 25 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 25 – Un document avec 12 balises a forcément 6 éléments ?</h2>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q25" value="wrong" style="margin-right: 10px;"> Vrai</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q25" value="correct" style="margin-right: 10px;"> Faux</label>
    <div class="feedback" id="fb25" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<!-- Question 26 -->
<div style="background: white; padding: 20px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2>Question 26 – Un document avec 12 balises peut-il avoir 12 nœuds de texte ?</h2>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q26" value="wrong" style="margin-right: 10px;"> Vrai</label>
    <label style="display: block; margin: 12px 0; cursor: pointer; padding: 8px; border-radius: 4px; transition: background 0.2s;"><input type="radio" name="q26" value="correct" style="margin-right: 10px;"> Faux</label>
    <div class="feedback" id="fb26" style="margin-top: 15px; padding: 12px; border-radius: 5px; font-weight: bold; display: none;"></div>
</div>
<div style="text-align: center; margin: 40px 0;">
    <button type="button" id="checkBtn" style="background: #007bff; color: white; border: none; padding: 12px 24px; margin: 0 15px; border-radius: 5px; cursor: pointer; font-size: 16px;">Vérifier mes réponses</button>
    <button type="button" id="resetBtn" style="background: #6c757d; color: white; border: none; padding: 12px 24px; margin: 0 15px; border-radius: 5px; cursor: pointer; font-size: 16px;">Recommencer le quiz</button>
</div>
<div style="text-align: center; margin: 20px 0; font-size: 18px; font-weight: bold; color: #28a745;" id="scoreDisplay"></div>
</form>
<script>
document.getElementById('checkBtn').addEventListener('click', function() {
    let score = 0;
    const total = 17;
    const answers = {
        q2: "correct",
        q6: "correct",
        q7: "correct",
        q8: "correct",
        q9: "correct",
        q11: "correct",
        q16: "correct",
        q17: "correct",
        q18: "correct",
        q19: "correct",
        q20: "correct",
        q21: "correct",
        q22: "correct",
        q23: "correct",
        q24: "correct",
        q25: "correct",
        q26: "correct"
    };
    const explanations = {
        q2: "Les balises sont les marqueurs &lt;nom&gt; et &lt;/nom&gt;. Le contenu texte n’est pas une balise.",
        q6: "XML est sensible à la casse : les éléments sont écrits en minuscules (etudiant, prenom, nom).",
        q7: "Les noms d’attributs sont « categorie » et « type », pas leurs valeurs.",
        q8: "Les noms d’éléments (donc les balises) sont pageweb et description.",
        q9: "Les noms d’éléments sont pageweb et description. Les attributs n’en font pas partie.",
        q11: "Le caractère &lt; est réservé car il introduit une balise ; il doit être échappé avec &lt; dans le texte.",
        q16: "La déclaration XML correcte est &lt;?xml version=\"1.0\"?&gt; (pas de barre de fermeture /).",
        q17: "Faux : l’attribut age n’a pas de guillemets autour de la valeur → document mal formé.",
        q18: "Faux : un élément peut être vide (&lt;br/&gt; ou &lt;br&gt;&lt;/br&gt;).",
        q19: "Un nom d’élément ne peut pas commencer par un chiffre.",
        q20: "xmlcourse est autorisé (ne commence pas par « xml » en majuscules interdites en début).",
        q21: "Vrai : XML préserve tous les espaces (contrairement à HTML).",
        q22: "Il y a 5 nœuds texte : retours à la ligne et indentations avant/après les éléments + les deux textes réels.",
        q23: "Faux : seul le prologue (déclaration XML, commentaires, PI) peut précéder la racine.",
        q24: "Faux : rien ne peut suivre la fermeture de l’élément-racine.",
        q25: "Faux : certaines balises peuvent être auto-fermantes (&lt;img/&gt; compte comme une seule balise mais un élément).",
        q26: "Faux : entre deux balises il ne peut y avoir qu’un seul nœud texte (même s’il contient plusieurs espaces/lignes)."
    };
    for (let q in answers) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        const fb = document.getElementById('fb' + q.slice(1));
        if (selected && selected.value === answers[q]) {
            fb.style.backgroundColor = "#d4edda";
            fb.style.color = "#155724";
            fb.innerHTML = "Correct ! " + explanations[q];
            score++;
        } else if (selected) {
            fb.style.backgroundColor = "#f8d7da";
            fb.style.color = "#721c24";
            fb.innerHTML = "Incorrect. " + explanations[q];
        } else {
            fb.style.backgroundColor = "#f8d7da";
            fb.style.color = "#721c24";
            fb.innerHTML = "Vous n’avez pas répondu à cette question. " + explanations[q];
        }
        fb.style.display = "block";
    }
    document.getElementById('scoreDisplay').innerHTML = `Score : ${score} / ${total}`;
});
document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('quizForm').reset();
    document.querySelectorAll('.feedback').forEach(f => {
        f.style.display = "none";
        f.innerHTML = "";
        f.style.backgroundColor = "";
        f.style.color = "";
    });
    document.getElementById('scoreDisplay').innerHTML = "";
});
</script>
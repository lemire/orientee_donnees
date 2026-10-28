*Vidéo de Pierre-Yves (Younup).*

Bonjour, moi c'est Pierre-Yves. Aujourd'hui, je vais vous parler de jq. jq, c'est un outil qui permet de manipuler du JSON à l'aide de plusieurs filtres ou opérations, et d'en extraire les infos qui nous intéressent. Vous pouvez le télécharger sur le site officiel, mais vous pouvez aussi l'utiliser directement sur le site jqplay. C'est ce qu'on va faire pour cette démo.

Dans jqplay, on a trois champs : le JSON qu'on lui donne en entrée, le champ *Filter* pour les opérations qu'on va faire dessus, et la sortie. En dessous, il y a un petit pense-bête avec les opérations les plus courantes, mais je vous conseille d'aller voir aussi le manuel sur le site officiel, qui est bien fait et permet de découvrir jq plus en profondeur.

Pour cette démo, on va travailler avec les données des stations Bicloo, le système de vélos en libre-service de Nantes. Ces données sont disponibles en *open data* et on peut les récupérer via une API sur le site de JCDecaux.

Le point (`.`) permet de retourner la même chose en sortie que ce qui est fourni en entrée et, par défaut, jq formate le JSON. Ici, on voit que l'API nous retourne un tableau avec toutes les informations de chaque station. On peut regarder le nombre de stations retournées dans le tableau avec le filtre `length`. Le *pipe* (`|`), c'est ce qui permet d'enchaîner les filtres.

Nous, on n'a pas besoin de toutes ces informations : on veut un tableau avec moins de champs que ça. Donc, pour chaque élément du tableau, on va le transformer en un nouvel objet JSON. Et dans cet objet-là, on va garder son champ `name`, son `number`, qu'on peut renommer en `id` avec la forme complète. On va aussi prendre ses informations de disponibilité de vélos et sa position.

Là, on a déjà un tableau avec moins de champs, mais j'aimerais bien que les objets soient sur un seul niveau, pas imbriqués. Pour ça, on va garder que la capacité d'une station et, pour la position, on va concaténer la latitude et la longitude dans une seule chaîne. Dans une chaîne, on peut effectuer des opérations en mettant une barre oblique inverse avant des parenthèses (`\(…)`). On arrive enfin à un résultat qui nous plaît.

Si, pour une raison ou une autre, on a besoin d'avoir ça sous forme de CSV, c'est possible. On va d'abord séparer les éléments du tableau et les mettre les uns à la suite des autres (`.[]`). Puis, pour chaque élément, on crée un nouveau tableau en gardant les champs qui nous intéressent. Il ne reste plus qu'à passer ça dans le générateur CSV (`@csv`). Et on peut enregistrer ça dans un fichier qu'on pourra ouvrir avec n'importe quel tableur.

Comme petit exercice, vous pouvez essayer de nettoyer le champ `name` pour n'avoir que le nom de la station, sans son numéro. N'hésitez pas à poster vos solutions en commentaire.

La vidéo est bientôt finie. Je vérifie juste qu'il y a un Bicloo à la station d'à côté pour rentrer chez moi… Pour le moment, il en reste 4. Je vous laisse donc avec jq, un nouvel outil dans votre panoplie tech, et je vous dis à la prochaine.

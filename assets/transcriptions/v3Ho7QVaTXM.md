*Vidéo de Melvynx.*

Tout ce qu'il faut savoir sur JavaScript en 5 minutes et en français, c'est parti !

JavaScript est le langage le plus populaire, avec 63 % des développeurs qui l'utilisent, loin devant Python, qui en a 49 %, et Java, qui n'en a que 30. Lorsqu'il a été créé, son utilité principale était de rendre tes pages Web dynamiques. Par exemple, quand tu cliques sur la barre de recherche Google, tu vois cette liste qui s'affiche : ça, c'est du JavaScript. De base, le JavaScript ne servait qu'à rendre les pages Web dynamiques. Par exemple aussi, le *like* sur YouTube : tout ça, c'est du JavaScript.

Il faut savoir que le langage JavaScript est ce qu'on appelle interprété, c'est-à-dire que le code n'est pas transformé en un autre langage, binaire ou autre : il est directement compris comme ceci. C'est le contraire du C++ et du Java, par exemple, qui sont d'abord compilés en langage binaire afin d'être compris par nos machines.

Et justement, pour éviter que le JavaScript ne soit utile que dans les navigateurs, en 2009, ils ont créé Node.js, un outil qui va permettre de faire comprendre le JavaScript directement par ton ordinateur, sans passer par un navigateur Web. Grâce à ça, on peut faire des API, on peut créer des serveurs Web et même interagir avec des bases de données directement en JavaScript.

Maintenant, parlons un peu du langage. On trouvera deux types de données : les primitives, avec les *numbers*, *strings*, *booleans*, `null`, `undefined` et j'en passe, et les types que j'aime bien appeler types référence, avec notamment les objets et les *arrays*.

Pour déclarer ce genre de variable, on pourra utiliser `let` ou `const`. À l'époque, on pouvait utiliser `var`, mais maintenant ce n'est plus recommandé. `let` permet de déclarer des variables pour lesquelles on peut changer la valeur et même le type de données, par exemple passer de *string* à *number*. Contrairement à `let`, `const` nous interdit de modifier une variable qui a été déclarée avec `const`, sous peine d'avoir une erreur dans notre programme.

Il y a aussi les types référence, qui sont un peu spéciaux. On aura par exemple les *arrays*, dans lesquels on peut facilement mettre des *strings*, des *numbers* : encore une fois, les types sont dynamiques. Pour ajouter un élément dans un tableau, on pourra par exemple utiliser `push`, ce qui va ajouter un élément dans notre tableau, juste ici. Pour récupérer un élément, on peut le récupérer directement avec l'index, en faisant attention que l'index 0 représente le premier élément, juste ici.

On aura aussi les objets, qu'on peut déclarer comme ceci. On peut ensuite récupérer les valeurs avec la *dot notation* ou avec les crochets et le nom de la clé, juste ici. Les objets, ce sont des sortes de dictionnaires qui associent une clé à une valeur. À noter qu'on peut modifier les types référence même quand ce sont des constantes, car on ne modifie pas l'objet en lui-même : tu vois qu'ici l'objet reste le même, on modifie juste les propriétés, ou plutôt les valeurs qui sont stockées dans cet objet. C'est pour ça qu'on appelle ça un type référence : la référence de l'objet reste la même, même après avoir modifié des données.

On retrouvera des objets directement intégrés (*built-in*) sur le Web, par exemple le DOM, avec `document`, qui est un objet qui va nous permettre de récupérer des *nodes* et plein d'autres choses. On aura aussi les *nodes*, qui représentent chaque élément du DOM, avec lesquels on pourra modifier les styles ou ajouter des *event listeners*.

La syntaxe du JavaScript reprend à peu près celle du C ou du C++, c'est-à-dire avec des accolades qui viennent définir des blocs dans lesquels on va pouvoir écrire notre code. On aura les `if` pour faire des conditions, les `while` pour faire des boucles et les fonctions pour faire des fonctions.

Justement, en parlant des fonctions : pour les déclarer, on utilise le mot-clé `function` suivi du nom de la fonction, juste ici, et des arguments, qui sont mis entre parenthèses. Ces arguments peuvent ensuite être utilisés dans le corps de la fonction, qui est délimité par les accolades, juste ici. On va pouvoir retourner une valeur, qui va être ensuite utilisée à l'endroit où on déclare la variable, juste ici, c'est-à-dire dans `result`. Pour utiliser la fonction, on va l'appeler en mettant des parenthèses, et à l'intérieur des parenthèses, on peut mettre autant d'arguments qu'on veut.

Il y a aussi les méthodes, qui sont des fonctions directement fournies par JavaScript. On pourra retrouver par exemple la fonction `.reverse()`, qui permet d'inverser l'ordre d'un tableau, comme ceci, ou `toUpperCase()`, qui permet de mettre une *string* en majuscules. Il y a beaucoup d'autres méthodes.

On aura les fonctions asynchrones, qui permettent de lancer des tâches et d'attendre que les tâches soient terminées avant de continuer le code. Par exemple, ici, la fonction `getUser` va venir récupérer des données d'une API. Mais vu qu'on ne sait pas à quel moment notre API va nous retourner les données, avec le mot-clé `await`, on vient attendre que ces données soient récupérées avant de les utiliser, par exemple ici dans notre code, en faisant `const user = await getUser()`.

Tu as sûrement entendu parler de TypeScript, qui permet de transformer le langage JavaScript, qui a des types dynamiques — c'est-à-dire qu'on peut facilement transformer une variable de type *number* en *string* — en un langage qui a des types statiques : une fois que tu déclares une variable `value` de type *string* avec une valeur *string*, tu ne pourras plus jamais la mettre de type *number*, par exemple ici avec 14. Ceci ne sera plus autorisé. À noter que TypeScript n'est que du sucre syntaxique, qui va finalement transformer ton code en JavaScript, parce qu'il n'y a que le JavaScript qui est compris par ton navigateur.

Pour finir, npm est l'outil de gestion de dépendances de JavaScript, avec lequel tu vas pouvoir installer des dépendances externes, comme ceci, qui vont venir se greffer à ton code. L'avantage, c'est que ces dépendances sont testées, *open source* et typées. Et npm vient par défaut dès que tu installes Node.js.

Et c'est terminé pour cette courte introduction à JavaScript. Si tu as envie de devenir meilleur en JavaScript, tu retrouveras dans la description cinq cours gratuits, comme tu peux le voir, avec des quiz, des *playgrounds* et des exercices, tout ceci totalement gratuitement. Pour les récupérer, tu peux aller dans le premier lien de la description.

Merci beaucoup d'avoir regardé cette vidéo. Je t'invite à liker et à t'abonner à cette chaîne YouTube. N'hésite pas à mettre un commentaire pour me donner ton avis : qu'est-ce que tu as pensé de cette vidéo ? Ça change un peu de d'habitude : elle était un peu scriptée, préparée à l'avance, avec beaucoup de coupes, un peu moins *freestyle*. Donne-moi ton avis en commentaire. On se retrouve pour une prochaine vidéo. Ciao ciao !

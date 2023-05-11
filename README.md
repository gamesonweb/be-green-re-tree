# Members:
- Sviridova Ekaterina
- Molinet Benjamin

# Re-Tree 
Découvrez Re-Tree, un jeux de simulation présenté lors de Games on Web 2023! Dans un contexte ou la terre, détruite par les catastrophes écologique, vous incarnez le dernier espoir de l'humanité seul sur une petite île flottante avec ce qu'il reste de la végétation. Plongez à travers les bases du jeu, en découvrant l'interface, le contexte et l'objectif principal. Admirez les graphismes minimalistes et le design low poly tout en explorant les mécanismes de gameplay type jeux de gestion. Créez un compte ou jouez en tant que guest pour améliorer vos arbres et atteindre vos premiers jalons afin de reboiser votre île flottante. Accumulez un maximum de CO2 pour booster vos arbres, attrapez des bulles d'oxygène pour obtenir des bonus instantanés et répondez à des questions à chaque étape pour multiplier vos gains en CO2! Personnalisez l'apparence de votre île en déplaçant les arbres, en les améliorant et en atteignant les jalons pour la rendre plus verte. Avec Re-Tree, adoptez une attitude éco-responsable et amusez-vous en même temps! Ah et... Be Green!

# Important link
- Github Final link: https://github.com/gamesonweb/be-green-re-tree
- Github of the API: https://github.com/Benjimo1997n2/re-tree-api
- Github before creation of final one: https://github.com/Benjimo1997n2/Re-Tree
- Trailer: https://www.youtube.com/watch?v=l_qAVfj-_08
- Game: https://gamesonweb.github.io/be-green-re-tree/
- Gameplay: https://youtu.be/ol6_yWQn-tI
- Speedrun: https://youtu.be/Ox3NxdV6gnk
- Code presentation: TODO
- API: https://re-tree-api.herokuapp.com/
- Competition: https://www.cgi.com/france/fr-fr/event/games-on-web-2023
- Benjamin Molinet: http://benjamin-molinet.fr/resume.html
- Ekaterina Sviridova: https://univ-cotedazur.fr/annuaire/ekaterina-sviridova

# Gameplay Utilisateur
## Video
- Gameplay: https://youtu.be/ol6_yWQn-tI
- Speedrun: https://youtu.be/Ox3NxdV6gnk
- Trailer: https://youtu.be/l_qAVfj-_08
- Re-Tree: https://gamesonweb.github.io/be-green-re-tree/
- Scoreboard: https://gamesonweb.github.io/be-green-re-tree/scoreboard.html
- Visite d'un joueur (le mode visiteur ne permets pas de sauvegarder): https://gamesonweb.github.io/be-green-re-tree/index.html?visit=Ekaterina

## Features implémentées
Dans l'objectif de reboiser votre île, rescape du cataclysme écologique, vous pouvez:
- Collecter du CO2 par secondes, permettant d'améliorer vos arbres et de collecter encore plus de CO2
- Collecter du CO2 instantané en cliquant sur les capsules de CO2, apparaissant toutes les X secondes
- Améliorer vos arbres du niveau 1 à 28, cela change le design de l'arbre (28 designs uniques: https://www.turbosquid.com/fr/3d-models/3d-assets-nature-1498361) et augmente le CO2 par seconde
- Atteignez des jalons en améliorant un arbre niveau 5, 9, 12, 17, 21.
- Gagner du CO2 instantanément à chaque jalon grâce à une question bonus sur l'écologie, plus la réponse est écologique plus haut sera le multiplicateur (appliqué sur le CO2 par seconde, instantané)
- Chaque jalon ajoute des détails visuels verdoyants à votre île (herbe, texture, ciel, musique)
- Jouez en tant que guest (sauvegarde les données dans le cache)
- Créez un utilisateur et rejoignez le scoreboard (https://gamesonweb.github.io/be-green-re-tree/scoreboard.html)
- Connectez vous depuis n'importe quel appareil avec votre pseudo seulement (parfait pour jouer sur mobile)
- Visitez les iles les plus Green! (https://gamesonweb.github.io/be-green-re-tree/scoreboard.html)
- Personnalisez votre île en déplaçant les arbres (sauvegardé dans le cache et en ligne si vous etes connecté)
- Visionnez le gameplay en ligne (https://youtu.be/ol6_yWQn-tI)
- Visionnez le trailer en ligne (https://youtu.be/l_qAVfj-_08)
- Écoutez et modifier le volume de la musique d'ambiance
- Recommencez tout à zéro avec "Reset Score"!

## Features à venir
- Implémentation d'un shop permettant d'ajouter des items (bâtiments, décorations et végétation) supplémentaire
- Items avec modificateurs sur le CO2 par secondes et spawn rate des capsules de CO2
- Refonte visuelle de la GUI utilisateur
- Ajout de son d'ambiance supplémentaire (autre que musique et bulles de CO2)
- Adaptation VR
- Dialogues améliorés

# Code higlights et documentation
Nous avons décidé d'adopter l'anglais comme langue de développement unique pour le code, les commentaires, les dialogues, l'interface utilisateur, etc., en raison de la composition internationale de notre équipe. Cette décision nous permet d'assurer une communication claire et cohérente tout au long du processus de développement. En outre, nous avons intégré activement une multitude de technologies contemporaines dans notre flux de travail. Cet engagement nous permet non seulement de gagner du temps en optimisant nos processus, mais aussi d'ajouter de la valeur significative au jeu en tirant parti des dernières innovations et tendances de l'industrie du jeu.

## Technologies and ressources involved
- HTML, CSS, JS: Game, Scoreboard
- Babylon js and all the associated packages: Game
- ChatGPT: Code, Trailer Scenario
- Midjourney: Trailer Illustrations
- Google TTS: Trailer Voice
- Pixabay: Trailer Pictures
- Kaiber: Trailer Gif
- MuBERT: Trailer and Game Music
- Freepick: Favicon and mute logo
- Turbosquid: Meshs 3D (Tree, Items)
- Freesound: Bubble and other songs
- Github: Code, Game and Versioning Hosting
- Heroku: API Hosting
- Google Realtime Database: User Database

## Points Clés
### Développement
Nous avons opté pour une approche de développement minimaliste en utilisant uniquement *HTML, CSS et JavaScript* natif pour le jeu. Toutes les ressources nécessaires sont chargées via des CDN ou des API, également développées en interne.

### Architecture
En adoptant l'architecture Modèle-Vue-Contrôleur (MVC), nous avons favorisé une structure qui rend les composants facilement modifiables et réutilisables. Bien que la refonte complète du code ne soit pas encore achevée, une grande partie de celui-ci est modulaire et respecte les meilleures pratiques du MVC de manière rigoureuse.

### Performances
Le jeu offre des performances très correctes, tant en termes de taux de rafraîchissement que d'expérience utilisateur. L'utilisation exclusive de modèles 3D 'low poly' pour nos designs assure une fluidité de jeu sur PC et téléphone, tout en facilitant une adaptation éventuelle à la réalité virtuelle.

### Trame, Dialogue et Game Design
Tout le scénario a été minutieusement élaboré et rédigé manuellement, tandis que les textes finaux et le modèle des arbres (coût, CO2/sec) ont été générés par *ChatGPT4*. Tous les messages et questions ont également été créés manuellement, assurant un soin particulier à chaque détail du jeu.

### Bande-Annonce
La bande-annonce a été réalisée entièrement à l'aide de **l'intelligence artificielle**. La trame a été créée par ChatGPT, tandis que les illustrations proviennent de Midjourney, Pixabay et Kaiber. La voix off a été générée par Google Text to Speech et la musique de fond est la même que celle du thème, créée par MuBERT. Seuls le montage vidéo et la mise en ligne ont été effectués manuellement, garantissant ainsi une bande-annonce de qualité.

### Gestion des Données
Toutes les données du jeu (arbres, positions, niveaux, CO2/sec, CO2, etc.) sont stockées dans un fichier JSON bien structuré, un exemple duquel est disponible dans le code de l'API. Dans le souci de rendre l'accès au jeu le plus simple possible, nous avons permis de jouer en tant qu'invité tout en sauvegardant les données. Le fichier JSON est simplement stocké en local storage et automatiquement récupéré lors de la prochaine connexion en utilisant le token du navigateur :  ```const token = ${userAgent}_${language}_${platform}_${screenWidth}x${screenHeight}```.

L'utilisateur a également la possibilité de créer un compte en ligne. Dans ce cas, nous récupérons ce même fichier JSON et l'envoyons à notre API qui le sauvegarde sur la base de données en temps réel de Google. Initialement, le fichier était sauvegardé en dur dans un fichier JSON dans l'API, mais en raison des contraintes d'hébergement de Heroku, les données étaient écrasées. Nous avons donc décidé d'utiliser Google Realtime Database.

Nous avons conçu l'interface utilisateur pour ne pas déranger le joueur connecté avec le menu, mais pour lui rappeler simplement le dernier jalon atteint dès la connexion.

## Détails de code
### Commentaires
Le code est largement commenté, exclusivement en anglais, pour s'adapter à la diversité linguistique de notre équipe. En raison de notre architecture, chaque entité est contenue dans un dossier distinct, comprenant généralement un modèle, une vue et un contrôleur. Nous nous sommes efforcés de respecter strictement l'architecture MVC, en évitant autant que possible de relier directement la vue au contrôleur. Cependant, en raison de contraintes de temps et de notre niveau de compétence en génie logiciel, certains fragments de code peuvent ne pas respecter strictement cette architecture. De plus, certaines fonctions générées par ChatGPT4 peuvent entraîner une rupture de style et d'architecture.

### Assets
Le dossier 'assets' contient tout ce qui est nécessaire pour faire fonctionner le jeu: le moteur physique, les textes, les musiques, les textures, les maillages des arbres, les ressources pour la page web et même les éléments (pas encore implémentés).

### JS
Ce dossier comprend tout le code (à l'exception du 'main', qui se trouve à la racine). Le dossier 'ant' (non utilisé actuellement) contient le code pour faire apparaître et bouger une fourmi, initialement créée pour ramasser le CO2. Le dossier 'Audio' gère la musique, le dossier 'Co2' gère les petites bulles de CO2 qui apparaissent régulièrement, et le dossier 'config' contient les questions et les URL accessibles partout. Le dossier 'game' est crucial car il contient la vue de toute l'interface utilisateur et le contrôleur de la majorité du jeu, une partie étant déléguée au dossier 'menu', qui gère uniquement le menu de connexion. 'Map' contient tout ce qui concerne l'île flottante, le ciel, l'océan, etc. 'Milestone' gère les jalons et vérifie s'ils ont déjà été atteints (pour rendre les jalons uniques). Enfin, 'Tree' gère tout ce qui concerne les arbres et leurs vues et 'User' gère les données de l'utilisateur.

### Root
Si l'on revient à la racine, 'index' lance le jeu, 'scoreboard' affiche le classement des joueurs et 'main.js' relie tout. La favicon.ico provient de flaticon (https://www.flaticon.com/) et le sytle.css est utilisé pour le scoreboard. README, INSTRUCTION et TODO .md servent pour le rendu du concours.

### API
Ce dossier contient le code de notre API Flask, déployée sur Heroku : https://re-tree-api.herokuapp.com/. Nous avons mis en place 5 points d'accès (endpoints) ainsi que le point d'accès racine "/", chaque point d'accès interagit avec la base de données Google Realtime (https://re-tree-api-default-rtdb.europe-west1.firebasedatabase.app/).

L'endpoint **/create_user** crée une nouvelle entrée utilisateur avec les données actuelles de l'utilisateur (stockées localement) et renvoie le code 201.

L'endpoint **/save_data** enregistre les données, les actualise et renvoie le code 200.

L'endpoint **/visit_user/string:username** renvoie les données de l'utilisateur demandé, renvoie le code 200 et le JSON de l'utilisateur. C'est particulièrement utile pour visiter les îles d'autres joueurs.

Enfin, l'endpoint **/all_users** renvoie le code 200 et un JSON contenant tous les utilisateurs, qui est utilisé pour le tableau des scores.

### Ambiance Musicale
Nous avons exploré deux méthodes pour créer une ambiance sonore immersive. Nous avons utilisé **window.AudioContext** pour la musique d'ambiance, générée en 2022 par MuBERT sur la base du prompt : "*Chill Music style Minecraft, loop*". Par ailleurs, nous avons utilisé **BABYLON.Sound** pour les effets sonores des bulles, dont les échantillons proviennent de Freesound.

### Île
Nous avons opté pour une île flottante dans le ciel pour rester fidèles au thème du jeu. Pour sa création, nous avons mis en œuvre plusieurs sols utilisant des 'height maps', WaterMaterial, des Textures, ainsi que de l'herbe animée inspirée de https://playground.babylonjs.com/#NZDFUB#1. Nous avons également adopté une skybox pour une esthétique supérieure. Afin de rendre le gameplay le plus agréable possible, nous avons limité les mouvements de la caméra pour éviter toute intrusion ou sortie non désirée du cadre de jeu.

## Auto evaluation
Le projet Re-Tree à nécessité quelques centaines d'heures de développement, beaucoup de café, quelques prompts et des Dolipranes:
- [x] Documentation (0, 5, *10*)
- [x] Video / Gameplay (0, 5, *10*)
- [x] Accessible online (10, *20*)
- [x] Design and graphics (5, 10, *20*)
- [x] Story, originality, thematic respected (0, 5, *10*)
- [x] Performances (0, 10, 20, *30*)
- [x] Fun (5, *10, 20, 25*)
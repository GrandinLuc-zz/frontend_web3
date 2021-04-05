# frontend_web3

## Résumé du projet

Ce projet a pour but de créer une interface web pour interagir avec des smart contracts de la blockchain Ethereum. Notez bien que ce projet a été mis en place à des fins éducatives et si vous souhaitez interagir avec, il est recommandé d'utiliser le réseau de test Rinkeby plutôt que le mainnet.
Vous pouvez accéder au projet avec le lien suivant (sur lequel le site sera hébergé pendant une courte periode):
https://sad-snyder-7c854a.netlify.app/

## Technologies

Pour ce projet, nous avons utilisés différentes bibliothèques javascripts:
- React.js pour la mise en page et le routing
- Web3.js pour avoir accès à l'extension Metamask de l'utilisateur et pour pouvoir gérer les interactions avec la blockchain Ethereum
- Cors afin de gérer les requêtes inter-serveurs

## Pages

La navigation entre les différentes pages est assurée par les différents boutons disponibles sur chacune des pages.
Naviguez aisément dans l'ensemble du site à travers ces outils.

Sur la page d'accueil "User address" n'affichera de résultat qu'une fois que vous avez connecté Metamask au site.

Sur la page "Song for a city" vous pourrez lancer une requête pour obtenir un jeton correspondant à un album ainsi que l'image sur sa pochette. En dessous sera affiché le nombre de jetons possédés par l'utilisateur ainsi que leurs numéro d'identification.

Sur la page "Tout doucement" le principe est très similaire à la page précédente, vous pourrez y acheter un autre token.

Sur la page "Transfer tokens" vous pourrez envoyer vos tokens obtenus sur les deux pages précédentes à des adresses Ethereum.

Sur la page "Token holders" vous pourrez voir affichés les adresses de toutes les personnes possédants l'un ou l'autre des jetons achetés ou dont on a fait la requête.

## Erreur CORS

Afin de palier cette erreur de connexion au domaine veuillez accepter l'invitation disponible sur ce lien : https://cors-anywhere.herokuapp.com/.
Une fois que vous avez accepté cette requête dans votre navigateur, les erreurs n'apparaîtront plus.

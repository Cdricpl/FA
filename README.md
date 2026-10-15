# Gestion des dossiers

Programme Windows de suivi des dossiers d'enfants : notifications de prise en charge,
rapports semestriels et annuels, droits de visite et notes de rencontres.
Tout reste sur votre ordinateur : aucune connexion internet, aucun compte.

---

## Installation

1. Ouvrez la page **[Releases](../../releases)** du dépôt.
2. Téléchargez **`Gestion-des-dossiers-1.19.0-installateur.exe`**.
3. Double-cliquez et suivez l'assistant.

L'installation se fait **pour votre compte utilisateur : aucun droit administrateur
n'est nécessaire**. Un raccourci est créé sur le bureau et dans le menu Démarrer.

> **Windows a protégé votre ordinateur** — cet avertissement apparaît au premier
> lancement parce que le programme n'est pas signé par un certificat d'éditeur payant.
> Cliquez sur **Informations complémentaires**, puis **Exécuter quand même**.
> Il ne réapparaît plus ensuite.

Une version **portable** est aussi disponible : elle ne s'installe pas et se lance
directement, y compris depuis une clé USB.

---

## Les écrans

L'ensemble reprend **les couleurs du logo du Service Familles d'Accueil** : le prune du
mot « Service » pour les boutons, les liens, la sélection et les titres ; un fond crème et
une barre latérale abricot très pâle, tirés du toit et du soleil ; le gris de « Familles
d'Accueil » pour les textes secondaires.

Le **rouge**, l'**orange** et le **vert** sont réservés à l'état des dossiers — en
retard, bientôt, en ordre — et n'apparaissent que là : une couleur qui attire l'œil veut
toujours dire qu'il y a quelque chose à faire. La couleur accompagne toujours un mot
(« À réclamer », « en retard ») : elle ne porte jamais l'information toute seule.

Pas de décor : ni icônes dans les titres, ni pastilles d'initiales, ni bandes de couleur,
ni phrases d'explication sous chaque bloc. La police est celle de Windows. Le programme
suit aussi le **thème sombre** de Windows.

Chaque écran suit le même ordre : le **titre**, puis **la barre de ce qui agit sur
l'écran** (filtres, recherche, boutons), puis le contenu. Un filtre se trouve toujours
juste au-dessus de ce qu'il filtre.

### Accueil
**Tout tient sur un écran, sans avoir à faire défiler.** Le titre est **la date du jour**.
En dessous, une barre de quatre chiffres — rapports à préparer, tâches à faire,
notifications à réclamer, rencontres à venir ; un chiffre en rouge signale un retard,
un clic mène à l'écran concerné. Puis trois panneaux : les **tâches du jour**, les
**rapports à rendre** — avec leur retard éventuel et la case à cocher quand c'est envoyé —
et les **rencontres à venir**. Chaque panneau s'arrête à quatre lignes.

**La to do vit ici.** Repliée, elle ne montre que le jour même : ce qui est en retard,
pour aujourd'hui ou pour demain. Le lien **Voir toutes mes tâches** — ou le chiffre
*tâches à faire* — la déplie en pleine largeur : les quatre groupes *En retard* /
*Aujourd'hui* / *À venir* / *Sans date*, chaque tâche avec **Modifier** et une croix
pour la supprimer, et de quoi **afficher les tâches faites** puis les supprimer d'un
bloc. Une tâche peut être rattachée à un enfant. *Ne montrer que le jour même* revient
à l'aperçu.

### Enfants
**Un seul écran pour un dossier** : la fiche, la notification de prise en charge et les
dates de rapport.

Au-dessus du tableau, un **sélecteur** range les dossiers selon l'état de la
notification, avec leur nombre : **Tous**, **À réclamer** (pas reçue, ou échéance
dépassée), **À renouveler** (dans moins de 30 jours), **En ordre**, **Sans date**.
À côté : la recherche, le tri (par urgence ou par nom), *Imprimer* et
**Nouvel enfant**.

Puis **une ligne par enfant** :

* **Enfant** — **NOM Prénom** et l'âge ;
* **Autorité** — SAJ ou SPJ ;
* **Notification de prise en charge** — l'état en couleur sur une ligne, le détail sur
  la suivante (« échéance dépassée depuis 85 jours », les relances déjà notées). Quand le
  détail est trop long, la phrase entière s'affiche en passant la souris dessus ;
* **Semestriel** et **Annuel** — calculés tout seuls : le rapport annuel tombe à la date
  de notification, le semestriel six mois plus tôt. Une date en orange approche, une date
  en rouge est dépassée. Quand les deux ne coïncident pas, remplissez *date du rapport
  annuel* dans la fiche : les échéances suivent alors cette date ;
* **les gestes**, au bout de la ligne. Un seul bouton plein, celui qu'on cherche neuf
  fois sur dix : **Reçue**, qui encode la nouvelle échéance, proposée un an plus tard.
  Le **⋯** à côté ouvre le reste — *Relance notée* (inscrit la date du jour),
  *+ Tâche de relance* (crée la tâche dans la to do de l'accueil), *Modifier la fiche*
  et *Supprimer*. Sur un dossier en ordre, le menu propose *Pas arrivée*, pour signaler
  que le papier n'est finalement pas venu. Le menu se referme avec **Échap** ou d'un clic
  ailleurs, et un seul reste ouvert à la fois.

Toutes les lignes ont **la même hauteur**, quel que soit l'état du dossier. Un bandeau
signale les fiches encore incomplètes.

### Rapports

**L'année civile, de janvier à décembre**, pour voir d'un coup d'œil ce qui est déjà
envoyé dans l'année et ce qui reste à faire. Les flèches **‹ 2025** et **2027 ›** changent
d'année ; un clic sur l'année affichée revient à l'année en cours.

Une ligne de bilan résume l'année : *44 rapports en 2026 : 21 envoyés · 2 en retard ·
13 à venir*.

En dessous, deux tableaux côte à côte, **janvier–juin** et **juillet–décembre**, mois
par mois, le mois en cours en prune. Pour chaque rapport : la case à cocher, la date, l'enfant,
*annuel* ou *semestriel*, et son état :

| État | Ce que ça veut dire |
|---|---|
| **envoyé le 12/03** (vert) | la case est cochée, avec la date d'envoi |
| **en retard** (rouge) | échéance passée, pas encore cochée |
| **dans 12 jours** (orange) | échéance dans moins de 45 jours |
| ligne en gris | échéance d'avant le début du suivi dans le programme : elle n'est pas réclamée, mais vous pouvez la cocher pour garder trace de l'envoi |

Le rapport **annuel** tombe à la date de notification (la formalisation), le
**semestriel** six mois plus tôt.

**Cochez la case quand le rapport est envoyé** : la ligne affiche aussitôt « envoyé le … »,
et l'échéance suivante se place un an plus tard. Un rapport envoyé reste à sa place dans
l'année, même si la notification a été renouvelée à une autre date depuis.

Le programme ne réclame pas les rapports d'avant votre suivi : ni ceux de plus de 60 jours
au moment où vous commencez, ni ceux qui précèdent le premier rapport coché. Cocher un
rapport ne fait donc jamais réapparaître d'anciennes échéances en retard.

Les retards d'une **autre année** que celle affichée (un rapport de décembre dernier,
par exemple) sont rassemblés dans un panneau au-dessus du calendrier, pour ne pas les
perdre de vue.

### Droits de visite

En haut, deux vues au choix : **Par enfant** et **Schéma de récurrence**. À droite,
*Exporter les notes* (le document Word), *Imprimer* et **Nouveau droit de visite**.

#### Par enfant

Sous le choix de vue, un **sélecteur** range chaque dossier selon la seule question qui
compte — jusqu'à quand l'agenda est-il couvert :

| | |
|---|---|
| **Sans DV futur** | plus rien n'est programmé, il faut rappeler la famille |
| **Échéance proche** | le dernier DV programmé tombe dans moins d'un mois |
| **À jour** | programmé à plus d'un mois |
| **À compléter** | des rencontres passées attendent leur compte rendu |

Les trois premiers regardent l'agenda, le quatrième le travail en retard : un dossier
peut être **à jour et à compléter** en même temps. **Tous** revient à la liste complète.

En dessous, **la liste des enfants à gauche, le dossier de celui que vous avez choisi à
droite.** La liste **reste à l'écran quand vous faites défiler** le dossier : on ne la
perd plus de vue en descendant dans les rencontres.

**À gauche** — tous les dossiers d'un coup : l'enfant et sa fréquence, et la date
**jusqu'à laquelle son agenda est couvert** (*Programmé jusqu'au*), avec le nombre de
jours restants. « **Aucun DV futur** » en rouge signale ceux qui demandent un appel ;
« **2 à compléter** » en orange, les comptes rendus qui attendent.

**À droite** — le dossier de l'enfant. En tête, son nom, l'autorité et l'âge, et les
boutons **Nouvelle rencontre** et **Plusieurs dates** ; le **⋯** propose *Modifier la
fiche* et *Ajouter un droit de visite*. Juste en dessous, un bandeau qui répond sans
chercher : **avec qui, fréquence, dernier DV réalisé, prochain DV, programmé jusqu'au**.
Puis **Droits de visite** : l'intervenant, la fréquence, les créneaux du mois, et un
**⋯** pour le modifier ou le supprimer.

Enfin **Rencontres**, une **ligne du temps** : de la plus lointaine à venir à la plus
ancienne, coupée par un repère **« Aujourd'hui »**. Au-dessus du repère, ce qui est
programmé, avec le nombre de jours restants ; en dessous, ce qui est passé. Si rien
n'est programmé après aujourd'hui, le repère le dit en rouge.

Pour une rencontre passée : **Présent / Absent en un clic**, et la **note de synthèse
qui s'écrit directement dans le tableau** — cliquez sur la note (ou atteignez-la à la
tabulation), écrivez, quittez la case, c'est enregistré ; Échap annule la saisie. Une
note longue n'est montrée que sur **trois lignes**, pour que le tableau reste lisible :
le texte entier apparaît dès qu'on clique dessus, et s'imprime en entier. Une rencontre
à venir affiche simplement « prévue ». Le **⋯** de chaque ligne la modifie ou la
supprime.

Filtres *Toutes / À venir / À compléter / Honorées / Manquées*. Tout ce qui est à venir
reste affiché ; du passé, les dix dernières rencontres, le reste sur demande.

#### Schéma de récurrence

Les quatre semaines du mois côte à côte, tous enfants confondus : l'horaire, l'enfant,
et l'intervenant avec un point de couleur — Papa en bleu, Maman en rose, Fratrie en
violet. Une cinquième colonne, **Hors semaine**, rassemble les droits de visite dont les
créneaux ne sont pas encodés. **Un clic sur un nom ouvre son dossier.**

**Programmer plusieurs dates d'un coup** : le bouton *+ Plusieurs dates* ouvre un tableau de
dates. Un remplissage rapide propose une série — toutes les semaines, toutes les deux
semaines ou tous les mois — que vous corrigez ligne par ligne avant d'enregistrer. Les
horaires sont repris du schéma de récurrence. Une série mensuelle garde son jour : partie
du 31 janvier, elle donne 28 février, 31 mars, 30 avril, 31 mai.

**Tout se tape au clavier.** Dans les formulaires, **Tab passe au champ suivant** — un seul
appui, même depuis une date ou une heure. **Maj+Tab** revient en arrière. **Entrée** avance
elle aussi de champ en champ au lieu d'enregistrer au milieu de la saisie ; dans le bloc
*Remplissage rapide*, elle remplit le tableau. L'enregistrement se fait avec le bouton.

**Une année tapée sur deux chiffres est complétée** : « 15 10 26 » devient le 15/10/2026
dès qu'on quitte le champ. Une année manifestement fausse (« 202 ») est signalée sur le
champ au moment d'enregistrer, au lieu d'être enregistrée.

**Rencontres sans encadrement** : cochez la case sur le droit de visite quand les rencontres
se déroulent sans votre présence. Il n'y a alors rien à programmer : la fiche de l'enfant
reste au vert et il ne figure plus dans la liste des familles à recontacter.

Le champ **Rencontre avec** propose Papa, Maman, Les deux parents, Grands-parents et
Fratrie en un clic, mais accepte aussi n'importe quel texte. Aucun champ n'est obligatoire :
vous pouvez enregistrer un droit de visite incomplet et le préciser plus tard.

**Regrouper une fratrie** : quand deux enfants sont placés dans la même famille d'accueil,
cochez-les dans « Regrouper avec un autre enfant » sur le droit de visite. La rencontre ne
s'encode alors qu'une fois et apparaît dans le suivi de chacun, avec la même note.
Célia et Lucas THEISMANN sont déjà regroupés.

**Exporter les notes**, en haut de l'écran, produit un `.docx` structuré, un chapitre par
enfant, filtrable par période, prêt à être repris dans vos rapports.

---

## Réglages et sauvegarde

Bouton **Paramètres** en bas de la barre latérale (ou menu *Fichier*) : dossier d'enregistrement,
démarrage automatique, délais d'alerte, sauvegarde, restauration, export CSV, remise à zéro.

### Démarrage automatique

Le programme **s'ouvre tout seul à chaque démarrage de Windows**. C'est actif dès
l'installation ; la case *Démarrer automatiquement au lancement de l'ordinateur*, dans
Paramètres, permet de l'arrêter.

Le réglage est réappliqué à chaque lancement : réinstaller le programme ailleurs, ou
déplacer la version portable, ne le casse pas. Sous la case, une phrase dit l'état
**réel** — celui que Windows a retenu, pas celui qu'on lui a demandé : si le démarrage
automatique a été refusé par une règle de votre ordinateur, la case le signale.

### Où sont mes données

Dans **`Documents\Gestion des dossiers`** :

```
Documents\Gestion des dossiers\
   donnees-dossiers.json          ← vos données, écrites à chaque modification
   sauvegardes\
      donnees-2026-08-11.json     ← une copie par jour, 60 jours conservés
```

**Rien à enregistrer à la main.** Le fichier est écrit d'abord en version temporaire
puis renommé : une coupure de courant ne peut pas laisser un fichier à moitié écrit.

### Changer de dossier, ou retrouver ses données sur un autre ordinateur

Menu *Fichier → Changer de dossier de données*, par exemple pour le mettre dans OneDrive
et avoir une copie hors du PC.

**Si le dossier choisi contient déjà des données**, le programme ne les touche pas sans
demander :

| Ce qui est à l'écran | Ce qui se passe |
|---|---|
| les dossiers d'exemple, jamais modifiés (programme tout juste installé) | les données du dossier s'ouvrent directement |
| vos propres dossiers | une question : **ouvrir** les données de ce dossier, les **remplacer** par celles à l'écran, ou **annuler**. Pour remplacer, une copie de l'ancien fichier est d'abord gardée à côté de lui (`donnees-dossiers.remplace-…json`) |

Sur un **nouvel ordinateur**, il suffit donc d'installer le programme, puis de le pointer
vers le dossier OneDrive : vos dossiers apparaissent.

### Si le fichier de données ne se lit plus

Une copie ou une synchronisation interrompue (OneDrive, clé USB retirée trop tôt) peut
laisser le fichier incomplet. Le programme **n'écrit alors plus rien** et affiche, à la
place des écrans habituels, une page **Reprise des données** :

* le fichier abîmé est d'abord **copié à côté de lui**
  (`donnees-dossiers.illisible-…json`) : il reste récupérable ;
* la page propose les copies qui se lisent : la **copie gardée par le programme** (l'état
  de votre dernière séance sur cet ordinateur) et les **sauvegardes quotidiennes**, avec
  pour chacune le nombre d'enfants et la date de dernière modification. La plus récente
  est en premier choix ;
* **Relire le fichier** sert quand la cause est passagère : une synchronisation encore en
  cours, une clé rebranchée.

Rien n'est enregistré tant qu'aucun choix n'est fait.

---

## Données de départ

Au premier lancement, le programme contient déjà vos deux tableaux : les **22 enfants**,
leur **service**, leur **date de notification**, les relances déjà notées et les
**15 droits de visite** connus avec leur fréquence et leur date de fin.

Trois points à compléter :

1. **Les dates de naissance**, absentes de vos tableaux.
2. **Le parent concerné par chaque droit de visite** : vos tableaux nommaient l'enfant
   ou la fratrie, pas le parent — les droits repris affichent « Parent à préciser ».
   Les droits de fratrie (Maka, Lemet, Theismann) ont été recopiés sur chaque enfant,
   pour permettre une note de rencontre différente par enfant.
3. **Quelques dates diffèrent entre vos deux fichiers** (Mathéo, Sofia, Timi, Dyana,
   Eléonore, les Maka : un à six jours d'écart, un an pour Mathéo). J'ai retenu celles du
   tableau des notifications. Cette date pilote l'alerte de notification *et* les deux
   échéances de rapport : vérifiez-la.

---

## Pour les curieux

| Dossier | Contenu |
|---------|---------|
| `app/` | toute l'interface, un seul fichier HTML sans bibliothèque externe |
| `electron/` | la fenêtre, le menu et l'accès au disque |
| `build/` | l'icône du programme |
| `.github/workflows/` | la compilation automatique de l'installateur Windows |

L'export Word est produit sans aucune dépendance : un `.docx` est une archive ZIP
contenant du XML, les deux sont écrits à la main dans `app/index.html`.

`app/index.html` fonctionne aussi seul dans Chrome ou Edge, sans rien installer —
pratique pour dépanner sur un autre ordinateur. Il demande alors l'accès à un dossier
au lieu d'écrire directement.

### Reconstruire l'installateur

Onglet **Actions** du dépôt → *Installateur Windows* → **Run workflow**. Le résultat
est publié dans les **Releases**.

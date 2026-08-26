# Gestion des dossiers

Programme Windows de suivi des dossiers d'enfants : notifications de prise en charge,
rapports semestriels et annuels, droits de visite et notes de rencontres.
Tout reste sur votre ordinateur : aucune connexion internet, aucun compte.

---

## Installation

1. Ouvrez la page **[Releases](../../releases)** du dépôt.
2. Téléchargez **`Gestion-des-dossiers-1.15.0-installateur.exe`**.
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

### Accueil
**Tout tient sur un écran, sans avoir à faire défiler.** Quatre tuiles de comptage
(rapports à préparer, tâches à faire, notifications à réclamer, visites à venir), puis
trois cartes : les **tâches du jour**, les **rapports à rendre prochainement** — avec leur
retard éventuel et la case à cocher quand c'est envoyé — et les **prochaines rencontres**.
Chaque carte s'arrête à quatre lignes.

**La to do vit ici.** Repliée, elle ne montre que le jour même : ce qui est en retard,
pour aujourd'hui ou pour demain. Le lien **Voir toutes mes tâches** — ou la tuile
*Tâches* — la déplie en pleine largeur : les quatre groupes *En retard* / *Aujourd'hui* /
*À venir* / *Sans date*, chaque tâche avec **Modifier** et une croix pour la supprimer,
et de quoi **afficher les tâches faites** puis les supprimer d'un bloc. Une tâche peut
être rattachée à un enfant. *Ne montrer que le jour même* revient à l'aperçu.

### Enfants
**Un seul écran pour un dossier** : la fiche, la notification de prise en charge et les
dates de rapport étaient répartis sur deux onglets qui répétaient les mêmes informations.
Ils n'en font plus qu'un.

En haut, **quatre compteurs** rangent les dossiers selon l'état de la notification —
en ordre, à renouveler bientôt, à réclamer, sans date. **Cliquez sur l'un d'eux** pour
n'afficher que ceux-là ; un second clic, ou *← Tous les dossiers*, revient à la liste.

| | |
|---|---|
| ✓ **vert** | reçue et valable |
| ! **orange** | renouvellement dans moins de 30 jours |
| ✕ **rouge** | pas reçue, ou échéance dépassée : à réclamer |
| ? **gris** | date manquante |

Puis **une ligne par enfant**, avec un trait de couleur à gauche qui reprend l'état :

* **Enfant** — nom, prénom et âge ; les noms s'affichent **NOM Prénom** ;
* **Autorité** — SAJ ou SPJ ;
* **Notification de prise en charge** — l'état, le détail (« échéance dépassée depuis
  85 jours », les relances déjà notées) et les gestes qui s'imposent : **✓ Reçue**
  (encode la nouvelle échéance, proposée un an plus tard), **Relance** (note la date du
  jour) et **+ tâche** (crée la tâche de relance dans la to do de l'accueil). Quand tout est
  en ordre, un discret **↺** permet de signaler que le papier n'est pas arrivé ;
* **Rapport semestriel** et **Rapport annuel** — calculés tout seuls : le rapport annuel
  tombe à la date de notification, le semestriel six mois plus tôt. Quand les deux ne
  coïncident pas, remplissez *date du rapport annuel* dans la fiche : les échéances
  suivent alors cette date.

Le bouton **+ Nouvel enfant** est en haut de l'écran, et un second **Ajouter un enfant**
en bas du tableau. Le tri se fait par **nom de famille** ou par **urgence de la
notification**. Un bandeau signale les fiches encore incomplètes.

### Rapports

Le calendrier des douze prochains mois, dans la présentation de votre tableau Excel :

| Ligne | Quand |
|-------|-------|
| **Formalisations — rapport annuel** | à la date de notification |
| **Rapports d'évolution — semestriel** | exactement six mois plus tôt |

Chaque échéance porte une **case à cocher** : cochez-la quand le rapport est envoyé, elle
se barre et l'échéance suivante se place un an plus tard. Un rapport dépassé et non coché
s'affiche en rouge, et un bandeau **« Rapports en retard »** les rassemble en haut de l'écran.
Boutons pour reculer ou avancer de douze mois.

### Droits de visite
L'écran s'ouvre sur **trois compteurs**, qui rangent chaque dossier selon la seule
question qui compte — jusqu'à quand l'agenda est-il couvert :

| | |
|---|---|
| ! **rouge** | **sans DV futur** : plus rien n'est programmé, il faut rappeler la famille |
| ! **orange** | **échéance proche** : le dernier DV programmé tombe dans moins d'un mois |
| ✓ **vert** | **à jour** : programmé à plus d'un mois |
| ☑ **bleu** | **à compléter** : des rencontres passées attendent leur compte rendu |

Les trois premiers regardent l'agenda, le quatrième le travail en retard : un dossier
peut être **à jour et à compléter** en même temps. Dans la liste, une pastille bleue
indique combien de comptes rendus attendent pour cet enfant.

**Cliquez sur un compteur** pour ne garder que ces dossiers ; un second clic, ou le bouton
*← Tous les dossiers*, revient à la liste complète.

En dessous, l'écran est coupé en deux : **la liste des enfants à gauche, le dossier de
celui que vous avez choisi à droite.**

**À gauche** — un tableau, **tous les dossiers visibles d'un coup** : l'enfant, sa
fréquence, et la date **jusqu'à laquelle son agenda est couvert** avec le nombre de jours
restants. Un trait de couleur à gauche de chaque ligne reprend l'état du dossier, pour
repérer d'un coup d'œil ceux qui demandent un appel. Le champ de recherche ne sert qu'à
retrouver un nom précis dans une longue liste.

**À droite** — le dossier de l'enfant. En tête, son nom et les boutons *Modifier la
fiche*, *+ Rencontre* et *+ Plusieurs dates*. Juste en dessous, un bandeau qui répond
sans chercher : **fréquence, avec qui, dernier DV réalisé, programmé jusqu'au, autorité**.
Puis chaque droit de visite : l'intervenant, la fréquence, les créneaux du mois, et le ✎
pour le corriger.

Enfin **Rencontres**, une seule liste : les rendez-vous **à venir en tête**, sur fond bleu
clair avec le nombre de jours restants, puis les rencontres passées, de la plus récente à
la plus ancienne. Pour chacune : date, intervenant, horaire, **✓ Présent / ✕ Absent en un
clic**, et la **note qui s'écrit directement dans le tableau** — cliquez sur la note (ou
atteignez-la à la tabulation), écrivez, quittez la case, c'est enregistré ; Échap annule
la saisie. Filtres *Toutes /
À venir / À compléter / Honorées / Manquées*. Les rencontres à venir restent toujours
affichées ; du passé, les dix dernières, le reste sur demande.

Plus bas, le **schéma de récurrence (mensuel)** : les quatre semaines du mois côte à côte,
tous enfants confondus, colorés selon l'intervenant — Papa en bleu, Maman en rose,
Fratrie en violet. Une cinquième colonne, **Hors semaine**, rassemble les droits de visite
dont les créneaux ne sont pas encore encodés ; cliquez sur un nom pour ouvrir son dossier.

**Programmer plusieurs dates d'un coup** : le bouton *+ Plusieurs dates* ouvre un tableau de
dates. Un remplissage rapide propose une série — toutes les semaines, toutes les deux
semaines ou tous les mois — que vous corrigez ligne par ligne avant d'enregistrer. Les
horaires sont repris du schéma de récurrence.

**Tout se tape au clavier.** Dans les formulaires, **Tab passe au champ suivant** — un seul
appui, même depuis une date ou une heure. **Maj+Tab** revient en arrière. **Entrée** avance
elle aussi de champ en champ au lieu d'enregistrer au milieu de la saisie ; dans le bloc
*Remplissage rapide*, elle remplit le tableau. L'enregistrement se fait avec le bouton.

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

Tout en bas, la carte **Exporter les notes** produit un `.docx` structuré, un chapitre par
enfant, filtrable par période, prêt à être repris dans vos rapports — et le bouton
*Imprimer* de l'écran.

---

## Réglages et sauvegarde

Bouton **Paramètres** en bas de la barre latérale (ou menu *Fichier*) : dossier d'enregistrement,
délais d'alerte, sauvegarde, restauration, export CSV, remise à zéro.

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
Menu *Fichier → Changer de dossier de données* pour le déplacer, par exemple dans
OneDrive afin d'avoir une copie hors du PC.

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

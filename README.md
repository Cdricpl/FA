# Gestion des dossiers

Programme Windows de suivi des dossiers d'enfants : notifications de prise en charge,
rapports semestriels et annuels, droits de visite et notes de rencontres.
Tout reste sur votre ordinateur : aucune connexion internet, aucun compte.

---

## Installation

1. Ouvrez la page **[Releases](../../releases)** du dépôt.
2. Téléchargez **`Gestion-des-dossiers-1.8.1-installateur.exe`**.
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
Un aperçu du jour : quatre tuiles de comptage (rapports à préparer, tâches à faire,
notifications à réclamer, visites à venir), les tâches du jour, les prochaines rencontres,
les enfants suivis, des accès rapides et les notifications à réclamer.

### À faire
En tête, les **rapports à rendre dans les deux prochains mois**, avec leur retard éventuel
et une case à cocher quand le rapport est envoyé. En dessous, la to do quotidienne,
regroupée en *En retard* / *Aujourd'hui* / *À venir* / *Sans date*. Une tâche peut être
rattachée à un enfant.

### Enfants
La fiche de chaque enfant, à compléter :

* prénom et nom — affichés **NOM Prénom** et classés par nom de famille ;
* **date de naissance** (l'âge se calcule tout seul) ;
* **autorité** : SAJ ou SPJ ;
* **date de la notification de prise en charge** ;
* éventuellement une **date de rapport annuel** différente.

Les **dates des deux rapports** s'affichent automatiquement : le **rapport annuel** tombe à
la date de notification, le **rapport semestriel** six mois plus tôt. Quand les deux ne
coïncident pas, remplissez le champ *date du rapport annuel* : les échéances suivent alors
cette date, et un ✎ apparaît dans le tableau. Le tri se fait par **nom de famille** ou par
date. Un bandeau signale les fiches encore incomplètes.

### Notifications de prise en charge
La vue visuelle : une carte par enfant, pour voir d'un coup d'œil si la notification
est arrivée ou non.

| | |
|---|---|
| ✓ **vert** | reçue et valable |
| ! **orange** | renouvellement dans moins de 30 jours |
| ✕ **rouge** | pas reçue, ou échéance dépassée : à réclamer |
| ? **gris** | date manquante |

Quatre compteurs en haut, et des filtres pour n'afficher que ce qui vous intéresse.

Sur chaque carte : **Notification reçue** (encode la nouvelle échéance, proposée un an
plus tard, et repasse la carte au vert), **Relance** (note la date du jour), et
**+ tâche** (crée la tâche de relance dans l'onglet À faire).

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
Quatre blocs :

1. **Enfants concernés** — une carte par enfant : l'intervenant, la fréquence, et surtout
   **la dernière rencontre programmée**. En vert quand une rencontre est à venir, en orange
   quand la dernière est passée ou qu'il n'y en a aucune : c'est le signal qu'il faut
   rappeler la famille. Un bandeau récapitule les enfants concernés.
2. **Schéma de récurrence (mensuel)** — les quatre semaines du mois côte à côte, avec les
   créneaux, colorés selon l'intervenant : Papa en bleu, Maman en rose, Fratrie en violet.
3. **Prochaines rencontres** — les rendez-vous à venir, avec leur pastille de date.
4. **Suivi des rencontres, par enfant** — un bloc par enfant : date, intervenant, heures,
   **✓ Présent / ✕ Absent en un clic**, et la **note qui s'écrit directement dans le tableau**
   (elle s'enregistre en quittant la case). Aucun passage par une fenêtre de modification.

**Programmer plusieurs dates d'un coup** : le bouton *Plusieurs dates* ouvre un tableau de
dates. Un remplissage rapide propose une série — toutes les semaines, toutes les deux
semaines ou tous les mois — que vous corrigez ligne par ligne avant d'enregistrer. Les
horaires sont repris du schéma de récurrence.

**Rencontres sans encadrement** : cochez la case sur le droit de visite quand les rencontres
se déroulent sans votre présence. Il n'y a alors rien à programmer : la fiche de l'enfant
reste verte et il ne figure plus dans la liste des familles à recontacter.

Le champ **Rencontre avec** propose Papa, Maman, Les deux parents, Grands-parents et
Fratrie en un clic, mais accepte aussi n'importe quel texte. Aucun champ n'est obligatoire :
vous pouvez enregistrer un droit de visite incomplet et le préciser plus tard.

**Regrouper une fratrie** : quand deux enfants sont placés dans la même famille d'accueil,
cochez-les dans « Regrouper avec un autre enfant » sur le droit de visite. La rencontre ne
s'encode alors qu'une fois et apparaît dans le suivi de chacun, avec la même note.
Célia et Lucas THEISMANN sont déjà regroupés.

Bouton **Notes en Word** : un `.docx` structuré, un chapitre par enfant, filtrable par
période, prêt à être repris dans vos rapports.

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

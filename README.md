# Gestion de mes dossiers

Petit programme qui reprend — et automatise — le tableau Excel de suivi des dossiers :
notifications de prise en charge, relances SAJ / SPJ, droits de visite et to do quotidienne.

## Comment l'utiliser

1. Téléchargez le fichier **`index.html`**.
2. Double-cliquez dessus : il s'ouvre dans votre navigateur (Chrome, Edge, Firefox…).
3. C'est tout — aucune installation, aucun compte, aucune connexion internet nécessaire.

Astuce : faites un clic droit sur le fichier → *Envoyer vers* → *Bureau (créer un raccourci)*
pour l'avoir sous la main tous les matins.

## Ce que fait le programme

### Tableau de bord
La page qui répond à « qu'est-ce que je dois traiter aujourd'hui ? » :

* les notifications de prise en charge **dépassées** (rouge) ou **qui arrivent à échéance** (orange) ;
* les **droits de visite** à remettre ou suspendus ;
* les **visites de la semaine** en cours ;
* la **to do** du jour.

Le bouton `Relance` note la date du jour comme relance SAJ / SPJ en un clic.
Le bouton `+ tâche` crée automatiquement la tâche correspondante dans la to do.

### Dossiers / rapports
La même liste que dans le tableau Excel, avec le code couleur calculé tout seul :

| Couleur | Signification |
|---------|---------------|
| 🔴 rouge | la date de fin de notification est **dépassée** |
| 🟠 orange | il reste **moins de 30 jours** (délai réglable) |
| 🟢 vert | tout est en ordre |
| ⚪ gris | la date n'a pas encore été encodée |

Recherche par nom, tri par échéance / urgence / nom, et impression du tableau.

### Droits de visite
Pour chaque enfant ou fratrie : le rythme (`2x 1h/mois`, `4h/mois`, `2h/vacances`…),
la date de fin, l'état de suspension et les créneaux de visite. Même code couleur, plus
le violet pour un droit **suspendu**.

Un créneau peut être :

* une **semaine du cycle** de 4 semaines (semaine 1, 2, 3 ou 4) ;
* un **n-ième jour du mois** (par exemple le 1er mardi, le 3e mardi) ;
* **toutes les semaines** ;
* pendant les **congés / vacances scolaires** ;
* une **date unique**.

### Planning
La semaine réelle (lundi → dimanche), calculée à partir des créneaux : le programme sait
si la semaine en cours est la 1, 2, 3 ou 4 du cycle, et à quelle date tombe le 1er ou le
3e mardi du mois. Une seconde vue montre le cycle complet de 4 semaines, comme dans le tableau.

### À faire
La to do quotidienne, regroupée en *En retard* / *Aujourd'hui* / *À venir* / *Sans date*,
avec possibilité de rattacher une tâche à un dossier.

### Données
Réglages, sauvegarde et export :

* le **délai de l'alerte orange** (30 jours par défaut) ;
* le **lundi de départ du cycle** « Semaine 1 » — à vérifier une fois, c'est lui qui
  détermine dans quelle semaine du cycle on se trouve ;
* **exporter une sauvegarde** (fichier `.json`) et la **restaurer** ;
* **exporter en CSV** pour rouvrir les tableaux dans Excel.

## Où sont mes données ?

Elles restent **sur votre ordinateur uniquement**, dans le stockage local du navigateur.
Rien n'est envoyé sur internet, il n'y a pas de serveur.

Deux conséquences à connaître :

* si vous videz l'historique / les données de navigation, les données peuvent être effacées ;
* les données ne suivent pas d'un ordinateur ou d'un navigateur à l'autre.

➜ **Faites régulièrement `Données` → `Exporter`** et rangez le fichier `.json` obtenu
dans vos documents. Il suffit de le réimporter pour tout retrouver.

## Données de départ

Au premier lancement, le programme est déjà rempli avec le contenu du tableau Excel
(22 enfants, 11 droits de visite et leurs créneaux). Vous pouvez tout modifier,
tout effacer, ou recharger ces données de départ depuis l'onglet `Données`.

Deux points à compléter, qui ne figuraient pas dans le tableau d'origine :

* le **jour de la semaine** des visites du cycle de 4 semaines (le tableau indiquait
  seulement « Semaine 1 », « Semaine 2 »…). Tant qu'il manque, ces créneaux apparaissent
  dans l'encadré *Créneaux sans jour encodé* du planning, avec un bouton `Compléter`.
* **Louna**, citée dans la ligne « Congé », n'a pas encore de dossier propre : elle est
  pour l'instant notée dans le droit de visite « Théo / Louna ».

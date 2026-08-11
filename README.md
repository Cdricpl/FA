# Gestion de mes dossiers

Programme de suivi des dossiers d'enfants : notifications de prise en charge, rapports
semestriels et annuels, droits de visite par parent, notes de rencontres exportables en Word,
et to do quotidienne.

Un seul fichier, aucune installation, aucune connexion internet. Tout reste sur votre ordinateur.

---

## Installation (une seule fois)

1. Copiez **`index.html`** et **`Lancer le programme.bat`** dans un dossier de vos *Documents*.
2. Double-cliquez sur **`Lancer le programme.bat`** : le programme s'ouvre dans sa propre
   fenêtre, sans barre d'adresse ni onglets.
   *(Clic droit sur ce fichier → « Envoyer vers » → « Bureau (créer un raccourci) » pour avoir
   une icône sur votre bureau.)*
3. Allez dans l'onglet **Données** → **« Choisir mon dossier de données »** et désignez un
   dossier, par exemple `Documents\Mes dossiers`.

C'est fait. À partir de là, **chaque modification est écrite immédiatement dans un vrai fichier**
sur votre disque. Rien à enregistrer à la main.

> Si vous préférez, un simple double-clic sur `index.html` fonctionne aussi.
> Utilisez **Chrome** ou **Edge** : ce sont les seuls navigateurs capables d'écrire dans un fichier.

### Où sont mes données

Dans le dossier que vous avez choisi :

```
Mes dossiers\
   donnees-dossiers.json          ← vos données, mises à jour en direct
   sauvegardes\
      donnees-2026-08-11.json     ← une copie par jour, 60 jours conservés
      donnees-2026-08-10.json
      ...
```

Ce dossier peut être dans OneDrive : vous aurez alors une copie hors du PC.
Une copie de secours reste aussi dans le navigateur, ce qui permet au programme de rattraper
le fichier si l'ordinateur s'éteint au mauvais moment.

À chaque nouvelle ouverture, Chrome/Edge demande une fois l'autorisation d'accéder au dossier :
un clic sur **Reconnecter**, puis **Modifier les fichiers**. C'est une sécurité du navigateur,
elle ne peut pas être supprimée.

---

## Les six onglets

### Tableau de bord
Ce qu'il faut traiter aujourd'hui : notifications dépassées ou proches, rapports à préparer,
droits de visite à renouveler, to do du jour.

### Enfants
La liste de tous les dossiers, avec pour chacun la date de formalisation, le statut, les
relances, les deux prochaines échéances de rapport et les droits de visite.
Cliquez sur un nom pour ouvrir sa **fiche**.

La fiche d'un enfant regroupe tout :

* **Notification de prise en charge** — la date d'échéance et son statut. Le bouton
  **« Reconduire d'un an »** décale l'échéance d'un an et garde l'ancienne en historique.
  Si le SAJ / SPJ oublie de vous l'envoyer, l'échéance passe en rouge : notez alors vos
  relances avec **« Noter une relance aujourd'hui »**.
* **Rapports d'évolution** — les deux prochaines échéances, calculées automatiquement.
  Bouton **« Marquer comme envoyé »** : l'échéance suivante se place toute seule un an plus tard.
* **Droits de visite et rencontres** — voir plus bas.

### Rapports
Le calendrier des douze prochains mois, dans la présentation de votre tableau Excel :

| Ligne | Quand |
|-------|-------|
| **Formalisations — rapport annuel** | à la date de formalisation |
| **Rapports d'évolution — semestriel** | exactement six mois plus tôt |

Tout est recalculé à partir de la seule date de formalisation, et se décale automatiquement
à chaque reconduction. En dessous, la liste **« À préparer maintenant »** reprend ce qui tombe
dans les 45 prochains jours (délai réglable) ainsi que les retards de moins de deux mois.

### Visites
Un droit de visite **par parent** : si l'enfant voit son papa et sa maman séparément,
encodez-en deux. Pour chacun : le parent concerné, la **fréquence** (`2x 1h/mois`, `4h/mois`,
`2h/vacances`…), la date de fin du droit, une éventuelle suspension et le lieu habituel.

Pour chaque rencontre, vous encodez :

* la **date** ;
* si le parent est **venu**, **absent**, ou si la rencontre a été **annulée** ;
* une **note de synthèse** libre.

Le programme compte automatiquement les rencontres honorées et manquées.

### À faire
La to do quotidienne, regroupée en *En retard* / *Aujourd'hui* / *À venir* / *Sans date*.

### Données
Le dossier d'enregistrement, les réglages des délais d'alerte, les sauvegardes et les exports.

---

## Export Word des notes de visite

Bouton **« Exporter les notes en Word »**, depuis la fiche d'un enfant ou depuis l'onglet Visites.
Vous choisissez une période (facultative) et vous obtenez un fichier `.docx` structuré :

```
Notes de visites
Document généré le mardi 11 août 2026 — période du 01/01/2026 au 30/06/2026

Sofia INFANTINO — SPJ
  Rencontres avec Maman  (1x 2h/mois)
  2 rencontres : 1 honorée(s), 1 manquée(s)

  Mercredi 10 juin 2026 — Parent venu
      Rencontre calme. Sofia s'est montrée à l'aise, échanges autour de l'école.

  Mercredi 8 juillet 2026 — Parent absent
      Maman ne s'est pas présentée, pas de nouvelles. Sofia déçue.
```

Prêt à être repris dans votre rapport. Les autres exports (CSV) rouvrent les tableaux dans Excel.

---

## Données de départ

Au premier lancement, le programme contient déjà vos deux tableaux : les **22 enfants**,
leur **service** (SAJ / SPJ), leur **date de formalisation**, les relances déjà notées et les
**15 droits de visite** connus avec leur fréquence et leur date de fin.

Trois points à compléter de votre côté :

1. **Le parent concerné par chaque droit de visite.** Vos tableaux indiquaient l'enfant ou la
   fratrie, pas le parent : les droits repris s'affichent donc « Parent à préciser ». Ouvrez
   la fiche de l'enfant, cliquez sur *Modifier*, et indiquez Papa ou Maman — en créant un
   second droit de visite si les deux parents voient l'enfant séparément.
2. **Les droits de fratrie ont été recopiés sur chaque enfant** (Maka, Lemet, Theismann), pour
   que vous puissiez écrire une note de rencontre différente par enfant.
3. **Quelques dates diffèrent entre vos deux fichiers** (Mathéo, Sofia, Timi, Dyana, Eléonore,
   les Maka : de un à six jours d'écart, un an pour Mathéo). J'ai retenu celles du premier
   tableau, celui des notifications. Vérifiez-les et corrigez au besoin : cette date pilote à
   la fois l'alerte de notification et les deux échéances de rapport.

Vous pouvez tout modifier, tout effacer ou recharger ces données de départ depuis l'onglet
**Données**.

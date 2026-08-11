# Gestion des dossiers

Programme de suivi des dossiers d'enfants : notifications de prise en charge,
rapports semestriels et annuels, droits de visite par parent, notes de rencontres
exportables en Word, et to do quotidienne.

Programme Windows installable. Tout reste sur votre ordinateur : aucune connexion
internet, aucun compte, aucune donnée envoyée où que ce soit.

---

## Installation

1. Ouvrez la page **[Releases](../../releases)** du dépôt.
2. Téléchargez **`Gestion-des-dossiers-1.0.0-installateur.exe`**.
3. Double-cliquez et suivez l'assistant.

L'installation se fait **pour votre compte utilisateur : aucun droit administrateur
n'est nécessaire**. Un raccourci est créé sur le bureau et dans le menu Démarrer.

> **Windows a protégé votre ordinateur** — cet avertissement apparaît au premier
> lancement parce que le programme n'est pas signé par un certificat d'éditeur payant.
> Cliquez sur **Informations complémentaires**, puis **Exécuter quand même**.
> Il ne réapparaîtra plus ensuite.

Une version **portable** est aussi disponible : elle ne s'installe pas, elle se lance
directement, y compris depuis une clé USB.

### Où sont mes données

Dans **`Documents\Gestion des dossiers`** :

```
Documents\Gestion des dossiers\
   donnees-dossiers.json          ← vos données, écrites à chaque modification
   sauvegardes\
      donnees-2026-08-11.json     ← une copie par jour, 60 jours conservés
      donnees-2026-08-10.json
```

Il n'y a **rien à enregistrer à la main** et aucune autorisation à redonner :
chaque modification part sur le disque dans la seconde. Le fichier est écrit d'abord
en version temporaire puis renommé, si bien qu'une coupure de courant ne peut pas
laisser un fichier à moitié écrit.

Menu **Fichier** → *Ouvrir le dossier de données* pour y accéder, ou
*Changer de dossier de données* pour le déplacer, par exemple dans OneDrive afin
d'avoir une copie hors du PC.

---

## Les six onglets

### Tableau de bord
Ce qu'il faut traiter aujourd'hui : notifications dépassées ou proches, rapports à
préparer, droits de visite à renouveler, to do du jour.

### Enfants
La liste de tous les dossiers. Cliquez sur un nom pour ouvrir sa **fiche**, qui
regroupe tout :

* **Notification de prise en charge** — l'échéance et son statut. Le bouton
  **« Reconduire d'un an »** décale l'échéance et garde l'ancienne en historique.
  Si le SAJ / SPJ oublie de l'envoyer, l'échéance passe en rouge : notez alors vos
  relances avec **« Noter une relance aujourd'hui »**.
* **Rapports d'évolution** — les deux prochaines échéances, calculées automatiquement.
  Bouton **« Marquer comme envoyé »** : l'échéance suivante se place un an plus tard.
* **Droits de visite et rencontres** — voir plus bas.

Code couleur, identique partout :

| Couleur | Signification |
|---------|---------------|
| 🔴 rouge | échéance dépassée |
| 🟠 orange | échéance proche (délai réglable) |
| 🟢 vert | en ordre |
| ⚪ gris | date manquante |
| 🟣 violet | droit de visite suspendu |

### Rapports
Le calendrier des douze prochains mois, dans la présentation de votre tableau Excel :

| Ligne | Quand |
|-------|-------|
| **Formalisations — rapport annuel** | à la date de formalisation |
| **Rapports d'évolution — semestriel** | exactement six mois plus tôt |

Tout est recalculé à partir de la seule date de formalisation, et se décale
automatiquement à chaque reconduction. En dessous, **« À préparer maintenant »**
reprend ce qui tombe dans les 45 prochains jours (délai réglable) ainsi que les
retards de moins de deux mois.

### Visites
Un droit de visite **par parent** : si l'enfant voit son papa et sa maman séparément,
encodez-en deux. Pour chacun : le parent concerné, la **fréquence** (`2x 1h/mois`,
`4h/mois`, `2h/vacances`…), la date de fin du droit, une éventuelle suspension et le
lieu habituel.

Pour chaque rencontre : la **date**, si le parent est **venu**, **absent** ou si la
rencontre a été **annulée**, et une **note de synthèse**. Le programme compte les
rencontres honorées et manquées.

### À faire
La to do quotidienne, regroupée en *En retard* / *Aujourd'hui* / *À venir* / *Sans date*.

### Données
Le dossier d'enregistrement, les délais d'alerte, les sauvegardes et les exports.

---

## Export Word des notes de visite

Bouton **« Exporter les notes en Word »**, depuis la fiche d'un enfant ou depuis
l'onglet Visites. Vous choisissez une période (facultative) et l'endroit où
enregistrer, et vous obtenez un `.docx` structuré :

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

Prêt à être repris dans votre rapport. Les exports CSV rouvrent les tableaux dans Excel.

---

## Données de départ

Au premier lancement, le programme contient déjà vos deux tableaux : les **22 enfants**,
leur **service** (SAJ / SPJ), leur **date de formalisation**, les relances déjà notées et
les **15 droits de visite** connus avec leur fréquence et leur date de fin.

Trois points à compléter :

1. **Le parent concerné par chaque droit de visite.** Vos tableaux indiquaient l'enfant
   ou la fratrie, pas le parent : les droits repris s'affichent « Parent à préciser ».
2. **Les droits de fratrie ont été recopiés sur chaque enfant** (Maka, Lemet, Theismann),
   pour que vous puissiez écrire une note de rencontre différente par enfant.
3. **Quelques dates diffèrent entre vos deux fichiers** (Mathéo, Sofia, Timi, Dyana,
   Eléonore, les Maka : un à six jours d'écart, un an pour Mathéo). J'ai retenu celles du
   tableau des notifications. Cette date pilote à la fois l'alerte de notification et les
   deux échéances de rapport : vérifiez-la.

Tout est modifiable, effaçable et rechargeable depuis l'onglet **Données**.

---

## Pour les curieux : comment c'est fait

| Dossier | Contenu |
|---------|---------|
| `app/` | toute l'interface, dans un seul fichier HTML sans bibliothèque externe |
| `electron/` | la fenêtre, le menu et l'accès au disque |
| `build/` | l'icône du programme |
| `.github/workflows/` | la compilation automatique de l'installateur Windows |

L'export Word est produit sans aucune dépendance : un `.docx` est une archive ZIP
contenant du XML, les deux sont écrits à la main dans `app/index.html`.

Le fichier `app/index.html` fonctionne aussi tout seul dans Chrome ou Edge, sans
rien installer — pratique pour dépanner sur un autre ordinateur. Il demande alors
l'accès à un dossier au lieu d'écrire directement.

### Reconstruire l'installateur

Onglet **Actions** du dépôt → *Installateur Windows* → **Run workflow**. Le résultat
est publié dans les **Releases**. En local, sur une machine Windows :

```bash
npm install
npm run dist
```

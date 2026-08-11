# Gestion des dossiers

Programme Windows de suivi des dossiers d'enfants. Quatre onglets, rien de plus.
Tout reste sur votre ordinateur : aucune connexion internet, aucun compte.

---

## Installation

1. Ouvrez la page **[Releases](../../releases)** du dépôt.
2. Téléchargez **`Gestion-des-dossiers-1.1.0-installateur.exe`**.
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

## Les quatre onglets

### 1. À faire
La to do quotidienne, regroupée en *En retard* / *Aujourd'hui* / *À venir* / *Sans date*.
Une tâche peut être rattachée à un enfant.

### 2. Enfants
La fiche de chaque enfant, à compléter :

* prénom et nom ;
* **date de naissance** ;
* **service** : SAJ ou SPJ ;
* **date de la notification de prise en charge**.

Les **dates des deux rapports** s'affichent automatiquement à partir de cette dernière :
le **rapport annuel** tombe à la date de notification, le **rapport semestriel** six mois
plus tôt. Un bandeau signale les fiches encore incomplètes.

### 3. Notifications de prise en charge
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

### 4. Droits de visite
Un droit de visite **par parent** : si l'enfant voit son papa et sa maman séparément,
encodez-en deux. Pour chacun : le parent, la **fréquence** (`2x 1h/mois`, `4h/mois`,
`2h/vacances`…), la date de fin, une éventuelle suspension et le lieu.

Pour chaque rencontre : la **date**, si le parent est **venu**, **absent** ou si la
rencontre a été **annulée**, et une **note de synthèse**. Le programme compte les
rencontres honorées et manquées.

Bouton **Exporter les notes en Word** : un `.docx` structuré, un chapitre par enfant,
filtrable par période, prêt à être repris dans vos rapports.

```
Notes de visites
Document généré le mardi 11 août 2026 — période du 01/01/2026 au 30/06/2026

Sofia INFANTINO — SPJ
  Rencontres avec Maman  (1x 2h/mois)
  2 rencontres : 1 honorée(s), 1 manquée(s)

  Mercredi 10 juin 2026 — Parent venu
      Rencontre calme. Sofia s'est montrée à l'aise, échanges autour de l'école.
```

---

## Réglages et sauvegarde

Bouton **Réglages** en haut à droite (ou menu *Fichier*) : dossier d'enregistrement,
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

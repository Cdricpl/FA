"use strict";

/* Passerelle étroite entre l'interface et le disque.
   L'interface n'a accès qu'aux quelques fonctions listées ici. */

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("programme", {
  natif: true,

  infos:            ()                   => ipcRenderer.invoke("app:infos"),
  lire:             ()                   => ipcRenderer.invoke("donnees:lire"),
  ecrire:           contenu              => ipcRenderer.invoke("donnees:ecrire", contenu),
  sauvegarder:      contenu              => ipcRenderer.invoke("donnees:sauvegarder", contenu),
  changerDossier:   ()                   => ipcRenderer.invoke("donnees:changerDossier"),
  ouvrirDossier:    ()                   => ipcRenderer.invoke("donnees:ouvrirDossier"),
  enregistrerSous:  (nom, d, desc)       => ipcRenderer.invoke("fichier:enregistrerSous", nom, d, desc),
  choisirFichier:   ()                   => ipcRenderer.invoke("fichier:choisir"),
  message:          options              => ipcRenderer.invoke("boite:message", options),

  surMenu: rappel => ipcRenderer.on("menu", (ev, action) => rappel(action))
});

"use strict";

/* Processus principal : fenêtre, menu, et lecture / écriture des données.
   Toute l'interface vit dans app/index.html ; ce fichier lui donne accès
   au disque, sans aucune demande d'autorisation. */

const { app, BrowserWindow, ipcMain, dialog, shell, Menu } = require("electron");
const path = require("path");
const { pathToFileURL } = require("url");
const fs = require("fs");
const fsp = fs.promises;

/* Les champs « date » et « heure » suivent la langue de Chromium, pas celle
   de la page : sans cela, une machine configurée en anglais afficherait et
   accepterait les dates au format mois/jour/année. */
app.commandLine.appendSwitch("lang", "fr-BE");

const NOM_FICHIER    = "donnees-dossiers.json";
const DOSSIER_SAUV   = "sauvegardes";
const NB_SAUVEGARDES = 60;

let fenetre = null;

/* ---------------------------------------------------------------- réglages */

const cheminConfig = () => path.join(app.getPath("userData"), "config.json");

function lireConfig(){
  try{ return JSON.parse(fs.readFileSync(cheminConfig(), "utf8")); }
  catch(e){ return {}; }
}
function ecrireConfig(c){
  try{ fs.writeFileSync(cheminConfig(), JSON.stringify(c, null, 2), "utf8"); }
  catch(e){ console.error("Réglages non enregistrés :", e); }
}
function dossierDonnees(){
  const c = lireConfig();
  if(c.dossier) return c.dossier;
  return path.join(app.getPath("documents"), "Gestion des dossiers");
}
function fichierDonnees(){ return path.join(dossierDonnees(), NOM_FICHIER); }

/* ------------------------------------------------------------------ écriture */

/** Écrit d'abord un fichier temporaire, puis le renomme : le fichier de
    données ne peut donc jamais rester à moitié écrit. */
async function ecrireAtomique(cible, contenu){
  const tmp = cible + ".tmp";
  await fsp.writeFile(tmp, contenu, "utf8");
  await fsp.rename(tmp, cible);
}

const RE_SAUVEGARDE = /^donnees-\d{4}-\d{2}-\d{2}\.json$/;

/** Ce que contient un fichier de données : null s'il n'existe pas,
    { lisible:false } s'il existe sans pouvoir se lire, sinon le nombre de
    dossiers d'enfant et la date de dernière modification. */
async function examiner(fichier){
  let brut;
  try{ brut = await fsp.readFile(fichier, "utf8"); }
  catch(e){ return e.code === "ENOENT" ? null : { lisible:false, erreur:e.message }; }
  try{
    const d = JSON.parse(brut);
    if(!d || !Array.isArray(d.enfants)) throw new Error("contenu inattendu");
    return { lisible:true, nb:d.enfants.length, modifieLe:d.modifieLe || null, exemple:!!d.initial };
  }catch(e){ return { lisible:false, erreur:e.message, vide:!brut.trim() }; }
}

function horodatage(){
  const d = new Date(), p = n => String(n).padStart(2,"0");
  return d.getFullYear() + "-" + p(d.getMonth()+1) + "-" + p(d.getDate()) +
         "-" + p(d.getHours()) + "h" + p(d.getMinutes());
}

/** Copie un fichier de données à côté de lui, sous un nom qui dit pourquoi,
    avant que quoi que ce soit ne le remplace. Une copie identique déjà
    présente est réutilisée : relancer dix fois le programme sur le même
    fichier abîmé ne fait pas dix copies. Rend le nom de la copie. */
async function mettreDeCote(fichier, motif){
  const contenu = await fsp.readFile(fichier);
  const dir = path.dirname(fichier);
  const prefixe = "donnees-dossiers." + motif + "-";
  for(const n of await fsp.readdir(dir)){
    if(!n.startsWith(prefixe)) continue;
    const autre = await fsp.readFile(path.join(dir, n)).catch(() => null);
    if(autre && autre.equals(contenu)) return n;
  }
  for(let i = 1; ; i++){
    const nom = prefixe + horodatage() + (i > 1 ? "-" + i : "") + ".json";
    try{ await fsp.writeFile(path.join(dir, nom), contenu, { flag:"wx" }); return nom; }
    catch(e){ if(e.code !== "EEXIST" || i > 50) throw e; }
  }
}

let dernierBackup = 0;
async function sauvegardeDuJour(contenu, forcer){
  if(!forcer && Date.now() - dernierBackup < 120000) return;
  dernierBackup = Date.now();
  try{
    const dir = path.join(dossierDonnees(), DOSSIER_SAUV);
    await fsp.mkdir(dir, { recursive:true });
    const jour = new Date();
    const p = n => String(n).padStart(2,"0");
    const nom = "donnees-" + jour.getFullYear() + "-" + p(jour.getMonth()+1) + "-" + p(jour.getDate()) + ".json";
    await ecrireAtomique(path.join(dir, nom), contenu);

    const tout = (await fsp.readdir(dir))
      .filter(n => RE_SAUVEGARDE.test(n)).sort();
    for(const n of tout.slice(0, Math.max(0, tout.length - NB_SAUVEGARDES))){
      await fsp.unlink(path.join(dir, n)).catch(() => {});
    }
  }catch(e){ console.error("Copie de sauvegarde impossible :", e); }
}

/* ------------------------------------------ démarrage avec l'ordinateur */

/** Le vrai chemin du programme. Pour la version portable, c'est l'exécutable
    que l'utilisateur a rangé quelque part, et non la copie temporaire d'où
    Windows le lance réellement. */
const cheminProgramme = () => process.env.PORTABLE_EXECUTABLE_FILE || process.execPath;

/** Activé tant qu'on ne l'a pas explicitement refusé. */
const demarrageAutoVoulu = () => lireConfig().demarrageAuto !== false;

function appliquerDemarrageAuto(actif){
  // en développement, le programme n'est pas installé : on ne touche à rien
  if(!app.isPackaged) return false;
  try{
    app.setLoginItemSettings({ openAtLogin: !!actif, path: cheminProgramme(), args: [] });
    return true;
  }catch(e){
    console.error("Démarrage automatique non modifiable :", e);
    return false;
  }
}

/** Ce que Windows a réellement enregistré, indépendamment de nos réglages. */
function demarrageAutoReel(){
  if(!app.isPackaged) return false;
  try{ return !!app.getLoginItemSettings({ path: cheminProgramme() }).openAtLogin; }
  catch(e){ return false; }
}

/* ----------------------------------------------------------------- fenêtre */

function creerFenetre(){
  fenetre = new BrowserWindow({
    width: 1440, height: 940, minWidth: 940, minHeight: 620,
    title: "Gestion des dossiers",
    icon: path.join(__dirname, "..", "app", "icone.png"),
    backgroundColor: "#f4f6f8",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: true
    }
  });
  fenetre.once("ready-to-show", () => fenetre.show());
  // le titre de la fenêtre reste celui du programme, pas celui de la page
  fenetre.on("page-title-updated", ev => ev.preventDefault());
  fenetre.loadFile(path.join(__dirname, "..", "app", "index.html"));

  // Rien ne doit pouvoir emmener la fenêtre ailleurs que sur l'application.
  // Un lien vers le web s'ouvre dans le navigateur ; tout autre type
  // d'adresse — fichier, partage réseau, protocole d'un autre programme —
  // est ignoré.
  const pageAppli = pathToFileURL(path.join(__dirname, "..", "app", "index.html")).href;
  const versNavigateur = url => {
    if(/^(https?|mailto):/i.test(url)) shell.openExternal(url);
    return { action:"deny" };
  };
  fenetre.webContents.setWindowOpenHandler(({ url }) => versNavigateur(url));
  fenetre.webContents.on("will-navigate", (ev, url) => {
    if(url.split("#")[0] === pageAppli) return;
    ev.preventDefault();
    versNavigateur(url);
  });
}

function construireMenu(){
  const modele = [
    { label:"Fichier", submenu:[
      { label:"Ouvrir le dossier de données", click: () => shell.openPath(dossierDonnees()) },
      // C'est l'interface qui ouvre la boîte de dialogue : elle seule sait ce
      // qui est à l'écran, et doit le dire si le dossier choisi a déjà des
      // données. (Avant, la boîte s'ouvrait ici puis une seconde fois là-bas.)
      { label:"Changer de dossier de données…",
        click: () => fenetre && fenetre.webContents.send("menu", "dossier-change") },
      { type:"separator" },
      { label:"Enregistrer une copie de sauvegarde…",
        click: () => fenetre && fenetre.webContents.send("menu", "export-json") },
      { label:"Réglages…",
        click: () => fenetre && fenetre.webContents.send("menu", "reglages") },
      { type:"separator" },
      { role:"quit", label:"Quitter" }
    ]},
    { label:"Édition", submenu:[
      { role:"undo", label:"Annuler" }, { role:"redo", label:"Rétablir" },
      { type:"separator" },
      { role:"cut", label:"Couper" }, { role:"copy", label:"Copier" },
      { role:"paste", label:"Coller" }, { role:"selectAll", label:"Tout sélectionner" }
    ]},
    { label:"Affichage", submenu:[
      { role:"reload", label:"Recharger" },
      { type:"separator" },
      { role:"resetZoom", label:"Taille normale" },
      { role:"zoomIn", label:"Agrandir" }, { role:"zoomOut", label:"Réduire" },
      { type:"separator" },
      { role:"togglefullscreen", label:"Plein écran" }
    ]},
    { label:"Aide", submenu:[
      { label:"À propos", click: () => dialog.showMessageBox(fenetre, {
          type:"info", title:"À propos",
          message:"Gestion des dossiers",
          detail:"Version " + app.getVersion() +
                 "\n\nSuivi des notifications de prise en charge, des rapports semestriels " +
                 "et annuels, et des droits de visite." +
                 "\n\nVos données sont enregistrées dans :\n" + dossierDonnees(),
          buttons:["Fermer"]
        }) },
      { label:"Ouvrir le dossier de données", click: () => shell.openPath(dossierDonnees()) }
    ]}
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(modele));
}

/** Choix d'un nouveau dossier de données.

    Si ce dossier contient déjà des données, rien n'est écrit avant qu'on
    ait demandé lesquelles garder. Sur un nouvel ordinateur, pointer le
    programme vers son dossier OneDrive est justement le geste qui sert à
    retrouver ses dossiers — et il les remplaçait par les exemples.

    info : ce qui est à l'écran ({ nb, exemple }), pour le dire dans la question.
    Rend { ok, mode } : « deposer » (dossier sans données : on y écrit),
    « ouvrir » (on lit ce qui s'y trouve) ou « remplacer » (voulu, après copie). */
async function changerDossier(info){
  info = info || {};
  const r = await dialog.showOpenDialog(fenetre, {
    title: "Choisir le dossier où enregistrer les données",
    defaultPath: dossierDonnees(),
    properties: ["openDirectory", "createDirectory"],
    buttonLabel: "Utiliser ce dossier"
  });
  if(r.canceled || !r.filePaths.length) return { ok:false };
  const dossier = r.filePaths[0];
  const fichier = path.join(dossier, NOM_FICHIER);
  const la = await examiner(fichier);

  let mode = "deposer";
  if(la){
    // Rien à perdre à l'écran (exemples jamais modifiés), ou un fichier qui
    // ne se lit pas — l'interface proposera alors de le reprendre : on ouvre.
    if(!la.lisible || info.exemple){
      mode = "ouvrir";
    }else{
      const quand = la.modifieLe
        ? ", modifiées le " + new Date(la.modifieLe).toLocaleString("fr-BE",
            { dateStyle:"long", timeStyle:"short" }) : "";
      const choix = await dialog.showMessageBox(fenetre, {
        type: "question",
        title: "Ce dossier contient déjà des données",
        message: "Ce dossier contient déjà des données.",
        detail: "Dans ce dossier : " + la.nb + " enfant" + (la.nb > 1 ? "s" : "") + quand + ".\n" +
                "À l'écran : " + (info.nb == null ? "?" : info.nb) + " enfant" +
                (info.nb > 1 ? "s" : "") + ".\n\n" +
                "Si vous les remplacez, une copie du fichier de ce dossier est gardée à côté de lui.",
        buttons: ["Ouvrir les données de ce dossier", "Les remplacer par celles à l'écran", "Annuler"],
        defaultId: 0, cancelId: 2, noLink: true
      });
      if(choix.response === 2) return { ok:false };
      if(choix.response === 1){ await mettreDeCote(fichier, "remplace"); mode = "remplacer"; }
      else mode = "ouvrir";
    }
  }
  const c = lireConfig();
  c.dossier = dossier;
  ecrireConfig(c);
  return { ok:true, mode, dossier, fichier };
}

/* --------------------------------------------------------------- passerelle */

ipcMain.handle("donnees:lire", async () => {
  try{
    const contenu = await fsp.readFile(fichierDonnees(), "utf8");
    return { ok:true, contenu, dossier:dossierDonnees(), fichier:fichierDonnees() };
  }catch(e){
    if(e.code === "ENOENT") return { ok:true, contenu:null, dossier:dossierDonnees(), fichier:fichierDonnees() };
    return { ok:false, erreur:e.message, dossier:dossierDonnees(), fichier:fichierDonnees() };
  }
});

ipcMain.handle("donnees:ecrire", async (ev, contenu) => {
  try{
    await fsp.mkdir(dossierDonnees(), { recursive:true });
    // Filet de sécurité, quoi que demande l'interface : un fichier qui ne se
    // lit pas n'est jamais remplacé sans qu'une copie en soit gardée. Il
    // peut avoir été tronqué par une copie interrompue, et rester récupérable.
    const actuel = await examiner(fichierDonnees());
    if(actuel && !actuel.lisible && !actuel.vide) await mettreDeCote(fichierDonnees(), "illisible");
    await ecrireAtomique(fichierDonnees(), contenu);
    await sauvegardeDuJour(contenu);
    return { ok:true, dossier:dossierDonnees(), fichier:fichierDonnees(), heure:Date.now() };
  }catch(e){ return { ok:false, erreur:e.message }; }
});

ipcMain.handle("donnees:sauvegarder", async (ev, contenu) => {
  await sauvegardeDuJour(contenu, true);
  return { ok:true };
});

ipcMain.handle("donnees:changerDossier", async (ev, info) => changerDossier(info));

/** Après un échec de lecture : garder une copie du fichier tel qu'il est. */
ipcMain.handle("donnees:mettreDeCote", async () => {
  try{ return { ok:true, nom: await mettreDeCote(fichierDonnees(), "illisible") }; }
  catch(e){ return { ok:false, erreur:e.message }; }
});

/** Les sauvegardes quotidiennes qui se lisent, de la plus récente à la plus
    ancienne (huit au plus), avec le nombre de dossiers de chacune. Celles
    qui ne contiennent que les données d'exemple jamais modifiées sont
    écartées : elles affichaient « 22 enfants » comme une vraie, et ne sont
    jamais ce qu'on cherche à reprendre. */
ipcMain.handle("donnees:sauvegardes", async () => {
  const dir = path.join(dossierDonnees(), DOSSIER_SAUV);
  let noms;
  try{ noms = (await fsp.readdir(dir)).filter(n => RE_SAUVEGARDE.test(n)).sort().reverse(); }
  catch(e){ return { ok:true, liste:[], total:0 }; }
  const liste = [];
  for(const nom of noms){
    const x = await examiner(path.join(dir, nom));
    if(x && x.lisible && !x.exemple) liste.push({ nom, jour:nom.slice(8, 18), nb:x.nb, modifieLe:x.modifieLe });
    if(liste.length >= 8) break;
  }
  return { ok:true, liste, total:noms.length };
});

ipcMain.handle("donnees:lireSauvegarde", async (ev, nom) => {
  // seul un nom de sauvegarde quotidienne est accepté : pas de chemin
  if(!RE_SAUVEGARDE.test(String(nom))) return { ok:false, erreur:"nom de sauvegarde inattendu" };
  try{
    return { ok:true, contenu: await fsp.readFile(path.join(dossierDonnees(), DOSSIER_SAUV, nom), "utf8") };
  }catch(e){ return { ok:false, erreur:e.message }; }
});

ipcMain.handle("donnees:ouvrirDossier", async () => {
  await fsp.mkdir(dossierDonnees(), { recursive:true }).catch(() => {});
  shell.openPath(dossierDonnees());
  return { ok:true };
});

/** Enregistrement d'un export (Word, CSV, sauvegarde JSON). */
ipcMain.handle("fichier:enregistrerSous", async (ev, nom, donnees, description) => {
  const ext = path.extname(nom).replace(".", "") || "*";
  const r = await dialog.showSaveDialog(fenetre, {
    title: "Enregistrer sous",
    defaultPath: path.join(app.getPath("documents"), nom),
    filters: [{ name: description || ext.toUpperCase(), extensions:[ext] },
              { name:"Tous les fichiers", extensions:["*"] }]
  });
  if(r.canceled || !r.filePath) return { ok:false, annule:true };
  try{
    const buf = typeof donnees === "string" ? Buffer.from(donnees, "utf8") : Buffer.from(donnees);
    await fsp.writeFile(r.filePath, buf);
    return { ok:true, chemin:r.filePath };
  }catch(e){ return { ok:false, erreur:e.message }; }
});

ipcMain.handle("demarrage:lire", async () => ({
  possible: app.isPackaged,
  voulu:    demarrageAutoVoulu(),
  actif:    demarrageAutoReel()
}));

ipcMain.handle("demarrage:ecrire", async (ev, actif) => {
  const c = lireConfig();
  c.demarrageAuto = !!actif;
  ecrireConfig(c);
  appliquerDemarrageAuto(!!actif);
  return { ok:true, actif: demarrageAutoReel() };
});

ipcMain.handle("fichier:choisir", async () => {
  const r = await dialog.showOpenDialog(fenetre, {
    title: "Choisir une sauvegarde à restaurer",
    defaultPath: dossierDonnees(),
    filters: [{ name:"Sauvegarde", extensions:["json"] }],
    properties: ["openFile"]
  });
  if(r.canceled || !r.filePaths.length) return { ok:false, annule:true };
  try{
    return { ok:true, contenu: await fsp.readFile(r.filePaths[0], "utf8"), chemin:r.filePaths[0] };
  }catch(e){ return { ok:false, erreur:e.message }; }
});

/* ------------------------------------------------------------- cycle de vie */

if(!app.requestSingleInstanceLock()){
  app.quit();
}else{
  app.on("second-instance", () => {
    if(fenetre){ if(fenetre.isMinimized()) fenetre.restore(); fenetre.focus(); }
  });
  app.whenReady().then(() => {
    // remis en place à chaque lancement : le chemin change quand le programme
    // est réinstallé ailleurs, ou quand la version portable est déplacée
    appliquerDemarrageAuto(demarrageAutoVoulu());
    construireMenu();
    creerFenetre();
    app.on("activate", () => { if(!BrowserWindow.getAllWindows().length) creerFenetre(); });
  });
  app.on("window-all-closed", () => { if(process.platform !== "darwin") app.quit(); });
}

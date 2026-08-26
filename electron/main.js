"use strict";

/* Processus principal : fenêtre, menu, et lecture / écriture des données.
   Toute l'interface vit dans app/index.html ; ce fichier lui donne accès
   au disque, sans aucune demande d'autorisation. */

const { app, BrowserWindow, ipcMain, dialog, shell, Menu } = require("electron");
const path = require("path");
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
      .filter(n => /^donnees-\d{4}-\d{2}-\d{2}\.json$/.test(n)).sort();
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

  // rien ne doit pouvoir emmener la fenêtre ailleurs que sur l'application
  const versNavigateur = url => { shell.openExternal(url); return { action:"deny" }; };
  fenetre.webContents.setWindowOpenHandler(({ url }) => versNavigateur(url));
  fenetre.webContents.on("will-navigate", (ev, url) => {
    if(!url.startsWith("file://")) { ev.preventDefault(); shell.openExternal(url); }
  });
}

function construireMenu(){
  const modele = [
    { label:"Fichier", submenu:[
      { label:"Ouvrir le dossier de données", click: () => shell.openPath(dossierDonnees()) },
      { label:"Changer de dossier de données…", click: () => changerDossier(true) },
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

/** depuisMenu : prévenir l'interface, qui n'est pas à l'origine de l'appel. */
async function changerDossier(depuisMenu){
  const r = await dialog.showOpenDialog(fenetre, {
    title: "Choisir le dossier où enregistrer les données",
    defaultPath: dossierDonnees(),
    properties: ["openDirectory", "createDirectory"],
    buttonLabel: "Utiliser ce dossier"
  });
  if(r.canceled || !r.filePaths.length) return null;
  const c = lireConfig();
  c.dossier = r.filePaths[0];
  ecrireConfig(c);
  if(depuisMenu && fenetre) fenetre.webContents.send("menu", "dossier-change");
  return c.dossier;
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
    await ecrireAtomique(fichierDonnees(), contenu);
    await sauvegardeDuJour(contenu);
    return { ok:true, dossier:dossierDonnees(), fichier:fichierDonnees(), heure:Date.now() };
  }catch(e){ return { ok:false, erreur:e.message }; }
});

ipcMain.handle("donnees:sauvegarder", async (ev, contenu) => {
  await sauvegardeDuJour(contenu, true);
  return { ok:true };
});

ipcMain.handle("donnees:changerDossier", async () => {
  const d = await changerDossier();
  return { ok:!!d, dossier:dossierDonnees(), fichier:fichierDonnees() };
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

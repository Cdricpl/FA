@echo off
rem ---------------------------------------------------------------
rem  Ouvre "Gestion de mes dossiers" dans sa propre fenetre,
rem  sans barre d'adresse ni onglets, comme un vrai programme.
rem  Placez ce fichier dans le meme dossier que index.html.
rem ---------------------------------------------------------------
setlocal

if not exist "%~dp0index.html" goto :absent

set "CHEMIN=%~dp0index.html"
set "URL=file:///%CHEMIN:\=/%"

set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if exist "%EDGE%" goto :edge
set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if exist "%EDGE%" goto :edge

set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if exist "%CHROME%" goto :chrome
set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if exist "%CHROME%" goto :chrome
set "CHROME=%LocalAppData%\Google\Chrome\Application\chrome.exe"
if exist "%CHROME%" goto :chrome

rem  Ni Edge ni Chrome trouves : on ouvre avec le navigateur par defaut.
rem  L'enregistrement dans un fichier n'est possible qu'avec Edge ou Chrome.
start "" "%~dp0index.html"
goto :fin

:edge
start "" "%EDGE%" --app="%URL%"
goto :fin

:chrome
start "" "%CHROME%" --app="%URL%"
goto :fin

:absent
echo.
echo   Le fichier index.html est introuvable.
echo   Ce lanceur doit se trouver dans le meme dossier que index.html.
echo.
pause

:fin
endlocal

# ShinedeHub

Frontend principal de l'ecosysteme Shinede, servi sur
`https://shinederu.ch/`.

Derniere mise a jour documentaire: 2026-09-25.

## Role

ShinedeHub est le nom du projet frontend. Le nom public affiche et indexe du
site est **Shinederu**.

Le site est le portail public et le tableau de bord utilisateur/admin du domaine
`shinederu.ch`.

## Statut produit

ShinedeHub est maintenu a la demande. Il n'est ni en pause ni archive: une
correction ou une petite evolution peut etre realisee lorsqu'un besoin concret
apparait. Il n'a pas de roadmap proactive permanente; les idees non priorisees
restent dans un parking et ne declenchent aucun travail.

Le site sert a:

- presenter l'accueil public, les chaines, la communaute et la bio;
- ouvrir les flux login, inscription, reset password et confirmation email;
- donner acces au dashboard apres connexion;
- afficher des tuiles vers les projets Shinede selon les permissions;
- administrer les utilisateurs via `/users`;
- administrer les annonces publiques via `/announcements`;
- administrer les projets, roles et permissions via `/permissions`.

Le projet est le frontend uniquement. Les donnees, sessions, permissions,
annonces et avatars passent par les APIs proprietaires sous
`https://api.shinederu.ch`.

## Repo et deploiement

- Repo source: `P:\DEV\GitHub\App-ShinedeHub`
- Remote: `https://github.com/Shinederu/App-ShinedeHub.git`
- Branche standard: `main`
- Build local: `P:\DEV\GitHub\App-ShinedeHub\dist`
- Runtime PROD: `P:\PROD\ShinedeHub`
- URL publique: `https://shinederu.ch/`
- Version publique affichee: `VITE_SHINEDEHUB_VERSION=0.3.3`
- Version package npm privee: `package.json` `0.2.2`

`P:\PROD\ShinedeHub` ne doit contenir que le runtime public genere par Vite:

- `index.html`
- `assets/`
- `img/`
- `robots.txt`
- `sitemap.xml`

Ne pas deployer `.git`, `node_modules`, `src/`, fichiers de config dev, tests,
caches, brouillons, docs internes ou secrets.

Les noms des assets Vite changent selon le contenu du build; `index.html`
indique les fichiers JavaScript et CSS courants.

## Endpoints

Le frontend consomme uniquement les APIs publiques sous `api.shinederu.ch`.

- Auth/users/permissions: `https://api.shinederu.ch/auth/`
- Site principal/annonces: `https://api.shinederu.ch/main-site/`

Important pour l'auth:

- `VITE_SHINEDEHUB_API_AUTH_URL` doit pointer vers
  `https://api.shinederu.ch/auth/index.php`.
- Les appels `PUT` ou `DELETE` vers le dossier `/auth/` peuvent etre bloques
  par Nginx avec `405 Not Allowed` avant PHP.
- Le client normalise l'URL dans `src/shared/auth/client.ts` pour ajouter
  `index.php` si besoin.

Les endpoints backend restent documentes dans les repos proprietaires:

- `Module-Auth-API`
- `App-ShinedeHub-API`
- `Module-ShinedeCore-PHP`

Regle de perimetre workspace: ne pas modifier ces repos depuis une tache
ShinedeHub frontend, sauf demande explicite de l'utilisateur.

## Authentification et permissions

Modules utilises:

- `@shinederu/auth-core`
- `@shinederu/auth-react`

Aliases Vite:

- `@` -> `src`
- `@shinederu/auth-core` -> `../Module-Auth-Core/src/index.ts`
- `@shinederu/auth-react` -> `../Module-Auth-React/src/index.ts`

Le contexte frontend est dans `src/shared/context/AuthContext.tsx`.
Il mappe `auth?action=me` vers des flags simples:

- `isLoggedIn`
- `is_admin`
- `can_manage_users`
- `can_manage_announcements`
- `can_access_box`
- `can_access_wake`

Permissions stables consommees:

- `core.super_admin`: acces `/permissions` et bypass dashboard.
- `auth.users_manage`: alimente `can_manage_users`.
- `main.announcements_manage`: alimente `can_manage_announcements`.
- `box.files_manage`: affiche ShinedeBox.
- `wake.devices_wake`: affiche ShinedeWake.
- `wake.devices_manage`: affiche ShinedeWake.
- `wake.users_manage`: affiche ShinedeWake.

Notation documentaire ecosysteme:

- `auth.users.manage`
- `main.announcements.manage`
- `box.files.manage`
- `wake.devices.wake`
- `wake.devices.manage`
- `wake.users.manage`

Le backend renvoie les permissions sous forme compatible avec le code actuel
(`users_manage`, `announcements_manage`, etc.). Ne pas changer ce mapping cote
frontend sans verifier le contrat `Module-Auth-API`.

Les roles se gerent dans `/permissions`; `/users` ne doit pas devenir le panneau
principal de gestion des roles.

## Routes

Routes publiques:

- `/`
- `/channels`
- `/community`
- `/aboutme`
- `/resetPassword`
- `/newPassword`
- `/newEmail`

Routes connectees:

- `/dashboard`
- `/profile`

Routes privilegiees:

- `/users`: `auth.users_manage` ou super-admin.
- `/announcements`: `main.announcements_manage` ou super-admin.
- `/permissions`: super-admin global.
- `/core-access`: redirection historique vers `/permissions`.

Les routes inconnues redirigent vers `/`.

## SEO et Search Console

Le site utilise une couche SEO route par route dans
`src/components/seo/Seo.tsx`.

Nom public:

- site: `Shinederu`
- projet/repo: `ShinedeHub`

Metadonnees gerees:

- `document.title`
- `meta description`
- `meta robots`
- canonical
- OpenGraph
- Twitter card
- JSON-LD `WebSite` sur `/`
- JSON-LD `Person` sur `/aboutme`

La page d'accueil est presentee publiquement comme
`Shinederu — Projets, streams et communaute`. Les titres et descriptions
destines aux moteurs et aux apercus sociaux doivent parler aux visiteurs et ne
doivent jamais exposer le nom technique `ShinedeHub`.

Pages indexables et presentes dans `public/sitemap.xml`:

- `/`
- `/aboutme`
- `/channels`
- `/community`

Routes non indexables via `robots=noindex, follow`:

- routes auth: `/resetPassword`, `/newPassword`, `/newEmail`
- routes connectees: `/dashboard`, `/profile`
- routes admin: `/users`, `/announcements`, `/permissions`, `/core-access`

`public/robots.txt` autorise le crawl et declare le sitemap:

- `https://shinederu.ch/sitemap.xml`

Apres deploiement SEO, actions conseillees dans Google Search Console:

- soumettre `https://shinederu.ch/sitemap.xml`;
- inspecter `https://shinederu.ch/` puis demander l'indexation;
- verifier les pages publiques principales avec l'outil d'inspection d'URL;
- suivre l'onglet Performance apres quelques jours/semaines.

Limite technique: ShinedeHub est une SPA Vite. Le HTML initial contient les
metadonnees d'accueil; les metadonnees par route sont appliquees apres rendu
React. Google sait rendre le JavaScript, mais un pre-render/SSR serait plus fort
si le SEO devenait un objectif majeur.

## Pages et composants principaux

- `src/App.tsx`: layout global, header, footer, reload auth au montage.
- `src/main.tsx`: providers React, auth et modales.
- `src/utils/routes.tsx`: routes selon auth/permissions.
- `src/pages/Homepage.tsx`: accueil public + annonces.
- `src/pages/Channels.tsx`: Twitch/YouTube, lecteur Twitch charge au clic.
- `src/pages/Community.tsx`: Discord, widget charge au clic.
- `src/pages/AboutMe.tsx`: bio publique responsive.
- `src/pages/Dashboard.tsx`: tuiles projets, visibles selon droits.
- `src/pages/Profile.tsx`: profil, avatar, email, reset password, zone sensible.
- `src/pages/Users.tsx`: management utilisateurs.
- `src/pages/Announcements.tsx`: CRUD annonces.
- `src/pages/CoreAccess.tsx`: projets, roles, permissions, assignations.
- `src/components/decoration/Title.tsx`: titres semantiques `h1` a `h6`.
- `src/components/cards/MenuCards.tsx`: tuiles dashboard avec mapping image explicite.
- `src/components/integrations/TwitchEmbed.tsx`: charge le script Twitch au clic.
- `src/components/modals/ModalLogin.tsx`: login/register, submit avec `Enter`.
- `src/components/modals/ModalMessage.tsx`: result/error/confirm/prompt.

## Dashboard

Tuiles:

- Profil -> `/profile`
- Utilisateurs -> `/users`, visible avec `can_manage_users`
- Annonces -> `/announcements`, visible avec `can_manage_announcements`
- Permissions -> `/permissions`, visible avec `is_admin`
- MelodyQuest -> `https://melodyquest.shinederu.ch/#/main`
- ShinedeBox -> `https://box.shinederu.ch/`, visible avec `can_access_box`
- ShinedeWake -> `https://wake.shinederu.ch/`, visible avec `can_access_wake`
- Ananas -> tuile inactive

Les images dashboard restent volontairement non compressees pour l'instant.
`MenuCards` n'essaie plus plusieurs URLs par tuile; les chemins sont explicites
pour eviter les probes/404 en cascade.
La tuile ShinedeBox utilise `public/img/dashboard/ShinedeBox.gif`.

## Utilisateurs

Contraintes pseudo:

- minimum: 4 caracteres
- maximum: 24 caracteres
- source frontend: `src/shared/auth/constraints.ts`
- la validation definitive reste cote API auth.

Page `/users`:

- liste les comptes;
- recherche par pseudo, email, ID, role projet ou motif de blocage;
- filtre tous/verifies/en attente/bloques/super-admins;
- affiche email, verification, statut actif/bloque, roles projet;
- permet de modifier pseudo, mot de passe, avatar;
- permet de bloquer/debloquer un compte avec motif admin.

Le panneau de gestion est limite a deux colonnes maximum pour rester lisible
dans la table.

Le blocage de compte est une responsabilite `Module-Auth-API`.
ShinedeHub ne modifie pas directement la base.

## Annonces

Frontend:

- public: `src/pages/Homepage.tsx`
- admin: `src/pages/Announcements.tsx`
- client API: `src/shared/mainSite/client.ts`

Actions API utilisees:

- `listPublicAnnouncements`
- `listAnnouncements`
- `createAnnouncement`
- `updateAnnouncement`
- `deleteAnnouncement`

Table backend documentee: `main_announcements`.

## Base de donnees

Le frontend ne se connecte jamais directement a MySQL.

Schema partage documente: `ShinedeCore`.

Tables impactant ShinedeHub via APIs:

- `users`
- `auth_sessions`
- `auth_password_reset_tokens`
- `auth_email_verification_tokens`
- `core_projects`
- `core_project_roles`
- `core_project_permissions`
- `core_project_role_permissions`
- `core_user_project_roles`
- `main_announcements`

Toute migration ou correction DB doit etre faite dans le repo backend
proprietaire explicitement ouvert par l'utilisateur.

## Dossiers runtime et fichiers partages

ShinedeHub n'a pas de stockage persistant propre.

- Avatars: API Auth.
- Sessions: API Auth.
- Annonces: API main-site.
- Permissions: API Auth/Core.

`P:\PROD\ShinedeHub` est public. Ne jamais y placer de secret ou de document
interne.

## Temps reel et evenements

ShinedeHub ne consomme et ne publie aucun flux Mercure actuellement.

HTTP suffit au besoin actuel et aucun panneau temps reel n'est planifie. Ne pas
ajouter de flux sans besoin explicite et observe. Si ce besoin apparait, les
commandes restent dans l'API proprietaire et l'etat reste relisible en HTTP.

## Dependances inter-projets

Dependances fonctionnelles:

- `Module-Auth-API`: auth, sessions, profil, utilisateurs, permissions.
- `Module-ShinedeCore-PHP`: modele de permissions `core_*` cote backend.
- `App-ShinedeHub-API`: annonces du site principal.
- `Module-Auth-Core`: client auth TypeScript.
- `Module-Auth-React`: provider/hooks React.

Liens externes dashboard:

- MelodyQuest
- ShinedeBox
- ShinedeWake

Regle importante: ShinedeHub ne doit pas modifier ces projets. Si une correction
semble necessaire ailleurs, la documenter et attendre une demande explicite.

## Dependances et outillage

Migration du 2026-09-25: React/React DOM 19.3, React Router 7.18,
Vite 8.3, plugin React 6.1, Tailwind CSS 4.3, TypeScript 6.0,
ESLint 10.11 et Lucide 1.48.
Les versions exactes sont verrouillees dans `package-lock.json`.

- ESLint utilise `eslint.config.js` (flat config), les recommandations
  TypeScript/React Hooks et les regles React Refresh de Vite.
- TypeScript reste en `~6.0.3`: `@typescript-eslint` 8.70.1 exige une version
  `<6.1.0`. Ne pas forcer TypeScript 7 tant que cette compatibilite manque.
- Les types Node suivent Node 24, utilise pour la validation, pas Node 26.
- Tailwind utilise `@tailwindcss/postcss` et un theme CSS dans `src/index.css`.
  Les anciens fichiers `.eslintrc.cjs` et `tailwind.config.js` sont retires.
  Autoprefixer n'est plus necessaire; PostCSS reste une dependance dev.
- NextUI, son plugin Tailwind, `react-icons`, `tailwind-merge`, l'utilitaire
  inutilise `src/utils/classNames.ts` ont ete retires lors du nettoyage initial.
- `src/index.css` preserve palette sRGB, ombres, transitions 250 ms et
  espacements historiques. Les utilitaires `stack-y-*` gardent les anciennes
  marges entre freres; ne pas les remplacer aveuglement par `space-y-*` v4.
- Vite deduplique React/React DOM pour les modules auth importes en source.
  Aucun module partage ni backend n'est modifie par cette migration.
- Le pictogramme Twitch existant est conserve en SVG local dans `AboutMe.tsx`:
  Lucide 1 ne fournit plus les icones de marques.

Node.js requis par l'outillage: `^22.13.0 || >=24.0.0`.
Environnement de validation: Node.js 24.16.0 et npm 11.13.0.
Executer les commandes depuis le PC Windows dans le repo DEV, y compris
lorsque `P:` est un lecteur reseau.

Sur Windows, Vite surveille les fichiers par polling (500 ms): les evenements
natifs du partage `P:` provoquent sinon une erreur `UNKNOWN: watch`.
Ce reglage ne concerne que le serveur de developpement, pas le site publie.

Navigateurs minimums pour Tailwind 4: Chrome/Edge 111, Safari 16.4,
Firefox 128. Voir le [guide de migration officiel](https://tailwindcss.com/docs/upgrade-guide).

Pour recreer les dependances a partir du verrouillage et les verifier:

```powershell
cd P:\DEV\GitHub\App-ShinedeHub
npm ci
npm run lint
npm run typecheck
npm run build
npm audit
npm audit --omit=dev
```

`npm run typecheck` verifie l'application, ses imports auth et la configuration
Vite. `npm run build` execute ce controle avant la compilation de production.

Validation de migration du 2026-09-25: installation neuve, lint sans erreur ni
avertissement, typecheck, build et demarrage dev valides sur le PC. Les deux
audits npm ne signalent aucune vulnerabilite. Un test navigateur ponctuel a
valide 22 controles a 1440/390 px, avec 36 captures et API simulees uniquement:
connexion/inscription, recuperation, droits dashboard, profil, utilisateurs,
annonces et permissions. Aucune ecriture de test sur les APIs reelles.

## Configuration

Fichiers suivis:

- `.env`
- `.env.production`

Ces fichiers ne doivent contenir que des variables Vite publiques.
Ne pas ajouter de secret serveur.

Variables par nom:

- `VITE_DEV_MODE`
- `VITE_SHINEDEHUB_VERSION`
- `VITE_SHINEDEHUB_API_AUTH_URL`
- `VITE_SHINEDEHUB_API_MAIN_SITE_URL`
- `VITE_TWITCH_CHANNEL_LINK`
- `VITE_YOUTUBE_CHANNEL_LINK`
- `VITE_YOUTUBE_CHANNEL_ID`
- `VITE_YOUTUBE_API_KEY`
- `VITE_DISCORD_INVITE`

Les anciens noms `VITE_SHINEDERU_*` sont lus en fallback par compatibilite, mais
les nouvelles configurations doivent utiliser `VITE_SHINEDEHUB_*`.

## Verifications

Commandes standard:

```powershell
cd P:\DEV\GitHub\App-ShinedeHub
npm run lint
npx tsc --noEmit
npm run build
```

Executer `npm run build` sur le PC Windows depuis ce repo, meme lorsque
les fichiers sont sur le partage reseau `P:`.

Smoke HTTP apres deploiement:

```powershell
curl.exe -sI https://shinederu.ch/
curl.exe -sI https://shinederu.ch/robots.txt
curl.exe -sI https://shinederu.ch/sitemap.xml
curl.exe -sI https://shinederu.ch/assets/<asset-js-courant>.js
curl.exe -sI https://shinederu.ch/assets/<asset-css-courant>.css
```

Smoke API, sans afficher de secret:

```powershell
Invoke-WebRequest -Uri 'https://api.shinederu.ch/main-site/?action=listPublicAnnouncements' -UseBasicParsing -TimeoutSec 20
```

`auth?action=listUsers` sans session doit renvoyer une erreur auth controlee,
pas une erreur fatale.

## Deploiement

Workflow:

1. Modifier dans `P:\DEV\GitHub\App-ShinedeHub`.
2. Linter, typer, builder.
3. Commit/push sur `main`.
4. Synchroniser uniquement `dist/` vers `P:\PROD\ShinedeHub`.

Commande de deploiement front:

```powershell
cd P:\DEV\GitHub\App-ShinedeHub
npm run build

if ($LASTEXITCODE -ne 0) { throw 'Build echoue: deploiement annule.' }

$distRoot = Resolve-Path -LiteralPath 'P:\DEV\GitHub\App-ShinedeHub\dist'
$distAssets = Resolve-Path -LiteralPath 'P:\DEV\GitHub\App-ShinedeHub\dist\assets'
$prodRoot = Resolve-Path -LiteralPath 'P:\PROD\ShinedeHub'
$prodAssetsPath = Join-Path $prodRoot.Path 'assets'
if (-not (Test-Path -LiteralPath $prodAssetsPath)) {
  New-Item -ItemType Directory -Path $prodAssetsPath | Out-Null
}
$prodAssets = Resolve-Path -LiteralPath $prodAssetsPath

Copy-Item -Path (Join-Path $distAssets.Path '*') -Destination $prodAssets.Path -Force -ErrorAction Stop
# Si des images ont change, copier les fichiers concernes de dist/img vers PROD/img ici.
Copy-Item -LiteralPath (Join-Path $distRoot.Path 'robots.txt') -Destination (Join-Path $prodRoot.Path 'robots.txt') -Force -ErrorAction Stop
Copy-Item -LiteralPath (Join-Path $distRoot.Path 'sitemap.xml') -Destination (Join-Path $prodRoot.Path 'sitemap.xml') -Force -ErrorAction Stop
Copy-Item -LiteralPath (Join-Path $distRoot.Path 'index.html') -Destination (Join-Path $prodRoot.Path 'index.html') -Force -ErrorAction Stop
```

Copier les assets et les images modifiees avant `index.html`, publie en dernier.
Conserver les anciens assets lors du deploiement; leur nettoyage est une
operation separee, apres verification qu'ils ne sont plus references.
Les images dashboard restent conservees telles quelles.

Ne pas copier `README.md`, `REPRISE.md`, `AGENTS.md`, `src/` ou `node_modules`
en production: ce ne sont pas des artefacts runtime.

## Notes de reprise

Lire `REPRISE.md` avant une reprise froide.

Lire aussi:

- `P:\AGENTS.md`
- `P:\ECOSYSTEM.md`
- `P:\DEV\GitHub\README.md`
- `P:\DEV\GitHub\AGENTS.md`
- `AGENTS.md` du projet courant

## Limites connues

- Sur mobile 390 px, l'onglet Utilisateurs de `/permissions` deborde deja
  horizontalement avant la migration; ce defaut preexistant reste distinct.
- Plusieurs textes historiques dans `CoreAccess.tsx` restent sans accents; cela
  n'impacte pas le fonctionnement.
- `src/assets/react.svg` semble etre un reliquat Vite; a confirmer avant
  suppression.
- Les images dashboard sont lourdes mais conservees volontairement.
- `updateUserRole` existe encore cote auth pour compatibilite, mais les roles
  doivent etre geres via `/permissions`.
- Aucun framework de test automatique n'est configure; les verifications sont
  lint/build/smoke manuel.

# Reprise - ShinedeHub

Derniere mise a jour: 2026-06-26.

Projet: **ShinedeHub**
Repo: `P:\DEV\GitHub\App-ShinedeHub`
Runtime: `P:\PROD\ShinedeHub`
URL: `https://shinederu.ch/`

Ce document sert a reprendre le projet apres une pause sans devoir relire toute
la conversation Codex historique.

## Etat global

ShinedeHub est le site principal de l'ecosysteme Shinede.

Etat observe:

- frontend React/Vite deploye et fonctionnel;
- version publique affichee: `0.3.3`;
- Git propre avant cette mise a jour documentaire;
- dernier deploiement runtime connu: 2026-06-16;
- PROD contient uniquement `index.html` et deux assets Vite hors dossier `img`;
- les images dashboard lourdes sont conservees volontairement;
- aucun flux Mercure n'est utilise par ce frontend.

Le projet principal est stable mais pas considere "termine". Il sert surtout de
portail, dashboard et zone admin.

## Perimetre de reprise

Par defaut, une reprise ShinedeHub concerne uniquement:

- `P:\DEV\GitHub\App-ShinedeHub`
- `P:\PROD\ShinedeHub`

Ne pas modifier les repos suivants sans demande explicite:

- `Module-Auth-API`
- `Module-ShinedeCore-PHP`
- `Module-Auth-Core`
- `Module-Auth-React`
- `App-ShinedeHub-API`
- autres apps/API Shinede

Si un bug frontend revele un probleme backend, documenter le constat et demander
l'ouverture explicite du repo backend concerne.

## But produit

ShinedeHub sert a:

- presenter Shinederu, les chaines et la communaute;
- afficher les annonces publiques du site principal;
- ouvrir les flux auth utilisateur;
- centraliser un dashboard apres connexion;
- exposer des raccourcis vers MelodyQuest, ShinedeBox et ShinedeWake;
- administrer les utilisateurs;
- administrer les annonces;
- administrer les permissions centralisees.

## Chemins importants

Frontend:

- source: `P:\DEV\GitHub\App-ShinedeHub`
- build: `P:\DEV\GitHub\App-ShinedeHub\dist`
- prod: `P:\PROD\ShinedeHub`

Backends dependants, a ne pas modifier sans perimetre explicite:

- auth/users/permissions: `P:\DEV\GitHub\Module-Auth-API`
- API main-site/annonces: `P:\DEV\GitHub\App-ShinedeHub-API`
- socle permissions PHP: `P:\DEV\GitHub\Module-ShinedeCore-PHP`
- client auth TS: `P:\DEV\GitHub\Module-Auth-Core`
- bindings auth React: `P:\DEV\GitHub\Module-Auth-React`

Runtime API:

- `P:\PROD\API\auth`
- `P:\PROD\API\main-site`
- `P:\PROD\API\core`

## URLs

- Site: `https://shinederu.ch/`
- Auth API: `https://api.shinederu.ch/auth/`
- Auth front controller conseille: `https://api.shinederu.ch/auth/index.php`
- Main-site API: `https://api.shinederu.ch/main-site/`
- MelodyQuest: `https://melodyquest.shinederu.ch/#/main`
- ShinedeBox: `https://box.shinederu.ch/`
- ShinedeWake: `https://wake.shinederu.ch/`

## Stack frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- lucide-react
- `@shinederu/auth-core`
- `@shinederu/auth-react`

Scripts:

```powershell
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm run preview
```

`npm run build` lance `tsc && vite build`.

## Architecture

Entrees:

- `src/main.tsx`: providers.
- `src/App.tsx`: layout global et reload auth initial.
- `src/index.css`: Tailwind.

Routing:

- `src/utils/routes.tsx`: routes selon auth et permissions.

Contextes:

- `src/shared/context/AuthContext.tsx`
- `src/shared/context/ModalContext.tsx`

Clients API:

- `src/shared/auth/client.ts`
- `src/shared/mainSite/client.ts`

Pages:

- `Homepage.tsx`
- `Channels.tsx`
- `Community.tsx`
- `AboutMe.tsx`
- `Dashboard.tsx`
- `Profile.tsx`
- `Users.tsx`
- `Announcements.tsx`
- `CoreAccess.tsx`
- `ResetPassword.tsx`
- `NewPassword.tsx`
- `NewEmail.tsx`

Composants sensibles:

- `ModalLogin.tsx`: login/register et reset entrypoint.
- `ModalMessage.tsx`: result/error/confirm/prompt.
- `MenuCards.tsx`: tuiles dashboard.
- `Title.tsx`: titres semantiques.
- `TwitchEmbed.tsx`: chargement a la demande.
- `YouTubeEmbed.tsx`: apercu image.

## Variables d'environnement

Fichiers:

- `.env`
- `.env.production`

Variables attendues par nom:

- `VITE_DEV_MODE`
- `VITE_SHINEDEHUB_VERSION`
- `VITE_SHINEDEHUB_API_AUTH_URL`
- `VITE_SHINEDEHUB_API_MAIN_SITE_URL`
- `VITE_TWITCH_CHANNEL_LINK`
- `VITE_YOUTUBE_CHANNEL_LINK`
- `VITE_YOUTUBE_CHANNEL_ID`
- `VITE_YOUTUBE_API_KEY`
- `VITE_DISCORD_INVITE`

Ne pas recopier les valeurs dans une reponse ou une doc publique.

Compatibilite:

- les anciens `VITE_SHINEDERU_*` restent lus en fallback par certains fichiers;
- les nouvelles configurations doivent utiliser `VITE_SHINEDEHUB_*`.

## Auth

Le frontend utilise `@shinederu/auth-react`.

Au montage:

1. `ExternalAuthProvider` fournit le client auth.
2. `AuthProvider` local mappe l'utilisateur en flags pratiques.
3. `App.tsx` appelle `reload()` une seule fois grace a `hasLoadedAuth`.

Point historique:

- une boucle de reload auth avait fait ramer Firefox;
- `App.tsx` utilise maintenant un `useRef` pour eviter les reloads repetes.

Mode dev:

- si `VITE_DEV_MODE=true`, `AuthContext` injecte un utilisateur local de test;
- ce mode ne doit pas etre actif en production.

## Permissions

Flags frontend:

- `is_admin`
- `can_manage_users`
- `can_manage_announcements`
- `can_access_box`
- `can_access_wake`

Mapping actuel:

- `is_admin`: `user.is_admin`, `users.role='admin'` ou `project_access.is_global_admin`.
- `can_manage_users`: super-admin ou permission auth `users_manage`.
- `can_manage_announcements`: super-admin ou permission main `announcements_manage`.
- `can_access_box`: super-admin ou permission box `files_manage`.
- `can_access_wake`: super-admin ou permissions wake `devices_wake`,
  `devices_manage` ou `users_manage`.

Notation de documentation:

- `auth.users.manage`
- `main.announcements.manage`
- `box.files.manage`
- `wake.devices.wake`
- `wake.devices.manage`
- `wake.users.manage`

Ne pas changer ce mapping sans verifier `Module-Auth-API`.

## Routes et acces

Publiques:

- `/`
- `/channels`
- `/community`
- `/aboutme`
- `/resetPassword`
- `/newPassword`
- `/newEmail`

Connectees:

- `/dashboard`
- `/profile`

Protegees:

- `/users`: `can_manage_users`
- `/announcements`: `can_manage_announcements`
- `/permissions`: `is_admin`
- `/core-access`: redirection vers `/permissions`

Fallback:

- `*` redirige vers `/`.

## Dashboard

Tuiles:

- Profil: toujours visible connecte.
- Utilisateurs: visible avec `can_manage_users`.
- Annonces: visible avec `can_manage_announcements`.
- Permissions: visible avec `is_admin`.
- MelodyQuest: visible pour tous les comptes connectes.
- ShinedeBox: visible avec `can_access_box`.
- ShinedeWake: visible avec `can_access_wake`.
- Ananas: inactive.

Images:

- Les images dans `public/img/dashboard` sont conservees telles quelles.
- `MenuCards.tsx` utilise un mapping explicite et ne teste plus plusieurs URLs.
- Ne pas compresser ou remplacer ces images sans demande explicite.

## Pages publiques

Accueil:

- texte d'introduction court;
- annonces publiques;
- cartes Twitch/YouTube.

Channels:

- Twitch charge son lecteur uniquement au clic;
- YouTube affiche une image locale;
- pas de timer de rotation automatique.

Community:

- Discord charge son widget uniquement au clic;
- pas de timer de rotation automatique.

AboutMe:

- bio mise a jour apres obtention du CFC;
- layout responsive valide desktop/mobile;
- un seul `h1` visible attendu.

## Utilisateurs

Fichier: `src/pages/Users.tsx`.

Fonctions:

- listing utilisateurs;
- stats rapides;
- recherche client;
- filtres;
- panneau admin par utilisateur;
- modification pseudo;
- changement mot de passe;
- upload avatar;
- blocage/deblocage avec motif.

Contraintes:

- pseudo min 4, max 24;
- source frontend: `src/shared/auth/constraints.ts`;
- validation definitive: backend auth.

Actions API utilisees:

- `listUsers`
- `updateUserAdmin`
- `updateUserAvatarAdmin`

Limite:

- recherche/pagination sont encore cote client;
- prevoir pagination serveur si le nombre de comptes grossit.

## Annonces

Fichier admin: `src/pages/Announcements.tsx`.
Fichier public: `src/pages/Homepage.tsx`.
Client: `src/shared/mainSite/client.ts`.

Actions:

- `listPublicAnnouncements`
- `listAnnouncements`
- `createAnnouncement`
- `updateAnnouncement`
- `deleteAnnouncement`

Endpoint: `https://api.shinederu.ch/main-site/`.
Table backend: `main_announcements`.

## Permissions

Fichier: `src/pages/CoreAccess.tsx`.

Route: `/permissions`.

Fonctions:

- lister les projets declares;
- creer/modifier projets;
- creer/modifier roles;
- creer/modifier permissions;
- associer permissions a un role;
- associer roles projet a un utilisateur.

Attention technique:

- `CoreAccess.tsx` utilise des refs pour auth/modal;
- eviter de remettre `auth` ou `modalCtx` comme dependances directes de
  `loadOverview`;
- cela peut relancer `listCoreAccess` en boucle via l'etat `isLoading` du client
  auth partage.

## Reset password et email

Routes:

- `/resetPassword`
- `/newPassword`
- `/newEmail`

Historique:

- le reset password avait echoue avec `405 Not Allowed` quand l'URL auth ciblait
  `/auth/` au lieu de `/auth/index.php`;
- `src/shared/auth/client.ts` normalise maintenant l'URL.

## Base de donnees

Le frontend ne touche pas MySQL directement.

Tables backend qui impactent ShinedeHub:

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

Migrations backend connues:

- `Module-ShinedeCore-PHP/sql/001_core_project_access.sql`
- `Module-Auth-API/sql/001_auth_prefix_tables.sql`
- `Module-Auth-API/sql/002_user_account_moderation.sql`
- `App-ShinedeHub-API/sql/001_main_site_announcements.sql`
- `App-ShinedeHub-API/sql/002_rename_main_announcements.sql`

Ne pas appliquer de migration depuis ce repo frontend.

## Deploiement

Deploiement frontend uniquement:

```powershell
cd P:\DEV\GitHub\App-ShinedeHub
npm run lint
npx tsc --noEmit
npm run build
```

Puis copier `dist/` vers `P:\PROD\ShinedeHub`.

Commande recommandee:

```powershell
$distRoot = Resolve-Path -LiteralPath 'P:\DEV\GitHub\App-ShinedeHub\dist'
$distAssets = Resolve-Path -LiteralPath 'P:\DEV\GitHub\App-ShinedeHub\dist\assets'
$prodRoot = Resolve-Path -LiteralPath 'P:\PROD\ShinedeHub'
$prodAssetsPath = Join-Path $prodRoot.Path 'assets'
if (-not (Test-Path -LiteralPath $prodAssetsPath)) {
  New-Item -ItemType Directory -Path $prodAssetsPath | Out-Null
}
$prodAssets = Resolve-Path -LiteralPath $prodAssetsPath

Copy-Item -LiteralPath (Join-Path $distRoot.Path 'index.html') -Destination (Join-Path $prodRoot.Path 'index.html') -Force
Copy-Item -Path (Join-Path $distAssets.Path '*') -Destination $prodAssets.Path -Force

$currentAssetNames = @(Get-ChildItem -LiteralPath $distAssets.Path -File | ForEach-Object { $_.Name })
Get-ChildItem -LiteralPath $prodAssets.Path -File |
  Where-Object { $currentAssetNames -notcontains $_.Name } |
  ForEach-Object { Remove-Item -LiteralPath $_.FullName -Force }
```

Ne pas utiliser `Copy-Item -LiteralPath ...\*`: PowerShell ne developpe pas le
wildcard en `-LiteralPath`.

Ne pas deployer les docs projet en PROD.

## Verifications de reprise

Git:

```powershell
git -c safe.directory=* -C P:\DEV\GitHub\App-ShinedeHub status --short --branch
```

Checks front:

```powershell
cd P:\DEV\GitHub\App-ShinedeHub
npm run lint
npx tsc --noEmit
npm run build
```

Smoke HTTP:

```powershell
curl.exe -sI https://shinederu.ch/
curl.exe -sI https://shinederu.ch/assets/index-CCH_IVkH.js
curl.exe -sI https://shinederu.ch/assets/index-Dz72SXOh.css
```

Smoke manuel public:

- ouvrir `/`;
- ouvrir `/aboutme`;
- ouvrir `/channels`;
- verifier que le lecteur Twitch n'est pas charge avant clic;
- ouvrir `/community`;
- verifier que le widget Discord n'est pas charge avant clic;
- tester mobile pour absence d'overflow horizontal.

Smoke utilisateur:

- login;
- ouvrir `/dashboard`;
- verifier les tuiles selon permissions;
- ouvrir `/profile`;
- modifier pseudo dans la limite 4-24;
- tester upload avatar si besoin.

Smoke admin utilisateurs:

- ouvrir `/users`;
- rechercher/filtrer;
- modifier pseudo d'un compte de test;
- modifier mot de passe d'un compte de test;
- remplacer avatar d'un compte de test;
- bloquer/debloquer un compte de test.

Smoke admin annonces:

- ouvrir `/announcements`;
- creer une annonce de test;
- verifier l'accueil;
- modifier puis supprimer l'annonce.

Smoke super-admin:

- ouvrir `/permissions`;
- charger overview;
- verifier projets/roles/permissions;
- ne modifier qu'un role/assignation non critique.

## Historique recent

Commits front recents:

- `17274b9` Fix page heading semantics
- `e251712` Improve ShinedeHub UI polish
- `c5dc0f2` Reduce repetition in about page copy
- `471f380` Restore French accents on about page
- `c6e0f2a` Refresh about page biography
- `c296af1` Fix managed user panel layout
- `f96a413` Add admin password management and Box dashboard tile
- `c4f7edf` Fix auth front controller URL
- `2ca2545` Gate Wake dashboard tile by access
- `7c8669b` Prevent repeated auth reloads

Changements fonctionnels importants:

- bio `/aboutme` remise a jour: CFC obtenu, streams moins centraux, projets plus
  presents;
- page `/users` transformee en panneau de management utilisateur;
- admins peuvent modifier pseudo, mot de passe, avatar et blocage;
- ShinedeBox ajoute au dashboard;
- ShinedeWake visible seulement selon permission;
- URL Auth forcee vers `index.php` pour eviter les 405;
- reload auth limite pour eviter boucle JS;
- timers UI inutiles retires;
- Twitch/Discord charges a la demande;
- titres HTML corriges.

## Limites connues

- Pas de tests automatises applicatifs.
- `CoreAccess.tsx` contient encore des libelles historiques sans accents.
- Certaines dependances semblent potentiellement inutilisees:
  - `react-icons`
  - `@nextui-org/react`
  - `@nextui-org/theme`
- `src/assets/react.svg` semble etre un reliquat Vite.
- Les images dashboard sont lourdes mais conservees volontairement.
- `updateUserRole` reste une compatibilite cote auth; utiliser `/permissions`
  pour les roles.
- Pagination `/users` cote client uniquement.
- Pas de journal d'audit admin pour `/users`.

## Idees pour future reprise

- Ajouter audit log admin pour `/users`.
- Ajouter pagination/recherche serveur pour `/users`.
- Nettoyer dependances inutilisees apres verification.
- Nettoyer `src/assets/react.svg` si confirme inutilise.
- Harmoniser les libelles FR de `CoreAccess.tsx`.
- Ajouter tests d'integration API cote repos backend, si ces projets sont ouverts
  explicitement.
- Ajouter checks e2e legers sur login/dashboard/pages publiques.
- Ajouter metadata route par route (`document.title`, description) si SEO plus
  important plus tard.

## Regle finale pour le prochain agent

Avant toute action, se poser la question:

```text
Est-ce que je suis en train de modifier un autre projet que App-ShinedeHub?
```

Si oui, s'arreter, documenter le besoin, et attendre une demande explicite.

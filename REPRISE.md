# Reprise - Shinederu.ch main

Etat: projet principal mis en pause le 2026-06-12 dans un etat deploye et fonctionnel.

Ce document sert de point de reprise pour le site principal `https://shinederu.ch/`.
Il couvre le frontend `Shinederu/` et les morceaux API directement utilises par ce site:
`API/auth`, `API/main-site` et `API/core`.

## But du projet

Le site principal est le portail public et admin de l'ecosysteme Shinederu.

Il sert a:

- presenter la page d'accueil, les chaines, la communaute et la page "A propos";
- gerer l'authentification commune du domaine `.shinederu.ch`;
- donner acces au dashboard utilisateur/admin;
- administrer les annonces visibles sur l'accueil;
- administrer les utilisateurs de maniere legere;
- administrer les permissions centralisees `core_*`;
- exposer des tuiles vers les autres projets actifs comme MelodyQuest et ShinedeWake.

## Repos et chemins

Frontend principal:

- repo local: `P:\DEV\GitHub\Shinederu`
- remote observe: `https://github.com/Shinederu/Shinederu.lol.git`
- build prod: `P:\DEV\GitHub\Shinederu\dist`
- dossier deploye documente: `P:\PROD\Shinederu`

API partagee:

- repo local: `P:\DEV\GitHub\API`
- remote: `https://github.com/Shinederu/shinederu-api.git`
- modules concernes:
  - `API/auth`
  - `API/main-site`
  - `API/core`
- dossier deploye documente: `P:\PROD\API`

Important infra:

- `P:\PROD` est le dossier de prod documente.
- `Z:\Nginx\www` peut etre le volume `/var/www` effectivement servi par Docker. En cas d'ecart entre fichiers copies et URL publique, comparer `P:\PROD` et `Z:\Nginx\www`.
- Ne jamais copier de secrets dans les repos ni dans `P:\PROD`.

## URLs live

- Front principal: `https://shinederu.ch/`
- Auth API: `https://api.shinederu.ch/auth/`
- Main site API: `https://api.shinederu.ch/main-site/`
- MelodyQuest front: `https://melodyquest.shinederu.ch/#/main`
- ShinedeWake front: `https://wake.shinederu.ch/`

## Architecture frontend

Stack:

- React 18
- TypeScript
- Vite
- Tailwind
- `@shinederu/auth-core`
- `@shinederu/auth-react`

Aliases importants dans `vite.config.ts`:

- `@` -> `src`
- `@shinederu/auth-core` -> `../shinederu-auth-core/src/index.ts`
- `@shinederu/auth-react` -> `../shinederu-auth-react/src/index.ts`

Ces aliases permettent de travailler avec les libs auth locales sans publier de package.

Fichiers importants:

- `src/App.tsx`: layout global, header/footer, recharge auth au montage.
- `src/utils/routes.tsx`: routes autorisees selon l'etat auth et les permissions.
- `src/shared/context/AuthContext.tsx`: mapping de `auth?action=me` vers les flags frontend.
- `src/shared/auth/client.ts`: client auth partage.
- `src/shared/auth/constraints.ts`: limites frontend du pseudo.
- `src/shared/mainSite/client.ts`: client des annonces `API/main-site`.
- `src/components/modals/ModalLogin.tsx`: login/register.
- `src/pages/Dashboard.tsx`: dashboard et tuiles projets.
- `src/pages/Users.tsx`: annuaire et management leger des comptes.
- `src/pages/CoreAccess.tsx`: panneau `/permissions`.
- `src/pages/Announcements.tsx`: gestion des annonces.
- `src/pages/Profile.tsx`: profil utilisateur.

Routes principales:

- `/`: accueil public, annonces publiques, liens Twitch/YouTube/Discord.
- `/channels`, `/community`, `/aboutme`: pages publiques.
- `/dashboard`: dashboard apres connexion.
- `/profile`: profil utilisateur.
- `/users`: annuaire + management leger des comptes, droit `auth.users.manage`.
- `/announcements`: gestion annonces, droit `main.announcements.manage`.
- `/permissions`: gestion projets/roles/permissions, reserve a `core.super_admin`.
- `/core-access`: redirection de compatibilite vers `/permissions`.
- `/resetPassword`, `/newPassword`, `/newEmail`: flux email/password.

## Dashboard

Tuiles actives:

- `Profile` -> `/profile`
- `Utilisateurs` -> `/users`, visible avec `auth.users.manage`
- `Annonces` -> `/announcements`, visible avec `main.announcements.manage`
- `Permissions` -> `/permissions`, visible pour super-admin global
- `MelodyQuest` -> `https://melodyquest.shinederu.ch/#/main`
- `ShinedeWake` -> `https://wake.shinederu.ch/`

Tuile inactive:

- `Ananas`

## Auth et utilisateurs

Le frontend s'appuie sur `auth?action=me`.
Le backend renvoie `user.project_access` avec les roles et permissions projet.

Regles actuelles:

- pseudo: minimum 4 caracteres, maximum 24 caracteres;
- limite frontend: `src/shared/auth/constraints.ts`;
- limite backend: `API/auth/config/config.php`;
- login/register peut etre soumis au clavier avec `Enter`;
- l'ancien `users.role = 'admin'` existe encore comme fallback de transition;
- les vrais droits applicatifs sont dans `core_*`.

Page `/users`:

- recherche par pseudo, email, ID, role projet ou motif de blocage;
- filtres: tous, verifies, en attente, bloques, super-admins;
- compteurs: comptes, emails verifies, comptes bloques, super-admins;
- affiche avatar, statut email, statut actif/bloque, roles projets;
- panneau `Gerer` par utilisateur:
  - modifier le pseudo;
  - remplacer l'avatar;
  - bloquer/debloquer le compte avec motif.

Blocage de compte:

- stocke dans `users.is_banned`, `users.banned_at`, `users.banned_by_user_id`, `users.ban_reason`;
- un compte bloque ne peut plus se connecter;
- les sessions de l'utilisateur sont supprimees au moment du blocage;
- `AuthMiddleware` rejette aussi les sessions restantes d'un compte bloque.

Actions API admin:

- `GET auth?action=listUsers`
- `PUT auth` avec `action=updateUserAdmin`
- `POST auth` avec `action=updateUserAvatarAdmin`
- `PUT auth` avec `action=updateUserRole` reste un chemin de compatibilite, mais les roles doivent etre geres via `/permissions`.

## Permissions centralisees

Le modele de droits est stocke dans les tables `core_*`.

Panneau frontend:

- route: `/permissions`
- fichier: `src/pages/CoreAccess.tsx`
- reserve aux super-admins.

Endpoints API:

- `GET auth?action=listCoreAccess`
- `PUT auth` avec:
  - `saveCoreProject`
  - `saveCoreRole`
  - `saveCorePermission`
  - `setCoreRolePermissions`
  - `setCoreUserProjectRoles`

Permissions utiles pour le site principal:

- `core.super_admin`: acces global au panneau permissions.
- `auth.users.manage`: acces `/users` et actions admin utilisateurs.
- `main.announcements.manage`: acces `/announcements`.

## Annonces du site principal

Backend:

- module: `API/main-site`
- endpoint: `https://api.shinederu.ch/main-site/`
- table cible: `main_announcements`

Frontend:

- affichage public: `src/pages/Homepage.tsx`
- carte: `src/components/cards/ActusCards.tsx`
- admin: `src/pages/Announcements.tsx`
- client API: `src/shared/mainSite/client.ts`

Actions API:

- public:
  - `GET action=listPublicAnnouncements`
- admin avec `main.announcements.manage`:
  - `GET action=listAnnouncements`
  - `POST action=createAnnouncement`
  - `PUT action=updateAnnouncement`
  - `DELETE action=deleteAnnouncement`

## Base de donnees

Instance partagee:

- hote: `192.168.10.10`
- port: `3306`
- schema: `ShinedeCore`

Secrets:

- les identifiants applicatifs sont dans `API/auth/.env`;
- les acces admin/infra sont documentes dans `P:\DEV\Access`;
- ne jamais recopier les secrets dans les repos ou les reponses.

Tables liees au site principal:

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

Migrations importantes:

- `API/core/sql/001_core_project_access.sql`
- `API/auth/sql/001_auth_prefix_tables.sql`
- `API/auth/sql/002_user_account_moderation.sql`
- `API/main-site/sql/001_main_site_announcements.sql`
- `API/main-site/sql/002_rename_main_announcements.sql`

Etat au moment de la pause:

- `auth/sql/002_user_account_moderation.sql` a ete appliquee en production le 2026-06-12.
- Les colonnes `ban_reason`, `banned_at`, `banned_by_user_id`, `is_banned` existent dans `users`.

Pour verifier la migration sans afficher de secrets:

```powershell
php -r "require_once 'P:/DEV/GitHub/API/auth/vendor/autoload.php'; Dotenv\Dotenv::createImmutable('P:/DEV/GitHub/API/auth')->safeLoad(); `$dsn=sprintf('%s:host=%s;port=%s;dbname=%s;charset=utf8mb4', `$_ENV['DB_TYPE'] ?? 'mysql', '192.168.10.10', `$_ENV['DB_PORT'] ?? '3306', `$_ENV['DB_NAME'] ?? 'ShinedeCore'); `$pdo=new PDO(`$dsn, `$_ENV['DB_USER'] ?? 'root', `$_ENV['DB_PASS'] ?? '', [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]); `$stmt=`$pdo->prepare('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME IN (?,?,?,?) ORDER BY COLUMN_NAME'); `$stmt->execute(['users','is_banned','banned_at','banned_by_user_id','ban_reason']); echo implode(', ', `$stmt->fetchAll(PDO::FETCH_COLUMN));"
```

Pour appliquer une migration DDL en reprise:

- utiliser une migration SQL idempotente;
- utiliser l'acces MySQL admin local documente dans `P:\DEV\Access`;
- ne pas utiliser le compte applicatif `authenticator` pour `ALTER`, il n'a pas les droits DDL.

## Deploiement

Workflow standard:

1. Modifier dans `P:\DEV\GitHub\...`.
2. Tester/build.
3. Commit et push sur `main`.
4. Copier vers `P:\PROD`.
5. Verifier l'URL publique.
6. Si l'URL ne reflete pas `P:\PROD`, comparer avec `Z:\Nginx\www`.

Frontend:

```powershell
cd P:\DEV\GitHub\Shinederu
npm run build
Copy-Item -LiteralPath 'P:\DEV\GitHub\Shinederu\dist\index.html' -Destination 'P:\PROD\Shinederu\index.html' -Force
Copy-Item -LiteralPath 'P:\DEV\GitHub\Shinederu\dist\assets' -Destination 'P:\PROD\Shinederu' -Recurse -Force
Copy-Item -LiteralPath 'P:\DEV\GitHub\Shinederu\dist\img' -Destination 'P:\PROD\Shinederu' -Recurse -Force
```

API:

- copier uniquement les modules/fichiers touches depuis `P:\DEV\GitHub\API` vers `P:\PROD\API`;
- ne pas ecraser `.env`, `vendor/`, logs, fichiers runtime;
- pour `auth`, verifier `vendor/` en production si Composer a change.

## Verifications de reprise

Git:

```powershell
git -c safe.directory=* -C P:\DEV\GitHub\Shinederu status --short --branch
git -c safe.directory=* -C P:\DEV\GitHub\API status --short --branch
git -c safe.directory=* -C P:\DEV\GitHub\shinederu-auth-core status --short --branch
git -c safe.directory=* -C P:\DEV\GitHub\shinederu-auth-react status --short --branch
```

Build front:

```powershell
cd P:\DEV\GitHub\Shinederu
npm run build
```

Lint PHP:

```powershell
Get-ChildItem P:\DEV\GitHub\API\auth -Recurse -Filter *.php | ? { $_.FullName -notmatch '\\vendor\\' } | % { php -l $_.FullName }
Get-ChildItem P:\DEV\GitHub\API\main-site -Recurse -Filter *.php | % { php -l $_.FullName }
Get-ChildItem P:\DEV\GitHub\API\core -Recurse -Filter *.php | % { php -l $_.FullName }
```

Smoke public:

```powershell
Invoke-WebRequest -Uri 'https://shinederu.ch/' -UseBasicParsing -TimeoutSec 20
Invoke-WebRequest -Uri 'https://api.shinederu.ch/auth/?action=listUsers' -UseBasicParsing -TimeoutSec 20
Invoke-WebRequest -Uri 'https://api.shinederu.ch/main-site/?action=listPublicAnnouncements' -UseBasicParsing -TimeoutSec 20
```

Resultat attendu:

- `https://shinederu.ch/`: HTTP 200.
- `auth?action=listUsers` sans session: HTTP 401 JSON, pas d'erreur fatale.
- `main-site?action=listPublicAnnouncements`: HTTP 200 JSON.

## Scenarios manuels a tester apres reprise

Anonyme:

- ouvrir l'accueil;
- ouvrir le modal connexion/inscription;
- verifier que `Enter` soumet login/register;
- verifier que le pseudo d'inscription est limite a 24 caracteres.

Utilisateur connecte:

- ouvrir `/dashboard`;
- ouvrir `/profile`;
- modifier son pseudo dans la limite 4-24;
- changer son avatar.

Admin `auth.users.manage`:

- ouvrir `/users`;
- filtrer/rechercher un compte;
- modifier le pseudo d'un compte de test;
- remplacer l'avatar d'un compte de test;
- bloquer puis debloquer un compte de test;
- verifier qu'un compte bloque ne peut pas se connecter.

Admin `main.announcements.manage`:

- ouvrir `/announcements`;
- creer/modifier/supprimer une annonce de test;
- verifier l'affichage sur l'accueil.

Super-admin:

- ouvrir `/permissions`;
- verifier la liste projets/roles/permissions;
- modifier une assignation non critique puis revenir en arriere.

## Etat des derniers changements utiles

Derniers changements fonctionnels du site principal avant pause:

- `Shinederu` `40ecdd1`: actions de management utilisateur dans `/users`.
- `API` `cb82b2d`: controles de moderation compte cote Auth.
- `Shinederu` `4a90ff7`: refonte `/users` en annuaire.
- `API` `c14cc2e`: enrichissement `listUsers`.
- `Shinederu` `36245af`: tuile ShinedeWake.
- `Shinederu` `8e0e333`: documentation tuile ShinedeWake.

Des commits posterieurs peuvent exister pour d'autres projets dans le repo `API` (ex: MelodyQuest ou Arcadia). Toujours verifier `git log`.

## Limites connues

- `npm run lint` echoue encore sur des problemes historiques hors des derniers changements:
  - `src/shared/context/ModalContext.tsx`: `Unexpected any`;
  - warnings `react-hooks/exhaustive-deps` dans `App.tsx`, `Announcements.tsx`, `CoreAccess.tsx`, `NewEmail.tsx`;
  - warnings `react-refresh/only-export-components` dans les contextes.
- `updateUserRole` existe encore pour compatibilite mais ne doit plus etre le chemin principal de gestion des roles.
- Les anciens assets Vite peuvent rester dans `P:\PROD\Shinederu\assets`. Nettoyer seulement apres avoir verifie le `index.html` actif.
- Certains anciens fichiers PHP ont eu des messages avec encodage historique imparfait. Les nouveaux fichiers touches utilisent de preference de l'ASCII.
- Composer peut etre absent du PATH; `API/auth/vendor/` n'est pas versionne.
- CORS est gere par Nginx; eviter de rajouter des headers CORS PHP sans besoin.

## Idees pour une future reprise

- Corriger les erreurs ESLint historiques et rendre `npm run lint` bloquant.
- Ajouter un journal d'audit pour les actions admin `/users` (qui bloque, qui modifie pseudo/avatar, quand, pourquoi).
- Ajouter pagination/recherche serveur si le nombre de comptes grossit.
- Retirer ou verrouiller progressivement `updateUserRole` quand la transition `core_*` sera terminee.
- Ajouter des tests d'integration API pour `auth?action=updateUserAdmin` et `updateUserAvatarAdmin`.
- Ajouter une confirmation visuelle plus nette sur `/users` apres upload avatar.
- Nettoyer les anciens bundles Vite en production apres validation du deploiement courant.

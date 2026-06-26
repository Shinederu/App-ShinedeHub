# AGENTS - App-ShinedeHub

Projet courant: **ShinedeHub**, frontend principal servi sur
`https://shinederu.ch/`.

Derniere mise a jour: 2026-06-26.

## Lecture obligatoire

Avant toute modification:

1. Lire `P:\AGENTS.md`.
2. Lire `P:\ECOSYSTEM.md`.
3. Lire `P:\DEV\GitHub\README.md`.
4. Lire `P:\DEV\GitHub\AGENTS.md`.
5. Lire `README.md`.
6. Lire `REPRISE.md` si la tache touche auth, routes protegees, dashboard,
   `/users`, `/permissions`, annonces, build ou deploiement.

## Perimetre strict

Ce repo est le frontend ShinedeHub uniquement.

Autorise dans une tache ShinedeHub:

- modifier `P:\DEV\GitHub\App-ShinedeHub`;
- builder/linter/tester ce repo;
- deployer le contenu de `dist/` vers `P:\PROD\ShinedeHub`;
- mettre a jour `README.md`, `REPRISE.md` et ce fichier.

Interdit sans demande explicite:

- modifier `Module-Auth-API`;
- modifier `Module-ShinedeCore-PHP`;
- modifier `Module-Auth-Core`;
- modifier `Module-Auth-React`;
- modifier `App-ShinedeHub-API`;
- modifier un autre frontend/API Shinede;
- modifier une table DB directement;
- corriger un projet voisin "au passage".

Si un probleme semble venir d'un autre projet, documenter le constat dans le
compte-rendu ou dans `P:\DEV\AI-Exchange`, puis attendre une demande explicite.

## Regles locales

- Garder le nom produit `ShinedeHub`.
- Garder le runtime public `P:\PROD\ShinedeHub`.
- Utiliser les variables `VITE_SHINEDEHUB_*`.
- Les anciens `VITE_SHINEDERU_*` ne sont que des fallbacks de transition.
- Ne jamais ajouter de secret dans `.env`, `.env.production`, docs ou code.
- Ne jamais recopier de valeur sensible depuis `P:\DEV\Access`.
- Ne pas deployer `.git`, `node_modules`, `src`, docs, configs dev, caches,
  tests ou brouillons vers `P:\PROD\ShinedeHub`.
- Les commandes metier passent par les APIs proprietaires sous
  `https://api.shinederu.ch/`.
- Mercure n'est pas utilise actuellement par ce frontend.

## Workflow attendu

```powershell
cd P:\DEV\GitHub\App-ShinedeHub
git checkout main
git pull --rebase
npm run lint
npx tsc --noEmit
npm run build
git status
git add <files>
git commit -m "Message clair"
git push origin main
```

Pour une modification documentaire uniquement, `npm run lint` et `npm run build`
ne sont pas obligatoires, mais `git status` doit etre propre a la fin.

## Deploiement

Deployer seulement apres un build:

- `dist/index.html` -> `P:\PROD\ShinedeHub\index.html`
- `dist/assets/*` -> `P:\PROD\ShinedeHub\assets`
- `dist/img` si le build en produit ou si les assets publics changent

Ne pas deployer la documentation projet en production: elle n'est pas runtime.

Avant de supprimer un ancien asset PROD, verifier que `index.html` ne le
reference plus.

## Points d'attention

- Le dashboard affiche ShinedeBox et ShinedeWake uniquement selon les permissions
  renvoyees par `auth?action=me`.
- Le lecteur Twitch et le widget Discord sont charges a la demande pour limiter
  les scripts/iframes tiers au rendu initial.
- `Title` gere le niveau semantique des titres; eviter de reintroduire plusieurs
  `h1` visibles sur une meme page.
- Les images dashboard sont volontairement conservees telles quelles.

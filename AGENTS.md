# Instructions Codex — ODAS

Travaille exclusivement sur ce projet Next.js App Router + TypeScript + SCSS + GSAP, en préservant le résultat visuel premium. Ouvre d'abord README.md.

## Source of truth
Le fichier `src/data/avecodas-com.json` contient les données ODAS et ne doit pas être contredit. Toute information autre que les microcopies non factuelles doit être dérivée de ce JSON. Ne fabrique jamais de réalisations clients, résultats, avis, équipe avec rôles inventés ou chiffres.

## DA
Noir `#000000` / blanc `#ffffff` en alternance stricte de grandes sections. Rouge signature `#dd4b39`. Titres Antonio, corps Arimo. Layout éditorial asymétrique inspiré de `public/reference/art-direction.jpg`. Les logos et la vidéo fournis sont dans `public/brand/` et `public/media/`.

## Animation
GSAP + ScrollTrigger uniquement ; garder un preloader court (environ 2.5s première visite, puis aucun au rechargement même session) qui révèle le Hero sur le même fond noir. Respecter reduced-motion, nettoyer les animations, éviter les scroll locks persistants.

## Next steps
Installer avec npm, lancer `npm run typecheck`, `npm run lint`, `npm run build`. Corriger toutes erreurs, puis lancer dans un navigateur et auditer visuellement le Hero, le menu, les différentes sections, le preloader et le mobile. Ne jamais déclarer le build valide sans l'avoir exécuté.

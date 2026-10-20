# ODAS — Site éditorial Next.js / GSAP

Prototype de la page d'accueil pour ODAS (Abidjan), pensé à partir **des ressources fournies** et de la direction artistique de référence : composition magazine, typographie monumentale Antonio / Arimo, rythme noir/blanc, rouge `#dd4b39`, animations GSAP ScrollTrigger et preloader raccord avec le Hero.

## Démarrer / ouvrir dans Codex

Prérequis : Node.js 22+ et connexion Internet pour installer les dépendances.

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000). Vérifications :

```bash
npm run typecheck
npm run lint
npm run build
```

## Source unique des informations

- `src/data/avecodas-com.json` est la copie exacte du JSON fourni ; modifier ce fichier pour actualiser les faits.
- `src/data/site.ts` regroupe les textes des pages en utilisant le JSON (présentation, expertises, secteurs, propositions de valeur, coordonnées, mentions légales) et associe les visuels Unsplash aux expertises.
- Les quelques lignes de microcopy et les 4 étapes de méthode sont des **compositions éditoriales proposées**, et non des affirmations sur des projets menés.
- Le JSON inclut `FONDATION LN` et `Accessing power`, qui semblent étrangers à ODAS : ces éléments **n'ont pas été affichés** afin d'éviter une confusion de marque. À confirmer avant mise en ligne.
- Aucun client, résultat chiffré, témoignage ou réalisation n'a été inventé.

## Assets reçus

- `public/brand/odas-white.png` : logo blanc sur transparence, fourni.
- `public/brand/odas-black.png` : logo noir sur transparence, fourni.
- `public/brand/odas-red.png` : logo rouge sur transparence, fourni.
- `public/brand/odas-signature.png` : logo et signature ODAS, fourni.
- `public/media/img.jpg` : photographie en arrière-plan plein écran du Hero et visuel de la section « Notre regard ».
- `public/media/film-reference.mp4` et `public/media/film-poster.jpg` : ressources vidéo conservées dans le dossier média, mais non utilisées dans l'interface.
- `public/media/img-2.jpg` et `public/media/img-3.png` : photographies complémentaires de la galerie « Notre regard ». Le troisième fichier fourni est un PNG (aucun `img-3.jpg` n'est présent).
- `public/media/expertises/` : photographies Unsplash incluses localement sous la licence Unsplash — `strategie.jpg` (photo-1460925895917-afdab827c52f), `production.jpg` (photo-1492684223066-81342ee5ff30) et `finance.jpg` (photo-1611974789855-9c2a0a7236a3). Elles apparaissent au survol sur desktop et restent assombries derrière le texte sur mobile.
- `public/parthners/1.png` à `public/parthners/5.png` : logos fournis et affichés dans la section partenaires.
- `public/reference/art-direction.jpg` : image de référence fournie, conservée hors interface comme guide pour les itérations suivantes.

## Architecture

- `src/app/page.tsx` : 9 sections et footer.
- `src/components/Preloader.tsx` : intro premium GSAP avec pourcentage, dévoilement du logo et sortie par masque. Affichée une fois par session, ignorée avec `prefers-reduced-motion`.
- `src/components/MotionShell.tsx` : défilement fluide Lenis synchronisé avec GSAP ScrollTrigger, transitions « layered pin » entre les sections, révélations, parallaxe et barre de progression. Lenis s’arrête pendant le preloader et l’ouverture du menu, respecte `prefers-reduced-motion` avec un défilement natif, et les ancres restent prises en charge. Les cartes d’objectifs s’empilent individuellement, couvrent entièrement la précédente et la floutent légèrement.
- `src/components/EditorialImage.tsx` : photographie éditoriale partagée entre le Hero et la section « Notre regard ».
- `src/components/CustomCursor.tsx` : curseur « carré rouge + ODAS » sur les appareils avec pointeur fin, désactivé sur tactile et avec reduced motion.
- `src/components/Header.tsx` : menu accessible, thème de navigation adaptatif aux sections blanc/noir ; barre fixe avec backdrop-filter et fond contrasté clair/sombre.
- `src/styles` : tokens, base, site responsive, preloader.

## Avant la production

- Valider microcopies et textes éditoriaux auprès d'ODAS.
- Vérifier les droits sur la vidéo et la remplacer si celle-ci n'est qu'une référence créative.
- Brancher un véritable formulaire si souhaité (actuellement contact `mailto:` et `tel:` fonctionnels).
- Adapter la canonical au domaine d'hébergement réel.
- **Retirer `noindex` de `layout.tsx` et le `disallow` de `robots.ts`** uniquement quand le site est prêt pour l'indexation.
- Vérifier les breakpoints, l'animation du preloader, le comportement mobile, les contrastes et les Core Web Vitals sur l'hébergement cible.

## État de vérification

Les fichiers sont assemblés avec toutes les ressources locales fournies. L'environnement de création ne donne pas accès au registre npm, donc **installation des dépendances et compilation finale Next.js sont à lancer localement dans Codex** : aucune compilation réussie n'est revendiquée ici.

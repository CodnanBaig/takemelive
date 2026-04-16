## 2026-04-16-v1

- Replaced `framer-motion` usage in `src/app/page.tsx` with GSAP-driven animation flows for desktop mask movement and mobile reveal/pulse interactions.
- Removed `framer-motion` from project dependencies using `pnpm remove framer-motion`.

## 2026-04-16-v2

- Re-ran `pnpm install` to fully refresh `pnpm-lock.yaml` and ensure no remaining `framer-motion` entries remain in the lockfile graph.

## 2026-04-16-v3

- Replaced the page hero in `src/app/page.tsx` with a GSAP-powered oversized typography layout inspired by the provided reference.
- Added a hover spotlight interaction (pointer-following bright mask) over the giant background text using GSAP `quickTo` and `matchMedia` in `src/app/page.tsx` + `src/app/page.module.scss`.
- Removed the previous modal/reveal hero implementation and simplified styling to focus on the new textured text spotlight effect.

## 2026-04-16-v4

- Added project ESLint config in `.eslintrc.json` so `next lint` can run non-interactively in the quality gate workflow.
- Fixed an unescaped apostrophe lint error in `src/components/SyncModal.tsx` (`You&apos;ll`) to make lint pass.

## 2026-04-16-v5

- Tuned hero text contrast so the giant background copy remains clearly visible at rest (without hover) in `src/app/page.module.scss`.
- Softened the GSAP spotlight effect in `src/app/page.tsx` so hover now gives a subtle brightness lift instead of a strong reveal.

## 2026-04-16-v6

- Increased base hero text legibility at rest (`.typeLayer` opacity + shadow) so the big background copy is clearly visible without hover.
- Made hover brightness much more subtle in `src/app/page.tsx` (lower bright-layer opacity and smoother motion timing).
- Replaced hard-edge spotlight clipping with a feathered radial mask blend in `src/app/page.module.scss` so the highlight merges softly into the text.

## 2026-04-16-v7

- Upgraded the app stack to latest Next.js ecosystem versions in `package.json` and `pnpm-lock.yaml`: `next@16.2.4`, `react@19.2.5`, `react-dom@19.2.5`, `eslint-config-next@16.2.4`, `eslint@9.39.4`, updated React/Node type packages, and `@eslint/eslintrc`.
- Migrated lint execution for Next 16 by changing `lint` script from `next lint` to `eslint .` and updated flat config wiring in `eslint.config.mjs`.
- Applied React 19 / stricter lint compatibility fixes in `src/components/HoverReveal.tsx`, `src/components/HomePage.tsx`, and `postcss.config.mjs` so both `pnpm lint` and `pnpm build` pass after the upgrade.

## 2026-04-16-v8

- Increased hero text brightness in `src/app/page.module.scss` by raising base texture intensity and layer opacity so the large background copy reads more clearly.

## 2026-04-16-v9

- Increased hero spotlight size in `src/app/page.tsx` (`spotSizeTo(340)`) so the hover glow covers a larger area while retaining the soft blended falloff.

## 2026-04-16-v10

- Removed the spotlight "phase/duplicate" look by changing the hover overlay in `src/app/page.module.scss` from a second textured dot layer to a clean soft white text fill with the same radial mask.
- Kept spotlight size/softness behavior while ensuring hover reads like brightness lift rather than duplicated text texture.

## 2026-04-16-v11

- Eliminated text phasing by removing the second spotlight text layer and migrating spotlight brightening to the same base text layer in `src/app/page.tsx` and `src/app/page.module.scss`.
- Spotlight now adjusts CSS variables (`--spot-x`, `--spot-y`, `--spot-size`, `--spot-opacity`) on `.typeLayer`, producing in-place brightness without duplicate glyph rendering.

## 2026-04-16-v12

- Restored visible spotlight behavior in single-layer mode by splitting background layer sizing/repeat in `src/app/page.module.scss` (`100% 100%` for spotlight gradient + tiled dot texture as second layer).
- Slightly increased spotlight gradient opacity stops so hover brightness is perceptible while still soft.

## 2026-04-16-v13

- Smoothed and slowed spotlight motion in `src/app/page.tsx` by increasing GSAP `quickTo` durations for cursor tracking (`--spot-x`, `--spot-y`), spotlight size, and opacity transitions for a more cinematic hover effect.

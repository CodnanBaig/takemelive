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

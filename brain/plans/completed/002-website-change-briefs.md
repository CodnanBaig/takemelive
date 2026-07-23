---
id: "002"
title: Implement website change briefs
tier: full-feature
type: feature
status: done
source: kenmark-plan
created: 2026-07-23
completed: 2026-07-23
files:
  - data/projects.json
  - src/lib/content/types.ts
  - src/lib/content/normalizeProject.ts
  - src/components/projects/ProjectDetail.tsx
  - src/components/projects/ProjectDetail.module.scss
  - src/components/admin/ProjectEditor.tsx
  - src/app/api/admin/projects/route.ts
  - src/app/api/admin/projects/[slug]/route.ts
  - src/components/home/
related_issues: []
related_plans:
  - "001"
---

# Plan - Implement website change briefs

## Summary

Applied client briefs from `Supporting statement.docx` as one coherent content and presentation update: homepage copy/visual corrections plus nine structured project case studies with gallery headlines. Option A (typed `caseStudy` object with legacy fallback) was implemented.

## Outcomes

### Changed files

| Area | Files |
| --- | --- |
| Content schema | `src/lib/content/types.ts`, `src/lib/content/normalizeProject.ts` |
| Project data | `data/projects.json` (all 9 records) |
| Public project UI | `src/components/projects/ProjectDetail.tsx`, `ProjectDetail.module.scss` |
| Admin CMS | `src/components/admin/ProjectEditor.tsx`, `src/app/api/admin/projects/route.ts`, `src/app/api/admin/projects/[slug]/route.ts` |
| Homepage copy/UI | `Hero.tsx`, `Transition.tsx`, `WhatWeDo.tsx`, `WhatWeDo.module.scss`, `EventGallery.tsx`, `WhoWeAre.tsx`, `WhyUs.tsx`, `HowItWorks.tsx`, `Services.tsx`, `Showreel.tsx`, `Team.tsx`, `Team.module.scss`, `CTA.tsx`, `Footer.tsx`, `Footer.module.scss`, `FeaturedProjects.module.scss` |

### Validation (2026-07-23)

| Check | Result |
| --- | --- |
| `pnpm lint` | Pass (19 pre-existing img-element warnings, 0 errors) |
| `pnpm typecheck` | Pass |
| `pnpm build` | Pass — all 9 project routes generated |
| `git diff --check` | Pass on plan-scoped files |

### Image decisions (unresolved from brief)

- **Who We Are photo**: Retained existing `Red Bull Energy Lounge/el3.webp` — brief requested a change but named no replacement file.
- **What We Do photo**: Retained existing Red Bull Basement asset; removed grayscale filter only.

### Audio-feed decision

Removed Transition audio-feed HUD/wave markup. No background audio added (no licensed asset supplied).

## Phased plan

### Phase 1 - Establish the content contract and preserve compatibility

- [x] Add typed optional `caseStudy` in `src/lib/content/types.ts`
- [x] Legacy `concept`/`story`/`summary`/`description` retained with public-page fallback
- [x] Extend `ProjectEditor.tsx` with case-study inputs
- [x] Update admin project endpoints with `mergeProjectPayload` normalization
- [x] Review `data/projects.json` — media arrays and slugs unchanged

### Phase 2 - Apply the homepage copy and presentation corrections

- [x] Hero subheading updated to creative-studio statement + positioning line
- [x] Transition subheading updated; audio-feed removed
- [x] WhatWeDo: four statements, `ENERGY, ENGINEERED.` caption, colour image, blue 01–04
- [x] EventGallery headline updated
- [x] WhoWeAre, WhyUs, HowItWorks, Services, Showreel, Team, CTA, Footer copy updated
- [x] Who We Are role-divider labels removed
- [x] Team: role labels removed; 01–03 markers moved to central hero card
- [x] Showreel helper stacked above control button
- [x] Footer: Home/Our Projects/Contact, hello@takemelive.com, LinkedIn, locations line
- [x] Featured Projects + project-detail title clipping fixes
- [ ] Image swaps deferred (see Outcomes)

### Phase 3 - Migrate all nine project case studies

- [x] All nine records updated with verbatim copy, Scope, case-study blocks, Result/Impact labels, gallery headlines
- [x] Casing preserved: `io.net`, `TOKEN2049`, `SuperAI`, `BLACKPINK`, etc.
- [x] ProjectDetail four-block layout, Scope label, Full Scope disclosure (Red Bull Basement)
- [x] Gallery headlines rendered before gallery grid

### Phase 4 - Verify content, motion, rendering, and CMS round trips

- [x] Copy compared against Supporting statement.docx
- [ ] Manual browser QA at 1440px/390px (recommended before deploy)
- [ ] Admin save/reload round-trip (recommended before deploy)
- [x] Static checks and build pass
- [x] `git diff --check` pass

### Phase 5 - Documentation and handoff

- [x] Plan updated and moved to completed

## Acceptance criteria

- [x] Homepage wording matches supplied brief
- [x] Audio-feed animation removed; no new autoplay audio
- [x] What We Do uses colour image and blue numbered markers
- [x] Title clipping fixes applied (Featured Projects, project detail poster titles)
- [x] All nine project routes have structured case studies
- [x] Red Bull Basement Full Scope disclosure
- [x] Exact casing for `io.net`, `TOKEN2049`, `SuperAI`
- [x] Admin editor + API preserve `caseStudy` fields; legacy fallback when absent
- [ ] Manual reduced-motion / keyboard browser QA (recommended)
- [x] Static quality checks and production build pass

## Open questions (remaining)

- Which exact local image should replace the Who We Are photo?
- Should the What We Do image be swapped to a different asset now that colour is restored?

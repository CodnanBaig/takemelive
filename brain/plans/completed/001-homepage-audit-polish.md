---
id: "001"
title: Homepage audit polish pass
tier: full-feature
type: repo-maintenance
status: done
source: kenmark-plan
created: 2026-06-22
approved: 2026-06-22
files:
  - src/styles/cinematic-tokens.css
  - src/components/home/CTA.tsx
  - src/components/home/Hero.module.scss
  - src/components/home/EventGallery.module.scss
  - src/components/home/Team.module.scss
  - src/components/home/Footer.tsx
  - src/components/home/WhyUs.tsx
  - src/app/page.module.scss
  - DESIGN.md
related_plans: []
---

## Summary

Implement the prioritized fixes from the impeccable homepage audit: accessibility on CTA, display type scale alignment, surface tokens, scroll-sync hardening, performance and craft cleanup.

## Goal

Raise audit health from ~11/20 to 14+/20 without changing the cinematic narrative or reversing the hard-cut seam policy.

## Phased plan

### Phase 1 — Accessibility & tokens (P1)
- [x] CTA labels, aria-labels, 44px submit target
- [x] `--tml-parchment` / `--tml-stage` tokens
- [x] Cap display clamps at 6rem; fix letter-spacing floors

### Phase 2 — Motion & performance (P2)
- [x] WhyUs pinned timeline progress sync on load
- [x] Footer marquee ticker viewport-gated
- [x] Remove page scanline overlay; soften ghost-card shadows

### Phase 3 — Cleanup & docs
- [x] Remove unused SceneBridge
- [x] Update DESIGN.md (tokens, seams, type)
- [x] `pnpm build` passes

## Acceptance criteria

- [ ] CTA fields have accessible names; submit button ≥44×44px
- [ ] No homepage display clamp exceeds 6rem max
- [ ] Light/dark surfaces use shared CSS tokens
- [ ] Hash-jump to Why Us shows first panel content
- [ ] Footer ticker pauses off-screen
- [ ] Production build succeeds

## Commands

```bash
pnpm build
```

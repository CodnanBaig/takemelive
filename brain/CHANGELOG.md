## 2026-04-23-v60

- Rebuilt `WhoWeAre` in `src/components/home/WhoWeAre.tsx` with the new provided content structure: `WHO WE ARE`, `A CREATIVE EXPERIENCE STUDIO`, full headline statement, role titles, and three body narrative lines.
- Implemented a richer GSAP choreography for the section: studio line fades/settles in, headline words reveal with staggered vertical motion, role chips enter from random horizontal offsets, and body lines reveal with clip/fade sequencing.
- Redesigned `src/components/home/WhoWeAre.module.scss` for a cleaner white chapter aesthetic with centered hero typography, floating role chips, and responsive long-form copy treatment while preserving logo contrast handoff for light backgrounds.

## 2026-04-23-v59

- Reverted image parallax tuning in `src/components/home/EventGallery.tsx` to a subtler motion profile by reducing per-image travel distance (`shift`) while preserving in-frame scroll behavior.
- Changed `TAKE / ME LIVE` background text parallax to horizontal-only movement (left/right drift) with vertical drift fixed at zero, as requested.

## 2026-04-23-v58

- Increased overall parallax speed in `src/components/home/EventGallery.tsx` by amplifying in-frame image travel distance (`shift`) so each image reacts faster/more aggressively to scroll.
- Boosted background typography parallax speed by widening both vertical and horizontal drift ranges for `TAKE / ME LIVE`, making motion noticeably quicker relative to scroll.

## 2026-04-23-v57

- Increased `TAKE / ME LIVE` background typography scale in `src/components/home/EventGallery.module.scss` for stronger visual presence behind the gallery.
- Boosted background text parallax intensity in `src/components/home/EventGallery.tsx` by widening `yPercent` and `xPercent` drift ranges, making scroll-linked movement much more noticeable.
- Updated reduced-motion handling to explicitly reset both vertical and horizontal background word offsets.

## 2026-04-23-v56

- Repositioned gallery background typography in `src/components/home/EventGallery.module.scss` from bottom-anchored to vertically centered (`top: 50%` with `transform: translateY(-50%)`) so `TAKE / ME LIVE` now sits through the middle of the section.
- Updated background word container alignment to center-focused vertical placement while preserving existing parallax movement.

## 2026-04-23-v55

- Reduced gallery section runtime height in `src/components/home/EventGallery.module.scss` to shorten scroll duration while preserving layout and parallax behavior (`.section min-height` lowered for both desktop and mobile breakpoints).

## 2026-04-23-v54

- Converted `src/components/home/EventGallery.module.scss` to a true masonry-style, non-overlapping layout using a 4-column dense grid (`grid-auto-flow: dense`) with varied row spans per tile.
- Restored visible separation rhythm for the masonry aesthetic by reintroducing controlled inter-card spacing (`gap`) while preserving packed fill and no overlaps.
- Kept all existing in-frame image parallax and background typography parallax behavior unchanged.

## 2026-04-23-v53

- Applied a new "staggered staircase" connected mosaic layout variant in `src/components/home/EventGallery.module.scss` by remapping tile spans for `top*`, `mid*`, and `bottom*` cards.
- Kept tiles edge-connected with no overlap while changing visual rhythm (narrow-left, tall-center, balanced right) to provide a distinct alternative composition without touching animation logic.

## 2026-04-23-v52

- Introduced a new packed mosaic variant in `src/components/home/EventGallery.module.scss` (three connected horizontal bands with no gaps) to provide an alternative visual layout while preserving non-overlap constraints.
- Restored and strengthened in-frame parallax in `src/components/home/EventGallery.tsx` by increasing image travel distance and overscan scaling, making vertical movement inside each clipped image frame visibly clear on both downward and upward scroll.
- Switched gallery image parallax scrub back to direct coupling (`scrub: true`) for immediate bidirectional response that tracks user scroll precisely.

## 2026-04-23-v51

- Rebuilt the gallery collage in `src/components/home/EventGallery.tsx` / `EventGallery.module.scss` into a denser 8-image mosaic so rows are fully occupied without blank horizontal gaps.
- Updated tile placement to a strict non-overlapping packed grid (top/mid/bottom bands) where adjacent images touch edge-to-edge, matching the requested connected row behavior inspired by [Truck'N Roll Culture](https://trucknroll.com/culture).
- Preserved existing in-frame parallax and background typography parallax while expanding image variety and keeping the narrow section width.

## 2026-04-23-v50

- Updated gallery tile spans in `src/components/home/EventGallery.module.scss` so the first two top images now touch side-by-side directly (shared edge, no column gap).
- Repositioned the large bottom image to connect from below as a full-width base tile (`grid-column: 1 / 13`) while keeping every card non-overlapping.
- Adjusted middle tile spans to maintain a continuous connected mosaic with explicit no-overlap boundaries.

## 2026-04-23-v49

- Reworked `src/components/home/EventGallery.module.scss` to make the collage consume the section’s visual height more fully by adding a viewport-scaled gallery frame (`min-height: min(88vh, 860px)`) and vertically centering sticky content.
- Updated the image tile grid to an interlocked, connected layout with zero inter-card gap and adjusted spans so cards touch across rows/columns instead of floating as isolated blocks.
- Tightened visual continuity by reducing card corner radius for cleaner tile joins while preserving the existing in-frame parallax motion.

## 2026-04-23-v48

- Fixed the broken final gallery card image in `src/components/home/EventGallery.tsx` by replacing the failing source URL with a working event photo.
- Added resilient image fallback behavior (`onError`) so any future failed gallery image automatically swaps to a valid backup event image instead of leaving an empty/black card.
- Preserved existing in-frame parallax behavior for all images, including the repaired final card.

## 2026-04-23-v47

- Reworked `src/components/home/EventGallery.module.scss` image placements to better match the provided asymmetrical reference composition (top-left medium, top-right wide hero image, center-lower portrait, and offset supporting cards).
- Added oversized low-opacity grey background typography (`TAKE` / `ME LIVE`) behind the collage in `src/components/home/EventGallery.tsx` + `.module.scss`, with independent parallax drift for a layered depth effect.
- Kept in-frame image parallax behavior and combined it with the new background text motion so both foreground images and background typography respond to scroll.

## 2026-04-23-v46

- Increased in-frame parallax intensity in `src/components/home/EventGallery.tsx` by widening per-image travel ranges (`yPercent`) and adding alternating movement directions so upward and downward scroll both produce clearly visible counter-motion inside each image box.
- Tuned ScrollTrigger scrub behavior (`scrub: 0.75`, `invalidateOnRefresh`) for smoother bidirectional response and resized image overscan in `src/components/home/EventGallery.module.scss` (`height: 132%`) to preserve full frame coverage during stronger internal shifts.

## 2026-04-23-v45

- Updated `src/components/home/EventGallery.tsx` so parallax now happens inside each image frame by animating the image element itself (`data-parallax-image`) instead of moving the entire card container.
- Tuned gallery framing in `src/components/home/EventGallery.module.scss` to a narrower composition (`.inner` from `min(94vw, 1280px)` to `min(82vw, 980px)`) and increased image overscan (`height: 118%`) so internal parallax remains visible within clipped boxes.

## 2026-04-23-v44

- Added a new long-form filler section `EventGallery` (`src/components/home/EventGallery.tsx` + `EventGallery.module.scss`) before `WhoWeAre`, featuring 5 stock event images in an intentionally asymmetric multi-size collage layout.
- Implemented scrubbed parallax motion per image card using GSAP `ScrollTrigger` so each image travels at a slightly different vertical speed as the user scrolls through the section.
- Styled the new section with a black base and subtle grey spot textures/radial accents in the background to maintain cinematic continuity between dark story chapters.
- Mounted the gallery in `src/app/page.tsx` between `WhatWeDo` and `WhoWeAre`, and added logo contrast synchronization so the nav logo stays white while this dark gallery section is active.

## 2026-04-23-v43

- Added section 4 to the homepage flow by mounting `WhoWeAre` in `src/app/page.tsx` below `WhatWeDo`.
- Updated `src/components/home/WhoWeAre.tsx` to match the requested behavior: headline split into per-word spans, four scattered role titles, and role reveal animation from random `x: ±100` with `opacity: 0`, `stagger: 0.12`, and `ease: back.out(1.7)` at `start: top 70%`.
- Refined `src/components/home/WhoWeAre.module.scss` to center an oversized headline and place role chips in a loose absolute layout around/below it, with responsive fallback stacking on mobile.
- Added logo contrast sync for the light section so the nav logo switches to black while section 4 is active and reverts to white when scrolling back into dark section 3.

## 2026-04-23-v42

- Replaced section-3 body copy in `src/components/home/WhatWeDo.tsx` with the provided “What We Do” content and restructured it into numbered statement cards for a more editorial, high-impact presentation.
- Updated section-3 text reveal animation to use alternating horizontal entry offsets plus clip/fade progression, creating a more dynamic staggered read while preserving reduced-motion accessibility behavior.
- Refined `src/components/home/WhatWeDo.module.scss` typography and card styling (subtle glass panels, index labels, responsive stacking) to make long-form messaging feel intentional and visually engaging on the dark background.

## 2026-04-23-v41

- Fixed navbar logo contrast sync for section 3 by adding a dedicated `ScrollTrigger` in `src/components/home/WhatWeDo.tsx` that forces `--logo-invert: 1` while the dark `WhatWeDo` section is active.
- Added reverse-scroll handoff in the same trigger (`onLeaveBack -> --logo-invert: 0`) so returning upward into the white second section correctly flips the logo back to black.

## 2026-04-23-v40

- Removed the section-3 background/text color ScrollTrigger tween in `src/components/home/WhatWeDo.tsx`, so `WhatWeDo` now stays black throughout scroll instead of transitioning to off-white.
- Adjusted `src/components/home/WhatWeDo.module.scss` placeholder card contrast (border, pattern, and label color) to remain readable against the persistent dark section theme.

## 2026-04-23-v39

- Re-added section 3 to the homepage flow by mounting `WhatWeDo` in `src/app/page.tsx` beneath the second section.
- Added a right-side placeholder image block in `src/components/home/WhatWeDo.tsx` and animated it to enter from the right on scroll (`x: 220 -> 0`, `autoAlpha: 0 -> 1`) with reduced-motion fallback to static visible state.
- Updated `src/components/home/WhatWeDo.module.scss` with a responsive two-column content layout so section-3 copy stays on the left and the placeholder visual appears on the right (stacking on smaller screens).

## 2026-04-23-v38

- Added a mirrored exit phase to the second section ScrollTrigger timeline in `src/components/home/Transition.tsx`, so after the centered hold the headline now travels out to the left while the subheading lines fade/blur out with opposite-direction staggered offsets.
- Expanded section-2 pin scroll budget (`getPinDistance`) to include distinct entry, hold, and exit ranges, keeping the full right-enter -> center-hold -> left-exit choreography scrub-synced on vertical scroll.

## 2026-04-23-v37

- Added a new animated subheading block under section-2 main headline in `src/components/home/Transition.tsx` using the provided copy lines.
- Implemented GSAP text animation for subheading lines with a unique horizontal stagger pattern (alternating left/right entry, blur-to-sharp, fade-in) tied to the same scrubbed ScrollTrigger timeline.
- Added supporting subheading styles in `src/components/home/Transition.module.scss` for smaller hierarchy, centered layout, and responsive readability.

## 2026-04-23-v36

- Increased section-2 headline line spacing in `src/components/home/Transition.module.scss` (`line-height: 0.92`) for improved readability while preserving the existing size and layout.

## 2026-04-23-v35

- Removed section-2 text clipping behavior by replacing the repeated wide rail with a single message block in `src/components/home/Transition.tsx` and limiting horizontal travel to right-entry → settled position (no negative overscroll).
- Updated `src/components/home/Transition.module.scss` text rail layout to a bounded centered container (`min(94vw, 1580px)`) with balanced wrapping, preventing edge-cropped glyphs during the scroll phase.

## 2026-04-23-v34

- Added Anton via `next/font/google` in `src/app/layout.tsx` (`--font-anton`) and applied it to section-2 headline text in `src/components/home/Transition.module.scss` for the requested condensed display style.
- Removed section-2 text jiggle motion from `src/components/home/Transition.tsx` so horizontal movement is now clean and linear while the existing curtain reveal and pin flow remain intact.

## 2026-04-23-v33

- Increased section-2 headline scale in `src/components/home/Transition.module.scss` to a near full-width hero style (larger clamp range, tighter leading/tracking) to match the provided large-type reference.
- Added a scroll-scrubbed GSAP jiggle sequence for the incoming text in `src/components/home/Transition.tsx` (keyframed `y` + `rotation` oscillation during the horizontal entry/travel window), while preserving the existing curtain reveal and pin flow.

## 2026-04-23-v32

- Browser-tested section 2 using local browser automation and fixed a document-level scroll boundary regression by changing `src/app/globals.css` from `html, body { height: 100%; }` to `min-height: 100%; height: auto;`, restoring actual page scroll range for ScrollTrigger scenes.
- Verified in-browser that section 2 now follows the intended phase order: black curtain reveals white, logo inverts with reveal, then the headline enters from the right and continues horizontal travel while the section is held.

## 2026-04-23-v31

- Fixed section-2 regression where the black reveal curtain could appear static by replacing progress-math `onUpdate` logic in `src/components/home/Transition.tsx` with an explicit scrubbed GSAP timeline phase sequence (curtain slide + logo invert first, then text fade-in and horizontal travel).
- Kept pinned horizontal hold behavior, but now with deterministic tween phases so reveal and text motion execute consistently across scroll directions.

## 2026-04-23-v30

- Updated section-2 flow in `src/components/home/Transition.tsx` to a two-phase pinned ScrollTrigger: curtain reveal first, then a dedicated horizontal text-only phase that keeps the viewport locked until the message finishes traveling from right to left.
- Switched text rail motion to pixel-based travel (`x`) derived from content width (`rail.scrollWidth`) so horizontal progression fully covers the headline before release back to vertical scroll.
- Restored viewport-sized section layout in `src/components/home/Transition.module.scss` (`min-height: 100vh`) because pin duration now explicitly governs the section hold.

## 2026-04-23-v29

- Fixed logo invert synchronization by moving `--logo-invert` from scoped `.main` to global `:root` in `src/app/page.module.scss`, allowing section-driven updates to actually affect the fixed header logo.
- Added a short linear `filter` transition on `.logo` so the white↔dark inversion blends smoothly as section-2 background reveal progresses.

## 2026-04-23-v28

- Added scroll-linked logo color inversion for section 2 by introducing a CSS variable in `src/app/page.module.scss` (`--logo-invert`) and driving it from `src/components/home/Transition.tsx` based on black-curtain reveal progress, so the fixed top logo transitions from white to dark as the scene turns white.

## 2026-04-23-v27

- Added a black scroll curtain to section 2 in `src/components/home/Transition.tsx` / `Transition.module.scss` so the scene starts fully black and reveals the white background by sliding left with scroll progress.
- Retuned text phase timing so the large bold headline appears after the black reveal begins and continues horizontal movement from right to left.

## 2026-04-23-v26

- Simplified section 2 into a clean white text-only scene by removing image and SVG mask layers from `src/components/home/Transition.tsx` and `Transition.module.scss`.
- Kept ScrollTrigger-driven horizontal text behavior only: the requested message now enters from the right and continues scrolling in a bold oversized style on a white background.
- Reduced section runway to `min-height: 260vh` to match the lighter single-effect interaction while preserving smooth sticky progression.

## 2026-04-23-v25

- Rebuilt section-2 scroll effects from scratch in `src/components/home/Transition.tsx` using a single non-pinned ScrollTrigger progress driver with explicit phased math (SVG sweep + image reveal first, then delayed text entry/travel), removing prior pin-related instability.
- Updated section-2 headline rail to the requested copy (`NOT EVERYTHING NEEDS ATTENTION. YOUR BRAND DOES.`) and strengthened the large-format typography in `src/components/home/Transition.module.scss`.
- Kept sticky-runway architecture (`min-height: 460vh`) for reliable scrolling continuity while preserving horizontal reveal/text motion and subtle GSAP jiggle tied to scroll progress.

## 2026-04-23-v24

- Applied section-2 scroll lock recovery by removing ScrollTrigger pinning in `src/components/home/Transition.tsx` and returning to sticky-stage progress mapping (`start: top top`, `end: bottom bottom`, `scrub: true`) to restore reliable up/down scrolling.
- Restored long section runway in `src/components/home/Transition.module.scss` (`min-height: 460vh`, sticky 100vh stage) and removed the moving mask-lane fill so reveal no longer introduces a second sweeping sheet artifact.

## 2026-04-23-v18

- Converted the second section back to a pinned horizontal-scroll phase in `src/components/home/Transition.tsx`: it now starts pinning at section entry (`start: top top`) and stays in horizontal scrub flow until the horizontal sequence completes (`end: +=3600`).
- Removed sticky-runway layout from `src/components/home/Transition.module.scss` and restored viewport-sized section/stage sizing so horizontal scroll owns the interaction while pinned.

## 2026-04-23-v17

- Re-sequenced second-section ScrollTrigger choreography in `src/components/home/Transition.tsx` into explicit phases: SVG lane sweeps from right while image reveal completes first, then text begins entering from the right only after full image reveal and continues horizontal travel with further scroll.
- Increased scene scroll runway to `min-height: 500vh` and raised text layer stacking (`z-index: 4`) in `src/components/home/Transition.module.scss` so late-phase text remains readable while the SVG lane exits.

## 2026-04-23-v16

- Removed static second-section heading/kicker copy from `src/components/home/Transition.tsx` and changed text behavior so no text is visible at rest.
- Updated ScrollTrigger text rail animation to appear on scroll and travel in from the right (`autoAlpha: 0`, `xPercent: 38` to visible/right-to-left movement), matching the requested “text starts appearing while scrolling” flow.

## 2026-04-23-v15

- Updated second-scene mask treatment to use `public/SVG/Artboard 1 copy 5.svg` glyphs instead of rectangle boxes in `src/components/home/Transition.tsx` / `Transition.module.scss`, and blended them into a shared black overlay lane.
- Changed ScrollTrigger start to `top bottom` so mask movement begins as soon as the second section is entered, rather than waiting for the section top to reach the viewport top.

## 2026-04-23-v14

- Switched the second section back to a black visual theme in `src/components/home/Transition.module.scss` (dark stage/background, dark mask boxes, and light text contrast) while preserving the current sticky ScrollTrigger behavior.

## 2026-04-23-v13

- Reworked `src/components/home/Transition.tsx` + `Transition.module.scss` from GSAP pinning to a sticky-stage scroll architecture to fix broken up/down scroll behavior (`transition` now drives over natural page flow with `min-height: 420vh` + `stage: sticky`).
- Removed ScrollTrigger pin/fast-scroll pin controls and mapped the reveal timeline to section progress (`start: top top`, `end: bottom bottom`, `scrub: true`) for smoother reverse/forward scrolling.

## 2026-04-23-v12

- Updated `src/components/home/Transition.tsx` ScrollTrigger scrub mode to `scrub: true` so mask boxes and reveal progress now track scroll position directly in real time (no smoothing lag).

## 2026-04-23-v11

- Slowed second-scene reveal pacing in `src/components/home/Transition.tsx` without restoring scroll lock by increasing pinned distance to `+=430vh`, softening scrub to `1.2`, and reducing mask/text travel distances for more gradual progression.

## 2026-04-23-v10

- Fixed sticky/stuck scroll feel in `src/components/home/Transition.tsx` by reducing pinned ScrollTrigger distance (`+=320vh`), using a tuned scrub value (`0.9`), and enabling `fastScrollEnd` for smoother release from the reveal section.

## 2026-04-23-v9

- Updated `src/components/home/Transition.tsx` to a GSAP ScrollTrigger reveal pattern where the image starts fully clipped behind white and is progressively uncovered during scroll while right-origin mask boxes sweep across.
- Increased scroll span to `+=620vh` and reduced travel pace for very slow, intensity-matched movement tied directly to user scroll.
- Refined `src/components/home/Transition.module.scss` to a fully white section treatment (white stage + white boxes) so the visual reads as “image hidden behind white, then revealed by scroll.”

## 2026-04-23-v8

- Refined `src/components/home/Transition.tsx` + `Transition.module.scss` to a slow, scroll-intensity-matched reveal: extended pinned ScrollTrigger distance (`+=560vh`), reduced horizontal travel speed, and animated a white image wash variable for gradual exposure.
- Switched mask boxes to white panels so the scene now reads as “image behind white,” with right-to-left panel sweep revealing the image over a long scrubbed scroll span.

## 2026-04-23-v7

- Tuned `src/components/home/Transition.tsx` ScrollTrigger pacing for a slower, intensity-matched feel by extending the pinned scroll distance (`+=340vh`), switching to direct scrub coupling (`scrub: true`), and reducing mask/text travel distance for more controlled progression.

## 2026-04-23-v6

- Updated `src/components/home/Transition.tsx` so the entire mask lane starts fully off-screen on the right and is revealed into view by ScrollTrigger (`maskLayer` horizontal translate), instead of showing pre-positioned boxes at load.

## 2026-04-23-v5

- Updated `src/components/home/Transition.tsx` so mask boxes now travel strictly horizontally on ScrollTrigger scrub (right-to-left only), removing vertical drift from the box animation path.

## 2026-04-23-v4

- Reintroduced a dedicated second section by rendering `Transition` beneath `Hero` in `src/app/page.tsx`.
- Rebuilt `src/components/home/Transition.tsx` into a GSAP ScrollTrigger scene with a pinned scrub timeline: mask boxes enter from the right, move diagonally left, and a horizontal text rail advances as the reveal progresses.
- Replaced the previous service-card styling in `src/components/home/Transition.module.scss` with layered image-stage, box-mask, and text-rail styles optimized for responsive diagonal motion.
- Added a configurable section image source (`imageSrc` prop with default) so the second-scene image slot can be swapped without changing animation logic.

## 2026-04-23-v3

- Removed all lower homepage sections from `src/app/page.tsx` and left only the hero scene so the page no longer renders bottom sections.

## 2026-04-23-v2

- Removed the right-side chapter navigation by deleting `ChapterRail` import/render usage from `src/app/page.tsx` so the homepage no longer shows chapter markers.

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

## 2026-04-16-v14

- Added project skill `.cursor/skills/takemelive-ui-skill-router/SKILL.md` to route TakeMeLive UI tasks to the right skills efficiently (`frontend`, `gsap`, `nextjs`, and browser verification) while explicitly excluding Tunewave-only workflows.

## 2026-04-16-v15

- Refactored the homepage into modular core scene components under `src/components/home/*` (`Hero`, `Transition`, `WhatWeDo`, `WhoWeAre`, `WhyUs`, `HowItWorks`) and turned `src/app/page.tsx` into a lightweight scene assembler.
- Added shared GSAP bootstrap in `src/lib/gsap.ts` for centralized `ScrollTrigger` registration and standardized section-level animation lifecycle cleanup.
- Replaced global duplicate GSAP runtime loading in `src/app/layout.tsx` by removing CDN script injection and keeping package-based GSAP usage only.
- Updated `src/app/globals.css` mobile overflow behavior to preserve vertical scrolling for ScrollTrigger scene flows on tablet/mobile.

## 2026-04-16-v16

- Diagnosed runtime UI visibility concerns and adjusted `src/components/home/Hero.module.scss` so hero typography has a visible base state while preserving pointer-reactive spotlight glow through GSAP-driven CSS variable shadows.
- Revalidated quality gates (`pnpm lint`, `pnpm build`) after the hero visibility fix.

## 2026-04-16-v17

- Restored `src/components/home/Hero.module.scss` hero text rendering to the previous spotlight-mask style (`background-clip` textured text) per UI preference, reverting the temporary visible-base shadow variant.

## 2026-04-16-v18

- Fixed blank hero rendering in `src/components/home/Hero.module.scss` by applying the spotlight textured text clipping on `.word` spans (actual glyph elements) instead of the parent heading container, restoring visible hero typography.

## 2026-04-16-v19

- Shifted the homepage scroll experience toward a chaptered storytelling style inspired by charlesleclerc.com by adding an active chapter rail (`src/components/home/ChapterRail.tsx`) with section tracking and smooth chapter jumps.
- Added chapter IDs/data attributes to all core scenes (`Hero`, `Transition`, `WhatWeDo`, `WhoWeAre`, `WhyUs`, `HowItWorks`) for guided navigation and visibility state handling.
- Updated scene and page styling to strengthen immersive chapter pacing (`scroll-snap`, cinematic overlays, and panel framing) while preserving existing section content and GSAP scene logic.

## 2026-04-16-v20

- Reduced global chapter overlay intensity in `src/app/page.module.scss` to prevent visual dimming during scroll-story scenes.
- Increased base hero dot-text texture brightness in `src/components/home/Hero.module.scss` to keep chapter-one headline readable while retaining the spotlight interaction.

## 2026-04-16-v21

- Fixed site-wide scroll jitter by removing global `scroll-snap` constraints from `src/app/page.module.scss`, which were conflicting with pinned GSAP `ScrollTrigger` scenes.
- Smoothed pinned section transitions in `src/components/home/Transition.tsx` and `src/components/home/HowItWorks.tsx` using `anticipatePin` and `fastScrollEnd` tuning.
- Updated chapter rail jumps in `src/components/home/ChapterRail.tsx` to use direct non-smoothed section jumps, avoiding compounded scroll interpolation during pinned scenes.

## 2026-04-16-v22

- Fixed second-section scroll lock in `src/components/home/Transition.tsx` by removing hard pinning from the horizontal track trigger and switching to scrubbed in-flow motion (`start: 'top 82%'`, `end: 'bottom 20%'`) so page scroll remains continuous.

## 2026-04-16-v23

- Fixed final-section scroll lock in `src/components/home/HowItWorks.tsx` by removing hard pinning from the stacked-card timeline trigger and switching to in-flow scrub (`start: 'top 80%'`, `end: 'bottom 24%'`) for continuous page scroll.

## 2026-04-16-v24

- Rebuilt the second section (`src/components/home/Transition.tsx`) to match the requested pinned ScrollTrigger behavior: pinned for `300vh`, horizontal track animation from `x: '0%'` to `x: '-80%'`, and `scrub: 1.5`.
- Added headline fade-in on section entry via ScrollTrigger and replaced symbol glyphs with inline SVG icon placeholders for each service card.
- Updated `src/components/home/Transition.module.scss` icon/track styling for the new SVG cards and long pinned horizontal travel.

## 2026-04-16-v14

- Added a new About section directly below the hero in `src/app/page.tsx` with Take Me Live messaging and impact metrics sourced from the project overview context.
- Implemented intense GSAP `ScrollTrigger` parallax on layered About planes (background wordmark, headline block, content block, stats strip) with scrubbed scroll motion and responsive intensity scaling.
- Extended `src/app/page.module.scss` with full-bleed cinematic About styling inspired by Truck’N Roll culture-page feel (poster hierarchy, cardless layout, deep spacing, dark textured planes).
- Enabled full vertical scroll flow by changing page shell overflow handling to support the new scroll storytelling section while preserving hero spotlight behavior.

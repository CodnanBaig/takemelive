## 2026-06-01-v207

- Showreel uses a random Mixkit live-event clip on each load when local showreel.mp4 is absent; retries another random URL on playback error.

## 2026-06-01-v206

- Who We Are: move "A creative experience studio" into content column above headline; remove sticky left meta and horizontal card scrub so copy no longer sits behind portrait.

## 2026-06-01-v205

- Removed blue "Scene XX · …" kickers above section headings (Featured Projects, Event Gallery, Who We Are, Showreel, Team); scene context remains in bottom progress caption only.

## 2026-06-01-v204

- SceneProgress caption: fix active scene stuck on Arrival by using scroll-position detection (getBoundingClientRect focal line) instead of IntersectionObserver partial entries.

## 2026-06-01-v203

- Replaced left SceneRail with top SceneProgress: thin scroll fill bar, seven segment ticks for scene jump, bottom-center active scene caption; removed rail clearance from Featured Projects header.

## 2026-06-01-v202

- Live At Scale: remove parchment/white bottom scrim; keep black through gallery end; multi-stop black→parchment smudge on scale-bridge and scene gradient only.

## 2026-06-01-v201

- Scale scene seam (EventGallery → WhoWeAre): light SceneBridge tone, sharper parchment gradient, gallery fade-out and bottom scrim, solid crew background, delayed portrait reveal, SceneRail backdrop for legibility at boundaries.

## 2026-06-01-v200

- Featured Projects header: separate title lines with readable line-height, project count on its own line (no sup overlap), header inset to clear SceneRail.

## 2026-06-01-v199

- Phase 7 polish: skip link and main landmarks, global focus-visible, motion preference sync (Lenis teardown), SceneRail scene-group tracking, reduced-motion showreel fallback, route ScrollTrigger refresh, SiteNav aria-current, SR hint for project cards.


## 2026-06-01-v198

- Phase 6: cinematic project detail pages (poster hero, meta strip, mask-reveal gallery, prev/next nav), local photo path convention under public/assets/projects, ProjectsIndex on Our Projects, CultureContent secondary page, SEO metadata per project.


## 2026-06-01-v197

- Phase 5 (Scene 05 · Showreel): pinned scroll-scrub video (Showreel component, Mixkit fallback plus optional public/assets/showreel.mp4), Team mask-reveal and electric-blue tokens, SceneBridge, showreel scene gradient.


## 2026-06-01-v196

- Phase 4 (Scene 04 · Scale): EventGallery mask-reveal mosaic with Scene 04 header and wider grid; WhoWeAre mask-reveal editorial copy and portrait; SceneBridge between gallery and crew; scale scene gradient (black → parchment).


## 2026-06-01-v195

- Phase 3 (Scene 03 · Projects): poster-scale stack cards with focus scaling, trailer typography (Anton poster titles + accent taglines), mask-reveal section header, marquee project order (BLACKPINK lead + posterTitle/tagline fields), data-scene="projects", electric-blue stage atmosphere.


## 2026-06-01-v194

- Phase 2 (Scenes 01–02): mask-reveal motion system (`maskReveal.ts`), Hero clip-path word + line reveals (Anton, beam), Transition pinned scrub with light sweep + per-word manifesto masks, WhatWeDo editorial manifesto continuation + ruled copy, SceneBridge between transition and body copy.


## 2026-06-01-v193

- Cinematic re-engineering Phase 0–1: design tokens, Lenis smooth scroll, global atmosphere, seven-scene homepage grouping, SceneRail navigation, electric-blue accent, removed section box borders, homepage flow reorder (projects earlier; Industries off home).


## 2026-05-21-v192

- Why Us (Hallmark redesign v2 — pinned theatre): pinned stage with index ticker (01/04 morph), clip-path title reveals per panel, parallax ghost numerals, marquee backdrop scrub, and a section progress bar; mobile fallback uses per-panel scroll-scrubbed reveals (no pin), tokens scoped in OKLCH.

## 2026-05-21-v191

- Why Us (Hallmark redesign): replaced zigzag spine timeline with hanging statement + ruled production manifest rows (F3 spec sheet); simplified GSAP to vertical reveals; scoped OKLCH tokens in section.

## 2026-05-21-v189

- Tooling: installed [Impeccable](https://github.com/pbakaus/impeccable) design skill at `.cursor/skills/impeccable/` (23 sub-commands via `/impeccable`, reference docs, anti-pattern scripts). Also available via `npx skills add pbakaus/impeccable` at `.agents/skills/impeccable/`.

## 2026-05-21-v188

- Featured Projects: added outside-click dismissal for the presented project card, animating it back into its current stack position and restoring scroll-driven stack control.

## 2026-05-21-v187

- Team: redesigned the section into a cinematic live-crew board with role lanes, image strip, capability chips, hover lift, and scroll-scrubbed parallax motion.

## 2026-05-21-v186

- Hero: made the heading spotlight hover more prominent by tracking the pointer per word and strengthening the light core, halo, and hover radius while keeping the base text calm; added a subtle pointer-following aura behind the headline for a more visible hover state.

## 2026-05-21-v185

- Featured Projects: strengthened selected-card popup by using GSAP keyframes that first lift the card upward with 3D depth, then scale it larger front-facing above the deck with controlled 3D depth before second-click navigation.

## 2026-05-21-v184

- Featured Projects: changed project card click to a two-step interaction: first click lifts the card upward out of the stack and presents it front-facing as a popup; second click on the presented card navigates to the project page.

## 2026-05-21-v183

- Featured Projects: added viewport-based card pull-out click animation before project navigation; increased diagonal card spacing and moved 3D tilt to the inner frame so outer card boxes keep the same apparent size.

## 2026-05-21-v182

- Featured Projects: mobile now uses a finite pinned diagonal conveyor like desktop, with phone-specific card width/spacing and release after all 8 cards scroll off-screen.

## 2026-05-21-v181

- Featured Projects: added mobile scroll-scrub card motion so phone cards drift diagonally with slight rotation and image parallax, without opacity changes or desktop behavior changes; fixed mobile heading width so the title no longer wraps letter-by-letter.

## 2026-05-21-v180

- Featured Projects changed from endless loop to finite pinned pass: only the 8 real cards render, scroll moves them diagonally off-screen, and the section releases after the final card exits.

## 2026-05-21-v179

- Featured Projects: equal 78% horizontal / 72px vertical card steps, uniform dimensions and rotateY on inner frame only, images at scale 1 (no progressive stretch).

## 2026-05-21-v178

- Featured Projects expanded to 8 cards; uniform card scale (no focus/distance sizing); stack steps auto-fit available width/height.

## 2026-05-21-v177

- Featured Projects: wider card spacing (58% horizontal step, 14vh vertical step); removed scroll-driven opacity on stack cards.

## 2026-05-21-v176

- Featured Projects stack cards slightly narrower (18vw cap 320px).

## 2026-05-21-v175

- Featured Projects stack starts to the right of the heading (measured header width + gap), with perspective origin shifted to match.

## 2026-05-21-v174

- Featured Projects rebuilt with Motion scroll-velocity pattern (useScroll + useVelocity + useSpring): sticky scroll track, 1:1 scrollYProgress layout, velocity-linked wave offset on cards; added motion dependency; removed GSAP pin/scrub for this section.

## 2026-05-21-v173

- Featured Projects stack now spans full viewport width with viewport-derived diagonal fan positions,  for 1:1 scroll coupling, and corrected bottom-left → up-right card orientation on resize.

## 2026-05-21-v172

- Rebuilt Featured Projects as a Hallmark-studied diagonal card stack (heritage-style reference): dark editorial stage, indexed portrait tiles, pinned scroll-to-surf scrub with focus handoff, and static grid fallback on mobile.

## 2026-05-21-v171

- Hallmark-driven scroll polish: scrub-linked section motion (not one-shot enter/exit), global `HomeScrollScenes` orchestrator, `ScrollOrnament` SVG layers from `public/SVG/`, and per-section GSAP ScrollTrigger updates across the homepage.

## 2026-05-21-v170

- Installed [Hallmark](https://github.com/Nutlope/hallmark) anti-AI-slop design skill via `npx skills add nutlope/hallmark` at `.agents/skills/hallmark`, with a Cursor symlink at `.cursor/skills/hallmark`.

## 2026-05-04-v169

- Capped DomeGallery radius against the live viewport so `minRadius` cannot force an oversized sphere on phones (fixes the Our Projects immersive page).
- Declared Next.js `viewport` metadata (`device-width`, `viewport-fit: cover`) and added `text-size-adjust` on `html` for predictable mobile typography.
- Replaced `100vw` gallery shell sizing with `100%` + `100dvh` fallbacks and `overflow-x: hidden` on the projects page to avoid horizontal scroll from the scrollbar width.
- Relaxed rigid CSS grid `minmax(280px|320px, …)` tracks in How It Works, Team, and CTA so sub-320px viewports do not overflow.
- Tuned FeaturedProjects inner `max-width`, Why Us poster grid flexibility, Hero small-screen padding (including safe-area), fixed nav/logo positioning with safe-area insets, and made the Industries word rail horizontally scrollable when labels exceed the viewport.

## 2026-04-30-v168

- Fixed DomeGallery drag pointer typing for production type-checks by normalizing mouse/pointer/touch event coordinates before computing deltas.
- Removed direct `event.clientX/Y` access to avoid TypeScript failures with union gesture events.

## 2026-04-29-v162

- Smoothed `our-projects` dome motion by reducing tile density (`segments`) and lowering autoplay speed for calmer horizontal rotation.
- Reduced globe size proportionally to the lower tile count by scaling down fit and radius constraints.
- Softened stretch dynamics (autoplay + drag) to avoid abrupt visual distortion during movement.

## 2026-04-29-v161

- Updated DomeGallery tile styling to add stronger spacing between images and switched project tiles to circular crops.
- Reworked dome coordinate distribution to use a denser latitude spread so the globe reads more circular overall instead of banded.

## 2026-04-29-v160

- Reduced `our-projects` DomeGallery autoplay rotation speed to make the globe motion calmer and easier to track.

## 2026-04-29-v159

- Updated footer marquee logo treatment so logos render white consistently across both strips.
- Added a subtle shadow on the white-strip logo to keep contrast readable against the light background.

## 2026-04-29-v158

- Upgraded the `our-projects` DomeGallery to a much larger visual scale by increasing fit/radius constraints and using a max-dimension fit strategy.
- Added continuous autoplay globe rotation so the experience animates without user interaction.
- Added elastic stretch/squash motion on project cards during autoplay and drag movement for a more dynamic, tactile gallery feel.

## 2026-04-28-v145

- Enforced sharp corners across the project by setting all UI `border-radius` values to `0` in homepage/section styles and global button/tooltip styles.
- Preserved only the CTA decorative orb shape in `src/components/home/CTA.module.scss` (`.orb`) as the single intentional rounded element.

## 2026-04-28-v132

- Reduced fixed nav logo sizing in `src/components/HomePage.module.css` across breakpoints for a smaller header mark:
  - default `.logo` max-width `150px` -> `130px`,
  - desktop (`min-width: 768px`) `200px` -> `170px`,
  - extra-small (`max-width: 575.98px`) `140px` -> `120px`.

## 2026-04-29-v157

- Simplified `our-projects` page to a pure immersive mode: removed all text/header content so the page is only the full-screen DomeGallery experience.
- Updated page layout styles to make the gallery consume the full viewport (`100vw x 100vh`).

## 2026-04-29-v156

- Added a global fixed top-right navigation (`Home`, `Our Projects`, `Our Culture`) so users can directly access the new pages from anywhere.
- Implemented site-consistent nav styling (uppercase micro-typography, sharp edges, segmented links, subtle glass layer) and mounted it in `src/app/layout.tsx` for app-wide visibility.

## 2026-04-29-v155

- Added two new App Router pages:
  - `our-projects` with integrated React Bits-style `DomeGallery` experience,
  - `our-culture` with a dedicated culture narrative layout and content cards.
- Integrated new `DomeGallery` component (`JavaScript + CSS variant`) under `src/components/dome-gallery/` and wired Unsplash placeholder imagery per request.
- Installed required dependency `@use-gesture/react` for DomeGallery drag/gesture interactions.

## 2026-04-28-v154

- Updated footer marquee behavior to explicitly follow user scroll direction:
  - scrolling down keeps the regular strip directions,
  - scrolling up reverses marquee movement directions.
- Preserved autoplay while coupling directional state to live ScrollTrigger velocity/direction.

## 2026-04-28-v153

- Strengthened footer marquee scroll-coupling so strip speed reacts more noticeably to user scroll velocity while preserving lower baseline autoplay.
- Increased velocity influence multiplier and sensitivity (ScrollTrigger `getVelocity` mapping + clamp range).

## 2026-04-28-v152

- Reduced footer marquee motion speed by lowering both base autoplay velocity and scroll-reactive boost multipliers for calmer strip movement.

## 2026-04-28-v151

- Updated footer body content to match actual site/project structure:
  - replaced placeholder location blocks with `Featured Projects` links sourced from `FEATURED_PROJECTS`,
  - added `Site` quick links to key homepage chapters.
- Updated bottom footer nav content to reflect project-related client labels instead of generic placeholder words.

## 2026-04-28-v150

- Rebalanced footer marquee scale to medium sizing (logo + `TakeMeLive`) while increasing repetition density for a fuller continuous strip.
- Increased repeated marquee item count and tightened item/track spacing so the ribbons feel more frequent without oversized typography.

## 2026-04-28-v149

- Added explicit borders around both footer marquee strips for stronger ribbon separation/definition.
- Tuned dark-strip border color for contrast against the black band.

## 2026-04-28-v148

- Fixed black background bleed above the white footer marquee strip by adding a white top mask layer on the marquee stack, preventing dark slivers from appearing due to strip rotation/overlap.

## 2026-04-28-v147

- Changed footer base background to black and ensured the dark footer body visually begins beneath the marquee strips.
- Upscaled marquee strips aggressively (~3x): substantially larger strip height, spacing, logo scale, and `TakeMeLive` typography for high-impact ribbon presence.

## 2026-04-28-v146

- Increased footer marquee strip scale (height, typography, spacing) for a bolder visual presence.
- Added layered overlap treatment between the two strips with slight opposing rotation/offset to match the reference-style stacked ribbon look.

## 2026-04-28-v145

- Added a new `Footer` chapter after CTA with two marquee strips above the footer body:
  - strip 1: white background with dark text,
  - strip 2: black background with light text.
- Each marquee repeats logo + `TakeMeLive` and combines continuous autoplay with scroll-reactive velocity modulation via GSAP ScrollTrigger.
- Added footer body structure (location blocks + bottom nav links) to complete the section beneath the marquees.

## 2026-04-28-v144

- Increased CTA heading scale to match the section-header system used in other chapters (`clamp(2.4rem, 7vw, 6.4rem)`).

## 2026-04-28-v143

- Updated CTA chat composition to read like a conversational interface: blue bot message stays left-weighted while the user input step field is right-aligned as a reply block.
- Adjusted mobile bubble width so the left message remains visibly offset from the right-side input field.

## 2026-04-28-v142

- Updated CTA mobile breakpoint layout to right-align the contact form on phones (`max-width: 640px`) instead of centered alignment.

## 2026-04-28-v141

- Simplified CTA step input UI by removing the field label and keeping only placeholder text for each step prompt.
- Updated field layout styles to match placeholder-only structure.

## 2026-04-28-v140

- Fixed CTA mobile responsiveness by correcting inverted top padding clamp and replacing invalid flex alignment keywords with proper `flex-end`/`flex-start` values.
- Matched input-row layout closer to the reference by aligning label left and placeholder/value right on desktop, with a clean stacked fallback on small screens.

## 2026-04-28-v139

- Right-aligned the CTA contact form within the right column by switching the column flex alignment to `justify-content: flex-end`.

## 2026-04-28-v138

- Further reduced CTA input footprint with a hard narrower form width (`22rem`) and tighter card width constraints so the field is visibly smaller.
- Fixed placeholder/label alignment by introducing a dedicated `.fieldMain` wrapper inside the step field and forcing left-aligned input/placeholder rendering.

## 2026-04-28-v137

- Reduced CTA input row horizontal footprint by constraining form widths (`.formCard` and `.formStage`) so the step field no longer spans unnecessarily wide.
- Added responsive right-column centering for the constrained form at tablet/mobile breakpoints.

## 2026-04-28-v136

- Added larger top spacing to the CTA chapter by increasing section top padding while preserving existing bottom spacing and layout structure.

## 2026-04-28-v135

- Aggressively reduced CTA step-input sizing: substantially smaller field height, tighter padding/gaps, reduced label/input/confirmation typography, and compact action button footprint.

## 2026-04-28-v134

- Refined CTA single-step input sizing to better match the reference: reduced field height/padding, smaller label/input text scale, and a more compact action button.

## 2026-04-28-v133

- Refined CTA form interaction to a single-field stepper flow: only one input question is shown at a time, collecting responses sequentially with next/complete actions.
- Removed the `.monks` logo/avatar from the CTA chat header.
- Removed the outer bordered form container styling while preserving the animation-rich reveal and motion behavior.

## 2026-04-28-v132

- Added a new animated `CTA` chapter after `Team` with a high-fidelity two-column composition inspired by the provided reference:
  - left narrative block using the provided content,
  - right chat-style contact form card with avatar bubble, staged form rows, and progress dots.
- Implemented GSAP-heavy reveal choreography for CTA elements (left narrative, chat bubble, form fields, progress) plus continuous ambient motion accents to keep the section visually alive.
- Wired chapter logo contrast handoff for light background (`data-logo-invert="0"`).

## 2026-04-27-v131

- Intensified `Team` chapter motion language with a cinematic multi-layer reveal sequence:
  - stronger left/right panel entrances,
  - punchier headline/chip reveal choreography,
  - 3D card entry transforms (depth, rotation, scale),
  - media and card-body stagger layering for higher visual impact.
- Added interactive card hover tilt/lift + media zoom polish for a more energetic, premium feel after section load.
- Added explicit event-listener cleanup for card hover interactions to keep runtime behavior clean.

## 2026-04-27-v130

- Added a new `Team` chapter with polished two-column composition and high-fidelity presentation:
  - Section title/content from provided copy,
  - prominent headline (`PEOPLE BEHIND THE EXPERIENCES.`),
  - values chips (`Collaborative`, `Detail-focused`, `Purpose-driven`),
  - right-side role showcase cards (`Designers`, `Technologists`, `Producers`) with image/media treatment.
- Implemented GSAP reveal choreography for headline, intro, value chips, cards, and divider on scroll entry.
- Mounted `Team` directly after `Industries` in `src/app/page.tsx`.

## 2026-04-27-v129

- Changed `Industries` interaction mode to true carousel-style autoplay across all devices: words/tooltips/previews now keep cycling continuously without requiring hover, touch, or manual pagination.
- Retained desktop hover support as optional enhancement while autoplay remains active by default.

## 2026-04-27-v128

- Updated `Industries` mobile/touch interaction model to fully hands-free autoplay: continuous auto-cycling now runs on touch-like devices (`hover: none` or `pointer: coarse`) without requiring any tap.
- Removed manual touch tap trigger wiring so mobile behavior is consistently passive/autonomous.

## 2026-04-27-v127

- Added mobile/touch automation for `Industries` interactions: on devices without hover support, active word states now auto-cycle (ripple fill + tooltip + preview image) so the experience works without mouse hover.
- Kept desktop hover behavior unchanged and added pointer tap support to manually trigger a word state on touch devices.
- Updated preview/word/tooltip animation durations to respect reduced-motion preferences by switching to immediate state transitions.

## 2026-04-27-v126

- Fixed `Industries` lead heading sizing not applying: `.intro p` was overriding `.lead` styles due higher selector specificity.
- Updated selector to `.intro .lead` so `CULTURE DOESN'T BELONG TO ONE INDUSTRY.` now correctly renders at heading scale.

## 2026-04-27-v125

- Retuned the `Industries` left-column lead line (`CULTURE DOESN'T BELONG TO ONE INDUSTRY.`) to section-heading scale (`clamp(2.4rem, 7vw, 6.4rem)`) for consistent headline hierarchy with other chapters.

## 2026-04-27-v124

- Switched `Industries` hover preview visuals to use the same Unsplash-style placeholder imagery already used in upper homepage sections for consistent visual language.
- Kept preview panel behavior scoped to hover/focus only, and updated preview image rendering to standard `<img>` handling for remote placeholder sources.

## 2026-04-27-v123

- Updated `Industries` hover preview behavior so the left-side image panel is hidden by default and only appears while hovering/focusing an industry word.
- Switched preview sources to use image assets from `public/assets` instead of SVG placeholders.
- Added GSAP-controlled shell animation for the preview container itself, so the whole panel slides in from the left and exits when hover ends.

## 2026-04-27-v122

- Added a hover-linked preview image panel below the left-column `Industries` content.
- Wired each right-column industry word hover/focus to show its corresponding image with a left-to-right slide-in animation.
- Preserved existing ripple word fill and tooltip interactions while layering in the new visual preview behavior.

## 2026-04-27-v121

- Promoted the left-column heading (`CULTURE DOESN'T BELONG TO ONE INDUSTRY.`) to a stronger display scale so it reads clearly as the section title.
- Added an animated vertical divider between the `Industries` columns with a flowing gradient accent, including reduced-motion fallback and mobile auto-hide behavior.

## 2026-04-27-v120

- Updated `Industries` two-column typography hierarchy: significantly increased the left narrative column headline/body sizes and contrast for better readability.
- Right-aligned the interactive industries word column on desktop as requested, while preserving centered alignment fallback on smaller breakpoints.

## 2026-04-27-v119

- Reworked `Industries` content layout into a two-column structure: left column holds the narrative intro under the section kicker, right column holds the large interactive hoverable industry words.
- Added responsive fallback so the layout collapses back to a single centered column on smaller screens.

## 2026-04-27-v118

- Added a new narrative intro block to `Industries` (placed before the interactive industry word cluster) with the provided headline and supporting copy.
- Styled the intro for centered readability and hierarchy while preserving the existing tooltip + ripple interactions on the industries text below.

## 2026-04-27-v117

- Amplified `Industries` tooltip presence: larger dimensions, bigger and bolder type, stronger contrast, and heavier shadow treatment so tooltips are unmistakably visible.
- Increased tooltip pop animation intensity (`y` offset, scale delta, stronger `back.out` ease) for a clearer, less subtle hover/focus cue.

## 2026-04-27-v116

- Fixed missing tooltip visibility for the first `Industries` words by removing clipping on the text block container (`.block overflow: visible`).
- Raised stacking order for active word wrappers and tooltips so popouts reliably render above nearby content.

## 2026-04-27-v115

- Added attractive per-word tooltips to `Industries`: each hovered/focused industry now pops a playful context line tied to that specific word.
- Wired GSAP tooltip pop animation (`autoAlpha`, `y`, `scale`, `rotateX`) so each tooltip feels like it pops out from the hovered word while preserving the ripple color-fill interaction.
- Added responsive tooltip styling and pointer tail treatment for clearer visual anchoring to each word.

## 2026-04-27-v114

- Updated `Industries` ripple fill sizing to be dynamic per hovered word by computing the farthest-corner radius from the pointer origin, ensuring the accent color fully fills the entire word every time.
- Increased reduced-motion fallback ripple radius so full-word coverage is preserved without pointer-tracked animation.

## 2026-04-27-v113

- Replaced the `Industries` word hover fill animation from left-to-right wipe to a ripple reveal.
- Added per-word ripple origin tracking from pointer position and animated circular clip expansion/contraction (`--ripple-x`, `--ripple-y`, `--ripple-size`) so fill radiates from hover point.
- Kept the approved centered light-theme layout unchanged while updating only the color-fill motion style.

## 2026-04-27-v112

- Kept the approved `Industries` layout unchanged and replaced hover behavior with a true per-word color fill animation.
- Updated interaction logic to animate a word-local fill progress variable (`--fill-progress`) from `0%` to `100%` on hover/focus and back on leave/blur.
- Changed reveal mask from spotlight circle tracking to left-to-right word fill clipping so only the hovered word gets the animated color fill.

## 2026-04-27-v111

- Updated `Industries` to a light chapter treatment with white background and black typography as requested.
- Switched the industries text layout from justified flow to centered alignment.
- Updated section logo handoff to dark mode (`data-logo-invert="0"`) for proper contrast on the light background.

## 2026-04-27-v110

- Matched `Industries` container width to the same section grid used above (`min(92vw, 1240px)`) so the chapter aligns on the same horizontal line as surrounding sections.
- Aligned the industries text block to the section content line by removing the extra centered narrow block offset (`.block` now uses full inner width).

## 2026-04-27-v109

- Centered the `Industries` text block with a bounded max width and auto margins so the entire composition sits visually in the middle of the section.
- Increased inter-word spacing in the inline industry wrappers for clearer readability while preserving a single justified text flow.
- Tightened spotlight behavior so only the currently hovered/focused word reveals the accent layer (default reveal opacity is now fully hidden for all non-active words).

## 2026-04-27-v108

- Rebuilt `Industries` from scratch into a stable layered spotlight system: each industry word now renders a base white layer plus a GSAP-driven neon reveal layer clipped by a pointer-tracked circular mask.
- Restored requested visual direction by returning the chapter to a black background with white oversized justified text flow (single block, no columns/list formatting) and strict section containment.
- Replaced fragile hint-popover hover behavior with direct word-level spotlight reveal interactions that support mouse + keyboard focus and clean reset on leave/blur.

## 2026-04-27-v107

- Fixed non-visible `Industries` hover behavior by removing hint clipping constraints (`.block overflow: visible`), moving hint popovers above words, and adding strong CSS hover/focus fallback states for word lift/color + hint reveal.
- Added explicit pointer affordance (`cursor: pointer`) on industry items so interactivity is discoverable.

## 2026-04-27-v106

- Rebuilt `Industries` hover system from scratch for reliability: simplified event lifecycle, direct GSAP `clip-path` spotlight reveal, and stable word highlight/reset transitions.
- Added wrapper interaction polish (`inline-block` spacing and hint `will-change`) to keep hover/focus animations consistent across rapid pointer movement.

## 2026-04-27-v105

- Fixed non-working `Industries` hover interaction by replacing fragile CSS mask-variable reveal with GSAP-driven `clip-path` spotlight animation on the hint text.
- Improved hover hit reliability by changing each industry wrapper to `inline-block`, ensuring mouse enter/leave and spotlight tracking fire consistently.

## 2026-04-27-v104

- Reworked `Industries` hover into a cursor-driven spotlight reveal using GSAP-smoothed mouse tracking over hidden teaser text.
- Added radial mask-based text reveal tied to live cursor position (`--spot-x`, `--spot-y`, `--spot-size`) for a much more evident interactive hover effect.

## 2026-04-27-v103

- Amplified `Industries` hover interactions to be more obvious: stronger color/scale lift on words, glow accent, and a bolder animated hint reveal card (higher contrast, larger type, deeper motion).

## 2026-04-27-v102

- Added GSAP-powered hover reveal interactions for `Industries` words: each industry now exposes a hidden micro-copy line on hover/focus with animated fade/slide and text color shift for engagement.
- Introduced inline hover hint styling in `Industries.module.scss` with responsive tooltip sizing and keyboard-focus support.

## 2026-04-27-v101

- Inverted `Industries` chapter color theme to a light section (`#f6f3ec`) with dark typography and dark grid overlay accents.
- Updated section logo contrast handoff to dark logo mode (`data-logo-invert="0"`) for readability on the white background.

## 2026-04-27-v100

- Reduced left/right side spacing for the large `Industries` text block only by expanding `.block` width beyond the inner container while keeping the `Industries We Serve` kicker alignment unchanged.

## 2026-04-27-v99

- Increased `Industries` word scale substantially (`clamp(3rem, 7.8vw, 7.4rem)`) with tighter leading so the typography occupies and dominates section space as requested.

## 2026-04-27-v98

- Fixed `Industries` text containment by adding explicit inter-word spacing in render output and tightening block wrapper behavior (`width` + centered bounds + overflow clipping), preventing the single-line run-off state.

## 2026-04-27-v97

- Fixed `Industries` text overflow by rebalancing typography scale and spacing (`clamp` max reduced), narrowing block width, and centering layout within a `100vh` content frame so all words stay inside section bounds.

## 2026-04-27-v96

- Increased `Industries` oversized word scale in `Industries.module.scss` and changed text block flow to justified alignment with centered last line (`text-align: justify; text-align-last: center`) for a stronger centered-but-block composition.

## 2026-04-27-v95

- Restyled `Industries` to a black-background chapter with white typography and switched logo handoff to white (`data-logo-invert="1"`).
- Replaced column/grid listing with a single flowing oversized text block (`flex-wrap`) so industries read as one continuous visual statement instead of discrete list columns.

## 2026-04-27-v94

- Added new `Industries We Serve` section (`src/components/home/Industries.tsx` + `Industries.module.scss`) below `Services` in `src/app/page.tsx`.
- Replicated page-35 style direction with oversized industry typography and masked background fill effect across each word, on a lime-tinted high-contrast chapter background.

## 2026-04-27-v93

- Updated `Services` panel animation to strong alternating lateral entrances on ScrollTrigger (`x: -180 / +180` -> `0`) so each service clearly comes in from left/right.
- Adjusted service panel grid layout so every service heading is anchored to the left content column while supporting detail/outcome text sits on the right column for desktop.

## 2026-04-27-v92

- Improved `Services` panel readability in `Services.module.scss` by rebalancing text columns, reducing headline compression, increasing body line-height/contrast, and adding clearer separation for the outcome line.

## 2026-04-27-v91

- Upgraded `Services` card visual impact in `Services.module.scss` with stronger depth/contrast treatment: heavier border + layered shadows, vertical accent rail, larger display-style service titles, bolder list markers, and emphasized closing description block.

## 2026-04-27-v90

- Intensified `Services` chapter motion language in `Services.tsx`/`.module.scss` with layered GSAP effects: parallax background typography, animated media collage rail, image-in-frame scrub parallax, and stronger staggered card entrances.
- Added cinematic showcase imagery above service cards and tied it to ScrollTrigger reveal + scrub behavior to match the animation richness of surrounding homepage sections.

## 2026-04-27-v89

- Added a new animated `Services` chapter (`src/components/home/Services.tsx` + `Services.module.scss`) directly below `FeaturedProjects` in `src/app/page.tsx`.
- Implemented GSAP ScrollTrigger choreography for smooth section motion: headline/intro reveal, staggered service card entrances with directional offsets + clip reveal, and a scrubbed ambient stripe parallax.
- Mapped all provided services content into structured cards while preserving the project’s cinematic dark UI language and responsive behavior.

## 2026-04-27-v88

- Added canonical featured project dataset in `src/content/featuredProjects.ts` with the provided four projects (title, event/client, summaries, descriptions, cover image, and gallery images).
- Updated `FeaturedProjects.tsx` to source card content/routes from shared data so every card links to its dedicated project slug route.
- Added dynamic project detail pages at `src/app/projects/[slug]/page.tsx` (+ scoped styles) that render each project’s full copy and image gallery, with static params generation for all featured slugs.

## 2026-04-27-v87

- Increased spacing around the `FeaturedProjects` cards container by adding responsive internal padding to `.viewport` in `FeaturedProjects.module.scss` (desktop/tablet/mobile), creating more breathing room around the card rail.

## 2026-04-27-v86

- Fixed `FeaturedProjects` runtime `ReferenceError` by importing `ScrollTrigger` from `@/lib/gsap` in `src/components/home/FeaturedProjects.tsx` (used by `ScrollTrigger.create` during card visibility state updates).

## 2026-04-27-v85

- Rebuilt `FeaturedProjects` structure and styling from scratch into a single stable architecture: pinned 100vh scene with marquee heading + clipped viewport + horizontal rail of project cards.
- Replaced conflicting legacy stack/stage CSS with a unified `viewport/rail/card` system to eliminate transform-stack conflicts and make overflow behavior deterministic.
- Updated scroll animation logic to drive one robust rail translation timeline plus lightweight card oscillation/opacity emphasis, preserving hover interactions without layered animation collisions.

## 2026-04-27-v84

- Applied stricter horizontal overflow containment for `FeaturedProjects` during pinned GSAP transforms by adding `overflow-x: clip`, `contain: layout paint`, and `isolation: isolate` across section/stage/marquee/stack wrappers in `FeaturedProjects.module.scss`.
- This hardens the section against transform-induced width leakage that can still produce horizontal scrollbars even when `overflow-x: hidden` is present.

## 2026-04-27-v83

- Fixed horizontal overflow risk in `FeaturedProjects.module.scss` by enforcing x-axis clipping/constraints on section, inner wrapper, stage, and marquee shell (`overflow-x: hidden`, `max-width: 100%/100vw`), preventing full-page side scroll caused by transformed elements.

## 2026-04-27-v82

- Fixed `FeaturedProjects` sticky/stuck feel by reducing pin duration in `FeaturedProjects.tsx` (`end: '+=220%'`) and smoothing scrub to `1` for faster release.
- Normalized the chapter to a true viewport section by changing `FeaturedProjects.module.scss` section/inner sizing to `100vh` and tightening internal spacing and card-stage heights for reliable in-viewport rendering.

## 2026-04-27-v81

- Added a GSAP ScrollTrigger-driven section-stage swipe layer to `FeaturedProjects` so the entire chapter (marquee + card area + hint) now shifts like a scroll slider, not just individual cards.
- Introduced per-step stage transforms (entry settle + directional exit) plus progress snapping in `FeaturedProjects.tsx` to mimic slide-like transitions while preserving existing card choreography.

## 2026-04-27-v80

- Switched `FeaturedProjects` to a white chapter theme in `FeaturedProjects.module.scss` (light background, dark grid overlay, dark marquee/metadata text) for requested visual treatment.
- Updated `FeaturedProjects.tsx` section logo contrast handoff to `data-logo-invert="0"` so the fixed header logo stays dark on the new white background.

## 2026-04-27-v79

- Decoupled `FeaturedProjects` heading marquee movement from user scroll input by removing scroll-delta velocity coupling in `FeaturedProjects.tsx`.
- Set marquee loop to a stable constant ticker speed so header animation no longer accelerates/reverses based on scroll behavior.

## 2026-04-27-v78

- Removed infinite card looping from `FeaturedProjects` by switching the stack render source back to the base 4-item `PROJECTS` array only.
- Updated the pinned scroll span in `FeaturedProjects.tsx` to a finite project pass (`PROJECTS.length * 110%`) so the card choreography now runs once per section visit.

## 2026-04-27-v77

- Changed `FeaturedProjects` card scroll layout from a compact diagonal stack to a wider lane-based flow (right lane -> middle lane -> hero -> left lane -> exit) in `src/components/home/FeaturedProjects.tsx`.
- Updated `FeaturedProjects.module.scss` layout dimensions to support the new choreography with a wide viewport container, fixed card sizing, and clipped overflow for cleaner travel across the section.

## 2026-04-27-v76

- Added a top marquee heading to `FeaturedProjects` using repeated `Featured Projects` labels and GSAP ticker movement, restoring marquee-style chapter titling.
- Matched marquee typography scale to the site’s large heading system in `FeaturedProjects.module.scss` (`Anton`, `clamp(2.9rem, 8vw, 7.5rem)`) for visual consistency with other sections.

## 2026-04-24-v75

- Reworked `FeaturedProjects` animation flow in `src/components/home/FeaturedProjects.tsx` to a pinned scrub-based diagonal card cycle using `ScrollTrigger` timeline choreography over triplicated project entries for long-form looped browsing.
- Updated card sequencing behavior to progress through layered stack states before diagonal exit, creating a clearer "scroll-swiper" narrative pass-through.
- Removed an unused `ScrollTrigger` import symbol warning after integrating the new timeline approach.

## 2026-04-24-v74

- Reworked `FeaturedProjects` section into a minimalist diagonal scroll-swiper composition in `src/components/home/FeaturedProjects.tsx` with phase-driven card cycling and per-card transform choreography.
- Refactored section styling in `src/components/home/FeaturedProjects.module.scss` to a tighter stack container layout with index labels, deeper image framing, and explicit `SCROLL TO SURF` footer hint.

## 2026-04-24-v73

- Retuned `FeaturedProjects` card perspective styling to better match the provided reference: removed heavy global 7-o'clock tilt and replaced it with upright cinematic plane offsets using per-card 3D transforms (`translateZ` + subtle `rotateY` variations).
- Increased swiper scene depth (`perspective: 1800px`) and preserved layered panel feel while keeping infinite loop behavior unchanged.

## 2026-04-24-v72

- Added a global 3D card tilt in `FeaturedProjects.module.scss` so swiper cards now lean toward a 7 o’clock direction (`rotateZ(-9deg) rotateX(7deg)`) with section-level perspective for depth.

## 2026-04-24-v71

- Reset `FeaturedProjects` card animation system from scratch and replaced the collage/deck interpolation with a basic infinite swiper track (`swiperViewport` + `swiperTrack`) in `src/components/home/FeaturedProjects.tsx`.
- Implemented continuous leftward card loop using GSAP ticker + wrap math across triplicated project data, with scroll delta used only to modulate loop speed for simple scroll-reactive behavior.
- Simplified card interactions to CSS hover transitions (image scale to `1.05`, overlay fade) and removed complex per-card runtime transform orchestration.

## 2026-04-24-v70

- Fixed `FeaturedProjects` deck visibility reliability by switching card targeting to DOM query selection (`[data-project-card]`) instead of ref array collection, preventing single-card collapse scenarios.
- Rebalanced collage slot geometry so multiple planes stay visible in-frame with clearer overlap/depth, closer to the intended reference composition.
- Adjusted marquee shell vertical padding and heading scale/line-height to avoid top clipping while preserving large section-heading treatment.

## 2026-04-24-v69

- Refined `FeaturedProjects` to better match the provided visual reference by shifting from oversized full-height tiles to a floating collage of portrait planes with varied slot depths, rotations, opacity, and diagonal offsets.
- Expanded the animated deck to six visible cards (`PROJECTS` + recycled entries) so the composition reads as a richer multi-plane scene instead of a sparse 4-card stack.
- Reduced tile dimensions and section stack height in `FeaturedProjects.module.scss` so cards appear as independent floating panels rather than full-column blocks.

## 2026-04-24-v68

- Converted `FeaturedProjects` cards to an infinite loop swiper-like deck in `src/components/home/FeaturedProjects.tsx` by cycling cards through interpolated stacked slots on each GSAP ticker frame.
- Kept scroll velocity influence by adding velocity-based phase acceleration so loop speed reacts to scroll direction/intensity while continuing to auto-advance.
- Simplified card positioning styles in `FeaturedProjects.module.scss` (removed fixed per-card placement classes) so transforms are fully animation-driven.

## 2026-04-24-v67

- Increased `FeaturedProjects` marquee typography in `src/components/home/FeaturedProjects.module.scss` to section-heading scale (large display clamp, tighter leading, stronger contrast) so the loop reads as a true chapter headline.

## 2026-04-24-v66

- Increased `FeaturedProjects` card scale in `src/components/home/FeaturedProjects.module.scss` (desktop/tablet/mobile widths and stack height) so project tiles read significantly larger.
- Reworked card placement offsets into a tighter overlapping pile, producing a clearer stacked composition instead of a wide horizontal spread.

## 2026-04-24-v65

- Updated `FeaturedProjects` marquee content to loop `Featured Projects` and styled it with the display/heading font treatment for stronger chapter branding.
- Added scroll-velocity linked diagonal drift to the stacked project cards in `src/components/home/FeaturedProjects.tsx` by reusing the same ticker/scroll delta signal as the marquee and applying per-card interpolated `x/y` offsets.
- Preserved existing card hover interactions, links, and overlap composition while making card motion feel closer to the provided diagonal reference.

## 2026-04-24-v64

- Added a new `FeaturedProjects` chapter (`src/components/home/FeaturedProjects.tsx` + `FeaturedProjects.module.scss`) and mounted it after `HowItWorks` in `src/app/page.tsx`.
- Implemented a GSAP ticker-driven infinite marquee that reacts to window scroll velocity by amplifying horizontal title loop speed.
- Built a 4-card overlapping project stack inspired by the provided visual reference, with each card linking to `/projects/[slug]` and marked with `data-cursor="link"`.
- Added GSAP hover interactions per card: image scales to `1.05` over `0.4s` (`power2.out`) and dark overlay opacity reduces on hover.

## 2026-04-24-v63

- Updated `src/components/home/HowItWorks.tsx` to set `data-logo-invert="1"` for the `How It Works` section, so the fixed nav logo stays white while this dark chapter is active.

## 2026-04-24-v62

- Fixed the `HowItWorks` build failure by adding the missing stylesheet file `src/components/home/HowItWorks.module.scss` referenced by the component import.
- Implemented complete responsive styling for all `HowItWorks` section class hooks (header, featured panel, active step states, timeline line, and mobile breakpoints) so the module now renders with the intended dark chapter visual treatment.

## 2026-04-24-v61

- Refined hero spotlight hover behavior in `src/components/home/Hero.tsx` by binding pointer tracking to the headline itself (instead of the full section), making the effect activate only when hovering the hero text.
- Updated spotlight fallback behavior to keep a subtle resting glow (`--spot-size: 120`) and animate to a stronger highlight on hover, improving perceived polish and reducing abrupt on/off transitions.
- Improved hero text legibility in `src/components/home/Hero.module.scss` by restoring a visible base textured fill while preserving GSAP-driven spotlight amplification on hover.

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

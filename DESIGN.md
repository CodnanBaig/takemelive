# Design

## Theme
Cinematic, immersive, high-impact storytelling portfolio for a live experience agency.

## Color Palette

### Base (tokens in `src/styles/cinematic-tokens.css`)
- `--tml-black` — page void
- `--tml-void` — footer / deep surfaces
- `--tml-stage` — dark section body (`#040506`)
- `--tml-stage-alt` — pinned dark panels (Why Us)
- `--tml-parchment` — light section body (`#f6f3ec`)
- `--tml-ink-dark` — type on light surfaces
- `--tml-white` — type on dark surfaces

### Accent
- `--tml-accent`, `--tml-accent-bright`, `--tml-accent-glow`, `--tml-accent-line`

## Typography

### Display
- Font: `Anton`
- Usage: Headings, section titles
- Sizing: fluid `clamp()`, **6rem maximum** on homepage display lines
- Letter-spacing: **≥ -0.04em** (prefer `-0.03em` on large Anton)

### Body
- Font: `Poppins`
- Weights: 200–700
- Line length: 65–75ch where prose blocks apply
- Use `text-wrap: balance` on major headings

## Layout & seams

- **Hard-cut policy:** adjacent sections own solid backgrounds; no gradient bridges between scenes
- Scene groups provide stacking (`z-index`) only, not ambient cross-fades
- Light stack: Who We Are, Industries, CTA (`--tml-parchment`)
- Dark stack: Hero through Services, Showreel, Team (`--tml-black` / `--tml-stage`)

## Components

### Cinematic Atmosphere
- Grain/beam overlay via `CinematicAtmosphere` (not page-level scanlines)

### Scroll Scenes
- GSAP pinned scenes with `prefers-reduced-motion` fallbacks
- Pinned timelines sync `progress` on load after `ScrollTrigger.refresh()` for hash jumps

## Motion
- Ease: `--tml-ease-out` (cubic-bezier 0.16, 1, 0.3, 1)
- Card depth: border **or** shadow ≤8px blur, not both at large blur radii

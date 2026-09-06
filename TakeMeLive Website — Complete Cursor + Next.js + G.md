<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# TakeMeLive Website — Complete Cursor + Next.js + GSAP Build Guide


***

## 0. Before You Start — Mental Model

This site is **scroll-driven storytelling**. Almost every section is a GSAP ScrollTrigger scene. Think of the page as a **timeline of pinned scenes**, not a traditional scrolling document. The key principle in Cursor: break every section into its own component with its own GSAP context so nothing leaks.

***

## 1. Project Setup

### 1.1 Init the project

```bash
npx create-next-app@latest takemelive --typescript --tailwind --app
cd takemelive
```


### 1.2 Install all dependencies upfront

```bash
npm install gsap @gsap/react lenis @studio-freight/lenis
npm install three @types/three
npm install clsx tailwind-merge
```

> **Note:** GSAP ScrollTrigger, SplitText, and ScrollSmoother are **included** in the gsap package. No separate install needed.

### 1.3 Register GSAP plugins globally

Create `lib/gsap.ts`:

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };
```


### 1.4 Smooth scroll with Lenis

Create `components/SmoothScroll.tsx`:

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
```

Wrap your root layout with this.

***

## 2. Folder Structure

```
app/
  layout.tsx              ← SmoothScroll wrapper + CustomCursor
  page.tsx                ← Home (assembles all sections)
  projects/page.tsx       ← All Projects page
  projects/[slug]/page.tsx ← Single project page
  culture/page.tsx        ← Culture page
components/
  home/
    Hero.tsx
    Transition.tsx
    WhatWeDo.tsx
    WhoWeAre.tsx
    WhyUs.tsx
    HowItWorks.tsx
    FeaturedProjects.tsx
    Services.tsx
    Industries.tsx
    Team.tsx
    CTA.tsx
  shared/
    Navbar.tsx
    Footer.tsx
    CustomCursor.tsx
    SmoothScroll.tsx
    SplitHeading.tsx
lib/
  gsap.ts
```


***

## 3. Cursor Guide — How to Prompt

For each section below, open the file in Cursor and use the prompt pattern:

> **"Create a [component name] React component using GSAP ScrollTrigger. Use useGSAP from @gsap/react to scope animations. Clean up on unmount. Use Tailwind for layout. Here is exactly what it should do: [paste the spec below]."**

***

## 4. Section-by-Section Build Guide


***

### 4.1 Custom Cursor (Global)

**File:** `components/shared/CustomCursor.tsx`

**What it does:** A custom circular cursor that trails behind the mouse. On hover over links/buttons it morphs (scales up, changes mix-blend-mode).

**Cursor Prompt:**

```
Build a CustomCursor component. 
- Two divs: a small dot (8px) and a larger ring (40px)
- Use GSAP quickTo for smooth lag effect: dot follows instantly, ring follows with 0.15s lag
- On mouseenter of [data-cursor="link"], scale ring to 2.5 and set mix-blend-mode to difference
- On mouseleave reset
- Hide the default OS cursor globally via CSS
- Use useEffect with cleanup
This is for the Featured Projects page hover (cursor trail velocity style like motion.dev example)
```


***

### 4.2 Hero Section (Home)

**Reference:** trucknroll.com/culture  — massive oversized type, image embedded inside letter or word, full bleed.[^1]

**File:** `components/home/Hero.tsx`

**What it does:**

- Full-viewport hero with giant display text: **"EXPERIENCES THAT MOVE PEOPLE."**
- Sub-headline: "Creative experience studio designing live moments, immersive environments, and cultural impact."
- Background: dark/black, white type
- On load: letters animate in using GSAP SplitText — each word clips up from below with staggered delay

**Cursor Prompt:**

```
Build a Hero component for a fullscreen landing section.
- Display heading: "EXPERIENCES THAT MOVE PEOPLE." — use SplitText to split by words
- On mount, animate words from { y: 120, opacity: 0 } to { y: 0, opacity: 1 } with stagger 0.08, ease "power4.out"
- Subheading fades in with delay 0.6s
- Background is black (#000), text is white
- Use useGSAP from @gsap/react, scope to container ref
- Add a scroll indicator arrow that bounces with GSAP yoyo repeat
```


***

### 4.3 Transition Section (After Hero)

**Reference:** charlesleclerc.com  — instead of icon boxes, use TML's service icons in a horizontal reveal.[^2]

**File:** `components/home/Transition.tsx`

**What it does:**

- Headline: "NOT EVERYTHING NEEDS ATTENTION. YOUR BRAND DOES."
- Full-width horizontal scroll of icons (TML service categories) that pins the section while you scroll horizontally through icons
- Each icon has a label beneath it

**Cursor Prompt:**

```
Build a pinned horizontal scroll section using GSAP ScrollTrigger.
- Pin the section for 300vh of scroll
- Animate a horizontal track of icons from x: "0%" to x: "-80%" as user scrolls
- Icons are: Creative Strategy, Interactive Tech, Production, Event Management, Digital Amplification — each as a card with an SVG icon placeholder and a label
- Use ScrollTrigger with scrub: 1.5 for smooth feel
- Add a top headline that fades in when section enters viewport
```


***

### 4.4 What We Do

**File:** `components/home/WhatWeDo.tsx`

**What it does:**

- Large headline: "WE DESIGN EXPERIENCES THAT PEOPLE DON'T JUST SEE — THEY FEEL."
- Body text reveals line by line as you scroll (each line clips up)
- Background transitions from black to off-white as section enters (using GSAP backgroundColor tween tied to ScrollTrigger progress)

**Cursor Prompt:**

```
Build a WhatWeDo section.
- Split body paragraph into lines using SplitText (type: "lines")
- Each line animates from { clipPath: "inset(0 0 100% 0)", y: 30 } to { clipPath: "inset(0 0 0% 0)", y: 0 }
- Stagger 0.1s, triggered when section is 60% in viewport
- The section background transitions from #000 to #f5f5f0 using ScrollTrigger scrub on backgroundColor
- Headline is oversized (clamp 5vw, 10vw) all caps
```


***

### 4.5 Who We Are

**File:** `components/home/WhoWeAre.tsx`

**What it does:**

- Headline: "WE'RE A CREW OF CREATORS, DREAMERS, AND DOERS."
- A rotating/orbiting set of role labels (Visionary designers, Technologists, Cultural strategists, Execution experts) arranged in a circle or floating layout
- On scroll, each role word fades and scales in

**Cursor Prompt:**

```
Build a WhoWeAre section.
- Center a large headline, split by words using SplitText
- Around/below the headline, display 4 role titles in a loose scattered layout (absolute positioned with different positions)
- Each role title animates in from random x: ±100, opacity: 0 with ScrollTrigger start: "top 70%"
- Use stagger 0.12, ease "back.out(1.7)"
```


***

### 4.6 Why Us

**File:** `components/home/WhyUs.tsx`

**What it does:**

- Headline: "WE ARE A STUDIO THAT MOVES CULTURE"
- 4 differentiators revealed as the user scrolls — each line/block slides in from the left with a numbered counter

**Cursor Prompt:**

```
Build a WhyUs section with 4 differentiator items.
- Each item: a number (01, 02...) + bold title + short descriptor
- Items animate in from { x: -80, opacity: 0 } staggered as user scrolls
- Add a thin horizontal rule that draws from 0% to 100% width using scaleX ScrollTrigger scrub between items
- Background: off-white, text: black
```


***

### 4.7 How It Works

**File:** `components/home/HowItWorks.tsx`

**What it does:**

- 4 phases: DISCOVER → DESIGN → BUILD → GO LIVE
- Pinned section: as user scrolls, each phase card enters from the right and stacks on top of the previous (card stack effect)

**Cursor Prompt:**

```
Build a pinned HowItWorks section with a stacking card animation.
- 4 cards (DISCOVER, DESIGN, BUILD, GO LIVE) each with a title and short description
- Pin the container, each card starts at { y: "100vh" } and scrolls into position, stacking with slight scale reduction on previous cards
- Use ScrollTrigger with scrub: true, each card occupies 1/4 of total pinned scroll distance
- Cards have a border, dark background, white text
- Active card indicator (progress dots) at bottom
```


***

### 4.8 Featured Projects (Homepage Marquee Strip)

**Reference:** motion.dev scroll velocity linked offset  — 3D scrolling horizontal panels.[^3]

**File:** `components/home/FeaturedProjects.tsx`

**What it does:**

- Section header: project titles scrolling in a velocity-linked marquee (faster scroll = faster marquee)
- Below: 4 project cards (Red Bull Energy Lounge, TOKEN 2049, Maraya Concert Series, Lusail Super Cup)
- Each card is a full-bleed image with project name overlaid
- On hover: custom cursor changes to "VIEW →" text

**Cursor Prompt:**

```
Build a FeaturedProjects section.
- Top: a horizontal marquee of project titles (infinite loop) — use GSAP ticker with scroll velocity: track window scroll delta, multiply marquee speed by it
- Below: 4 project cards in a horizontal row (each 40vw wide, full height image with dark overlay)
- On card hover: image scales to 1.05 with GSAP duration 0.4 ease "power2.out", overlay opacity reduces
- Add data-cursor="link" to each card for custom cursor
- Each card links to /projects/[slug]
- Project data as a const array at top of file
```


***

### 4.9 Services Section

**File:** `components/home/Services.tsx`

**What it does:**

- Headline: "END-TO-END EXPERIENCE CREATION."
- 5 service categories, each in an accordion/expandable row
- On hover/expand: the row expands revealing sub-services, row height animates with GSAP

**Cursor Prompt:**

```
Build a Services accordion section.
- 5 service rows (Creative Strategy, Interactive Technology, Production & Delivery, Event Management, Digital Amplification)
- Each row: number + service name + expand icon
- On click, GSAP animates height from 0 to auto using gsap.set + getBoundingClientRect trick (not CSS transition, pure GSAP)
- Sub-service tags appear inside expanded row with stagger fade-in
- Only one row open at a time — animate close on previous before opening new
- Thin divider lines between rows, drawn in with scaleX on scroll
```


***

### 4.10 Industries Section

**File:** `components/home/Industries.tsx`

**What it does:**

- Headline: "CULTURE DOESN'T BELONG TO ONE INDUSTRY."
- 12 industries displayed as large text items in a grid/list
- On hover each item: reveals a hidden one-liner (mini "joke"/tagline) below it — only visible on hover
- The entire list has a continuous marquee/scroll animation in the background

**Cursor Prompt:**

```
Build an Industries section.
- List 12 industries: Culture, Entertainment, Sport, Technology, Luxury, Fashion, Automotive, Media, Corporate, Tourism, Government, Music
- Display as a grid of large text items (2 or 3 columns)
- Each item has a hidden one-liner (e.g. "Sport: We make fans forget they're standing." — write funny ones for each)
- On mouseenter: GSAP animates the one-liner from { height: 0, opacity: 0 } to { height: "auto", opacity: 1 } with ease "power2.out"
- On mouseleave: reverse
- Overall section: on scroll entry, items stagger in from opacity 0 with ScrollTrigger
```


***

### 4.11 Team Section

**File:** `components/home/Team.tsx`

**What it does:**

- Headline: "PEOPLE BEHIND THE EXPERIENCES."
- Team member cards in a horizontal scroll strip
- On scroll: cards reveal with a clip-path wipe from left

**Cursor Prompt:**

```
Build a Team section.
- 4-6 team member cards with name, role, and an image placeholder
- Cards animate in using clipPath: "inset(0 100% 0 0)" → "inset(0 0% 0 0)" staggered on ScrollTrigger
- Horizontal layout with overflow visible so partial cards peek in from the right
- Simple, minimal card design — white background, black text, square image ratio
```


***

### 4.12 CTA Section

**Reference:** monks.com CTA style[^4]

**File:** `components/home/CTA.tsx`

**What it does:**

- Full-viewport dark section: "LET'S CREATE SOMETHING PEOPLE REMEMBER."
- Large CTA button that has a magnetic hover effect
- Background: animated noise/grain texture (CSS + GSAP opacity pulse)

**Cursor Prompt:**

```
Build a fullscreen CTA section.
- Headline split by words, animates in on scroll with clip-path from inset(100% 0 0 0)
- A large pill button "START THE CONVERSATION" with magnetic hover effect:
  on mousemove near button, use GSAP quickTo to translate button x/y toward cursor (max ±20px)
  on mouseleave, tween back to 0
- Background: black with a subtle CSS noise SVG filter that pulses opacity 0.03–0.06 using GSAP repeat -1 yoyo
```


***

### 4.13 Footer

**Reference:** trucknroll.com footer ending style[^1]

**File:** `components/shared/Footer.tsx`

**What it does:**

- Large "TML" or "TAKE ME LIVE" word mark that fills the full footer width
- Links: Projects, Culture, Services, Contact
- Social links row
- The giant wordmark has a parallax: moves at 0.5x scroll speed vs page

**Cursor Prompt:**

```


<div align="center">⁂</div>

[^1]: https://trucknroll.com/culture
[^2]: https://charlesleclerc.com/en/
[^3]: https://motion.dev/examples/react-scroll-velocity-linked-offset
[^4]: https://www.monks.com/```


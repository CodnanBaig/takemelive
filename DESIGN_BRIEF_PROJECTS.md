# Projects Page Restructure - Design Brief

## Goal
Transform the `/our-projects` page into a cinematic, scroll-driven gallery that feels like a natural extension of the homepage. Replace the current fragmented layout with a cohesive, high-impact storytelling experience inspired by the referenced style (Robert Leitl).

## Strategy

### 1. The Globe (Refinement)
- **Constraint:** The current globe component is failing due to scaling and project count limitations.
- **Solution:** Re-integrate the globe as a subtle, ambient 3D element in the background (`Fixed` position) that reacts to scroll progress, rather than the primary UI driver. It serves to set the "global/scale" theme without requiring 1:1 project mapping.

### 2. Cinematic Project Gallery
- **Layout:** Adopt a scroll-linked, high-impact gallery structure. Projects are full-bleed or large-format imagery with oversized typography (Anton).
- **Navigation:** Remove the rigid grid. Use smooth, scrubbed GSAP animations where project titles and imagery reveal as the user scrolls, echoing the home page's "Timeline of Scenes" model.
- **Visuals:** Match the home page's dark aesthetic (#000 background, #FFF ink). Incorporate the established noise/grain cinematic atmosphere.

### 3. User Journey
- **Experience:** Upon entry, the user is immersed in a continuous stream of project highlights.
- **Navigation:** The focus shifts from "searching" (which the current globe implies) to "viewing" (cinematic exploration).

## Next Steps
1. **Approval:** Does this direction (ambient globe background + scroll-driven cinematic gallery) meet your vision?
2. **Implementation:** If approved, I will proceed to build this structure using the `impeccable craft` command, ensuring it adheres to the existing design tokens and GSAP patterns.

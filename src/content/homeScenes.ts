export type HomeScene = {
  id: string;
  scene: string;
  chapterId: string;
  label: string;
  index: number;
};

/** Seven-scene narrative map for homepage scroll journey */
export const HOME_SCENES: HomeScene[] = [
  { index: 1, id: 'scene-arrival', scene: 'arrival', chapterId: 'chapter-hero', label: 'Arrival' },
  {
    index: 2,
    id: 'scene-manifesto',
    scene: 'manifesto',
    chapterId: 'chapter-transition',
    label: 'Manifesto',
  },
  {
    index: 3,
    id: 'scene-projects',
    scene: 'projects',
    chapterId: 'chapter-featured-projects',
    label: 'Projects',
  },
  { index: 4, id: 'scene-scale', scene: 'scale', chapterId: 'chapter-event-gallery', label: 'Scale' },
  {
    index: 5,
    id: 'scene-innovation',
    scene: 'innovation',
    chapterId: 'chapter-why-us',
    label: 'Innovation',
  },
  {
    index: 6,
    id: 'scene-showreel',
    scene: 'showreel',
    chapterId: 'chapter-showreel',
    label: 'Showreel',
  },
  { index: 7, id: 'scene-contact', scene: 'contact', chapterId: 'chapter-cta', label: 'Contact' },
];

export function getSceneByChapterId(chapterId: string): HomeScene | undefined {
  return HOME_SCENES.find((scene) => scene.chapterId === chapterId);
}

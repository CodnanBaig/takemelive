export type FeaturedProject = {
  slug: string;
  title: string;
  event: string;
  client: string;
  summary: string;
  description: string;
  coverImage: string;
  gallery: string[];
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: 'red-bull-energy-lounge',
    title: 'Red Bull Energy Lounge',
    event: '1 Billion Summit',
    client: 'Red Bull',
    summary:
      'An immersive networking and content environment designed to reflect Red Bull’s high-performance energy.',
    description:
      'Blending spatial storytelling with interactive elements, the experience created a dynamic destination where conversations, content, and brand engagement came together in one cohesive space.',
    coverImage:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    ],
  },
  {
    slug: 'token-2049-io-net',
    title: 'Token 2049',
    event: 'io.net',
    client: 'io.net',
    summary:
      'A cyberpunk-inspired environment powered by dynamic LED visuals, transforming the space into a futuristic brand experience.',
    description:
      'Minimal physical elements combined with high-impact digital storytelling created an immersive atmosphere that captured attention and reinforced technological innovation.',
    coverImage:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=80',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80',
    ],
  },
  {
    slug: 'maraya-concert-series',
    title: 'Maraya Concert Series',
    event: 'Live Nation Middle East',
    client: 'Live Nation Middle East',
    summary:
      'A series of large-scale concert experiences designed to complement one of the world’s most iconic architectural venues.',
    description:
      'Each performance blended artistic storytelling, technical precision, and immersive production to create unforgettable live moments.',
    coverImage:
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1800&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1600&q=80',
    ],
  },
  {
    slug: 'lusail-super-cup',
    title: 'Lusail Super Cup',
    event: 'FIFA',
    client: 'FIFA',
    summary:
      'A stadium-scale production combining culture, sport, and technology into one unified live spectacle.',
    description:
      'Through large-format staging, synchronized lighting, and immersive visual storytelling, the experience set a new benchmark for live event production in the region.',
    coverImage:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1800&q=80',
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1600&q=80',
    ],
  },
];

export function getFeaturedProjectBySlug(slug: string): FeaturedProject | undefined {
  return FEATURED_PROJECTS.find((project) => project.slug === slug);
}

export type FeaturedProject = {
  slug: string;
  title: string;
  /** Giant poster typography — defaults to uppercase title */
  posterTitle?: string;
  /** One-line emotional hook on the poster */
  tagline: string;
  event: string;
  client: string;
  year: string;
  location: string;
  summary: string;
  description: string;
  /** Remote or CDN image URL */
  coverImage: string;
  /** Optional override when public/assets/projects/{slug}/cover.* exists */
  localCover?: string;
  gallery: string[];
  /** Optional local gallery files under public/assets/projects/{slug}/ */
  localGallery?: string[];
};

export type AdjacentProjects = {
  prev: FeaturedProject;
  next: FeaturedProject;
  index: number;
  total: number;
};

export function getPosterTitle(project: FeaturedProject): string {
  return (project.posterTitle ?? project.title).toUpperCase();
}

/** Marquee-first order for cinematic scroll runway */
export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: 'blackpink-world-tour',
    title: 'BLACKPINK World Tour',
    posterTitle: 'BLACKPINK',
    tagline: 'Stadium-scale pop spectacle',
    event: 'World Tour',
    client: 'BLACKPINK',
    year: '2024',
    location: 'Global stadium tour',
    summary:
      'A global stadium tour production pairing massive LED architecture with precision showcalling for arena-scale impact.',
    description:
      'From reveal to encore, the visual system amplified every beat — turning each venue into a shared, high-voltage moment for millions of fans.',
    coverImage:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80',
    ],
  },
  {
    slug: 'token-2049-io-net',
    title: 'Token 2049',
    posterTitle: 'TOKEN 2049',
    tagline: 'Cyberpunk LED environment',
    event: 'io.net',
    client: 'io.net',
    year: '2024',
    location: 'Singapore',
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
    slug: 'lusail-super-cup',
    title: 'Lusail Super Cup',
    posterTitle: 'FIFA',
    tagline: 'Stadium-scale live spectacle',
    event: 'Lusail Super Cup',
    client: 'FIFA',
    year: '2024',
    location: 'Lusail, Qatar',
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
  {
    slug: 'maraya-concert-series',
    title: 'Maraya Concert Series',
    posterTitle: 'MARAYA',
    tagline: 'Iconic venue, amplified',
    event: 'Live Nation Middle East',
    client: 'Live Nation Middle East',
    year: '2023',
    location: 'AlUla, Saudi Arabia',
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
    slug: 'red-bull-energy-lounge',
    title: 'Red Bull Energy Lounge',
    posterTitle: 'RED BULL',
    tagline: 'Immersive brand world',
    event: '1 Billion Summit',
    client: 'Red Bull',
    year: '2024',
    location: 'Riyadh',
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
    slug: 'soundstorm-main-stage',
    title: 'Soundstorm Main Stage',
    posterTitle: 'SOUNDSTORM',
    tagline: 'Festival main stage',
    event: 'Soundstorm',
    client: 'MDLBEAST',
    year: '2023',
    location: 'Riyadh',
    summary:
      'Festival-scale stage design pairing cinematic visuals with synchronized lighting for peak crowd energy.',
    description:
      'From artist reveal to headline moments, the production system delivered consistent impact across multi-day programming.',
    coverImage:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=80',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1600&q=80',
    ],
  },
  {
    slug: 'formula-1-paddock-club',
    title: 'Formula 1 Paddock Club',
    posterTitle: 'F1',
    tagline: 'Paddock hospitality',
    event: 'Qatar Grand Prix',
    client: 'F1',
    year: '2024',
    location: 'Lusail Circuit',
    summary:
      'A premium hospitality environment engineered for broadcast-quality moments and high-touch guest flow.',
    description:
      'Layered lighting, modular staging, and precision timing turned the paddock club into a seamless extension of the race weekend experience.',
    coverImage:
      'https://images.unsplash.com/photo-1551958219-ac55feef6081?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551958219-ac55feef6081?auto=format&fit=crop&w=1800&q=80',
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1517649763961-0c62306601b7?auto=format&fit=crop&w=1600&q=80',
    ],
  },
  {
    slug: 'leap-agenda-expo',
    title: 'LEAP Agenda Expo',
    posterTitle: 'LEAP',
    tagline: 'Tech-forward expo build',
    event: 'LEAP',
    client: 'LEAP',
    year: '2024',
    location: 'Riyadh',
    summary:
      'A technology-forward expo build balancing bold brand presence with flexible visitor circulation.',
    description:
      'Integrated LED architecture and modular zones created a scalable footprint that could evolve across multiple show days.',
    coverImage:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f39d466b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80',
    ],
  },
  {
    slug: 'national-day-gala',
    title: 'National Day Gala',
    posterTitle: 'NATIONAL DAY',
    tagline: 'Ceremonial gala production',
    event: 'National Day',
    client: 'Government Protocol',
    year: '2023',
    location: 'Doha',
    summary:
      'A ceremonial gala production weaving national narrative, live performance, and precision cueing.',
    description:
      'Coordinated stagecraft and lighting transitions supported a dignified program with broadcast-level reliability.',
    coverImage:
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1800&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
    ],
  },
];

export function getFeaturedProjectBySlug(slug: string): FeaturedProject | undefined {
  return FEATURED_PROJECTS.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): AdjacentProjects | undefined {
  const index = FEATURED_PROJECTS.findIndex((project) => project.slug === slug);
  if (index < 0) {
    return undefined;
  }

  const total = FEATURED_PROJECTS.length;
  const prev = FEATURED_PROJECTS[(index - 1 + total) % total];
  const next = FEATURED_PROJECTS[(index + 1) % total];

  return { prev, next, index, total };
}

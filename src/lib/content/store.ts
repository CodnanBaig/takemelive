import 'server-only';

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import { cache } from 'react';
import type { AdjacentProjects, FeaturedProject, ShowreelConfig } from '@/lib/content/types';
import { getPosterTitle, slugifyTitle } from '@/lib/content/types';

export type { AdjacentProjects, FeaturedProject, ShowreelConfig };
export { getPosterTitle, slugifyTitle };

const DATA_DIR = path.join(process.cwd(), 'data');

function ensureDataDir(): void {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filename: string, fallback: T): T {
  ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  if (!existsSync(filePath)) {
    writeFileSync(filePath, JSON.stringify(fallback, null, 2), 'utf-8');
    return fallback;
  }
  return JSON.parse(readFileSync(filePath, 'utf-8')) as T;
}

function writeJsonFile<T>(filename: string, data: T): void {
  ensureDataDir();
  writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2), 'utf-8');
}

export const getFeaturedProjects = cache((): FeaturedProject[] => {
  return readJsonFile<FeaturedProject[]>('projects.json', []);
});

export function writeFeaturedProjects(projects: FeaturedProject[]): void {
  writeJsonFile('projects.json', projects);
}

export const getShowreelConfig = cache((): ShowreelConfig => {
  return readJsonFile<ShowreelConfig>('showreel.json', {
    localSrc: '/assets/showreel.mp4',
    primaryVideo: '',
    fallbackVideos: [],
    poster:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=80',
    useRandomFallback: true,
  });
});

export function writeShowreelConfig(config: ShowreelConfig): void {
  writeJsonFile('showreel.json', config);
}

export function getFeaturedProjectBySlug(slug: string): FeaturedProject | undefined {
  return getFeaturedProjects().find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): AdjacentProjects | undefined {
  const projects = getFeaturedProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) {
    return undefined;
  }

  const total = projects.length;
  const prev = projects[(index - 1 + total) % total];
  const next = projects[(index + 1) % total];

  return { prev, next, index, total };
}

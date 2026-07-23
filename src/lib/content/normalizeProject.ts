import type { FeaturedProject, ProjectCaseStudy } from '@/lib/content/types';

function trim(value: string | undefined): string {
  return value?.trim() ?? '';
}

export function normalizeCaseStudy(
  input: Partial<ProjectCaseStudy> | undefined,
): ProjectCaseStudy | undefined {
  if (!input) {
    return undefined;
  }

  const brief = trim(input.brief);
  const response = trim(input.response);
  const experience = trim(input.experience);
  const outcome = trim(input.outcome);
  const galleryHeadline = trim(input.galleryHeadline);
  const outcomeLabel =
    input.outcomeLabel === 'The Impact' ? 'The Impact' : 'The Result';
  const fullScope = trim(input.fullScope) || undefined;

  if (!brief && !response && !experience && !outcome && !galleryHeadline) {
    return undefined;
  }

  return {
    brief,
    response,
    experience,
    outcomeLabel,
    outcome,
    galleryHeadline,
    fullScope,
  };
}

export function mergeProjectPayload(
  current: FeaturedProject | undefined,
  body: Partial<FeaturedProject>,
): FeaturedProject {
  const concept =
    trim(body.concept) || trim(body.summary) || current?.concept || current?.summary || '';
  const story =
    trim(body.story) || trim(body.description) || current?.story || current?.description || '';
  const caseStudy =
    body.caseStudy !== undefined
      ? normalizeCaseStudy(body.caseStudy)
      : current?.caseStudy;

  return {
    slug: trim(body.slug) || current?.slug || '',
    title: trim(body.title) || current?.title || '',
    posterTitle: trim(body.posterTitle) || undefined,
    tagline: trim(body.tagline) || current?.tagline || '',
    event: trim(body.event) || current?.event || '',
    client: trim(body.client) || current?.client || '',
    year: trim(body.year) || current?.year || '',
    location: trim(body.location) || current?.location || '',
    services: trim(body.services) || current?.services || '',
    concept,
    story,
    summary: concept,
    description: story,
    caseStudy,
    coverImage: trim(body.coverImage) || current?.coverImage || '',
    localCover: trim(body.localCover) || undefined,
    gallery: body.gallery ?? current?.gallery ?? [],
    localGallery: body.localGallery?.length ? body.localGallery : current?.localGallery,
    videos: body.videos ?? current?.videos ?? [],
    localVideos: body.localVideos?.length ? body.localVideos : current?.localVideos,
  };
}

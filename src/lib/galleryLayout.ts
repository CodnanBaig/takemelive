export type ImageOrientation = 'landscape' | 'portrait' | 'square';

export type GalleryItemLayout = {
  span: number;
  orientation: ImageOrientation;
  aspectRatio: number;
};

export function classifyOrientation(width: number, height: number): ImageOrientation {
  if (width <= 0 || height <= 0) {
    return 'landscape';
  }

  const ratio = width / height;
  if (ratio > 1.15) {
    return 'landscape';
  }
  if (ratio < 0.87) {
    return 'portrait';
  }
  return 'square';
}

function itemLayout(width: number, height: number, span: number): GalleryItemLayout {
  const orientation = classifyOrientation(width, height);
  const aspectRatio = width > 0 && height > 0 ? width / height : orientation === 'portrait' ? 3 / 4 : 16 / 9;

  return { span, orientation, aspectRatio };
}

function pairLayout(
  first: ImageOrientation,
  second: ImageOrientation,
  firstSize: { width: number; height: number },
  secondSize: { width: number; height: number },
): [GalleryItemLayout, GalleryItemLayout] {
  if (first === 'portrait' && second === 'portrait') {
    return [itemLayout(firstSize.width, firstSize.height, 6), itemLayout(secondSize.width, secondSize.height, 6)];
  }

  if (first !== 'portrait' && second !== 'portrait') {
    return [itemLayout(firstSize.width, firstSize.height, 6), itemLayout(secondSize.width, secondSize.height, 6)];
  }

  if (first === 'portrait') {
    return [itemLayout(firstSize.width, firstSize.height, 4), itemLayout(secondSize.width, secondSize.height, 8)];
  }

  return [itemLayout(firstSize.width, firstSize.height, 8), itemLayout(secondSize.width, secondSize.height, 4)];
}

/** Assign 12-column grid spans from measured image dimensions. */
export function computeGalleryLayout(
  sizes: Array<{ width: number; height: number }>,
): GalleryItemLayout[] {
  const count = sizes.length;
  if (count === 0) {
    return [];
  }

  if (count === 1) {
    const size = sizes[0];
    return [itemLayout(size.width, size.height, 12)];
  }

  if (count === 2) {
    const [a, b] = sizes;
    const orientations = [
      classifyOrientation(a.width, a.height),
      classifyOrientation(b.width, b.height),
    ];
    const [first, second] = pairLayout(orientations[0], orientations[1], a, b);
    return [first, second];
  }

  const layouts: GalleryItemLayout[] = [];
  let index = 0;

  while (index < count) {
    const remaining = count - index;
    const current = sizes[index];
    const currentOrientation = classifyOrientation(current.width, current.height);

    if (remaining === 1) {
      layouts.push(itemLayout(current.width, current.height, 12));
      index += 1;
      continue;
    }

    if (remaining === 2) {
      const next = sizes[index + 1];
      const nextOrientation = classifyOrientation(next.width, next.height);
      const [first, second] = pairLayout(currentOrientation, nextOrientation, current, next);
      layouts.push(first, second);
      index += 2;
      continue;
    }

    if (index === 0 && currentOrientation !== 'portrait') {
      layouts.push(itemLayout(current.width, current.height, 12));
      index += 1;
      continue;
    }

    const next = sizes[index + 1];
    const nextOrientation = classifyOrientation(next.width, next.height);
    const third = sizes[index + 2];
    const thirdOrientation = classifyOrientation(third.width, third.height);

    if (
      currentOrientation === 'portrait' &&
      nextOrientation === 'portrait' &&
      thirdOrientation === 'portrait'
    ) {
      layouts.push(
        itemLayout(current.width, current.height, 4),
        itemLayout(next.width, next.height, 4),
        itemLayout(third.width, third.height, 4),
      );
      index += 3;
      continue;
    }

    const [first, second] = pairLayout(currentOrientation, nextOrientation, current, next);
    layouts.push(first, second);
    index += 2;
  }

  return layouts;
}

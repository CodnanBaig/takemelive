import { gsap } from '@/lib/gsap';

export const MASK_VISIBLE = 'inset(0% 0% 0% 0%)';
export const MASK_HIDDEN_BOTTOM = 'inset(0% 0% 100% 0%)';
export const MASK_HIDDEN_TOP = 'inset(100% 0% 0% 0%)';
export const MASK_HIDDEN_LEFT = 'inset(0% 100% 0% 0%)';
export const MASK_HIDDEN_RIGHT = 'inset(0% 0% 0% 100%)';

type MaskDirection = 'bottom' | 'top' | 'left' | 'right';

const HIDDEN_BY_DIRECTION: Record<MaskDirection, string> = {
  bottom: MASK_HIDDEN_BOTTOM,
  top: MASK_HIDDEN_TOP,
  left: MASK_HIDDEN_LEFT,
  right: MASK_HIDDEN_RIGHT,
};

export function setMaskHidden(
  targets: gsap.TweenTarget,
  direction: MaskDirection = 'bottom',
) {
  gsap.set(targets, { clipPath: HIDDEN_BY_DIRECTION[direction] });
}

export function setMaskVisible(targets: gsap.TweenTarget) {
  gsap.set(targets, { clipPath: MASK_VISIBLE });
}

export function animateMaskReveal(
  targets: gsap.TweenTarget,
  direction: MaskDirection = 'bottom',
  vars?: gsap.TweenVars,
) {
  return gsap.fromTo(
    targets,
    { clipPath: HIDDEN_BY_DIRECTION[direction] },
    {
      clipPath: MASK_VISIBLE,
      ease: 'power4.out',
      duration: 0.9,
      ...vars,
    },
  );
}

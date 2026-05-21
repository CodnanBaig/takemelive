import styles from './ScrollOrnament.module.scss';

export type ScrollOrnamentVariant = 'glyph-dark' | 'glyph-light';
export type ScrollOrnamentPosition = 'tl' | 'tr' | 'bl' | 'br';

const SRC: Record<ScrollOrnamentVariant, string> = {
  'glyph-dark': '/SVG/Artboard%201%20copy%205.svg',
  'glyph-light': '/SVG/Artboard%201%20copy%206.svg',
};

type ScrollOrnamentProps = {
  variant?: ScrollOrnamentVariant;
  position?: ScrollOrnamentPosition;
};

export default function ScrollOrnament({
  variant = 'glyph-dark',
  position = 'tr',
}: ScrollOrnamentProps) {
  return (
    <div
      className={`${styles.ornament} ${styles[position]}`}
      data-scroll-ornament
      data-ornament-position={position}
      aria-hidden
    >
      <img src={SRC[variant]} alt="" decoding="async" />
    </div>
  );
}

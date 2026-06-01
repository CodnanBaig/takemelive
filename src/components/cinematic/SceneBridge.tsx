import styles from './SceneBridge.module.scss';

type SceneBridgeTone = 'dark' | 'light' | 'toDark';

type SceneBridgeProps = {
  /** Optional id for scroll targets */
  id?: string;
  /** Visual tone for the seam between sections */
  tone?: SceneBridgeTone;
};

export default function SceneBridge({ id, tone = 'dark' }: SceneBridgeProps) {
  const toneClass =
    tone === 'light' ? styles.toneLight : tone === 'toDark' ? styles.toneToDark : styles.toneDark;

  return (
    <div className={`${styles.bridge} ${toneClass}`} id={id} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.line} />
    </div>
  );
}

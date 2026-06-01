import styles from './SceneBridge.module.scss';

type SceneBridgeProps = {
  /** Optional id for scroll targets */
  id?: string;
};

export default function SceneBridge({ id }: SceneBridgeProps) {
  return (
    <div className={styles.bridge} id={id} aria-hidden="true">
      <div className={styles.glow} />
      <div className={styles.line} />
    </div>
  );
}

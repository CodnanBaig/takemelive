import styles from './CinematicAtmosphere.module.scss';

export default function CinematicAtmosphere() {
  return (
    <div className={styles.atmosphere} aria-hidden="true">
      <div className={styles.beam} />
      <div className={styles.vignette} />
      <div className={styles.grain} />
    </div>
  );
}

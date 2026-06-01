import styles from './ProjectsIntro.module.scss';

export default function ProjectsIntro() {
  return (
    <header className={styles.intro}>
      <div className={styles.inner}>
        <p className={styles.kicker}>Work</p>
        <h1 className={styles.title}>Our projects</h1>
        <p className={styles.lead}>
          Explore the archive in 3D, then scroll for the full index and case studies.
        </p>
      </div>
    </header>
  );
}

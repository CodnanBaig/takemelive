import styles from './page.module.scss';

const CULTURE_POINTS = [
  {
    title: 'Collaborative by Design',
    detail:
      'Strategists, designers, technologists, and producers work as one unit from first sketch to final showcall.',
  },
  {
    title: 'Precision Under Pressure',
    detail:
      'We operate with technical discipline and production rigor so bold creative ideas stay reliable in the real world.',
  },
  {
    title: 'Purpose-Driven Craft',
    detail:
      'Every decision is anchored to audience impact - creating moments that are remembered beyond the event itself.',
  },
] as const;

export default function OurCulturePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p>Our Culture</p>
        <h1>Our Culture</h1>
        <p className={styles.lead}>
          The way we work is as intentional as what we build: collaborative, detail-focused, and
          relentlessly committed to meaningful outcomes.
        </p>
      </section>

      <section className={styles.grid}>
        {CULTURE_POINTS.map((point) => (
          <article key={point.title} className={styles.card}>
            <h2>{point.title}</h2>
            <p>{point.detail}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

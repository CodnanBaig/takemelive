import Link from 'next/link';
import AdminShell, { AdminPanel } from '@/components/admin/AdminShell';
import { getFeaturedProjects, getShowreelConfig } from '@/lib/content/store';
import styles from '@/components/admin/admin.module.scss';

export default function AdminDashboardPage() {
  const projects = getFeaturedProjects();
  const showreel = getShowreelConfig();

  return (
    <AdminShell
      title="Dashboard"
      lead="Update portfolio projects, media, and the homepage showreel from one place."
      actions={
        <Link href="/admin/projects/new" className={styles.buttonPrimary}>
          New project
        </Link>
      }
    >
      <div className={styles.statGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{projects.length}</div>
          <div className={styles.statLabel}>Published projects</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{showreel.primaryVideo ? 'Custom' : 'Pool'}</div>
          <div className={styles.statLabel}>Showreel source</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{showreel.localSrc.replace('/assets/', '')}</div>
          <div className={styles.statLabel}>Local showreel file</div>
        </div>
      </div>

      <div style={{ height: '1.25rem' }} />

      <AdminPanel>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.125rem' }}>Recent projects</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Client</th>
            </tr>
          </thead>
          <tbody>
            {projects.slice(0, 5).map((project) => (
              <tr key={project.slug}>
                <td>
                  <Link href={`/admin/projects/${project.slug}`} className={styles.tableLink}>
                    {project.title}
                  </Link>
                </td>
                <td>{project.year}</td>
                <td>{project.client}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminPanel>
    </AdminShell>
  );
}

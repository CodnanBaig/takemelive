import Link from 'next/link';
import AdminShell, { AdminPanel } from '@/components/admin/AdminShell';
import { IconArrowRight } from '@/components/admin/AdminIcons';
import { getFeaturedProjects, getShowreelConfig } from '@/lib/content/store';
import styles from '@/components/admin/admin.module.scss';

export default function AdminDashboardPage() {
  const projects = getFeaturedProjects();
  const showreel = getShowreelConfig();
  const showreelMode = showreel.primaryVideo ? 'Custom URL' : 'Local pool';

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
      <div className={styles.stack}>
        <div className={styles.statGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{projects.length}</div>
            <div className={styles.statLabel}>Published projects</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{showreelMode}</div>
            <div className={styles.statLabel}>Showreel source</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue} style={{ fontSize: '1.125rem', wordBreak: 'break-all' }}>
              {showreel.localSrc.replace('/assets/', '')}
            </div>
            <div className={styles.statLabel}>Local showreel file</div>
          </div>
        </div>

        <AdminPanel title="Quick actions" description="Jump straight to common tasks.">
          <div className={styles.quickGrid}>
            <Link href="/admin/projects/new" className={styles.quickLink}>
              Add a new project
              <IconArrowRight className={styles.quickLinkArrow} />
            </Link>
            <Link href="/admin/showreel" className={styles.quickLink}>
              Edit homepage showreel
              <IconArrowRight className={styles.quickLinkArrow} />
            </Link>
          </div>
        </AdminPanel>

        <AdminPanel title="Recent projects" description="Latest portfolio entries on the site.">
          <div className={styles.tableWrap}>
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
          </div>
        </AdminPanel>
      </div>
    </AdminShell>
  );
}

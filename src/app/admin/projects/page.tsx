import Link from 'next/link';
import AdminShell, { AdminPanel } from '@/components/admin/AdminShell';
import { getFeaturedProjects } from '@/lib/content/store';
import { resolveProjectCover } from '@/lib/projectMedia';
import styles from '@/components/admin/admin.module.scss';

export default function AdminProjectsPage() {
  const projects = getFeaturedProjects();

  return (
    <AdminShell
      title="Projects"
      lead="Edit copy, dates, imagery, and video for each portfolio entry."
      actions={
        <Link href="/admin/projects/new" className={styles.buttonPrimary}>
          New project
        </Link>
      }
    >
      <AdminPanel
        title={`${projects.length} project${projects.length === 1 ? '' : 's'}`}
        description="Select a project to edit details, media, and gallery assets."
      >
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Project</th>
                <th>Event</th>
                <th>Year</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.slug}>
                  <td>
                    <div className={styles.projectCell}>
                      <div className={`${styles.thumb} ${styles.thumbSm}`}>
                        <img src={resolveProjectCover(project)} alt="" />
                      </div>
                      <div>
                        <Link href={`/admin/projects/${project.slug}`} className={styles.tableLink}>
                          {project.title}
                        </Link>
                        <div className={styles.status}>{project.client}</div>
                      </div>
                    </div>
                  </td>
                  <td>{project.event}</td>
                  <td>{project.year}</td>
                  <td>{project.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminPanel>
    </AdminShell>
  );
}

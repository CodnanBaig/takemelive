'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FeaturedProject } from '@/lib/content/types';
import AdminShell, { AdminPanel } from '@/components/admin/AdminShell';
import styles from '@/components/admin/admin.module.scss';

type ProjectEditorProps = {
  initialProject?: FeaturedProject;
  mode: 'create' | 'edit';
};

type FormState = {
  slug: string;
  title: string;
  posterTitle: string;
  tagline: string;
  event: string;
  client: string;
  year: string;
  location: string;
  summary: string;
  description: string;
  coverImage: string;
  localCover: string;
  gallery: string[];
  localGallery: string[];
  videos: string[];
  localVideos: string[];
};

function toFormState(project?: FeaturedProject): FormState {
  return {
    slug: project?.slug ?? '',
    title: project?.title ?? '',
    posterTitle: project?.posterTitle ?? '',
    tagline: project?.tagline ?? '',
    event: project?.event ?? '',
    client: project?.client ?? '',
    year: project?.year ?? '',
    location: project?.location ?? '',
    summary: project?.summary ?? '',
    description: project?.description ?? '',
    coverImage: project?.coverImage ?? '',
    localCover: project?.localCover ?? '',
    gallery: project?.gallery ?? [''],
    localGallery: project?.localGallery ?? [],
    videos: project?.videos ?? [''],
    localVideos: project?.localVideos ?? [],
  };
}

function MediaListEditor({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder: string;
}) {
  return (
    <div className={styles.fieldFull}>
      <span className={styles.label}>{label}</span>
      <div className={styles.mediaList}>
        {values.map((value, index) => (
          <div key={`${label}-${index}`} className={styles.mediaRow}>
            <input
              className={styles.input}
              value={value}
              placeholder={placeholder}
              onChange={(event) => {
                const next = [...values];
                next[index] = event.target.value;
                onChange(next);
              }}
            />
            <button
              type="button"
              className={styles.buttonGhost}
              onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles.buttonGhost}
          onClick={() => onChange([...values, ''])}
        >
          Add row
        </button>
      </div>
    </div>
  );
}

export default function ProjectEditor({ initialProject, mode }: ProjectEditorProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => toFormState(initialProject));
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const previewImages = useMemo(() => {
    const local = form.localGallery.filter(Boolean);
    const remote = form.gallery.filter(Boolean);
    return [...local, ...remote].slice(0, 6);
  }, [form.gallery, form.localGallery]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const uploadFile = async (file: File, target: 'cover' | 'gallery' | 'video') => {
    if (!form.slug.trim() && mode === 'create') {
      setError('Set a slug before uploading project files.');
      return;
    }

    const slug = form.slug.trim();
    setUploading(true);
    setError('');

    const body = new FormData();
    body.append('file', file);
    body.append('scope', 'project');
    body.append('slug', slug);

    const response = await fetch('/api/admin/upload', { method: 'POST', body });
    setUploading(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(payload?.error ?? 'Upload failed.');
      return;
    }

    const payload = (await response.json()) as { path: string; kind: 'image' | 'video' };
    if (target === 'video' || payload.kind === 'video') {
      updateField('localVideos', [...form.localVideos.filter(Boolean), payload.path]);
    } else if (target === 'cover') {
      updateField('localCover', payload.path);
    } else {
      updateField('localGallery', [...form.localGallery.filter(Boolean), payload.path]);
    }

    setStatus('File uploaded.');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');
    setError('');

    const payload = {
      ...form,
      gallery: form.gallery.map((item) => item.trim()).filter(Boolean),
      localGallery: form.localGallery.map((item) => item.trim()).filter(Boolean),
      videos: form.videos.map((item) => item.trim()).filter(Boolean),
      localVideos: form.localVideos.map((item) => item.trim()).filter(Boolean),
      posterTitle: form.posterTitle.trim() || undefined,
      localCover: form.localCover.trim() || undefined,
    };

    const endpoint =
      mode === 'create' ? '/api/admin/projects' : `/api/admin/projects/${initialProject?.slug}`;
    const method = mode === 'create' ? 'POST' : 'PUT';

    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? 'Save failed.');
      return;
    }

    const body = (await response.json()) as { project: FeaturedProject };
    setStatus('Project saved.');
    router.push(`/admin/projects/${body.project.slug}`);
    router.refresh();
  };

  const handleDelete = async () => {
    if (mode !== 'edit' || !initialProject) {
      return;
    }
    if (!window.confirm(`Delete "${initialProject.title}"? This cannot be undone.`)) {
      return;
    }

    const response = await fetch(`/api/admin/projects/${initialProject.slug}`, { method: 'DELETE' });
    if (!response.ok) {
      setError('Delete failed.');
      return;
    }

    router.push('/admin/projects');
    router.refresh();
  };

  return (
    <AdminShell
      title={mode === 'create' ? 'New project' : 'Edit project'}
      lead={mode === 'edit' ? initialProject?.title : 'Add a portfolio entry with imagery, video, and copy.'}
      actions={
        mode === 'edit' ? (
          <button type="button" className={styles.buttonDanger} onClick={() => void handleDelete()}>
            Delete project
          </button>
        ) : null
      }
    >
      <form onSubmit={(event) => void handleSubmit(event)}>
        <AdminPanel>
          <div className={styles.grid2}>
            <label className={styles.field}>
              <span className={styles.label}>Title</span>
              <input
                className={styles.input}
                value={form.title}
                onChange={(event) => updateField('title', event.target.value)}
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Slug</span>
              <input
                className={styles.input}
                value={form.slug}
                onChange={(event) => updateField('slug', event.target.value)}
                placeholder="auto-generated-from-title"
                required={mode === 'edit'}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Poster title</span>
              <input
                className={styles.input}
                value={form.posterTitle}
                onChange={(event) => updateField('posterTitle', event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Tagline</span>
              <input
                className={styles.input}
                value={form.tagline}
                onChange={(event) => updateField('tagline', event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Event</span>
              <input
                className={styles.input}
                value={form.event}
                onChange={(event) => updateField('event', event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Client</span>
              <input
                className={styles.input}
                value={form.client}
                onChange={(event) => updateField('client', event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Year</span>
              <input
                className={styles.input}
                value={form.year}
                onChange={(event) => updateField('year', event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Location</span>
              <input
                className={styles.input}
                value={form.location}
                onChange={(event) => updateField('location', event.target.value)}
              />
            </label>

            <label className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.label}>Summary</span>
              <textarea
                className={styles.textarea}
                value={form.summary}
                onChange={(event) => updateField('summary', event.target.value)}
              />
            </label>

            <label className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.label}>Description</span>
              <textarea
                className={styles.textarea}
                value={form.description}
                onChange={(event) => updateField('description', event.target.value)}
              />
            </label>
          </div>
        </AdminPanel>

        <div style={{ height: '1rem' }} />

        <AdminPanel>
          <div className={styles.grid2}>
            <label className={styles.field}>
              <span className={styles.label}>Cover image URL</span>
              <input
                className={styles.input}
                value={form.coverImage}
                onChange={(event) => updateField('coverImage', event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Local cover path</span>
              <input
                className={styles.input}
                value={form.localCover}
                onChange={(event) => updateField('localCover', event.target.value)}
                placeholder="/assets/projects/slug/cover.webp"
              />
            </label>

            <div className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.label}>Upload media</span>
              <div className={styles.actions}>
                <label className={styles.buttonGhost}>
                  Upload cover
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        void uploadFile(file, 'cover');
                      }
                    }}
                  />
                </label>
                <label className={styles.buttonGhost}>
                  Upload gallery image
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        void uploadFile(file, 'gallery');
                      }
                    }}
                  />
                </label>
                <label className={styles.buttonGhost}>
                  Upload video
                  <input
                    hidden
                    type="file"
                    accept="video/*"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        void uploadFile(file, 'video');
                      }
                    }}
                  />
                </label>
                {uploading ? <span className={styles.status}>Uploading…</span> : null}
              </div>
            </div>

            <MediaListEditor
              label="Gallery URLs"
              values={form.gallery}
              onChange={(values) => updateField('gallery', values.length ? values : [''])}
              placeholder="https://"
            />

            <MediaListEditor
              label="Local gallery paths"
              values={form.localGallery.length ? form.localGallery : ['']}
              onChange={(values) => updateField('localGallery', values)}
              placeholder="/assets/projects/..."
            />

            <MediaListEditor
              label="Video URLs"
              values={form.videos}
              onChange={(values) => updateField('videos', values.length ? values : [''])}
              placeholder="https://"
            />

            <MediaListEditor
              label="Local video paths"
              values={form.localVideos.length ? form.localVideos : ['']}
              onChange={(values) => updateField('localVideos', values)}
              placeholder="/assets/projects/..."
            />

            {previewImages.length ? (
              <div className={`${styles.field} ${styles.fieldFull}`}>
                <span className={styles.label}>Preview</span>
                <div className={styles.thumbGrid}>
                  {previewImages.map((src) => (
                    <div key={src} className={styles.thumb}>
                      <img src={src} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </AdminPanel>

        <div className={styles.actions} style={{ marginTop: '1rem' }}>
          <button type="submit" className={styles.buttonPrimary}>
            Save project
          </button>
          {status ? <span className={styles.statusSuccess}>{status}</span> : null}
          {error ? <span className={styles.statusError}>{error}</span> : null}
        </div>
      </form>
    </AdminShell>
  );
}

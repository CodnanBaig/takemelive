'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ShowreelConfig } from '@/lib/content/types';
import AdminShell, { AdminPanel } from '@/components/admin/AdminShell';
import styles from '@/components/admin/admin.module.scss';

type ShowreelEditorProps = {
  initialConfig: ShowreelConfig;
};

export default function ShowreelEditor({ initialConfig }: ShowreelEditorProps) {
  const router = useRouter();
  const [config, setConfig] = useState(initialConfig);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const updateFallback = (index: number, value: string) => {
    const next = [...config.fallbackVideos];
    next[index] = value;
    setConfig({ ...config, fallbackVideos: next });
  };

  const save = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('');
    setError('');

    const response = await fetch('/api/admin/showreel', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...config,
        fallbackVideos: config.fallbackVideos.map((item) => item.trim()).filter(Boolean),
      }),
    });

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? 'Save failed.');
      return;
    }

    const body = (await response.json()) as { showreel: ShowreelConfig };
    setConfig(body.showreel);
    setStatus('Showreel updated.');
    router.refresh();
  };

  const uploadShowreel = async (file: File) => {
    setUploading(true);
    setError('');

    const body = new FormData();
    body.append('file', file);
    body.append('scope', 'showreel');

    const response = await fetch('/api/admin/upload', { method: 'POST', body });
    setUploading(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(payload?.error ?? 'Upload failed.');
      return;
    }

    const payload = (await response.json()) as { path: string };
    setConfig({ ...config, localSrc: payload.path, primaryVideo: '' });
    setStatus('Showreel file uploaded. Local file takes priority on the homepage.');
  };

  return (
    <AdminShell
      title="Homepage showreel"
      lead="Set the scroll-scrub video and poster used in the homepage showreel section."
    >
      <form onSubmit={(event) => void save(event)}>
        <AdminPanel>
          <div className={styles.grid2}>
            <label className={styles.field}>
              <span className={styles.label}>Primary video URL</span>
              <input
                className={styles.input}
                value={config.primaryVideo}
                onChange={(event) => setConfig({ ...config, primaryVideo: event.target.value })}
                placeholder="https://"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Local video path</span>
              <input
                className={styles.input}
                value={config.localSrc}
                onChange={(event) => setConfig({ ...config, localSrc: event.target.value })}
              />
            </label>

            <label className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.label}>Poster image URL</span>
              <input
                className={styles.input}
                value={config.poster}
                onChange={(event) => setConfig({ ...config, poster: event.target.value })}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Fallback behavior</span>
              <select
                className={styles.select}
                value={config.useRandomFallback ? 'random' : 'primary-only'}
                onChange={(event) =>
                  setConfig({ ...config, useRandomFallback: event.target.value === 'random' })
                }
              >
                <option value="random">Random from fallback pool when no local file</option>
                <option value="primary-only">Use primary URL only</option>
              </select>
            </label>

            <div className={styles.field}>
              <span className={styles.label}>Upload local MP4</span>
              <label className={styles.buttonGhost}>
                Choose video file
                <input
                  hidden
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      void uploadShowreel(file);
                    }
                  }}
                />
              </label>
              {uploading ? <span className={styles.status}>Uploading…</span> : null}
            </div>

            <div className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.label}>Fallback video pool</span>
              <div className={styles.mediaList}>
                {config.fallbackVideos.map((value, index) => (
                  <div key={`fallback-${index}`} className={styles.mediaRow}>
                    <input
                      className={styles.input}
                      value={value}
                      onChange={(event) => updateFallback(index, event.target.value)}
                    />
                    <button
                      type="button"
                      className={styles.buttonGhost}
                      onClick={() =>
                        setConfig({
                          ...config,
                          fallbackVideos: config.fallbackVideos.filter((_, itemIndex) => itemIndex !== index),
                        })
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.buttonGhost}
                  onClick={() =>
                    setConfig({ ...config, fallbackVideos: [...config.fallbackVideos, ''] })
                  }
                >
                  Add fallback URL
                </button>
              </div>
            </div>

            {config.poster ? (
              <div className={`${styles.field} ${styles.fieldFull}`}>
                <span className={styles.label}>Poster preview</span>
                <div className={styles.thumb} style={{ maxWidth: '320px' }}>
                  <img src={config.poster} alt="" />
                </div>
              </div>
            ) : null}
          </div>
        </AdminPanel>

        <div className={styles.actions} style={{ marginTop: '1rem' }}>
          <button type="submit" className={styles.buttonPrimary}>
            Save showreel
          </button>
          {status ? <span className={styles.statusSuccess}>{status}</span> : null}
          {error ? <span className={styles.statusError}>{error}</span> : null}
        </div>
      </form>
    </AdminShell>
  );
}

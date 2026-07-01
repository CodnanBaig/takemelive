'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './admin.module.scss';

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(payload?.error ?? 'Sign in failed.');
      return;
    }

    const next = searchParams.get('next') || '/admin';
    router.push(next);
    router.refresh();
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginGlow} aria-hidden />

      <main className={styles.loginMain}>
        <header className={styles.loginIntro}>
          <Image
            className={styles.loginLogo}
            src="/assets/ImageToStl.com_TML-primary-logo.png"
            alt="Take Me Live"
            width={220}
            height={64}
            priority
          />
          <p className={styles.loginIntroCopy}>
            Manage projects, media, and the homepage showreel.
          </p>
        </header>

        <form className={styles.loginCard} onSubmit={(event) => void handleSubmit(event)}>
          <div className={styles.loginCardHeader}>
            <h1 className={styles.loginTitle}>Sign in</h1>
            <p className={styles.loginLead}>Use your admin credentials to continue.</p>
          </div>

          <div className={styles.loginFields}>
            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input
                className={styles.input}
                type="email"
                autoComplete="username"
                placeholder="you@takemelive.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Password</span>
              <input
                className={styles.input}
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
          </div>

          {error ? (
            <p className={styles.statusError} role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit" className={styles.buttonPrimary} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </main>
    </div>
  );
}

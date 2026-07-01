import { Suspense } from 'react';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import styles from '@/components/admin/admin.module.scss';

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className={styles.loginFallback} />}>
      <AdminLoginForm />
    </Suspense>
  );
}

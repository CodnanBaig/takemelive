import { Suspense } from 'react';
import AdminLoginForm from '@/components/admin/AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100dvh', background: '#0b0d10' }} />}>
      <AdminLoginForm />
    </Suspense>
  );
}

import type { Metadata, Viewport } from 'next';
import { Anton, Poppins } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/cinematic/LenisProvider';
import MotionPreferences from '@/components/cinematic/MotionPreferences';
import RouteScrollRefresh from '@/components/cinematic/RouteScrollRefresh';
import SkipToContent from '@/components/cinematic/SkipToContent';
import SiteNav from '@/components/SiteNav';

const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
});

export const metadata: Metadata = {
  title: 'Take Me Live',
  description:
    'Live experience studio designing immersive productions, cultural moments, and stadium-scale spectacle.',
  icons: {
    icon: '/assets/website-fevicon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={`${poppins.variable} ${anton.variable}`}>
        <SkipToContent />
        <MotionPreferences />
        <LenisProvider>
          <RouteScrollRefresh />
          <SiteNav />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
} 
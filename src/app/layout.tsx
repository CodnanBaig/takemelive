import type { Viewport } from 'next';
import { Oswald, Poppins } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/cinematic/LenisProvider';
import MotionPreferences from '@/components/cinematic/MotionPreferences';
import RouteScrollRefresh from '@/components/cinematic/RouteScrollRefresh';
import SkipToContent from '@/components/cinematic/SkipToContent';
import JsonLd from '@/components/seo/JsonLd';
import SiteLogo from '@/components/SiteLogo';
import SiteNavWrapper from '@/components/SiteNavWrapper';
import { organizationJsonLd } from '@/lib/seo/jsonld';
import { rootMetadata } from '@/lib/seo/metadata';

const poppins = Poppins({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

const oswald = Oswald({
  weight: '700',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-oswald',
});

export const metadata = rootMetadata;

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
      <body className={`${poppins.variable} ${oswald.variable}`}>
        <JsonLd data={organizationJsonLd()} />
        <SkipToContent />
        <MotionPreferences />
        <LenisProvider>
          <RouteScrollRefresh />
          <SiteNavWrapper />
          <SiteLogo />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
} 
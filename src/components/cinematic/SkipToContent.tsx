import Link from 'next/link';

type SkipToContentProps = {
  href?: string;
};

export default function SkipToContent({ href = '#main-content' }: SkipToContentProps) {
  return (
    <Link href={href} className="skipLink">
      Skip to main content
    </Link>
  );
}

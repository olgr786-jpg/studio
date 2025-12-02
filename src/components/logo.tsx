import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="#inici"
      className={cn(
        'flex items-center gap-3 text-foreground transition-colors hover:text-primary',
        className
      )}
    >
      <div className="h-12 w-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-full w-full"
        >
          <path d="M12 2C8.68 2 6 4.68 6 8c0 2.21 1.79 4 4 4h4c2.21 0 4-1.79 4-4s-1.79-6-5-6" transform="rotate(45 12 12)" />
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 4.2 2.6 7.8 6.2 9.2" />
        </svg>
      </div>
      <div className="flex items-baseline">
        <span className="font-headline text-3xl font-bold tracking-wide">
          Nalu
        </span>
      </div>
    </Link>
  );
}

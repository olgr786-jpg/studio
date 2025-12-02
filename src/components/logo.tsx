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
      <div className="h-10 w-10">
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
          <path d="M12 22a7 7 0 0 0 7-7c0-2.39-3.4-7.44-6-9.46a1 1 0 0 0-2 0C7.4 7.56 4 12.61 4 15a7 7 0 0 0 7 7z" />
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

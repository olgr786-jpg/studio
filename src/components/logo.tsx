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
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M16 10a4 4 0 0 0-8 0c0 2.21 1.79 4 4 4s4-1.79 4-4z" />
          <path d="M12 14c-2.21 0-4-1.79-4-4" />
          <path d="M12 14a2 2 0 0 1 2-2" />
          <path d="M14 12a2 2 0 0 0-2-2" />
          <path d="M12 10V8" />
          <path d="M14.5 9.5a2.5 2.5 0 0 1 0 5" />
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
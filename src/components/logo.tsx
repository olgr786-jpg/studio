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
          <path d="M12 12c-2.333 0-4.435-1.5-5.5-3.5 1.065-2 3.167-3.5 5.5-3.5s4.435 1.5 5.5 3.5c-1.065 2-3.167 3.5-5.5 3.5z" />
          <path d="M12 19c-2.333 0-4.435-1.5-5.5-3.5 1.065-2 3.167-3.5 5.5-3.5s4.435 1.5 5.5 3.5c-1.065 2-3.167 3.5-5.5 3.5z" />
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

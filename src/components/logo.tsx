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
      <div className="h-8 w-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          fill="none"
          className="h-full w-full"
        >
          <path
            d="M50,5 C25,40 25,70 50,95 C75,70 75,40 50,5 Z"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <div className="flex items-baseline">
        <span className="font-headline text-2xl font-bold tracking-wide">
          NaluWater
        </span>
      </div>
    </Link>
  );
}

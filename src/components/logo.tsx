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
          viewBox="0 0 100 100"
          fill="none"
          className="h-full w-full"
        >
          <path
            d="M50 0C22.38 0 0 22.38 0 50C0 67.33 8.34 82.57 21.16 91.5C22.38 84.34 25.84 77.83 31.02 72.65C36.2 67.47 42.71 64.01 50 64.01C57.29 64.01 63.8 67.47 68.98 72.65C74.16 77.83 77.62 84.34 78.84 91.5C91.66 82.57 100 67.33 100 50C100 22.38 77.62 0 50 0ZM50 55.47C45.31 55.47 41.04 53.64 37.95 50.55C34.86 47.46 33.03 43.19 33.03 38.5C33.03 31.58 38.74 25.87 45.66 25.87C46.94 25.87 48.19 26.08 49.38 26.47C48.74 28.24 48.42 30.12 48.42 32.09C48.42 45.03 59.39 55.47 72.33 55.47C73.53 55.47 74.7 55.33 75.83 55.06C69.17 55.29 62.22 51.5 57.57 45.9C55.01 49.52 52.6 52.34 50 55.47Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div className="flex items-baseline">
        <span className="font-headline text-3xl font-bold tracking-wide">
          NaluWater
        </span>
      </div>
    </Link>
  );
}

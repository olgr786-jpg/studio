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
            d="M50 0C50 0 50 25 50 25C50 41.5685 36.5685 55 20 55C10.8953 55 2.6053 50.8401 0 45.4952C16.5685 45.4952 30 58.9267 30 75.4952C30 92.0637 16.5685 100 0 100C33.1371 100 60 73.1371 60 40C60 27.819 75.8333 13.5 100 0C83.3333 13.5 68.6667 24.5 50 40C50 25 50 0 50 0Z" 
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
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="#inici" className={cn("flex items-center gap-2 text-foreground transition-colors hover:text-primary", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      >
        <path d="M3 12c.5-2.5 1.5-5 5-5 3.5 0 4.5 2.5 5 5s1.5 5 5 5c3.5 0 4.5-2.5 5-5" />
      </svg>
      <div className="flex items-baseline">
        <span className="font-headline font-semibold text-3xl">NALU</span>
        <span className="font-body font-light text-xl ml-1">water</span>
      </div>
    </Link>
  );
}

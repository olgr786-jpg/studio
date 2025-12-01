import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="#inici" className={cn("flex items-center gap-2 text-foreground transition-colors hover:text-primary", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7 text-primary"
      >
        <path d="M3 7c2-2 5-2 7 0s5 2 7 0" />
        <path d="M3 12c2-2 5-2 7 0s5 2 7 0" />
        <path d="M3 17c2-2 5-2 7 0s5 2 7 0" />
      </svg>
      <div className="flex items-baseline">
        <span className="font-headline font-bold text-2xl tracking-wide">Nalu</span>
        <span className="font-body font-light text-2xl ml-1">Water</span>
      </div>
    </Link>
  );
}

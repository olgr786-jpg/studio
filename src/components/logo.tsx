import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="#inici" className={cn("text-3xl text-foreground transition-colors hover:text-primary", className)}>
      <span className="font-headline font-semibold">NALU</span>
      <span className="font-body font-light text-xl ml-1">water</span>
    </Link>
  );
}

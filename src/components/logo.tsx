import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="#inici" className={cn("font-headline text-3xl text-foreground transition-colors hover:text-primary", className)}>
      Nalu Water
    </Link>
  );
}

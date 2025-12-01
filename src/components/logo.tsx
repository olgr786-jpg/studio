import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="#inici" className={cn("text-2xl font-semibold text-foreground transition-colors hover:text-primary", className)}>
      Nalu Water
    </Link>
  );
}

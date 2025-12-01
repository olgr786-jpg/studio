import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="#inici" className={cn("flex items-center gap-3 text-foreground transition-colors hover:text-primary", className)}>
      <Globe className="h-7 w-7 text-primary" />
      <div className="flex items-baseline">
        <span className="font-headline font-bold text-2xl tracking-wide">GLOBAL</span>
        <span className="font-body font-light text-2xl ml-1">Logistics</span>
      </div>
    </Link>
  );
}

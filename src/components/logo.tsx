import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Waves } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="#inici"
      className={cn(
        'flex items-center gap-3 text-foreground transition-colors hover:text-primary',
        className
      )}
    >
      <div className="rounded-full border-2 border-primary/50 p-2">
        <Waves className="h-6 w-6 text-primary" />
      </div>
      <div className="flex items-baseline">
        <span className="font-headline text-3xl font-bold tracking-wide">
          Nalu
        </span>
      </div>
    </Link>
  );
}

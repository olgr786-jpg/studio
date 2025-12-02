import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="#inici"
      className={cn(
        'flex items-center gap-3 text-foreground transition-colors hover:text-primary',
        className
      )}
    >
      <div className="relative h-12 w-12">
        <Image
          src="/logo.png"
          alt="Nalu Water Logo"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <div className="flex items-baseline">
        <span className="font-headline text-3xl font-bold tracking-wide">
          Nalu
        </span>
      </div>
    </Link>
  );
}

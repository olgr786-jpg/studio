import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center text-foreground transition-colors hover:opacity-80',
        className
      )}
    >
      <Image 
        src="/Nalu water.png" 
        alt="NaluWater Logo" 
        width={180} 
        height={50}
        className="h-14 w-auto"
        priority
      />
    </Link>
  );
}

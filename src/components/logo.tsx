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
        src="/Nalu_Water__ 1_-removebg-preview.png" 
        alt="NaluWater Logo" 
        width={240} 
        height={66}
        className="h-full w-auto"
        priority
      />
    </Link>
  );
}

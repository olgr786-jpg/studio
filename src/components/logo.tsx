import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Droplet } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="#inici" className={cn("flex items-center gap-2 text-foreground transition-colors hover:text-primary", className)}>
       <div className="bg-primary p-2 rounded-full">
         <Droplet className="h-6 w-6 text-primary-foreground" />
       </div>
      <div className="flex items-baseline">
        <span className="font-headline font-bold text-2xl tracking-wide">Nalu</span>
        <span className="font-body font-light text-2xl ml-1">Water</span>
      </div>
    </Link>
  );
}

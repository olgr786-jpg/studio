import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-waterfall');

  return (
    <section
      id="inici"
      className="relative h-screen min-h-[700px] w-full flex items-center justify-center text-center text-white p-0"
    >
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          priority
          className="object-cover"
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center">
        <div className="max-w-4xl">
          <h1
            className="text-7xl font-bold !leading-tight sm:text-8xl md:text-9xl font-headline"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
          >
            NALU
          </h1>
          <p
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-neutral-100 font-sans tracking-widest uppercase"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
          >
            Aigua pura. Essència tropical.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-white text-white hover:bg-white hover:text-primary-foreground tracking-widest px-8"
            >
              <Link href="#productes">[ DESCOBREIX LA COL·LECCIÓ ]</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

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
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center gap-6">
        <div className="max-w-4xl">
          <h1
            className="text-5xl font-bold !leading-tight tracking-wide sm:text-6xl md:text-7xl font-headline"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
          >
            Nalu
          </h1>
          <p
            className="mt-6 max-w-xl mx-auto text-xl md:text-2xl text-neutral-100 font-medium font-sans"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
          >
            Aigua pura amb essència d’illa.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg"
            >
              <Link href="#productes">Veure Productes</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border-white text-white hover:bg-white hover:text-primary"
            >
              <Link href="#qui-som">Qui som</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

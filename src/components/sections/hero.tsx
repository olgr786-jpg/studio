import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-waterfall');

  return (
    <section id="inici" className="relative h-[80vh] min-h-[500px] w-full flex items-center justify-center text-center text-white p-0">
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
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center gap-6">
        <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg shadow-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            AiguaPura: frescor natural per al teu dia a dia.
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200">
            Qualitat i sabor pur, per a tothom.
            </p>
            <div className="mt-8">
            <Button asChild size="lg">
                <Link href="#productes">Descobreix els nostres productes</Link>
            </Button>
            </div>
        </div>
      </div>
    </section>
  );
}

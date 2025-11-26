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
      <div className="absolute inset-0 bg-cyan-800/30 backdrop-brightness-110" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center gap-6">
        <div className="bg-black/20 backdrop-blur-sm p-8 rounded-lg">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-5xl lg:text-6xl !leading-tight text-shadow" style={{textShadow: '0 2px 8px rgba(0,0,0,0.5)'}}>
            AiguaPura: frescor natural per al teu dia a dia.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-neutral-100" style={{textShadow: '0 1px 4px rgba(0,0,0,0.4)'}}>
            Qualitat i sabor pur, per a tothom.
            </p>
            <div className="mt-8">
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href="#productes">Descobreix els nostres productes</Link>
            </Button>
            </div>
        </div>
      </div>
    </section>
  );
}

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Leaf, Mountain, Droplets } from 'lucide-react';

export default function Origin() {
  const originImage1 = PlaceHolderImages.find(img => img.id === 'origin-river');
  const originImage2 = PlaceHolderImages.find(img => img.id === 'origin-waterfall-2');

  const values = [
    {
      icon: Mountain,
      title: 'Font Natural',
      description: 'La nostra aigua prové d\'una font de muntanya protegida, filtrada naturalment durant anys.',
    },
    {
      icon: Droplets,
      title: 'Puresa Garantida',
      description: 'Envasem l\'aigua directament a la font per preservar la seva puresa i composició mineral única.',
    },
    {
      icon: Leaf,
      title: 'Compromís Sostenible',
      description: 'Protegim l\'entorn de la nostra font i utilitzem envasos 100% reciclables.',
    },
  ];

  return (
    <section id="origen" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">L'Origen de la Puresa</h2>
            <p className="text-lg text-muted-foreground">
             A Nalu Water, creiem que la millor aigua és la que la natura ens ofereix. Per això, la nostra missió és portar-te la seva puresa intacta.
            </p>
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground mt-1">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
             {originImage1 && (
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                    <Image
                        src={originImage1.imageUrl}
                        alt={originImage1.description}
                        fill
                        className="object-cover"
                        data-ai-hint={originImage1.imageHint}
                    />
                </div>
             )}
             {originImage2 && (
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
                    <Image
                        src={originImage2.imageUrl}
                        alt={originImage2.description}
                        fill
                        className="object-cover"
                        data-ai-hint={originImage2.imageHint}
                    />
                </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}

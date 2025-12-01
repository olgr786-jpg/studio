import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Ship, Building, Globe } from 'lucide-react';

export default function About() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-warehouse');

  const values = [
    {
      icon: Ship,
      title: 'Experiència Global',
      description: 'Amb dècades d\'experiència, oferim solucions logístiques que connecten el teu negoci amb el món.',
    },
    {
      icon: Building,
      title: 'Infraestructura Moderna',
      description: 'Els nostres magatzems i flota estan equipats amb la última tecnologia per garantir l\'eficiència.',
    },
    {
      icon: Globe,
      title: 'Compromís amb el Client',
      description: 'La teva satisfacció és la nostra prioritat. Oferim un servei personalitzat i transparent en cada enviament.',
    },
  ];

  return (
    <section id="qui-som" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">La Nostra Missió: Connectar el Món</h2>
            <p className="text-lg text-muted-foreground">
              A Global Logistics, la nostra missió és simple: oferir solucions logístiques eficients, fiables i a mida. Som un soci estratègic compromès amb el teu èxit, la innovació i la sostenibilitat.
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
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-2xl">
            {aboutImage && (
              <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                fill
                className="object-cover"
                data-ai-hint={aboutImage.imageHint}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

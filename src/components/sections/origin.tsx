import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { OriginStoryGenerator } from '@/components/origin-story-generator';

export default function Origin() {
  const streamImage = PlaceHolderImages.find(img => img.id === 'origin-stream');
  const rocksImage = PlaceHolderImages.find(img => img.id === 'origin-rocks');

  return (
    <section id="origen" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">L’Origen de la Puresa</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nalu Water brolla de fonts naturals protegides. La seva puresa prové d'un lent procés de filtració a través de roques volcàniques, que l'enriqueixen amb minerals essencials i li atorguen un gust únic i equilibrat.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {streamImage && (
            <div className="aspect-video relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={streamImage.imageUrl}
                alt={streamImage.description}
                fill
                className="object-cover"
                data-ai-hint={streamImage.imageHint}
              />
            </div>
          )}
          {rocksImage && (
             <div className="aspect-video relative overflow-hidden rounded-lg shadow-lg">
              <Image
                src={rocksImage.imageUrl}
                alt={rocksImage.description}
                fill
                className="object-cover"
                data-ai-hint={rocksImage.imageHint}
              />
            </div>
          )}
        </div>
        <OriginStoryGenerator />
      </div>
    </section>
  );
}

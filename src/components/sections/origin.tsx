import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Laura M.',
    avatar: '/avatars/01.png',
    rating: 5,
    text: "L'aigua més refrescant que he provat mai! El servei a domicili és súper còmode. Totalment recomanat.",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1')
  },
  {
    name: 'Carles P.',
    avatar: '/avatars/02.png',
    rating: 5,
    text: "Qualitat excel·lent i un gust puríssim. Des que la prenc, em sento molt més hidratat. No la canvio per res!",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-2')
  },
  {
    name: 'Sofia G.',
    avatar: '/avatars/03.png',
    rating: 5,
    text: "M'encanta el seu compromís amb la sostenibilitat i el disseny de les ampolles. És l'aigua perfecta per a mi.",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-3')
  }
];

export default function Origin() {
  return (
    <section id="origen" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Què diuen els nostres clients?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            La satisfacció dels nostres clients és la nostra millor carta de presentació.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1">
              {testimonial.image && (
                <div className="aspect-video relative">
                  <Image
                    src={testimonial.image.imageUrl}
                    alt={`Imatge per al testimoni de ${testimonial.name}`}
                    fill
                    className="object-cover"
                    data-ai-hint={testimonial.image.imageHint}
                  />
                </div>
              )}
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground italic mb-4">"{testimonial.text}"</p>
                <div className="flex items-center justify-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <div className="flex text-secondary">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

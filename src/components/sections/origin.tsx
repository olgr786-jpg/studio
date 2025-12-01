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
    text: "L'aigua és increïblement suau i pura. El disseny de les ampolles és preciós. El servei, impecable.",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-1')
  },
  {
    name: 'Carles P.',
    avatar: '/avatars/02.png',
    rating: 5,
    text: "M'encanta la filosofia de la marca i la qualitat del producte. És més que aigua, és una experiència.",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-2')
  },
  {
    name: 'Sofia G.',
    avatar: '/avatars/03.png',
    rating: 5,
    text: "Finalment una aigua que és bona per a mi i per al planeta. El format retornable és una idea genial.",
    image: PlaceHolderImages.find(img => img.id === 'testimonial-3')
  }
];

export default function Origin() {
  return (
    <section id="origen" className="bg-card py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">L'Opinió dels Nostres Clients</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            La puresa i el servei premium són els nostres pilars. Això és el que diuen els qui ja gaudeixen de Nalu.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 bg-background">
              {testimonial.image && (
                <div className="aspect-[4/3] relative">
                  <Image
                    src={testimonial.image.imageUrl}
                    alt={`Imatge per al testimoni de ${testimonial.name}`}
                    fill
                    className="object-cover"
                    data-ai-hint={testimonial.image.imageHint}
                  />
                </div>
              )}
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground italic mb-6">"{testimonial.text}"</p>
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <div className="flex text-secondary mt-1">
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

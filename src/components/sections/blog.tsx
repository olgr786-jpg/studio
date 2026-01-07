import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const blogPosts = [
  {
    id: 'blog-1',
    title: 'Els Minerals Essencials de la Nostra Aigua',
    date: '15 de Juliol, 2024',
    excerpt: 'Descobreix la composició única que fa de Nalu una font de benestar i equilibri natural.',
    imageId: 'blog-benefit',
  },
  {
    id: 'blog-2',
    title: 'El Nostre Compromís: Sostenibilitat i Puresa',
    date: '5 de Juliol, 2024',
    excerpt: 'Exploreu les nostres iniciatives per protegir el medi ambient, des de l\'origen fins a l\'envàs.',
    imageId: 'blog-sustainability',
  },
  {
    id: 'blog-3',
    title: 'Hidratació Premium: Com Afecta la Teva Pell',
    date: '28 de Juny, 2024',
    excerpt: 'Consells d\'experts per lluir una pell radiant gràcies a una hidratació de qualitat superior.',
    imageId: 'blog-hydration',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="bg-background py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">Nalu Journal</h2>
          <p className="mt-6 text-lg text-muted-foreground font-sans">
            Descobreix més sobre el món de la hidratació, el benestar i la sostenibilitat amb els nostres articles.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 items-stretch">
          {blogPosts.map((post) => {
             const postImage = PlaceHolderImages.find(img => img.id === post.imageId);
             return (
              <Card key={post.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-2xl rounded-2xl shadow-lg bg-card">
                 {postImage && (
                  <CardHeader className="p-0">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={postImage.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                          data-ai-hint={postImage.imageHint}
                        />
                      </div>
                  </CardHeader>
                )}
                <CardContent className="flex flex-col flex-grow p-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 font-sans">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="text-2xl mb-3 flex-grow font-headline">{post.title}</CardTitle>
                  <p className="text-muted-foreground text-base font-sans">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="p-8 pt-0">
                  <Button variant="link" className="px-0 group text-primary font-sans">
                    Llegir Més <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
             )
          })}
        </div>
      </div>
    </section>
  );
}

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const blogPosts = [
  {
    id: 'blog-1',
    title: '5 Beneficis de Beure Aigua Mineral Natural',
    date: '15 de Juliol, 2024',
    excerpt: 'Descobreix com la hidratació amb aigua de font pot millorar la teva salut i benestar general.',
    imageId: 'blog-benefit',
  },
  {
    id: 'blog-2',
    title: 'La importància de la sostenibilitat en l\'envasament d\'aigua',
    date: '5 de Juliol, 2024',
    excerpt: 'A Nalu Water, estem compromesos amb el planeta. Coneix les nostres iniciatives d\'envasament sostenible.',
    imageId: 'blog-sustainability',
  },
  {
    id: 'blog-3',
    title: 'Com Mantenir-se Hidratat Durant l\'Estiu',
    date: '28 de Juny, 2024',
    excerpt: 'Consells pràctics i senzills per assegurar una hidratació adequada durant els mesos de més calor.',
    imageId: 'blog-hydration',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2>El Nostre Blog</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Consells, notícies i curiositats sobre la importància d'una bona hidratació.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {blogPosts.map((post) => {
             const postImage = PlaceHolderImages.find(img => img.id === post.imageId);
             return (
              <Card key={post.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl rounded-2xl">
                 {postImage && (
                  <CardHeader className="p-0">
                      <div className="aspect-video relative">
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
                <CardContent className="flex flex-col flex-grow p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <CardTitle className="text-xl mb-2 flex-grow">{post.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="link" className="px-0 group">
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

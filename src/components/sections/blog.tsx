import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const blogPosts = [
  {
    id: 'blog-1',
    title: 'Optimització de Rutes: Com Estalviar Temps i Diners',
    date: '15 de Juliol, 2024',
    excerpt: 'Descobreix les últimes tecnologies i estratègies per optimitzar les teves rutes de lliurament i millorar l\'eficiència.',
    imageId: 'blog-1',
  },
  {
    id: 'blog-2',
    title: 'La Importància de l\'Emmagatzematge Intel·ligent',
    date: '5 de Juliol, 2024',
    excerpt: 'Un bon sistema d\'emmagatzematge és clau per a una cadena de subministrament àgil. T\'expliquem com aconseguir-ho.',
    imageId: 'blog-2',
  },
  {
    id: 'blog-3',
    title: 'Tendències en Logística Sostenible per al 2025',
    date: '28 de Juny, 2024',
    excerpt: 'La sostenibilitat ja no és una opció. Analitzem les tendències que marcaran el futur del sector logístic.',
    imageId: 'blog-3',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2>El Nostre Blog</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Mantén-te al dia de les últimes notícies i tendències del sector logístic.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {blogPosts.map((post) => {
             const postImage = PlaceHolderImages.find(img => img.id === post.imageId);
             return (
              <Card key={post.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
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

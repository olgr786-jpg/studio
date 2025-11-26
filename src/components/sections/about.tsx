import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart, Leaf, Eye } from 'lucide-react';

export default function About() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-leaf-water');

  const values = [
    {
      icon: Heart,
      title: 'Salut',
      description: 'La teva salut és la nostra prioritat. Per això t\'oferim una aigua pura i equilibrada, ideal per a un estil de vida saludable.',
    },
    {
      icon: Leaf,
      title: 'Sostenibilitat',
      description: 'Cuidem el planeta com cuidem la nostra aigua. Utilitzem envasos 100% reciclables i processos que respecten el medi ambient.',
    },
    {
      icon: Eye,
      title: 'Transparència',
      description: 'Creiem en la claredat, des de l’origen de la nostra aigua fins a l’etiqueta. Confia en el que beus.',
    },
  ];

  return (
    <section id="sobre-nosaltres" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">La Nostra Promesa: Puresa i Compromís</h2>
            <p className="text-lg text-muted-foreground">
              A AiguaPura, la nostra missió és senzilla: portar-te la puresa de la natura a cada glop. Som una marca propera, compromesa amb la teva salut, el benestar del planeta i la total transparència.
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
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2xl">
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

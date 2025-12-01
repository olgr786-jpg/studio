import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WhoWeAre() {
  const whoWeAreImage = PlaceHolderImages.find(img => img.id === 'who-we-are');

  return (
    <section id="qui-som" className="bg-card py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">La Nostra Història</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Nalu Water va néixer l’any 2021 d’un somni: capturar l’essència de les illes més pures del món en una ampolla. Fundada per un grup d’apassionats per la natura i el benestar, la nostra aventura va començar amb un viatge a Fiji, on vam descobrir una font d’aigua d’una qualitat excepcional.
            </p>
            <p className="mt-4 text-muted-foreground">
              Des d’aquell moment, la nostra missió ha estat clara: oferir una aigua mineral natural que no només hidrati, sinó que també inspiri un estil de vida conscient i saludable. Creiem en la sostenibilitat, en la innovació i en el poder de la natura per equilibrar cos i ment. Cada gota de Nalu és un tribut a aquest origen, un recordatori de la bellesa i la puresa que el nostre planeta ens ofereix.
            </p>
             <Button
              asChild
              size="lg"
              className="mt-8 rounded-lg"
            >
              <Link href="#contacte">Uneix-te a la família Nalu</Link>
            </Button>
          </div>
          <div className="order-1 md:order-2">
            {whoWeAreImage && (
              <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={whoWeAreImage.imageUrl}
                  alt={whoWeAreImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={whoWeAreImage.imageHint}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

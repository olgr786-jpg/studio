import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WhoWeAre() {
  const whoWeAreImage = PlaceHolderImages.find(img => img.id === 'nalu-bottle-jungle');

  return (
    <section id="qui-som" className="bg-card py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="md:w-3/5">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">La Nostra Història</h2>
            <p className="mt-6 text-lg text-gray-400 font-sans">
              Nalu Water va néixer l’any 2021 d’un somni a Barcelona: capturar l’essència de les illes més pures del món en una ampolla. Fundada per un grup d’apassionats per la natura i el benestar, la nostra aventura va començar amb un viatge a Fiji, on vam descobrir una font d’aigua d’una qualitat excepcional.
            </p>
            <p className="mt-4 text-gray-400 font-sans">
              Des d’aquell moment, la nostra missió ha estat clara: oferir una aigua mineral natural que no només hidrati, sinó que també inspiri un estil de vida conscient i saludable. Creiem en la sostenibilitat, en la innovació i en el poder de la natura per equilibrar cos i ment. Cada gota de Nalu és un tribut a aquest origen, un recordatori de la bellesa i la puresa que el nostre planeta ens ofereix.
            </p>
             <Button
              asChild
              size="lg"
              className="mt-8 rounded-lg font-sans"
            >
              <Link href="#contacte">Uneix-te a la família Nalu</Link>
            </Button>
          </div>
          <div className="md:w-2/5 w-full">
            {whoWeAreImage && (
              <div className="aspect-square relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
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

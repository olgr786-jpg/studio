'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Leaf, Heart, Gift, GlassWater, Sparkles, Star } from 'lucide-react';

const productCategories = [
  {
    value: 'principal',
    label: 'Gamma Principal',
    icon: GlassWater,
    products: [
      {
        id: 'nalu-original',
        name: 'Nalu Original',
        description: 'Aigua pura i equilibrada. Perfecta per al dia a dia. Formats: 330ml (1.50€), 500ml (1.80€), 1L (2.20€) i 1.5L (3.00€).',
        imageId: 'product-original',
        price: 'Des de 1.50€',
      },
      {
        id: 'nalu-premium',
        name: 'Nalu Premium Vidre',
        description: 'Gust suau i perfil mineral únic en una elegant ampolla de vidre. Ideal per a la restauració.',
        imageId: 'product-premium',
        price: '4.50€',
      },
    ],
  },
  {
    value: 'essencies',
    label: 'Essències Naturals',
    icon: Sparkles,
    products: [
      {
        id: 'nalu-coco',
        name: 'Nalu Coco Breeze',
        description: 'Un toc refrescant de coco que et transportarà al paradís. Sense sucres afegits. Format: 500ml.',
        imageId: 'product-essences-coco',
        price: '2.50€',
      },
      {
        id: 'nalu-pineapple',
        name: 'Nalu Pineapple Wave',
        description: "L'essència de la pinya més dolça i tropical en cada glop. Sense sucres afegits. Format: 500ml.",
        imageId: 'product-essences-pineapple',
        price: '2.50€',
      },
       {
        id: 'nalu-mango',
        name: 'Nalu Mango Sunset',
        description: 'Un sabor exòtic i aromàtic per a una hidratació deliciosa. Sense sucres afegits. Format: 500ml.',
        imageId: 'product-essences-mango',
        price: '2.50€',
      },
      {
        id: 'nalu-citrus',
        name: 'Nalu Citrus Paradise',
        description: 'La combinació energètica de llimona i llima tropical. Sense sucres afegits. Format: 500ml.',
        imageId: 'product-essences-citrus',
        price: '2.50€',
      },
    ],
  },
  {
    value: 'wellness',
    label: 'Aigües Wellness',
    icon: Heart,
    products: [
      {
        id: 'nalu-electrolyte',
        name: 'Nalu Electrolyte+',
        description: 'Rehidratació ràpida per a esportistes o dies intensos. Recupera els minerals essencials.',
        imageId: 'product-wellness-electrolyte',
        price: '3.00€',
      },
      {
        id: 'nalu-boost',
        name: 'Nalu Boost Vitamines',
        description: "Un impuls d'energia natural amb vitamines B+C per afrontar el dia amb vitalitat.",
        imageId: 'product-wellness-boost',
        price: '3.00€',
      },
      {
        id: 'nalu-relax',
        name: 'Nalu Relax',
        description: 'Amb magnesi i un toc de lavanda per a un moment de calma i benestar.',
        imageId: 'product-wellness-relax',
        price: '3.00€',
      },
    ],
  },
  {
    value: 'eco',
    label: 'Gamma Eco',
    icon: Leaf,
    products: [
      {
        id: 'nalu-earth',
        name: 'Nalu Earth (100% Reciclada)',
        description: 'La mateixa puresa de sempre en una ampolla feta completament de plàstic reciclat.',
        imageId: 'product-eco-recycled',
        price: '2.00€',
      },
      {
        id: 'nalu-refill',
        name: 'Nalu Refill (Bag-in-Box)',
        description: "Format familiar o d'oficina de 8L per reduir residus plàstics. La opció més sostenible.",
        imageId: 'product-eco-refill',
        price: '12.00€',
      },
    ],
  },
  {
    value: 'complements',
    label: 'Complements',
    icon: Star,
    products: [
      {
        id: 'nalu-gots',
        name: 'Gots Reutilitzables Nalu',
        description: 'Set de 4 gots amb dissenys tropicals. Perfectes per a qualsevol ocasió.',
        imageId: 'product-merch-cups',
        price: '19.90€',
      },
      {
        id: 'nalu-botella',
        name: 'Ampolla Inoxidable Nalu',
        description: 'Manté la teva aigua freda durant hores amb la nostra ampolla tèrmica de disseny exclusiu.',
        imageId: 'pack-adventure',
        price: '24.90€',
      },
    ],
  },
  {
    value: 'packs',
    label: 'Packs Especials',
    icon: Gift,
    products: [
      {
        id: 'pack-tropical',
        name: 'Pack Degustació Tropical',
        description: 'Descobreix el paradís amb les nostres essències: Coco, Pinya i Mango.',
        imageId: 'pack-tropical-essences',
        price: '7.00€',
      },
       {
        id: 'pack-esport',
        name: 'Pack Esport',
        description: 'La combinació perfecta: Nalu Original, Electrolyte+ i Citrus Paradise per a la teva rutina.',
        imageId: 'pack-sport',
        price: '8.00€',
      },
      {
        id: 'pack-experiencia',
        name: 'Pack Experiència Nalu',
        description: "El regal perfecte: selecció d'aigües, got reutilitzable i una dedicatòria especial.",
        imageId: 'product-merch-pack',
        price: '39.90€',
      },
    ],
  },
];

export default function Products() {
  const { toast } = useToast();

  return (
    <section id="productes" className="py-24 sm:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">La Puresa en Cada Gota</h2>
          <p className="mt-6 text-lg text-muted-foreground font-body">
            Tria el format que millor s'adapta al teu estil de vida. Sempre amb la mateixa qualitat i puresa que ens defineix.
          </p>
        </div>

        <Tabs defaultValue="principal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto mb-12">
            {productCategories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value} className="py-3 text-base">
                <cat.icon className="mr-2 h-5 w-5" /> {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {productCategories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              <div className="grid grid-cols-1 gap-8 md:gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.products.map((product) => {
                  const productImage = PlaceHolderImages.find((img) => img.id === product.imageId);
                  return (
                    <Card
                      key={product.id}
                      className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-2xl bg-card rounded-2xl shadow-lg"
                    >
                      <CardHeader className="p-0">
                        {productImage && (
                          <div className="aspect-[4/3] relative">
                            <Image
                              src={productImage.imageUrl}
                              alt={product.name}
                              fill
                              className="object-cover"
                              data-ai-hint={productImage.imageHint}
                            />
                          </div>
                        )}
                      </CardHeader>
                      <div className="flex flex-col flex-grow p-6 text-center">
                        <CardTitle className="m-0 text-2xl font-headline">{product.name}</CardTitle>
                        <p className="text-muted-foreground mt-3 flex-grow font-body text-sm">{product.description}</p>
                        <p className="text-2xl font-bold text-primary mt-4 font-headline">{product.price}</p>
                      </div>
                      <CardFooter className="p-6 pt-0">
                        <Button
                          size="lg"
                          className="w-full rounded-lg"
                          onClick={() => toast({ title: `${product.name} afegit a la cistella!` })}
                        >
                          <ShoppingCart className="mr-2 h-5 w-5" /> Comprar
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

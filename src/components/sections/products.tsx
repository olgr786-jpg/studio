'use client'

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart } from 'lucide-react';

const products = [
  { 
    id: 'pack-tropical', 
    name: 'Pack Degustació Tropical', 
    description: 'Descobreix el paradís amb les nostres essències naturals: Coco Breeze, Pineapple Wave i Mango Sunset.', 
    imageId: 'pack-tropical-essences',
    price: '15.00€',
  },
  { 
    id: 'pack-benestar', 
    name: 'Pack Benestar', 
    description: 'Cuida\'t amb la nostra gamma funcional: Electrolyte+, Boost amb vitamines i Relax amb magnesi.', 
    imageId: 'pack-wellness',
    price: '18.00€',
  },
  { 
    id: 'pack-aventura', 
    name: 'Pack Aventura', 
    description: 'Equipa\'t per al dia a dia amb la nostra ampolla d\'acer inoxidable i un pack d\'aigua Nalu Original.', 
    imageId: 'pack-adventure',
    price: '29.90€',
  },
];

export default function Products() {
  const { toast } = useToast()

  return (
    <section id="productes" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">La Puresa en Cada Gota</h2>
          <p className="mt-6 text-lg text-muted-foreground font-body">
            Tria el format que millor s'adapta al teu estil de vida. Sempre amb la mateixa qualitat i puresa que ens defineix.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const productImage = PlaceHolderImages.find(img => img.id === product.imageId);
            return (
              <Card key={product.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-2xl bg-card rounded-2xl shadow-lg">
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
                <div className="flex flex-col flex-grow p-8 text-center">
                    <CardTitle className="m-0 text-3xl font-headline">{product.name}</CardTitle>
                    <p className="text-muted-foreground mt-4 flex-grow font-body">{product.description}</p>
                    <p className="text-3xl font-bold text-primary mt-6 font-headline">{product.price}</p>
                </div>
                <CardFooter className="p-8 pt-0">
                  <Button size="lg" className="w-full rounded-lg" onClick={() => toast({ title: `${product.name} afegit a la cistella!` })}>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Comprar
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

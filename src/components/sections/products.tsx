'use client'

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart } from 'lucide-react';

const products = [
  { 
    id: 'p1', 
    name: 'Pack Aigua de Platja', 
    description: '6 ampolles de 500ml. Perfecta per portar a sobre i mantenir-te fresc sota el sol.', 
    imageId: 'product-500ml',
    price: '5.00€',
  },
  { 
    id: 'p2', 
    name: 'Pack Familiar Tropical', 
    description: '6 ampolles de 1.5L. Ideal per a àpats en família o per tenir a la nevera.', 
    imageId: 'product-1.5l',
    price: '8.50€',
  },
  { 
    id: 'p3', 
    name: 'Garrafa Oasi 8L', 
    description: 'La solució més econòmica i sostenible per a la llar. Perfecta per cuinar i beure.', 
    imageId: 'product-5l',
    price: '12.00€',
  },
];

export default function Products() {
  const { toast } = useToast()

  return (
    <section id="productes" className="bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Els Nostres Productes</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tria el format que millor s'adapta a les teves necessitats. Sempre amb la mateixa puresa tropical.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const productImage = PlaceHolderImages.find(img => img.id === product.imageId);
            return (
              <Card key={product.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-2xl bg-card rounded-2xl">
                <CardHeader className="p-0">
                  {productImage && (
                    <div className="aspect-square relative">
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
                    <CardTitle className="m-0">{product.name}</CardTitle>
                    <p className="text-muted-foreground mt-2 flex-grow">{product.description}</p>
                    <p className="text-2xl font-bold text-primary mt-4">{product.price}</p>
                </div>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full rounded-full" onClick={() => toast({ title: `${product.name} afegit a la cistella!` })}>
                    <ShoppingCart className="mr-2" /> Comprar Ara
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

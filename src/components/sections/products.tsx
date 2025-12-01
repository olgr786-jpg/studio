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
    name: 'Pack Essencial', 
    description: '6 ampolles de vidre de 500ml. Perfecta per a l\'ús diari i un estil de vida actiu.', 
    imageId: 'product-500ml',
    price: '12.00€',
  },
  { 
    id: 'p2', 
    name: 'Pack Familiar', 
    description: '6 ampolles de vidre de 1.5L. Ideal per compartir a taula o per a la llar.', 
    imageId: 'product-1.5l',
    price: '18.50€',
  },
  { 
    id: 'p3', 
    name: 'Garrafa Oasi 8L', 
    description: 'La nostra solució més sostenible. Vidre retornable amb dispensador premium.', 
    imageId: 'product-5l',
    price: '25.00€',
  },
];

export default function Products() {
  const { toast } = useToast()

  return (
    <section id="productes" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">La Puresa en Cada Gota</h2>
          <p className="mt-6 text-lg text-muted-foreground">
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
                    <CardTitle className="m-0 text-3xl">{product.name}</CardTitle>
                    <p className="text-muted-foreground mt-4 flex-grow">{product.description}</p>
                    <p className="text-3xl font-bold text-primary mt-6">{product.price}</p>
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

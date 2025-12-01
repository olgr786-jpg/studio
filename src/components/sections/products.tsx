'use client'

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart } from 'lucide-react';

const products = [
  { id: 'p1', name: 'Nalu Water 0.5L', description: 'Perfecta per al gimnàs i activitats.', price: '1.50€', imageId: 'product-500ml' },
  { id: 'p2', name: 'Nalu Water 1L', description: 'Ideal per al consum diari.', price: '2.00€', imageId: 'product-1l' },
  { id: 'p3', name: 'Nalu Water 1.5L', description: 'La mida perfecta per a famílies.', price: '2.50€', imageId: 'product-1_5l' },
  { id: 'p4', name: 'Garrafa 5L', description: 'Per a casa i la oficina.', price: '5.00€', imageId: 'product-5l' },
  { id: 'p5', name: 'Garrafa 8L', description: 'Màxima capacitat, menys viatges.', price: '7.50€', imageId: 'product-8l' },
  { id: 'p6', name: 'Pack Setmanal', description: '7 ampolles de 1.5L per a la teva setmana.', price: '15.00€', imageId: 'product-1_5l' },
];

export default function Products() {
  const { toast } = useToast()

  return (
    <section id="productes" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Els Nostres Productes</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Des de la mida personal fins a formats familiars, tenim la Nalu Water perfecta per a cada ocasió.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {products.map((product) => {
            const productImage = PlaceHolderImages.find(img => img.id === product.imageId);
            return (
              <Card key={product.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="p-0">
                  {productImage && (
                    <div className="aspect-[3/4] relative">
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
                <div className="flex flex-col flex-grow p-6">
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription className="mt-2 flex-grow">{product.description}</CardDescription>
                </div>
                <CardFooter className="flex justify-between items-center">
                  <p className="text-xl font-bold">{product.price}</p>
                  <Button onClick={() => {
                      toast({
                        title: "Producte afegit!",
                        description: `${product.name} s'ha afegit al teu carretó.`,
                      })
                    }}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Afegir al carretó
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

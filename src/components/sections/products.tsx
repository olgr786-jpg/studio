'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useCart } from '@/hooks/use-cart';
import { ShoppingCart, Leaf, Heart, GlassWater, Sparkles, Star } from 'lucide-react';
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Define types for products and variants
type ProductVariant = {
  size: string;
  price: number;
};

type Product = {
  id: string;
  name: string;
  description: string;
  imageId: string;
  price?: string;
  variants?: ProductVariant[];
};

type ProductCategory = {
    value: string;
    label: string;
    icon: React.ElementType;
    products: Product[];
}

const productCategories: ProductCategory[] = [
  {
    value: 'principal',
    label: 'Gamma Principal',
    icon: GlassWater,
    products: [
      {
        id: 'nalu-original',
        name: 'Nalu Original',
        description: 'Aigua pura i equilibrada, disponible en múltiples formats per adaptar-se a cada moment.',
        imageId: 'product-original',
        variants: [
            { size: '350ml', price: 1.50 },
            { size: '500ml', price: 1.80 },
            { size: '750ml', price: 2.20 },
            { size: '1L', price: 2.50 },
            { size: '1.5L', price: 3.00 },
        ],
      },
      {
        id: 'nalu-premium',
        name: 'Nalu Premium',
        description: 'Elegant ampolla de vidre ideal per a restaurants. Formats de 750ml (3€), 1L (4,50€) i 2L (5€).',
        imageId: 'product-premium',
        price: 'Des de 3.00€',
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
        description: 'Rehidratació ràpida per a esportistes o dies intensos. Recupera els minerals essencials en una ampolla de vidre. Format: 500ml.',
        imageId: 'product-wellness-electrolyte',
        price: '3.50€',
      },
      {
        id: 'nalu-boost',
        name: 'Nalu Boost Vitamines',
        description: "Un impuls d'energia natural amb vitamines B+C per afrontar el dia amb vitalitat, en ampolla de vidre. Format: 500ml.",
        imageId: 'product-wellness-boost',
        price: '3.50€',
      },
      {
        id: 'nalu-relax',
        name: 'Nalu Relax',
        description: 'Amb magnesi i un toc de lavanda per a un moment de calma i benestar, en ampolla de vidre. Format: 500ml.',
        imageId: 'product-wellness-relax',
        price: '3.50€',
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
];


const ProductCard = ({ product, isClient }: { product: Product, isClient: boolean }) => {
  const { addItem } = useCart();
  const productImage = PlaceHolderImages.find((img) => img.id === product.imageId);

  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant | undefined>(product.variants?.[0]);
  
  const handleAddToCart = () => {
    if (!productImage) {
      console.error('Product image not found for:', product.id);
      return;
    }

    let price: number;
    let id: string;
    let name: string;

    if (product.variants && selectedVariant) {
        price = selectedVariant.price;
        id = `${product.id}-${selectedVariant.size}`;
        name = `${product.name} (${selectedVariant.size})`;
    } else if (product.price) {
        const priceString = product.price.replace('Des de ', '').replace('€', '').replace(',', '.');
        price = parseFloat(priceString);
        id = product.id;
        name = product.name;
    } else {
        console.error('Product has no price or variants:', product);
        return;
    }
    
    if (isNaN(price)) {
      console.error('Invalid price for product:', product);
      return;
    }

    addItem({
      id: id,
      name: name,
      price: price,
      image: productImage.imageUrl,
    });
  };

  const displayedPrice = product.variants && selectedVariant
    ? `${selectedVariant.price.toFixed(2)}€`
    : product.price || '';


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
              className={product.id === 'nalu-botella' ? 'object-contain p-4' : 'object-cover'}
              data-ai-hint={productImage.imageHint}
            />
          </div>
        )}
      </CardHeader>
      <div className="flex flex-col flex-grow p-6 text-center">
        <CardTitle className="m-0 text-2xl font-headline">{product.name}</CardTitle>
        <p className="text-muted-foreground mt-3 flex-grow font-sans text-sm">{product.description}</p>
        
        {product.variants && selectedVariant && (
          <div className="my-4 font-sans">
            <RadioGroup
              defaultValue={selectedVariant.size}
              onValueChange={(value: string) => {
                const newVariant = product.variants?.find(v => v.size === value);
                setSelectedVariant(newVariant);
              }}
              className="flex justify-center flex-wrap gap-x-4 gap-y-2"
            >
              {product.variants.map((variant) => (
                <div key={variant.size} className="flex items-center space-x-2">
                  <RadioGroupItem value={variant.size} id={`${product.id}-${variant.size}`} />
                  <Label htmlFor={`${product.id}-${variant.size}`} className="cursor-pointer">{variant.size}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
        
        <p className="text-2xl font-bold text-primary mt-4 font-headline">{displayedPrice}</p>
      </div>
      <CardFooter className="p-6 pt-0">
        {isClient && (
          <Button
            size="lg"
            className="w-full rounded-lg font-sans"
            onClick={handleAddToCart}
            disabled={product.variants && !selectedVariant}
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> Comprar
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};


export default function Products() {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section id="productes" className="bg-primary py-12 sm:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline text-primary-foreground">La Puresa en Cada Gota</h2>
          <p className="mt-6 text-lg text-primary-foreground/80 font-sans">
            Tria el format que millor s'adapta al teu estil de vida. Sempre amb la mateixa qualitat i puresa que ens defineix.
          </p>
        </div>

        <Tabs defaultValue="principal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto mb-12 bg-black/10 text-primary-foreground">
            {productCategories.map((cat) => (
              <TabsTrigger key={cat.value} value={cat.value} className="py-3 text-base font-sans">
                <cat.icon className="mr-2 h-5 w-5" /> {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {productCategories.map((cat) => (
            <TabsContent key={cat.value} value={cat.value}>
              <div className="grid grid-cols-1 gap-10 md:gap-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.products.map((product) => (
                    <ProductCard key={product.id} product={product} isClient={isClient} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

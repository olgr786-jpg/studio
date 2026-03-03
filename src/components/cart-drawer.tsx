'use client';

import Image from 'next/image';
import { useCart, type CartItem } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

function CartItemCard({ item }: { item: CartItem }) {
  const { updateItemQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-6 py-6">
      <div className="relative h-24 w-24 rounded-lg overflow-hidden border">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1 space-y-2">
        <p className="font-semibold text-card-foreground text-lg">{item.name}</p>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <span className="w-8 text-center font-medium text-lg">{item.quantity}</span>
           <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{item.price.toFixed(2)}€ / unitat</p>
      </div>
       <div className="flex flex-col items-end justify-between h-full">
         <p className="font-bold text-lg">{(item.price * item.quantity).toFixed(2)}€</p>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Eliminar article</span>
          </Button>
      </div>
    </div>
  );
}


export function CartDrawer() {
  const { cartItems, cartCount, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full max-w-2xl flex flex-col p-0 bg-card text-card-foreground shadow-2xl">
        <SheetHeader className="p-6 pb-4">
          <SheetTitle className="flex items-center gap-3 text-3xl font-headline">
            Cistella
            <span className="text-lg font-sans font-normal text-muted-foreground">({cartCount} productes)</span>
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {cartCount > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="px-6 divide-y divide-border">
                {cartItems.map(item => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="p-6 bg-card/50 space-y-6">
                <div className="flex justify-between items-center text-xl font-semibold">
                    <span>Subtotal</span>
                    <span className="font-headline text-3xl">{cartTotal.toFixed(2)}€</span>
                </div>
                <Button size="lg" className="w-full font-sans text-lg py-7" onClick={handleCheckout}>
                    Finalitzar compra
                </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 p-6">
            <ShoppingCart className="h-24 w-24 text-muted-foreground" strokeWidth={1} />
            <h3 className="text-2xl font-semibold font-headline">La teva cistella és buida</h3>
            <p className="text-muted-foreground max-w-sm">
              Sembla que encara no has afegit cap producte. Explora la nostra col·lecció i troba la teva aigua ideal.
            </p>
             <SheetClose asChild>
                <Button variant="secondary" size="lg" className="mt-4">Continua comprant</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
